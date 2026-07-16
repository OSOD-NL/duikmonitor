# Architectuur Duikmonitor

Korte technische overdracht voor review, onderhoud en toekomstige wijzigingen.

## 1. Bestandsopbouw

De app staat bewust in één bestand: `index.html`. Er is geen build-stap, geen package-manager, geen backend en geen externe runtime. De automatische controles staan in `.github/workflows/checks.yml` en `scripts/run-selftests-node.js`.

Belangrijke documentatie:

- `README.md` - doel, gebruik, privacy en basiscontrole.
- `SECURITY.md` - gegevensgarantie en bewuste niet-doen-lijst.
- `docs/WERKWIJZE.md` - veilige wijzigingsroute via branch, PR, checks en review.
- `docs/VALIDATIE_TABELLEN.md` - cel-voor-cel validatie, bevroren `DCIEM`-bron en waakhond-zelftest.

## 2. State-model

Alle gebruikersdata zit in één `state`-object en wordt lokaal opgeslagen in `localStorage` onder `STORAGE_KEY`.

Hoofddelen:

- `state.project` - datum, locatie, ploeg-/projectgegevens en instellingen voor de dag.
- `state.divers` - vaste D1 t/m D12-slots, actief/inactief-vlag, aanduiding, standaard-MDD en materiaalvelden.
- `state.planning` - vooraf ingevoerde/geplande duiken.
- `state.live` - live dagregistratie, luchtmetingen, fasen en opkomst-/bovenwatermomenten.
- `state.settings` - UI- en controle-instellingen, waaronder luchtcheckgeluid.

Migratie en normalisatie gebeuren in `load()`, `migrateDiveRows()`, `ensureProjectMeta()`, `ensureDivers()`, `ensureAirFields()` en verwante helperfuncties.

## 3. Safety-kritieke functies

Deze functies verdienen extra review bij elke wijziging.

### `calcUnit`

Kern van de DCIEM-rekenmotor. Bepaalt onder andere:

- MDD-band;
- DT/EDT;
- HG vóór en na aanpassing;
- HF uit Tabel 4a;
- herhalings-NDL uit Tabel 4b;
- blokkades bij ontbrekende of onberekenbare invoer.

### `calcCombinedUnit`

Berekent een gecombineerde duik van twee of drie feitelijke duikmomenten. De
eerste stap leest de HG uit Airtabel 1. Bij een volgend moment op dezelfde
tabeldiepte wordt de effectieve duiktijd opgeteld; bij een andere tabeldiepte
wordt uitsluitend de overeenkomstige duiktijd voor de voorgaande HG uit
Airtabel 1 gebruikt. Er wordt niet geïnterpoleerd. Een ontbrekende cel, een
vierde gekoppeld moment, een start met inkomende HF anders dan 1,0 of een
gezamenlijke uitkomst buiten de no-deco-envelop blokkeert de berekening. De
functie leidt nooit een decompressieschema af.

### `buildUnits` en `calcDataset`

Normaliseren en sorteren alle duikmomenten per duiker op start- en boventijd.
Dagdeel is geen rekengrens. De reducer bouwt vervolgens expliciete
rekeneenheden van type `single`, `combined` of `meter`:

- een geldige 6-, 9- of 12-meterregelsessie heeft voorrang, mag alleen met
  inkomende HF 1,0 starten en gebruikt de diepste werkelijke MDD voor de regel;
- buiten een geldige meterregelsessie vormen opeenvolgende momenten met OI
  korter dan 15 minuten één gecombineerde duik van maximaal drie momenten;
- OI vanaf 15 minuten volgt de gewone normale/herhalingsroute;
- na meer dan 18 uur wordt de keten vóór de routekeuze gereset;
- overlap of een eerdere onbetrouwbare uitkomst blokkeert de keten.

Een dagdeelwisseling splitst geen gecombineerde duik of meterregelsessie. Voor
presentatie wordt een dagdeeloverschrijdende rekeneenheid één keer onder het
startdagdeel getoond, met alle feitelijke momenten en hun eigen dagdeel erbij.

### `applyAscentLimits`

Bewaking bovenop de DCIEM-rekenmotor. Controleert opstijgingslimieten en de >12m-procedurelaag. Deze laag is bewust apart gehouden van de tabellen.

### `collectMeterRuleSession`

Verzamelt een chronologische meterregelsessie voordat `calcUnit` rekent. De
sessie loopt over dagdelen heen, telt alle feitelijke duiktijden op en schuift
naar 6, 9 of 12 meter op basis van de diepste werkelijke MDD. Wanneer de
inkomende HF bij een later moment opnieuw exact 1,0 is, eindigt de bestaande
sessie en kan een nieuwe sessie beginnen. Een afgewezen sessiestart krijgt geen
kunstmatige HF 1,0 en valt niet stilzwijgend terug op een cumulatieve
meterregeluitkomst.

### `repeatProjection`

Pure leeslaag voor de herhalingsduik-vooruitblik op het livescherm. Krijgt de laatste herhalingsgroep, de boventijd en de MDD, en projecteert met `getHF` (tabel 4a) en `getRepeatNDL` (tabel 4b): de actuele HF en herhalings-NDL bij het lopende oppervlakte-interval, de toekomstige momenten waarop de HF daalt, en het moment waarop HF 1,0 wordt (tabelkolom of 18-uurs reset). Verandert geen state en geen bestaande berekening. Conservatief: dubbele tabelwaarden tellen één keer, lege cellen worden als 'nu niet toegestaan' gemarkeerd, OI onder 0:15 als 'te kort'. Wordt door `renderRepeatProjection` getoond, uitsluitend wanneer de duiker boven is.

### `airAnalysis`

Analyse van live luchtverbruik, meetmomenten en waarschuwingen. Rekent op timestamps waar mogelijk en is gevoelig voor fouten in tijdregistratie.

### `repairActiveLiveTimerDates`

Compatibiliteitsreparatie voor oude live-records zonder timestamp. Sinds de timestamp-migratie rekent de app primair op `startTs`, `ascentStartTs`, `surfaceTs` en `timeTs`. Deze repair is alleen bedoeld voor oude browserdata waarin de tekstuele datum door een iOS/nacht-situatie kon verschuiven.

### Exportfuncties

- CSV gebruikt `csvSafe()` tegen formule-injectie.
- XLSX gebruikt `inlineStr` en XML-escaping, zodat formuleachtige invoer als tekst wordt opgeslagen.
- De registratie-JSON en -XLSX scheiden feitelijke duikmomenten van de
  gezamenlijke rekeneenheid. Een gecombineerde effectieve DT/HG wordt niet op
  ieder fysiek moment geplakt.
- JSON-back-up bevat state-data en is bedoeld als lokale overdracht/back-up.

## 4. Tabelwaarden en diep bevroren bron

De hardgecodeerde tabeldata staan bovenin het script:

- `airTable` - Airtabel 1 voor 6/9/12/15 m.
- `table4aCols` en `table4a` - HF op basis van HG en OI.
- `table4b` - herhalings-NDL voor 9/12/15 m.
- `shallowRules` - 6/9/12-meterregel-totaallimieten.

Daarboven staat een diep bevroren bron `DCIEM` (`deepFreeze`): de single
source of truth met dezelfde tabellen plus de meterregels, cel voor cel uit
IWOD 002 en de Landelijke werkinstructie Werken onder overdruk brandweer. Lege/uitgesloten
cellen staan als `null`. De rekenmotor (`airTable` c.s.) wordt als afgeleide
kopie uit deze bron opgebouwd, dus Tabel 4a is geen directe alias van de bronmatrix.
Bij elke start controleert de waakhond-zelftest (categorie `verificatie`, kritiek)
dat de afgeleide motor gelijk is aan de bron; daarnaast bewaakt een vaste
bronfingerprint en een Tabel 4a-fixture dat de ingebouwde bron zelf niet ongemerkt
wijzigt. Zie sectie 8.

De validatie staat in `docs/VALIDATIE_TABELLEN.md`: cel-voor-cel tegen de fysieke bron, plus de diep bevroren bron, bronfingerprint, fixture en waakhond.
Bij bronherziening moet eerst het validatiedocument worden bijgewerkt en daarna pas
de code, de `DCIEM`-bron en de zelftests.

## 5. Zelftests

De browserfunctie `runSelfTests()` draait in de app zelf en wordt door `scripts/run-selftests-node.js` ook in CI uitgevoerd. De selftests dekken onder andere:

- tabelwaarden en HF-keuzes;
- meterregelgrenzen;
- chronologische rekeneenheden, dagdeeloverschrijding en OI-grenzen 14/15/16;
- gecombineerde duiken met gelijke en verschillende tabeldiepten, lege
  overeenkomstige cellen, maximaal drie momenten en no-deco-blokkades;
- blokkades bij ontbrekende invoer;
- >12m-procedurelaag;
- live-timer en timestampgedrag;
- luchtmetingen;
- exportveiligheid;
- import-sanitizing.

De selftests vervangen geen inhoudelijke bronvalidatie, maar borgen dat bekende keuzes niet ongemerkt veranderen.

## 6. Ontwerpgrenzen

Bewust buiten scope:

- multi-user;
- accounts of rollenmodel;
- centrale database;
- synchronisatie tussen apparaten;
- externe opslag;
- audit-log van bewerkingen.

Deze grenzen beschermen het lokale privacy-model. Nieuwe functies die deze grenzen raken moeten als apart architectuurbesluit worden behandeld, niet als gewone kleine wijziging.

## 7. Themasysteem en contrast-zelftests

Alle schermkleuren staan in één semantisch tokenblok (`/* THEME TOKENS START/END */`) met aparte tokens voor achtergrond, tekst en rand per component. Componentregels bevatten geen ruwe kleuren, alleen `var(--token)`. Twee modi: `night` (donker, met diepte) en `day` (Dag/Buiten: effen, hoog contrast, voor zon en waterkant). Het thema staat op `document.documentElement`, en `color-scheme` wordt per `html[data-theme]` gezet. Een oude `bright`-voorkeur migreert naar `day`.

Leesbaarheid is voor buitengebruik onderdeel van betrouwbaarheid, niet alleen cosmetiek. De zelftestcategorie `Schermthema` toetst per thema het kleurcontrast volgens de WCAG-formule (`parseColor`, `blendOver`, `relLuminance`, `contrastRatio`). De tokens worden uit de werkelijke stylesheet gelezen (`parseThemeTokens` plus `getThemeTokenCSS`), niet uit een losse palette, zodat test en CSS niet kunnen divergeren. Transparante lagen en `var()`-verwijzingen worden opgelost en over de paginabasis gemengd voordat het contrast wordt berekend.

Harde eis (faalt rood): elke tekstdragende combinatie minimaal 4,5:1. Informatief (faalt nooit): de streefwaarde van 7,0 voor grote hoofdwaarden.

Twee aanvullende borgingen:
- `scripts/check-theme-colors.js` (lint, in CI): faalt op ruwe kleuren buiten het tokenblok en de print-CSS. Vangnet tegen terugval.
- `scripts/check-rendered-contrast.js` (optioneel, Playwright, niet in standaard-CI): meet de werkelijk gerenderde CSS via `getComputedStyle`. Bewust optioneel gehouden om de offline, dependency-vrije opzet te bewaren.

Eerlijke beperking: de Node-zelftest gebruikt een nep-DOM en parst tokenwaarden uit de CSS-tekst; hij rekent niet de volledige cascade of pixel-voor-pixel gradients door. In Dag/Buiten zijn tekstdragende vlakken effen, dus daar speelt dit niet. Voor de gradient-gloed in Nacht geldt de worst-case benadering tegen de effen basislaag. Een groene contrast-zelftest betekent daarom "voldoet, of strenger getoetst dan nodig", nooit "lijkt te voldoen maar net niet".

Belangrijk voor onderhoud: wijzig kleuren alleen in het tokenblok. De lint en de zelftest bewaken dat er geen ruwe kleuren in componentregels terugkomen.

## 8. Boot-gate (verificatie bij elke start)

Bij elke start draait `runBootGate()` de volledige zelftestsuite en classificeert de uitkomst met `classifyGate()` (puur, zonder DOM/state). Dit verifieert dat de rekenmotor op dit toestel, in deze browser, nu exact rekent zoals gevalideerd, vóórdat een getal kan worden vertrouwd.

Twee-trapsmodel. Trap 1 (kritiek) blokkeert: een falen kan een verkeerd getal of een gemist veiligheidssignaal opleveren waar een duiker op het moment zelf op leunt. De kritieke categorieën staan in `GATE_CRITICAL_CATEGORIES`: basis, voorbeeld, herhaling, meterregel, grens, buiten bereik, dagdeel, dagtelling controleren, achteraf, registratie, bediening, fasen, lucht, live en verificatie. Lucht en live zijn bewust kritiek: een kapotte luchtaftelling of timer is een levensbedreiging, net zo hard als een foute DCIEM-tabel. Trap 2 (niet-kritiek) geeft amber en blokkeert niet: thema, privacy, export, ui. Deze maken geen duikgetal onjuist.

Toestanden: groen (alles geslaagd), amber (alleen niet-kritieke fouten), rood (één of meer kritieke fouten, of de motor kon niet eens draaien). Rood schermt de berekende uitvoer af op de duik-schermen (`GATE_LOCKED_SCREENS`) met een dangerbox en terugval naar de papieren tabellen; rules, zelftest en instellingen blijven open.

De gate en het SHA-256 controlegetal bewijzen verschillende dingen en zijn niet inwisselbaar. De gate vangt een logicafout of een rare browser op dit toestel nu; de hash vangt een beschadigd of gewijzigd bestand op releaseniveau. De badge toont daarom de live-geverifieerde testverhouding plus versie, geen hashfragment, omdat een niet-nagerekende hash schijnzekerheid zou zijn.

`classifyGate` is zelf gedekt met zelftesten in categorie `verificatie`, die zelf kritiek is: een kapotte gate maakt zichzelf rood.

### Waakhond: motor, bronfingerprint en fixture

In dezelfde kritieke categorie `verificatie` draait een waakhond die de rekenmotor
cel voor cel vergelijkt met de diep bevroren `DCIEM`-bron (zie sectie 4): nultijden,
alle HG-drempels inclusief lege cellen, de bucketgrenzen en HF-matrix van Tabel 4a,
de herhalings-nultijden van Tabel 4b en de meterregel-totaaltijden. Eén afwijking
maakt de gate rood. Daarnaast controleren zelftests dat `DCIEM` diep bevroren is,
dat Tabel 4a in de motor een afgeleide kopie is en geen bronalias, en dat de
bronfingerprint plus Tabel 4a-fixture nog overeenkomen met de gevalideerde release.
Hiermee kan een toekomstige wijziging de motor of de ingebouwde bron niet stilletjes
laten afwijken. Bewezen werking: een opzettelijk verminkte Tabel 4a-broncel maakt
de gate rood via de fingerprint en fixture.

## 9. Schermen en functies

Schermen: Dagregistratie (live), Planning vooraf, Registratie (duiklog +
onderbouwing), Instellingen, plus de niet-tab-schermen Dashboard, Rapport, Regels
en Zelftest.

Belangrijke functies en aandachtspunten:

- **Einddruk-prompt** op de duikerkaart. "Boven / einde" stopt de tijd; mist de
  einddruk, dan toont de kaart een waarschuwingsstatus met een apart invoerveld.
  De duiktijd blijft zuiver; de einddruk is een aparte zichtbare taak
  (`latestDiveAwaitingEndBar`).
- **Plangrens 15 m, feit blijft feit**: plannings- en standaardwaardevelden
  (waaronder de vergrendelde "Diepte voor allen"-knop in Instellingen) houden
  een grens op 15 m. Een werkelijk geregistreerde diepte boven 15 m blijft
  daarentegen als feit bewaard in invoer, opslag, herladen, import en export
  (`cleanActualMddValue`, `cleanActualAirDepthValue`); de invoer waarschuwt en
  de berekening blokkeert buiten de envelop met `RED` en
  `OUTSIDE_DEPTH_ENVELOPE`.
- **Notities**: per duiker via een pen-icoon (`state.divers[].note`) en een
  dagnotitie (`state.project.dayNote`); beide lopen mee in print en export.
- **Seinhouder (SH)** per duiker (`state.divers[].sh`), zichtbaar in de duiklog;
  de DPL staat bij de daggegevens.
- **HG-aanpassing** is informatief (severity 0), niet "controle vereist".
- **Vaste codes D1 t/m D12**; betekenis staat in de vrije aanduiding, niet in de codering. De `active`-vlag bepaalt welke duikers standaard in planning, live bediening en overzichten verschijnen. Bestaande regels met een inactieve duiker blijven zichtbaar.
- **DCIEM-onderbouwing als redeneerregel** (`dciemSummary`): expliciet type
  normale duik, herhalingsduik, gecombineerde duik of meterregelsessie. Bij een
  gecombineerde duik blijven alle feitelijke tijden, MDD's en DT's zichtbaar
  naast de gezamenlijke effectieve duiktijd, tabeldiepte en HG. Afkortingen via
  een info-i.
- **Planningsprofiel** (`renderWerkplan`, `airUsePerMin`): per geplande duik de
  meterregel-totaaltijd en een L/H-luchtindicatie (40/72 l/min × omgevingsdruk),
  nadrukkelijk een planningsindicatie en geen limiet; met werkplan-print.
- **Dynamische drukcheck-kolommen** (`checkHeadersForRecords`): stap 10 onder 9 m
  en 5 vanaf 9 m, lengte tot de laatste werkelijk gelogde meting; geen metingen
  geeft geen kolommen.
- **Drie oefencodes per dagdeel** (`state.project.dayparts[n].codes`).

## 10. OSOD-laag

Sinds v1.2.0 bevat de app een beschrijvende laag voor de Open Standaard Operationele Duikregistratie (OSOD) v0.1. Kern: `osodRecordFromEvent` bouwt per duik-event een OSOD-record op uit het bestaande interne model en de rekeneenheid; `osodCalculationFromUnit` vertaalt ernstniveau en codes van de motor naar het `calculation`-blok (status, resultValid, blockingReasons) en draagt sinds v1.3.0 in `engine.tableFingerprintSha256` de sha256 over de canonieke, sleutel-gesorteerde JSON-weergave van de diep bevroren DCIEM-bron (`osodTableFingerprintSha256`, zichtbaar in het verificatiescherm); `osodValidateRecord` is de ingebouwde doelvalidator, inclusief de niet-leeg-eisen van het schema. Blokkerende meldingen in `calcUnit`, `calcCombinedUnit`, `applyAscentLimits` en `applyOperationalStatus` dragen een machineleesbare code via `addMsg(obj, sev, msg, code)`; codes worden alleen vastgelegd bij ernst 2.

OSOD v0.1 heeft geen betekenisbehoudend model voor meerdere afzonderlijke
duikfeiten met één gezamenlijke gecombineerde rekenuitkomst. Daarom markeert
`osodCalculationFromUnit` zo'n uitkomst als `BLOCKED` met
`UNSUPPORTED_COMBINED_DIVE`, en blokkeert `exportOsodJson` de volledige export
vóór UUID-toekenning, opslag of download. De gewone registratie-JSON/XLSX kan
dit wel dragen via een aparte rekeneenhedenlaag. De DCIEM-tabellen, bronfixture
en rekenbronfingerprint zijn hiervoor niet gewijzigd. Zie `docs/OSOD.md` voor
de overige mapping en beperkingen.
