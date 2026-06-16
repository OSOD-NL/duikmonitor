# OSOD v0.1-conformiteit

Dit document beschrijft hoe de Duikmonitor de Open Standaard Operationele Duikregistratie (OSOD) v0.1 implementeert. De standaard wordt als eigen OSOD-repository gepubliceerd; die publicatie is aangekondigd. Normatief in de OSOD v0.1-referentieset zijn `STANDAARD.md`, `schema/osod-logbook-record.schema.json` en `rekencontract/README.md`.

## 1. Conformiteitsclaim

Duikmonitor v1.3.0 implementeert OSOD v0.1, niveau S+R, binnen scope: afgeronde operationele ademluchtduiken die door de Duikmonitor-registratielaag volledig en betekenisbehoudend worden gedragen. Buiten de rekenkundige envelop worden feiten geregistreerd en wordt geen geldige rekenuitkomst geleverd; zulke records vallen niet onder een geslaagde Niveau R-berekening.

OSOD-import is beperkt tot records binnen de Duikmonitor-scope. Records buiten scope worden geweigerd en niet herschreven.

De app claimt per record `["S","R"]`:

- **S (registratie):** het record bevat het volledige registratiegegevensmodel.
- **R (rekenend):** het record bevat een `calculation`-blok dat de uitkomst van de ingebouwde DCIEM-rekenmotor machineleesbaar beschrijft, inclusief blokkeringen.

De OSOD-laag verandert geen rekenuitkomsten. Zij beschrijft de uitkomsten die de bestaande, gevalideerde motor produceert.

## 2. Levenscyclus van een record

1. Bij het boven komen (knop Boven) krijgt de duik een blijvend `recordId` (UUID) en `createdAt`. Voor duiken die nooit live boven zijn gezet (achteraf ingevoerd of geïmporteerd) gebeurt dit uiterlijk bij de eerste recordopbouw.
2. Het record is daarna op elk moment opnieuw op te bouwen uit de registratie; `updatedAt` en `sourceSystem.exportedAt` weerspiegelen het exportmoment.
3. `Export OSOD` valideert elk record met de ingebouwde doelvalidator en exporteert één JSON-bestand: één record als object, meerdere als array. Bestandsnaam: `duikmonitor-osod-<datum>.json`. De export blokkeert op elk validatorprobleem, waaronder lege waarden in `context.veiligheidsregio`, `context.locatie.omschrijving` en `displayName` van elke persoonsreferentie.
4. `Import OSOD` accepteert een object of array en hanteert een harde scope-beperking: alleen afgeronde ademluchtrecords die de registratielaag volledig en betekenisbehoudend kan dragen worden opgenomen. Elk kandidaat-record wordt na opname opnieuw opgebouwd via de eigen registratielaag en moet dan betekenisgelijk zijn aan het importrecord; anders wordt het geweigerd en weer verwijderd. Records buiten scope worden geweigerd met een duidelijke melding, in plaats van herschreven. De import herschrijft geen ander ademgas naar ademlucht, hoogt een S-claim niet op naar S+R, vervangt context, rollen, diepte of een `calculation`-blok niet stilzwijgend en behoudt geen `recordId` bij een inhoudelijk herschreven record. Eén uitzondering is uitsluitend conservatief: Duikmonitor voert boven OSOD extra niet-blokkerende controles uit (opkomstregistratie, luchtbewaking) op gegevens die een OSOD v0.1-record niet meedraagt; een geïmporteerd `GREEN` kan daardoor `AMBER` worden, terwijl `resultValid`, `blockingReasons` en rekenuitkomsten gelijk moeten blijven. De omgekeerde richting wordt geweigerd.

## 3. Veldmapping

| OSOD-veld | Bron in de app |
|---|---|
| `recordId`, `createdAt` | blijvend per duik vastgelegd op het event |
| `context.veiligheidsregio` | daggegevensveld Veiligheidsregio |
| `context.duikteam` | daggegevensveld Post/Ploeg |
| `context.locatie.omschrijving` | daggegevensveld Locatie |
| `context.activiteitType` | daggegevensveld Activiteittype |
| `context.oefencode` | dagdeelcodes van het dagdeel van de duik, samengevoegd met komma's; `null` als leeg |
| `context.omschrijving` | dagnotitie, indien ingevuld |
| `roles.duikploegleider` | daggegevensveld DPL (+ scope indien ingevuld) |
| `roles.duikers[0]` | duiker van het event (aanduiding als `displayName`, code als `localPersonId`) |
| `dive.datum`, `tijdIn`, `tijdUit` | start- en boventijd van het event (lokale kloktijd) |
| `dive.duiktijdMin`, `totaleTijdOnderDrukMin` | DT van het event, afgerond op hele minuten |
| `dive.maximaleDiepteWerkelijkM` | MDD inclusief diepten bij drukmetingen; de werkelijke waarde blijft als feit bewaard, ook boven 15 m |
| `dive.tabelDiepteM` | tabeldiepte van de rekeneenheid (6/9/12/15); `null` buiten de envelop of zonder berekening |
| `dive.gevolgdSchema` | `METERREGEL` bij een toegepaste meterregel, `DCIEM_AIR_TABLE` bij een normale tabelberekening, anders `NIET_BEREKEND` |
| `dive.decompressieverloop` | `NO_DECO` bij een geldige berekening, anders `ONBEKEND` |
| `dive.ademgas` | vast `ademlucht` (ontwerpgrens van de app) |
| `dive.duiksysteem` | daggegevensveld Duiksysteem |
| `dive.aardDuikarbeid` | gelijk aan `context.activiteitType` |
| `dive.aantalDuikers` | aantal verschillende duikers met een duik op dezelfde dag |
| `dive.bijzondereSessies` | registratietype indien afwijkend (gecombineerde duik, rolwisseling) |
| `signoff` | altijd `concept`, beide handtekeningvelden `false` (zie beperkingen) |
| `calculation` | zie hoofdstuk 4 |
| `extensions.duikmonitor` | `eventId` en `daypart` voor de rondtrip |

## 4. Calculation-mapping en codes

Elk `calculation`-blok draagt een `engine`-blok met `name`, `version`, `tableSourceId` en `tableFingerprintSha256`. De fingerprint is de sha256 over de canonieke representatie van de ingebouwde, diep bevroren rekenbron: de deterministische, sleutel-gesorteerde JSON-weergave (UTF-8) van de `DCIEM`-bron in de code. De waarde is stabiel over runs en wijzigt mee zodra de ingebouwde bron wijzigt. Bron-id en fingerprint zijn zichtbaar in het verificatiescherm (Zelftest) van de app; de interne fnv1a32-bronbewaking van de boot-gate blijft daarnaast bestaan, maar vervangt deze sha256 niet.

De motor kent ernstniveaus 0 (binnen tabelgrens), 1 (controle vereist) en 2 (buitengrens, blokkerend). De vertaling:

| Ernst | `status` | `resultValid` | `blockingReasons` |
|---|---|---|---|
| 0 | `GREEN` | `true` | leeg |
| 1 | `AMBER` | `true` | leeg |
| 2 | `RED` of `BLOCKED` | `false` | de verzamelde codes |

Bij ernst 2 wordt `RED` gebruikt zodra minstens één code een regel- of tabeloverschrijding aanduidt, en `BLOCKED` wanneer alleen invoer- of tabelcelproblemen spelen. Ademgas anders dan ademlucht levert altijd `BLOCKED` met `UNSUPPORTED_BREATHING_GAS`; dat pad is in de app niet bereikbaar via invoer en bestaat als contractbescherming.

Gebruikte codes uit de normatieve catalogus van het rekencontract:

- `OUTSIDE_DEPTH_ENVELOPE`: MDD buiten het toepassingsbereik van de tabel.
- `BOTTOM_TIME_EXCEEDS_TABLE`: DT boven de hoogste toepasbare tabelwaarde, boven de no-deco-limiet, of HG niet bepaalbaar uit de tabel.
- `BOTTOM_TIME_EXCEEDS_METER_RULE`: opgetelde duiktijd boven het meterregelmaximum (420/210/120 min), ook bij de dagdeeloverstijgende periodetelling.
- `EMPTY_TABLE_CELL`: lege cel in tabel 4a of geen volgende HG beschikbaar.
- `UNSUPPORTED_BREATHING_GAS`: ademgas is niet ademlucht.
- `INVALID_INPUT`: ontbrekende of onmogelijke invoer (MDD/DT ontbreekt, tijdvolgorde onmogelijk, fasen incompleet, regelkeuze past niet bij de invoer).

Aanvullende implementatiecodes, vooruitlopend op de catalogusuitbreiding die de standaard als open punt voert (rekencontract, openstaand punt 4):

- `ASCENT_LIMIT_EXCEEDED`: opstijgings- of daglimiet overschreden (4-uursvenster, daglimiet, maximaal 3 duiken dieper dan 12 m).
- `SURFACE_INTERVAL_TOO_SHORT`: oppervlakte-interval tussen opstijgingen korter dan 15 minuten.
- `REST_PERIOD_EXCEEDED`: duikperiode langer dan 4 uur zonder rustpauze van minimaal 1 uur.
- `ASCENT_CHECK_REQUIRED`: opkomstcontrole staat op blokkerend.
- `AIR_MONITORING_ATTENTION`: blokkerende ademluchtmelding in de live registratie.
- `OPERATIONAL_BLOCKED`: vangnet wanneer een blokkerende melding geen specifiekere code draagt.

Deze aanvullende codes staan alleen in `blockingReasons` naast de bijbehorende leesbare melding in `messages` en wijzigen niets aan de normatieve betekenis van de cataloguscodes.

## 5. Beperkingen

- **Aftekening:** de app kent geen handtekeningenflow; `signoff` is altijd `status: "concept"` met beide handtekeningvelden `false`. Vaststelling gebeurt buiten de app.
- **Diepte:** een werkelijke diepte boven 15 m blijft als feit bewaard in invoer, opslag, herladen, import en export; de app vlakt de waarde niet af, maakt haar niet leeg en zet haar niet terug naar 15 m. De invoer waarschuwt wel. Voor zo'n duik is `tabelDiepteM` `null`, blokkeert de DCIEM-berekening met `RED` en `OUTSIDE_DEPTH_ENVELOPE`, is `resultValid` `false` en wordt geen geldige rekenuitkomst gepresenteerd; registratie en export blijven mogelijk. Dit is het geïntegreerde gedrag van basistoets R-BASIS-004. De plannings- en standaardwaardevelden houden een grens op 15 m; die plangrens overschrijft nooit een geregistreerd feit.
- **Oefencode:** de standaard kent één `oefencode` per record; de app voert tot drie codes per dagdeel en voegt die samen met komma's.
- **Dagniveau:** veiligheidsregio, activiteittype, duiksysteem en DPL gelden per dag, niet per duik.
- **Lege velden:** het schema eist een niet-lege string voor `context.veiligheidsregio`, `context.locatie.omschrijving` en `displayName` van elke persoonsreferentie. De doelvalidator dwingt dit af en de export blokkeert op lege waarden in die velden, met een melding welke daggegevens nog ontbreken.
- **Ademgas:** vast `ademlucht`; andere gassen vallen buiten het ontwerp van de app.

## 6. Conformiteitsverklaring

```text
Applicatie: Duikmonitor
Applicatieversie: v1.3.0
OSOD-versie: 0.1
Schema: schema/osod-logbook-record.schema.json
Conformiteitsniveaus: OSOD-S en OSOD-R
Datum toetsing: 12-06-2026
Bronfingerprint rekenreferentie (sha256): 13fab318d6aec26aa6d07294a3b0c16acbdaa595d674b249acf54b9180f3b5b9
Afwijkingen: zie hoofdstuk 5 (Beperkingen); samengevat: aftekening blijft concept zonder
handtekeningen; veiligheidsregio, activiteittype, duiksysteem en DPL gelden per dag; één
duiker per record en geen aparte duikmedisch begeleider; tot drie oefencodes per dagdeel
samengevoegd in één oefencodeveld; import beperkt tot de Duikmonitor-scope, waarbij een
geïmporteerd GREEN door extra eigen niet-blokkerende controles AMBER kan worden.
```

De scope van deze verklaring is de claimformule uit hoofdstuk 1. De fingerprintwaarde hierboven hoort bij de in v1.3.0 ingebouwde rekenbron en is in de app live te controleren in het verificatiescherm.

## 7. Toetsing en borging

- Zelftestcategorie `osod` (boot-gate-kritiek) draait bij elke start: de elf publieke basistoetsen R-BASIS-001 t/m R-BASIS-011 tegen de echte motor, doelvalidatortoetsen per veldsoort (waaronder de niet-leeg-eisen), de sha256-fingerprinttoetsen, de diepte-als-feit-keten rond 16,4 m, de importweigeringen en een export/import-rondtrip door de echte pijplijn.
- De doelvalidator dekt alle verplichte velden, typen, enumeraties, patronen en de drie calculation-invarianten van het schema, plus de verplichting van `calculation` bij claim R. Hij is bewust geen volledige JSON-Schema-engine; valideer voor formele toetsing extern tegen `schema/osod-logbook-record.schema.json` uit de OSOD v0.1-referentieset, bijvoorbeeld met python-jsonschema (draft 2020-12).
- Bij de release zijn gegenereerde records (GREEN en RED) extern tegen dat schema gevalideerd en is de doelvalidator getoetst tegen de zeven voorbeeldrecords van de standaard.
