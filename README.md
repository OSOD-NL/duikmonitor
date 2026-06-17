# Duikmonitor

Een eenvoudige, **offline-first** webapplicatie om duiken te plannen, live te monitoren en te registreren met een DCIEM-rekenmotor op basis van IWOD §2300. Bedoeld voor duikteams die gegevens lokaal willen bijhouden, uitprinten of naar hun eigen toestel willen exporteren, zonder gegevenskoppelingen, accounts of centrale opslag.

## Privacy in het kort

- Alles wat je invult blijft in je eigen browser (`localStorage`).
- De app verstuurt ingevulde gegevens niet naar een server.
- Er zijn geen accounts, trackers, analytics, externe opslag of synchronisatie.
- De app gebruikt een strenge Content Security Policy: `connect-src 'none'`, `form-action 'none'` en `object-src 'none'`.
- Exporteren of printen is altijd een lokale actie naar je eigen apparaat.
- Als je de app via `duikmonitor.nl` of als lokaal bestand opent, worden alleen de appbestanden geladen. Ingevulde duikgegevens en berekeningen worden niet door de app naar GitHub, de beheerder of een eigen server verzonden. Een publieke website kan wel normale technische requestgegevens verwerken om de pagina te leveren; dat staat los van de lokale appdata.

## Status

Actuele publicatieversie: **v1.3.0**. v1.0.0 was de eerste publieke release.

De app plant, monitort en registreert duiken met een gevalideerde DCIEM-rekenmotor tot en met 15 meter, binnen de gedocumenteerde no-deco scope. Ze maakt expliciet onderscheid tussen een losse duik in tabeldiepte 6, 9 of 12 m en een toegepaste 6-, 9- of 12-meterregel waarbij meerdere duikmomenten van dezelfde duiker worden opgeteld. Het duikerbeheer werkt met vaste slots D1 tot en met D12. Alle DCIEM-tabelwaarden zijn cel voor cel tegen de bron gecontroleerd. Bij elke start bewaakt de ingebouwde zelftest zowel de afgeleide rekenmotor als een vaste bronfingerprint/fixture, zodat ook een onbedoelde wijziging in de ingebouwde bron opvalt.

De app is een hulpmiddel voor planning, monitoring en registratie. De app vervangt geen formele werkinstructie, duikcomputer, papieren tabel, LMRA of operationele besluitvorming.

Het waarom achter de tool en de bewuste afbakening staan in [`VERHAAL.md`](VERHAAL.md).

## Bewuste ontwerpkeuzes

Deze app is bewust lokaal en eenvoudig gehouden. Daarom zijn de volgende onderdelen buiten scope:

- Geen multi-useromgeving.
- Geen rollenmodel of accounts.
- Geen centrale database.
- Geen synchronisatie tussen apparaten.
- Geen audit-log van bewerkingen.
- Geen externe opslag.

Deze grenzen beperken complexiteit en beschermen de privacy-architectuur.

## Gebruiken

Open de publieke app via `https://duikmonitor.nl/` of open `index.html` lokaal in een browser. Er is geen installatie, server of build-stap nodig voor lokaal gebruik.

## Wat de app doet

- Duiken plannen, live monitoren en registreren met een DCIEM-rekenmotor tot en met 15 meter, binnen de gedocumenteerde no-deco scope.
- Herhalingsduiken met HF, HG-aanpassing en herhalings-NDL.
- 6, 9 en 12 meterregels met periodebewaking, waarbij de app onderscheid maakt tussen losse Tabel 1-duiken en echte meterregel-samenvoeging.
- Live dagregistratie met start, opkomst, boven en einde, luchtmetingen en einddrukcontrole.
- Dynamische drukcheck-kolommen.
- DCIEM-onderbouwing als beknopte redeneerregel per duik.
- Planning vooraf met werkplan-overzicht en werkplan-print.
- Vaste duikerslots D1 t/m D12 met actief/inactief-keuze, neutrale aanduiding, materiaalvelden en notities per duiker en per dag.
- Verificatie bij elke start met zelftests en een kritieke boot-gate.
- Lokale opslag, print en export naar CSV, XLSX en JSON.

## Versie en controlegetal

De app toont de releaseversie in de header. Het SHA-256-controlegetal van `index.html` hoort bij de release-notitie of bij een apart controlebestand. Het controlegetal staat niet in `index.html` zelf, omdat het bestand daardoor zijn eigen hash zou veranderen.

## Validatie van tabelwaarden

De DCIEM-tabelwaarden en kernregels zijn cel voor cel gedocumenteerd in `docs/VALIDATIE_TABELLEN.md`. Dat document beschrijft de broncontrole, de diep bevroren `DCIEM`-bron in de code, de bronfingerprint/fixture en de waakhond-zelftest die bij elke start controleert dat de rekenmotor gelijk blijft aan de gevalideerde bron.

## Architectuur

Zie `docs/ARCHITECTUUR.md` voor de opbouw van de app, de safety-kritieke functies, de tabelwaarden, de zelftestdekking en de ontwerpgrenzen.

## OSOD-uitwisseling

Duikmonitor v1.3.0 implementeert OSOD v0.1, niveau S+R, binnen scope: afgeronde operationele ademluchtduiken die door de Duikmonitor-registratielaag volledig en betekenisbehoudend worden gedragen. Buiten de rekenkundige envelop worden feiten geregistreerd en wordt geen geldige rekenuitkomst geleverd; zulke records vallen niet onder een geslaagde Niveau R-berekening.

OSOD-import is beperkt tot records binnen de Duikmonitor-scope. Records buiten scope worden geweigerd en niet herschreven.

Vanaf v1.2.0 legt de app per werkelijke duik een registratierecord vast volgens de Open Standaard Operationele Duikregistratie (OSOD) v0.1. Elke duik krijgt bij het boven komen een blijvend record-ID. Via `Export OSOD` in het registratiescherm exporteer je die records als JSON (één record of een bundel per dag); `Import OSOD` leest OSOD-records binnen de scope van een ander systeem in. Een ingebouwde doelvalidator toetst elk record vóór export aan de schemavereisten en invarianten van de standaard, waaronder de niet-leeg-eisen voor veiligheidsregio, locatie en persoonsnamen, en de zelftestcategorie `osod` draait de elf publieke basistoetsen van de standaard bij elke start mee in de boot-gate. Records met conformiteitsclaim R dragen een sha256-rekenbronfingerprint mee; bron-id en fingerprint zijn zichtbaar in het verificatiescherm. Zie `docs/OSOD.md`; de standaard wordt als eigen OSOD-repository gepubliceerd en die publicatie is aangekondigd.

## Controleren voor een wijziging

Voor ontwikkelwerk kun je lokaal dezelfde basiscontroles draaien als in CI:

```bash
awk 'f{ if($0 ~ /<\/script>/){exit} print } /<script>/{f=1}' index.html > /tmp/app.js
node --check /tmp/app.js
node scripts/run-selftests-node.js
node scripts/check-theme-colors.js
sha256sum -c CHECKSUMS.sha256
```

## Meedenken of iets melden

Gebruik `https://github.com/OSOD-NL/duikmonitor/issues/new/choose` voor reproduceerbare fouten of concrete verbeteringen. Zet geen echte namen, telefoonnummers, e-mailadressen, locaties of operationele persoonsgegevens in issues, voorbeelden of testdata. Zie `CONTRIBUTING.md` en `SECURITY.md`.

## Bestanden

| Bestand | Doel |
|---|---|
| `index.html` | De volledige applicatie. |
| `VERHAAL.md` | Het waarom, en wat de app wel en niet doet. |
| `CHANGELOG.md` | Noemenswaardige wijzigingen per release. |
| `RELEASE_NOTES_v1.3.0.md` | Release-notitie voor v1.3.0. |
| `RELEASE_NOTES_v1.1.0.md` | Release-notitie voor v1.1.0. |
| `RELEASE_NOTES_v1.0.0.md` | Release-notitie voor v1.0.0, de eerste publieke release. |
| `CHECKSUMS.sha256` | Controlegetal van `index.html` voor deze release. |
| `SECURITY.md` | Privacy, gegevensverwerking en beveiligingsmelding. |
| `CONTRIBUTING.md` | Hoe je een melding of wijziging netjes aanlevert. |
| `SUPPORT.md` | Waar hulpvragen en foutmeldingen thuishoren. |
| `AGENTS.md` | Instructies voor code-agents en bijdragers. |
| `docs/WERKWIJZE.md` | Veilige wijzigingsroute via branch, checks en review. |
| `docs/PUBLICATIE.md` | Publieke site, GitHub-route en hostingheaders. |
| `docs/ARCHITECTUUR.md` | Technische overdracht en safety-kritieke delen. |
| `docs/VALIDATIE_TABELLEN.md` | Broncontrole en bewaking van de rekenmotor. |
| `docs/OSOD.md` | OSOD v0.1-conformiteit: recordlaag, codes, export/import en toetsen. |
| `.github/` | Issue-formulieren, PR-template en automatische checks. |
| `_headers` | Optionele hostingheaders voor platformen die dit bestand ondersteunen. |
| `LICENSE` | Licentievoorwaarden. |
