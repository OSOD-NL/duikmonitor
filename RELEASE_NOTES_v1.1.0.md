# Release notes v1.1.0

Datum: 2026-06-07

v1.1.0 rondt de registratie- en instellingenwijziging af als herkenbare release. De zichtbare registratie is rustiger gemaakt, terwijl live seconden en interne tijdvelden behouden blijven.

## Belangrijkste gebruikerswijzigingen

- Registratie- en logweergave toont administratieve kloktijden zonder seconden.
- Live seconden, live timers, opkomstcontrole en drukcheck-aftelling blijven behouden.
- Hoofdduiklog heeft geen aparte kolom Rol meer; rol-informatie blijft waar relevant zichtbaar in Bijzonderheden.
- Duikers blijven herkenbaar als `D1` of `D1 · AANDUIDING`.
- Veldlimieten zijn aangescherpt voor daggegevens, aanduiding, seinhouder, materiaalnummers, drukwaarden en MDD/maxdiepte.
- De kaart “Over deze tool” staat in Instellingen standaard ingeklapt.
- Aanvullende zelftests zijn toegevoegd of aangepast voor de nieuwe grenzen en weergave.

## Borging

DCIEM-tabellen, meterregels, herhalingsduikberekening, boot-gate, CSP en netwerkgedrag zijn inhoudelijk niet gewijzigd.
Live seconden en interne timestamps blijven behouden.

## Verificatie

- Zelftest: 311/311 OK
- Themakleuren-lint: OK
- JavaScript syntaxcheck: OK
- Checksumcontrole: OK
- Browsercontrole: OK

## Controlegetal

- `index.html` SHA-256: `0a39216700c868a375bf16beed6dc4f1c81ee1c3f227e5783aec4de5756f10c2`

Controleer bij publicatie dat dit controlegetal overeenkomt met `CHECKSUMS.sha256`.

## Status

De app is een hulpmiddel voor planning, monitoring en registratie. Ze vervangt geen formele werkinstructie, duikcomputer, papieren tabel, LMRA of operationele besluitvorming.
