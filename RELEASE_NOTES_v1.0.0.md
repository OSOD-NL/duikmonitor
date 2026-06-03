# Release notes v1.0.0

Datum: 2026-06-03

v1.0.0 is de eerste publieke release van de Duikmonitor. De app is een offline-first hulpmiddel om duiken te plannen, live te monitoren en te registreren met een gevalideerde DCIEM-rekenmotor, zonder accounts, server of centrale opslag.

## Wat de app doet

- Duiken plannen, live monitoren en registreren met een DCIEM-rekenmotor tot en met 15 meter, binnen de gedocumenteerde no-deco scope.
- Herhalingsduiken met HF, HG-aanpassing en herhalings-NDL.
- Onderscheid tussen tabeldiepte en toegepaste meterregel. Een losse duik tot en met 6, 9 of 12 meter valt in tabeldiepte 6, 9 of 12 m. De 6-, 9- of 12-meterregel wordt alleen als toegepast getoond wanneer meerdere duikmomenten van dezelfde duiker binnen hetzelfde dagdeel worden opgeteld.
- Periodebewaking met opstijg- en rustregels, plus live dagregistratie met luchtmetingen en einddrukcontrole.
- Vaste duikerslots D1 tot en met D12 met actief- en aanduidingskeuze.
- Lokale opslag, print en export naar CSV, XLSX en JSON.

## Privacy

- Alle ingevoerde gegevens blijven lokaal in de browser. Geen accounts, trackers, analytics, externe opslag of synchronisatie.
- Strenge Content Security Policy met `connect-src 'none'`, `form-action 'none'` en `object-src 'none'`.

## Borging van de tabellen

- De DCIEM-bron is diep bevroren met `deepFreeze`, inclusief geneste tabellen en arrays.
- Tabel 4a in de rekenmotor is een afgeleide kopie van de bron, geen directe alias.
- De waakhond-zelftest vergelijkt bij elke start de rekenmotor met de bron, en een vaste bronfingerprint plus Tabel 4a-fixture borgen ook de bronwaarden zelf. Wijzigt iemand een ingebouwde waarde, dan faalt een kritieke zelftest en slaat de boot-gate rood. Bevestigd met een mutatieproef op HF A / OI 0:30-0:59.

## Verificatie

- `index.html` SHA-256: `299cc7fbcd6ab94fc4d75c8c46f1fece4f8fa84491bc56e1290375a6c67ad437`
- Zelftest: `289/289 OK`
- Themakleuren-lint: `OK`
- JavaScript syntaxcheck: `OK`

Controleer bij publicatie het controlegetal in `CHECKSUMS.sha256`.

## Status

De app is een hulpmiddel en vervangt geen formele werkinstructie, duikcomputer, papieren tabel, LMRA of operationele besluitvorming.
