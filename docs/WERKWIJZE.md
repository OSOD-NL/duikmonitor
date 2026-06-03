# Werkwijze

Deze werkwijze voorkomt dat een losse wijziging ongemerkt de betrouwbaarheid, privacy of validatie van de app aantast.

## Pad van elke wijziging

De beheerder werkt lokaal in de projectmap, beperkt elke wijziging tot één duidelijk onderwerp en test de uitkomst in de browser. Daarna:

1. Controleer of de wijziging privacy, opslag, export, tabelwaarden, bronfixture, veiligheidslogica, CSP/headers of netwerkgedrag raakt.
2. Laat de automatische checks draaien en zorg dat ze groen zijn.
3. Pas documentatie, changelog, release notes en checksum aan wanneer de wijziging voor gebruikers of beheerders relevant is.
4. Kies de route:
   - alleen tekstuele documentatiecorrectie zonder app-impact: commit op `main` mag na lokale controle;
   - code, tabellen, rekenregels, opslag, export/import, privacy, securityheaders, boot-gate of publicatiegedrag: werk via branch en pull request, met groene checks vóór merge naar `main`.

Bijdragen van iemand anders lopen nooit rechtstreeks naar `main`, maar via een branch en een pull request. Die wordt pas samengevoegd nadat de beheerder hem heeft nagekeken en de automatische checks groen zijn. Wie bouwt, voegt niet gedachteloos zijn eigen ongeteste wijziging samen.

## Automatische checks

De standaardchecks controleren:

- geheimen en mogelijke persoonsgegevens;
- JavaScript-syntax;
- de ingebouwde zelftests;
- themakleuren buiten het tokenblok.

## Publicatie

Een release bestaat minimaal uit:

- een tag, bijvoorbeeld `v1.0.0`;
- release notes;
- een actueel `CHANGELOG.md`;
- een SHA-256-controlegetal van `index.html` in `CHECKSUMS.sha256`.

Het controlegetal staat niet in `index.html` zelf, omdat het bestand daardoor zijn eigen hash zou veranderen.

## Bron- of tabelwijziging

Wijzigingen aan DCIEM-tabellen, meterregels, veiligheidslogica of waarschuwingslogica zijn geen cosmetische wijzigingen. Daarvoor geldt:

- bron expliciet noemen;
- `docs/VALIDATIE_TABELLEN.md` bijwerken;
- bronfingerprint/fixture bewust bijwerken of bewust ongewijzigd laten;
- zelftests bijwerken of uitbreiden;
- risico benoemen in de pull request;
- release notes expliciet maken.
