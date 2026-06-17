# Release notes v1.4.0

Datum: 2026-06-17

v1.4.0 corrigeert het publieke domein naar duikmonitor.nl, voegt op de Instellingen-pagina een knop naar de installatiepagina toe en vervangt de installatiepagina onder /webclip/ door een opgeschoonde versie. Deze ronde raakt de rekenkern, de tabellen, de blokkeerlogica, de statussemantiek en het schema niet.

## Wijzigingen

- Publiek domein gecorrigeerd naar duikmonitor.nl op alle plekken in de app, de documentatie en de issue-sjabloonconfiguratie; het eerdere, onjuiste domein is overal vervangen. duikmonitor.nl is het live domein. De zelftestwaarden voor de publieke website-url en het instellingenlabel schuiven mee, zodat verwacht en werkelijk gelijk blijven.
- Knop "Op je beginscherm zetten" toegevoegd op de Instellingen-pagina. De knop is een interne verwijzing naar de installatiepagina /webclip/ en hergebruikt de bestaande knopstijl; er is geen nieuwe opmaakklasse bijgekomen.
- Installatiepagina /webclip/index.html vervangen door een opgeschoonde pagina met de Safari-route voorop en het configuratieprofiel als fallback. Het ondertekende profiel /webclip/Duikmonitor.signed.mobileconfig en het bestand _headers blijven ongewijzigd.

## Borging

- Alle 361 zelftests groen, gelijk aan de stand voor de bouw. Alleen labels en urls schoven mee; geen rekenregel is gewijzigd. JS-syntaxcontrole groen.
- De versielabel-zelftest, de publieke website-url-zelftest en de instellingenblok-zelftest zijn groen met de nieuwe waarden.
- Het eerdere, onjuiste domein komt na de correctie nergens meer voor in de repository.
- DCIEM-tabelwaarden, meterregels, daglimieten, opstijgingsregels, blokkeerlogica en rekenuitkomsten zijn inhoudelijk niet gewijzigd.

## Status

Klaar voor lokale beheerderscontrole en review. Plaatsing volgt de lokale beheerderroute.
