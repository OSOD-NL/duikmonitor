# AGENTS.md

Instructies voor code-agents en bijdragers die aan deze repository werken.

## Doel

Deze repository bevat de Duikmonitor: een offline webapplicatie voor duikplanning, live monitoring en registratie. De app is een hulpmiddel en vervangt geen formele werkinstructie, duikcomputer, papieren tabel, LMRA of operationele besluitvorming.

## Harde grenzen

- Voeg geen externe server, tracking, analytics, CDN of synchronisatie toe.
- Houd ingevulde gegevens lokaal in de browser.
- Verzwak de Content Security Policy niet zonder expliciete review.
- Wijzig DCIEM-tabelwaarden, meterregels of veiligheidslogica alleen met bronverwijzing en aangepaste validatie.
- Voeg geen echte namen, e-mailadressen, telefoonnummers of operationele persoonsgegevens toe aan code, docs of tests.
- Houd de app zonder build-stap bruikbaar als één `index.html`.

## Sporen en publicatie

- Laat in publieke bestanden geen verwijzingen achter naar gebruikte hulpmiddelen, AI-assistenten, externe diensten of dev- en preview-omgevingen. Schrijf neutraal en gereedschap-onafhankelijk.
- Zet geen auteurschap-trailers of taak-links in commits of pull requests.
- Verwijs naar buiten alleen naar het eigen domein van het project, nooit naar een tijdelijke preview-URL.
- De automatische sporencheck in de CI is hierop de harde grens: een commit met zo'n spoor mag niet groen worden.

## Altijd controleren

Draai vóór afronding:

```bash
awk 'f{ if($0 ~ /<\/script>/){exit} print } /<script>/{f=1}' index.html > /tmp/app.js
node --check /tmp/app.js
node scripts/run-selftests-node.js
node scripts/check-theme-colors.js
```

Controleer daarna of `README.md`, `CHANGELOG.md`, `SECURITY.md`, `docs/ARCHITECTUUR.md`, `docs/WERKWIJZE.md` en `docs/VALIDATIE_TABELLEN.md` nog kloppen bij de wijziging.

## Pull request

Beschrijf altijd:

1. wat is gewijzigd;
2. waarom dit nodig is;
3. of privacy, opslag, export, tabelwaarden of veiligheidslogica geraakt worden;
4. welke checks zijn gedraaid;
5. of documentatie of changelog is aangepast;
6. dat commit en omschrijving neutraal zijn, zonder auteurschap-trailers, taak-links of dev-URL's.
