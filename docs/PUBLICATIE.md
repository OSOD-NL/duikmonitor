# Publicatie

## Publieke app

De publieke ingang is:

```text
https://duikmonitor.app/
```

De app blijft local-first: ingevulde duikgegevens, berekeningen en exports worden niet door de app naar GitHub, de beheerder of een eigen server verzonden. Bij het openen van een publieke website kan de hostinglaag wel normale technische requestgegevens verwerken om de appbestanden te leveren.

## GitHub-route

- Broncode en documentatie: `https://github.com/OSOD-NL/duikmonitor`
- Fouten en verbeterideeën: `https://github.com/OSOD-NL/duikmonitor/issues/new/choose`
- Beveiligingsproblemen: gebruik de security-route van de repository; meld dit niet openbaar in Issues.

Zet geen echte namen, telefoonnummers, e-mailadressen, locaties of operationele persoonsgegevens in Issues, voorbeelden, exports of testdata. Gebruik neutrale voorbeelden zoals `Duiker 1`.

## Hostingheaders

`index.html` bevat een CSP-meta voor lokaal gebruik. Voor een publieke site horen een paar zaken idealiter als HTTP-responseheader vanuit de hostinglaag te komen, vooral `frame-ancestors`.

Voor hostingplatformen die een `_headers`-bestand ondersteunen, staat in de repository een basisbestand. Controleer na publicatie met de browserontwikkeltools of de headers echt worden meegestuurd; bij sommige platformen, zoals statische hosting zonder headerondersteuning, wordt dit bestand genegeerd.

Aanbevolen minimale headers:

```text
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'none'; form-action 'none'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'
Strict-Transport-Security: max-age=31536000
X-Content-Type-Options: nosniff
Referrer-Policy: no-referrer
Permissions-Policy: geolocation=(), camera=(), microphone=(), payment=(), usb=()
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Resource-Policy: same-origin
```

## Releasecontrole

Bij iedere release hoort minimaal:

- versietag;
- release notes;
- actueel `CHANGELOG.md`;
- SHA-256 van `index.html`;
- bevestiging dat de lokale checks groen zijn.
