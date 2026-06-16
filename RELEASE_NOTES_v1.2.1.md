# Release notes v1.2.1

Datum: 2026-06-11

v1.2.1 scherpt de borging aan zonder enige functionele wijziging.

## Wijzigingen

- Nieuwe boot-gate-kritieke zelftestcategorie `invariant` met zeven eigenschapstests. Waar de bestaande tests vaste waarden en vectoren toetsen, bewaken deze tests structurele eigenschappen die voor elke invoer moeten gelden: monotonie van Airtabel 1, tabel 4a en tabel 4b, EDT nooit kleiner dan DT, monotone blokkering bij tabelgrens en meterregel, determinisme van de motor en de eigenschappen van de HG-aanpassing over alle 225 lettercombinaties.
- CI-workflow draait met minimale tokenrechten (`permissions: contents: read`).
- CI gebruikt een vastgezette Node-versie (22).

## Borging

- Alle 333 zelftests groen; JS-syntaxcontrole en themakleurenlint groen.
- Geen wijziging aan tabellen, regels, rekenuitkomsten, opslag, export of CSP.
