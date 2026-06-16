# Release notes v1.2.0

Datum: 2026-06-11

v1.2.0 maakt de Duikmonitor de referentie-implementatie van de Open Standaard Operationele Duikregistratie (OSOD) v0.1. De registratie die de app al bijhield, is nu ook als gestandaardiseerd, machineleesbaar en uitwisselbaar record beschikbaar. Er is geen rekenuitkomst gewijzigd.

## Belangrijkste gebruikerswijzigingen

- Elke werkelijke duik krijgt bij het boven komen een blijvend record-ID en is exporteerbaar als OSOD-record (JSON).
- Nieuwe knoppen `Export OSOD` en `Import OSOD` in Beheer en export; import accepteert geldige OSOD-records uit andere systemen.
- Nieuwe daggegevensvelden: Veiligheidsregio, Activiteittype en Duiksysteem.
- Een ingebouwde doelvalidator toetst elk record vóór export aan het OSOD-schema en de invarianten van de standaard.
- De zelftest bevat een nieuwe, boot-gate-kritieke categorie `osod` met de elf publieke basistoetsen van de standaard plus validator- en rondtriptests.

## Borging

- Alle 326 zelftests groen, inclusief R-BASIS-001 t/m R-BASIS-011 tegen de echte rekenmotor.
- Gegenereerde records zijn extern gevalideerd tegen `schema/osod-logbook-record.schema.json` uit de OSOD-repository (JSON Schema draft 2020-12), zowel voor een geldige berekening (GREEN) als voor een geblokkeerde (BLOCKED).
- De ingebouwde doelvalidator is getoetst tegen de zeven voorbeeldrecords van de standaard: drie geldige geaccepteerd, vier ongeldige afgewezen op de juiste invariant.
- De HG-aanpassing bij herhalingsduiken is verplaatst naar een zuivere helper met identiek gedrag; bestaande zelftests bleven ongewijzigd groen.
- DCIEM-tabelwaarden, meterregels, daglimieten en opstijgingsregels zijn niet aangeraakt.

Zie `docs/OSOD.md` voor de conformiteitsverklaring, de veldmapping en de beperkingen, en `CHANGELOG.md` voor het volledige overzicht.
