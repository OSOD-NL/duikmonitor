# Changelog

Alle noemenswaardige wijzigingen aan de Duikmonitor worden hier bijgehouden.

## [1.0.0] - 2026-06-03

Eerste publieke release.

### Functioneel

- Offline-first webapplicatie voor duikplanning, live monitoring en registratie, zonder server, build-stap of installatie voor lokaal gebruik.
- DCIEM-rekenmotor tot en met 15 meter binnen de gedocumenteerde no-deco scope, op basis van IWOD 002 (1 april 2019) luchttabel 1.
- Herhalingsduiken met HF, HG-aanpassing en herhalings-NDL.
- Expliciet onderscheid tussen tabeldiepte en toegepaste meterregel: een losse duik tot en met 6, 9 of 12 meter wordt getoond als tabeldiepte 6, 9 of 12 m, terwijl de 6-, 9- of 12-meterregel alleen als toegepast wordt gelabeld wanneer meerdere duikmomenten van dezelfde duiker binnen hetzelfde dagdeel worden opgeteld.
- Duiken van verschillende duikers worden nooit samengevoegd, ook niet wanneer ze kort na elkaar plaatsvinden.
- Periodebewaking met opstijg- en rustregels per duiker.
- Live dagregistratie met start, opkomst, boven en einde, luchtmetingen, dynamische drukcheck-kolommen en einddrukcontrole.
- Werkplan-overzicht en werkplan-print voor planning vooraf.
- Vaste duikerslots D1 tot en met D12 met actief- en aanduidingskeuze, materiaalvelden en notities per duiker en per dag.
- DCIEM-onderbouwing als beknopte redeneerregel per duik.
- Lokale opslag, print en export naar CSV, XLSX en JSON.

### Privacy en beveiliging

- Alle ingevoerde gegevens blijven lokaal in de browser. Geen accounts, trackers, analytics, externe opslag of synchronisatie.
- Strenge Content Security Policy met `connect-src 'none'`, `form-action 'none'` en `object-src 'none'`.
- Projectvelden voor locatie, post/ploeg en DPL begrensd en bij import en opslag genormaliseerd.
- Geharde import met opschoning van luchtmetingen, inclusief legacy-opschoning.
- Hostingheaders met HSTS, COOP en CORP.

### Verificatie

- Zelftests bij elke start, inclusief een kritieke boot-gate.
- Waakhond-zelftest die de rekenmotor bij elke start vergelijkt met de diep bevroren, gevalideerde DCIEM-bron.
- `DCIEM` wordt diep bevroren met `deepFreeze`, inclusief geneste tabellen en arrays.
- Tabel 4a in de rekenmotor is een afgeleide kopie van de bronmatrix, geen directe bronalias.
- Vaste bronfingerprint en Tabel 4a-fixture, zodat een onbedoelde wijziging van de ingebouwde bron zelf de kritieke zelftest laat falen. Mutatieproef bevestigd op HF A / OI 0:30-0:59.
- Themakleuren-lint die ruwe kleuren buiten de themetokens tegenhoudt.
- 289 zelftests, alle slagend in deze build.

### Werkwijze en publicatie

- Lokale pre-commitchecks met JavaScript-syntax, zelftests, themakleuren-lint en checksumcontrole.
- CI met controle van `CHECKSUMS.sha256`.
- Alleen tekstuele documentatie mag direct naar `main`. Code, tabellen, rekenregels, privacy, opslag, export/import, securityheaders, boot-gate en publicatiegedrag lopen via branch en pull request met groene checks.

### Status

De app is een hulpmiddel voor planning, monitoring en registratie. Ze vervangt geen formele werkinstructie, duikcomputer, papieren tabel, LMRA of operationele besluitvorming.
