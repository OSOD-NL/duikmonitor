# Validatie tabelwaarden en bewaking rekenmotor

Dit document is het canonieke validatiedocument voor de openbare publicatiebasis van de Duikmonitor. Het legt vast welke bronwaarden zijn gecontroleerd, hoe lege tabelcellen zijn verwerkt en hoe de app bewaakt dat de rekenmotor niet stilletjes van de gevalideerde bron afwijkt.


Dit document legt vast dat de hardgecodeerde tabelwaarden en kernregels in `index.html` op 28 mei 2026 **cel voor cel tegen de fysieke bron** zijn gecontroleerd voor de publicatiebasis. Dit vervangt het eerdere voorbehoud dat de validatie alleen intern consistent was met een door dezelfde maker geschreven notitie. De controle is nu uitgevoerd tegen scans van het officiële logboek zelf.

## Gecontroleerde bron

| | |
|---|---|
| Titel | Brandweer Duiklogboek, Deel 1: Basisinformatie gebruik Duiklogboek |
| Uitgave | Geheel herziene uitgave januari 2019, 5e oplage, kleine aanpassingen maart 2021 |
| Uitgever | Instituut Fysieke Veiligheid (IFV) / Brandweeracademie |
| Onderliggende bron | IWOD, Instructie Werken Onder Druk, 1 april 2019, § 2300 luchttabel 1 |
| Controlemateriaal | Scan van het logboek (28 pagina's), aangeleverd 28 mei 2026 |
| Gecontroleerde logboekpagina's | p. 29 (DCIEM-tabellen), p. 30 (6/9-meterregel), p. 31 (12-meterregel en >12 m-procedure), p. 32 (HG-aanpassing) |

## Resultaat in één zin

Alle gecontroleerde tabelposities en kernregels komen overeen met de bron. Er is **geen enkele afwijking** aangetroffen tussen de code en het logboek.

## 1. Airtabel 1 (logboek p. 29)

Per MDD-rij gecontroleerd tegen `airTable`, inclusief lege broncellen en de `null`-nultijd voor 6 m.

| MDD | Nultijd bron | Gecontroleerde drempels | Resultaat |
|---|---|---|---|
| 6 m | leeg | A30 B60 C90 D120 E150 F180 G240 H300 I360 J420 K480 L600 M720 | gelijk |
| 9 m | 300 | A30 (B leeg) C60 D90 (E leeg) F120 G150 H180 (I leeg) J210 K240 L270 M300 | gelijk |
| 12 m | 150 | A20 B30 (C leeg) D60 (E,F leeg) G90 H120 (I leeg) J150 | gelijk |
| 15 m | 75 | A10 B20 C30 D40 E50 F60 G75 | gelijk |

De code laat de lege broncellen (`B,E,I` bij 9 m; `C,E,F,I` bij 12 m) bewust weg in plaats van ze als 0 op te slaan. Dit komt overeen met de bron en met `getHG`, dat alleen niet-lege drempels gebruikt.

## 2. Tabel 4a (logboek p. 29)

Alle 15 rijen (A t/m O) en 11 OI-kolommen (0:15-0:29 t/m 15:00-18:00) cel voor cel gecontroleerd tegen `table4a` en `table4aCols`. Inclusief de lege cellen linksonder in de tabel.

Aandachtspunten die expliciet zijn nagekeken:
- HG B / OI 2:00-2:59 = 1,2 in de bron. Komt overeen met de code en met de bestaande zelftest.
- HG G / OI 15:00-18:00 = 1,0 in de bron. Komt overeen met de code.
- De lege cellen per rij (G mist kolom 1; H/I missen kolommen 1-2; J/K missen kolommen 1-3; L mist 1-4; M/N/O missen 1-5) komen overeen met de `null`-posities in de code.

Resultaat: 165 cellen gecontroleerd, geen afwijking.

## 3. Tabel 4b (logboek p. 29)

Alle 3 rijen (MDD 9/12/15) en 10 HF-kolommen (1,1 t/m 2,0) gecontroleerd tegen `table4b`.

| MDD | Waarden bron en code |
|---|---|
| 9 | 272 250 230 214 200 187 176 166 157 150 |
| 12 | 136 125 115 107 100 93 88 83 78 75 |
| 15 | 60 55 50 45 41 38 36 34 32 31 |

Resultaat: 30 cellen gecontroleerd, geen afwijking.

## 4. Meterregel-totaallimieten (logboek p. 30 en p. 31)

| Regel | Max totale duiktijd bron | Code (`shallowRules`) | Resultaat |
|---|---|---|---|
| 6-meterregel | 420 minuten | 420 | gelijk |
| 9-meterregel | 210 minuten | 210 | gelijk |
| 12-meterregel | 120 minuten | 120 | gelijk |

De bron bevestigt ook twee regels die de code toepast: de HG wordt voor de meterregel uit airtabel 1 bepaald met de **opgetelde** totale duiktijd, en de regel geldt alleen als bij aanvang van de eerste duik HF 1,0 geldt. De code dekt dit met `getHG(rule.maxDepth, u.dtTotal)` en met een waarschuwing wanneer een eerdere HG nog niet is vervallen.

De opstijgingslimieten per duikperiode en per duikdag (6/4/3 en 12/8/6) staan **niet** op deze logboekpagina's en zijn dus geen IWOD-tabelwaarde. De app labelt deze laag terecht apart als DMC-advies 2013 voor 6/9 m en als conservatieve project-/WOD-borging voor 12/15 m.

## 5. Procedure dieper dan 12 m (logboek p. 31)

Geplande duiken dieper dan 12 m, bron tegen `over12PlannedGuidance`:
- maximaal 3 duiken; gelijk.
- ondiepere duiken afzonderlijk rekenen, niet optellen; gelijk.
- eerste duik HF 1,0; gelijk.
- na de derde duik HI tot HF weer 1,0; gelijk.

Niet-geplande overschrijding, bron tegen `over12UnplannedProcedure`:
- voorwaarde is een duik dieper dan 12 m **én** overschrijding van de limiet van 3 afzonderlijke duiken; gelijk, en in de code ook zo afgedwongen (`deepWindow`/`deepDayEvents` groter dan 3).
- daarna niet verder duiken; gelijk.
- 1 uur observatie door de DPL, reistijd naar compressietank maximaal 2 uur; gelijk.
- HI 18 uur voor opnieuw duiken; gelijk.
- voorval melden aan het hoofd van het Duikmedisch Centrum (HDMC); de codetekst is hierop aangescherpt (zie hieronder).

## 6. HG-aanpassing (logboek p. 32)

Bron tegen het blok `res.hgAdjusted` in `calcUnit`:

| Bronregel | Code | Resultaat |
|---|---|---|
| HI meer dan 6 uur: geen aanpassing | aanpassing alleen bij `oiMin <= 360` | gelijk |
| HI 6 uur of minder en nieuwe HG hoger: geen aanpassing | aanpassing alleen bij `letterIndex(hgRaw) <= letterIndex(prevHG)` | gelijk |
| HI 6 uur of minder en nieuwe HG lager of gelijk: voorafgaande HG + 1 letter | `nextLetter(prevHG)` | gelijk |

Het bronvoorbeeld (voorafgaande duik HG D, HI minder dan 6 uur, uitgevoerde duik HG B, aanpassing naar E) komt exact overeen met de code.

## Aanscherping naar aanleiding van de broncontrole

De tekst van `over12UnplannedProcedure` is woordelijk afgestemd op de bron. De eerdere formulering "melden/voorleggen aan DMC/duikerarts" is vervangen door "het voorval melden aan het hoofd van het Duikmedisch Centrum (HDMC)", conform logboek p. 31. De rekenlogica en de drempelwaarden zijn hierbij niet gewijzigd.

## Aanscherping v1.27.0: ketenwaarde bij OI onder 15 minuten

Bron: IWOD 002 (1 april 2019) par. 2300 en Werkinstructie WOD v2.0 par. 11.5.1: duiken met een oppervlakte-interval korter dan 15 minuten gelden samen als een gecombineerde duik; tabel 4a is op zo'n interval niet van toepassing.

De monitor toonde bij zo'n korte-OI-duik al de juiste waarschuwing en berekende informatief een HG uit alleen de eigen duiktijd van die duik. Die HG onderschat per definitie de restbelasting van de gecombineerde duik. Tot en met v1.26.0 werd die onderschatte HG stilzwijgend als ketenwaarde gebruikt voor een volgende herhalingsduik, waardoor die vervolgduik een te gunstige HF, herhalings-NDL en status kon tonen. Vanaf v1.27.0 markeert de rekenmotor de korte-OI-duik als niet-ketenbetrouwbaar (`chainUnreliable`): de vervolgduik gaat via de bestaande chainBlocker-route op handmatige beoordeling (buitengrens, `INVALID_INPUT`), tot de 18-uursreset. De korte-OI-duik zelf blijft ongewijzigd zichtbaar met dezelfde waarschuwing; er is geen tabelwaarde gewijzigd en de bronfingerprint is ongewijzigd. Zelftests dekken de blokkade, de markering en het herstel na 18 uur.

## Aanscherping v1.27.0: EDT in exacte tienden

Kernregel: EDT = DT x HF, naar boven afgerond. HF heeft in tabel 4a altijd precies een decimaal. De eerdere directe vermenigvuldiging `Math.ceil(dt * hf)` kon bij een geheel product in binaire drijvende komma net boven dat gehele getal uitkomen en dan een minuut te hoog afronden (bijvoorbeeld 90 x 1,1 werd 100 in plaats van 99; dit trad op bij 33 combinaties, alle met HF 1,1). De afwijking was altijd naar boven en sloeg aantoonbaar nooit een HG-drempel of statusgrens om, maar het gerapporteerde EDT in registratie, XLSX en OSOD-uitvoer was in die gevallen feitelijk onjuist. Vanaf v1.27.0 rekent de motor in exacte tienden: `Math.ceil((dt * Math.round(hf * 10)) / 10)`. Gehele producten blijven exact; niet-gehele producten ronden onveranderd naar boven. Een zelftest borgt de exacte waarden en een tegenbewijs-controle laat zien dat de directe vermenigvuldiging op deze gevallen zou afwijken.

## Samenvatting

| Datablok | Gecontroleerde posities | Afwijkingen |
|---|---:|---:|
| Airtabel 1 | 64 celposities | 0 |
| Tabel 4a | 165 cellen | 0 |
| Tabel 4b | 30 cellen | 0 |
| Meterregel-limieten | 3 limieten | 0 |
| HG-aanpassingslogica | 3 condities | 0 |
| >12 m-procedurelaag | 2 procedureblokken | 0 |

**259 tabelcellen, 3 meterregellimieten en 3 HG-condities onafhankelijk tegen de fysieke bron gecontroleerd; geen afwijkingen.**

## Wat hierna nog mensenwerk blijft

- Deze controle borgt dat de software de IWOD en IFV bron correct weergeeft. Of die bron zelf de actueel geldende versie is, blijft een organisatorische verantwoordelijkheid: bij een nieuwe druk of een herziene IWOD moet de controle opnieuw.
- Operationele beslissingen blijven bij de DPL en de duikerarts. De monitor is een hulpmiddel en geen vervanging van werkinstructie, LMRA of medisch oordeel.


---


Dit deel beschrijft hoe de Duikmonitor borgt dat de rekenmotor blijft overeenkomen met de gevalideerde bron. De cel-voor-cel controle van de tabelwaarden tegen de fysieke bron staat hierboven; de tabelwaarden zelf zijn daarna niet inhoudelijk gewijzigd.

## Extra borging bovenop de broncontrole

Eerst is vastgesteld dat de tabelwaarden in de code cel voor cel kloppen met
de bron (IWOD 002, 1 april 2019, § 2300 luchttabel 1, en de meterregels uit de
Werkinstructie WOD brandweer v2.0, bijlage 11.5). Het risico dat daarna overbleef:
de tabellen stonden als losse waarden in de rekenmotor, en een toekomstige
wijziging kon ze ongemerkt laten afwijken van de bron.

Dat risico is afgedekt met twee lagen:

1. Een diep bevroren bron (`DCIEM`) in de code als single source of truth.
2. Een waakhond-zelftest die bij elke start de rekenmotor cel voor cel tegen die
   bron controleert en de boot-gate rood maakt bij elke afwijking.
3. Een vaste bronfingerprint en Tabel 4a-fixture die ook een onbedoelde wijziging
   in de ingebouwde bron zelf laat falen.

## 1. De diep bevroren bron (`DCIEM`)

Bovenin het script staat een met `deepFreeze` bevroren blok `DCIEM`. Dit bevat:

- `airtabel1`: per MDD (6/9/12/15 m) de nultijd en de HG-drempels A t/m O.
  Lege broncellen staan expliciet als `null` en worden nooit als toegestane
  waarde gelezen.
- `tabel4a`: de OI-buckets en de HF-matrix (A t/m O × 11 kolommen), inclusief de
  lege cellen linksonder.
- `tabel4b`: de herhalings-nultijden voor 9/12/15 m.
- `meterregels`: de totale duiktijdlimieten 6/9/12 m (420/210/120 min).

Bronvermelding staat in het blok zelf: IWOD 002 voor de tabellen, Werkinstructie
WOD brandweer v2.0 bijlage 11.5 voor de meterregels. De waarden zijn cel voor cel
overgenomen uit het originele bronbestand en onafhankelijk geverifieerd
(zie de broncontrole hierboven en de kruiscontrole hieronder).

## 2. De waakhond-zelftest

In de zelftestcategorie `verificatie` (kritiek) draait bij elke start een controle
die de rekenmotor (`airTable`, `table4a`, `table4aCols`, `table4b`, `shallowRules`)
cel voor cel vergelijkt met de diep bevroren `DCIEM`-bron. Gecontroleerd worden:

- alle nultijden;
- alle HG-drempels A t/m O voor 6/9/12/15 m, inclusief de overeenkomst van lege
  cellen aan beide kanten;
- alle bucketgrenzen (min/max) van Tabel 4a;
- de volledige HF-matrix van Tabel 4a, inclusief lege cellen;
- alle herhalings-nultijden van Tabel 4b;
- de meterregel-totaaltijden 6/9/12 m.

Eén afwijking is voldoende om de test te laten falen. Omdat `verificatie` een
kritieke categorie is, zet een falen de boot-gate op rood en worden de
duik-schermen afgeschermd (terugval op de papieren tabellen).

### Bewezen werking

Tijdens de bouw is aangetoond dat de waakhond een opzettelijk verminkte motorcel
detecteert: een gewijzigde waarde voor 9 m groep J maakte de gate rood en de
melding benoemde de exacte cel (`A1 9m J`). In v1.0.0 is daarnaast aangetoond dat
een gewijzigde Tabel 4a-broncel de zelftest laat falen via de bronfingerprint en
de Tabel 4a-fixture. Een groene waakhond betekent dus dat de rekenmotor op dit
toestel, in deze browser, nu exact gelijk is aan de bron én dat de ingebouwde bron
niet afwijkt van de gevalideerde releasefixture.

## 3. Onafhankelijke kruiscontrole tegen de IWOD-bron

Naast de waakhond in de app is de rekenmotor bij de bouw ook buiten de app om
cel voor cel tegen de IWOD-bron gelegd (259 celposities: Airtabel 1, Tabel 4a en
Tabel 4b). Resultaat: geen afwijkingen. Dit is dezelfde soort controle als de broncontrole hierboven, herhaald als bevestiging dat motor en bron gelijk staan.

## 3a. Bevestiging tegen het DCIEM-moederdocument (1992)

De Nederlandse IWOD-tabel is een afgeleide van het oorspronkelijke Canadese
DCIEM-handboek. Dat origineel is als extra controle naast de IWOD-bron gelegd:

| | |
|---|---|
| Titel | DCIEM Diving Manual, Air Decompression Procedures and Tables |
| Nummer | DCIEM No. 86-R-35, March 1992 (review GCEC december 2013) |
| Uitgever | Defence and Civil Institute of Environmental Medicine, Canada |
| Gecontroleerd | Tabel 4B (No-Decompression Repetitive Diving), metrische versie, p. 166 |

De herhalings-nultijden (Tabel 4B in meters) uit het Canadese origineel komen tot
op het getal overeen met `table4b` in de app en met de IWOD-bron:

| MDD | Waarden DCIEM 1992 (meters) = code = IWOD |
|---|---|
| 9 m | 272 250 230 214 200 187 176 166 157 150 |
| 12 m | 136 125 115 107 100 93 88 83 78 75 |
| 15 m | 60 55 50 45 41 38 36 34 32 31 |

Hiermee zijn er twee onafhankelijke bronnen die dezelfde herhalings-nultijden
opleveren: de Nederlandse IWOD 002 (2019) en het DCIEM-origineel (1992). Dat bevestigt de IWOD-afgeleide voor dit tabeldeel.

Beperking: de herhalingsfactoren (Tabel 4A) in het origineel staan met
grijs-gearceerde cellen die bij automatische tekstextractie onbetrouwbaar
overkomen; die zijn daarom niet cel-voor-cel uit dit PDF geverifieerd. Voor Tabel
4A blijven de IWOD-bron en de cel-voor-cel controle hierboven leidend. De No-D-tabel (4B) is wel volledig en eenduidig bevestigd.

## 3b. Opstijgingslaag: primaire bron (DMC-advies 2013)

De opstijgingslimieten per duikperiode en per duikdag staan niet in de IWOD-luchttabel,
maar komen uit een apart advies van het Duikmedisch Centrum. Dat advies is nu als
primaire bron beschikbaar en naast de app gelegd:

| | |
|---|---|
| Titel | Advies aantal opstijgingen in bepaald tijdsbestek (jojo-duiken) |
| Datum | 10 december 2013 |
| Opsteller | Hoofd Duikmedisch Centrum (DMC) |
| Referentie | U.152/DMC.DJM/13, Koninklijke Marine / Ministerie van Defensie |

De vier adviespunten en hoe de app ze toepast:

| Adviespunt | Bron (brief) | App | Resultaat |
|---|---|---|---|
| Max. opstijgingen per 4 uur, MDD 6 m | 6 | 6 | gelijk |
| Max. opstijgingen per 4 uur, MDD 9 m | 4 | 4 | gelijk |
| Min. oppervlakte-interval tussen opstijgingen | 15 min | 15 min (melding < 15 min) | gelijk |
| Rust na duikperiode van 4 uur | min. 1 uur | bewaakt, nieuwe periode na rust | gelijk |
| Max. opstijgingen per dag, MDD 9 m | 8 | 8 | gelijk |
| Max. opstijgingen per dag, MDD 6 m | 12 | 12 | gelijk |

Belangrijke bronnuance, nu bevestigd door de brief zelf: het DMC-advies noemt
**alleen 6 m en 9 m** expliciet. De app labelt dat ook zo. De categorieën
> 9 t/m 12 m en > 12 t/m 15 m staan in de app als conservatieve projectregel
respectievelijk WOD-regime/projectmatige borging, niet als DMC-advies. Deze
laag is dus eerlijk gescheiden naar bronhardheid en blaast het DMC-advies niet op
tot dieptes die het advies niet dekt.

De brief bevat ook niet-kwantificeerbare adviezen (zwaardere oefeningen eerst,
zelfredzaamheidsoefeningen in geconditioneerd water, voldoende drinken). Die zijn
operationeel van aard en geen rekenregel; ze horen bij de werkwijze van de DPL,
niet bij de motor.

## 3c. Bevestiging tegen de Landelijke Werkinstructie WOD brandweer v2.0 (2024)

De huidige landelijke werkinstructie is naast de app gelegd:

| | |
|---|---|
| Titel | Landelijke werkinstructie Werken onder overdruk brandweer, versie 2.0 (definitief) |
| Datum | 3 december 2024 |
| Uitgever | Brandweer Nederland |
| Gecontroleerd | Bijlage 11.5: Airtabel 1, Tabel 4a, Tabel 4b, meterregels, HG-aanpassing, >12 m-procedure |

Wat overeenkomt met de app:

- De meterregel-structuur (optellen tot één duik, maxima 420/210/120 min, alleen
  geldig bij start HF 1,0) staat woordelijk in 11.5 en komt overeen.
- De >12 m-procedure (max 3 duiken, afzonderlijk rekenen, HF 1,0 eerste duik,
  HI tot HF 1,0, en bij overschrijding observatie/HI 18 uur/melding DMC) komt
  overeen.
- De HG-aanpassingsregel (a/b/c: geen aanpassing bij HI > 6 uur of hogere HG,
  anders voorgaande HG + 1 letter) komt overeen, inclusief het voorbeeld
  (voorafgaand D, HI < 6 uur, uitgevoerd B, aanpassing naar E).
- Airtabel 1 en Tabel 4b komen cel voor cel overeen met de app.

### Twee bevindingen in de WOD zelf

**1. Ontbrekende tabel met aantallen opstijgingen.** Bijlage 11.5 bevat het kopje
"Maximale aantal afdalingen en opstijgingen per dagdeel (tabel 6-9-12 meter)," maar
de aangekondigde tabel met die aantallen staat er niet onder; er volgt direct ander
tekstmateriaal. De WOD noemt dus wel de meterregel-duiktijden, maar niet de
aantallen opstijgingen per periode/dag. Die aantallen (6/4 per 4 uur, 12/8 per dag
voor 6/9 m) komen uit het onderliggende DMC-advies van 10 december 2013 (zie 3b).
De app vult dit gat dus met de juiste primaire bron en verzint de aantallen niet.

**2. Bronconflict op één cel in Tabel 4a.** In de WOD-versie van Tabel 4a staat voor
herhalingsgroep **B** bij oppervlakte-interval **2:00-2:59** een HF van **1,1**.
De app houdt daar **1,2** aan, de waarde van de primaire DCIEM/IWOD-bron. Dit is
een gedocumenteerd bronconflict, onderbouwd door drie waarnemingen:

- Drie onafhankelijke bronnen geven 1,2: de IWOD 002 (2019), het DCIEM-origineel
  (1992) en de cel-voor-cel controle hierboven. De WOD 2024 geeft op deze ene cel 1,1.
- Het tabelpatroon ondersteunt 1,2: in de kolom 2:00-2:59 loopt de reeks per groep
  monotoon op (A 1,1 / B 1,2 / C 1,2 / D 1,3). Een waarde 1,1 voor B zou die reeks
  onderbreken.
- De WOD verwijst zelf naar de DCIEM-tabellen als bron.

Conclusie: de app volgt de primaire DCIEM/IWOD-waarde (1,2); de WOD-waarde 1,1 wordt
neutraal als gedocumenteerd bronconflict vastgelegd. Dit illustreert de waarde van
toetsen tegen meerdere bronnen in plaats van één afgeleid document.

## 4. Verhouding tot de boot-gate en het controlegetal

Drie mechanismen die verschillende dingen bewijzen en elkaar niet vervangen:

- De waakhond bewijst dat de motor gelijk is aan de diep bevroren bron
  (interne consistentie tussen afgeleide motor en bron in hetzelfde bestand).
- De bronfingerprint en Tabel 4a-fixture bewijzen dat de ingebouwde bron zelf nog
  overeenkomt met de gevalideerde releasefixture.
- De boot-gate bewijst dat de hele zelftestsuite op dit toestel nu slaagt
  voordat een getal vertrouwd wordt.
- Het SHA-256 controlegetal bewijst op releaseniveau dat het bestand niet is
  gewijzigd sinds de release.

## 5. Borging in deze release

De rekenmotor leidt zijn tabellen rechtstreeks af uit de diep bevroren
`DCIEM`-bron (manier B). Daarmee staan de tabelgetallen nog maar op één plek in
het bestand; de motor bevat afgeleide kopieën en geen directe aliases van de
bronmatrix. De waakhond (categorie `verificatie`) blijft de afgeleide motor cel
voor cel met de bron vergelijken en zou elke afleidingsfout meteen rood maken.
De extra bronfingerprint en Tabel 4a-fixture dichten de resterende borgingsgap:
een onbedoelde wijziging van de bronwaarden zelf wordt niet meer stilzwijgend
als nieuwe waarheid geaccepteerd. De afleiding is bovendien byte-voor-byte gelijk
bevonden aan de eerdere hardgecodeerde tabellen, dus de validaties in dit document
blijven onverkort gelden.

De meterregel-limieten (`shallowRules`) bevatten naast de tabelbron ook de
opstijgings- en dagtellingen uit het DMC-advies 2013, en zijn daarom bewust niet
uit de DCIEM-tabelbron afgeleid maar apart gehouden.

## Wat mensenwerk blijft

- Deze controle borgt dat de software de bron correct weergeeft en blijft
  weergeven. Of die bron de actueel geldende versie is, blijft een
  organisatorische verantwoordelijkheid: bij een nieuwe IWOD-druk of een herziene
  werkinstructie moet de bron in de code worden bijgewerkt en opnieuw
  gecontroleerd.
- Operationele beslissingen blijven bij de DPL en de duikerarts. De monitor is
  een hulpmiddel, geen vervanging van werkinstructie, LMRA of medisch oordeel.
