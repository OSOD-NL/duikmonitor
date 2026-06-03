# Beveiliging en privacy

## Wat deze app met gegevens doet

De app verzendt ingevoerde gegevens niet automatisch. Dit geldt voor lokaal openen en voor gebruik via de publieke site. Concreet:

- Ingevoerde gegevens worden alleen in de eigen browser bewaard (`localStorage`).
- Er zijn geen netwerkaanroepen in de app: geen `fetch`, geen formulier dat naar een server verstuurt, geen trackers en geen analytics.
- De Content Security Policy in `index.html` bevat `connect-src 'none'`, `form-action 'none'` en `object-src 'none'`.
- Exporteren naar JSON, CSV, XLSX of print is een lokale actie naar het eigen toestel.

Bij openen via een publieke website kan de hostinglaag normale technische requestgegevens verwerken om de appbestanden te leveren. Dat is iets anders dan appdata: ingevulde duikgegevens, berekeningen en exports worden door de app niet naar de beheerder, GitHub of een eigen server verzonden.

## Let op bij persoonsgegevens

De velden DPL, seinhouder en het label per duiker zijn vrije invoervelden. Zodra daar namen of andere herleidbare gegevens worden ingevuld, bevatten lokale opslag en exportbestanden persoonsgegevens. De app verwerkt die gegevens niet op afstand, maar het beheer van geëxporteerde bestanden ligt bij de gebruiker.

Zet geen echte namen, telefoonnummers, e-mailadressen, locaties of operationele persoonsgegevens in issues, discussies, voorbeelden, testdata of documentatie.

## Bewust niet gebouwd

De app heeft bewust geen multi-useromgeving, geen rollenmodel, geen accountlaag, geen centrale database, geen synchronisatie tussen apparaten, geen externe opslag en geen audit-log van bewerkingen. Dat is een bewuste beperking om de lokale privacy-opzet niet te ondermijnen.

## Integriteit

Van `index.html` kan een SHA-256-controlegetal worden bepaald. Daarmee kan worden nagegaan of een gebruikt bestand gelijk is aan een nagekeken releasebestand. Dit is geen keurmerk voor inhoudelijke juistheid; het zegt alleen dat het bestand ongewijzigd is.

De inhoudelijke borging zit in de bronvalidatie, de bevroren tabelbron, de waakhond, de boot-gate en de zelftests.

## Beveiligingsprobleem melden

Meld een mogelijk beveiligingsprobleem niet als openbaar issue. Gebruik de beveiligingsmeldroute van de repository, of neem via de ingestelde repository-contactroute contact op met de beheerder.

Voorbeelden van beveiligingsmeldingen:

- een onverwachte netwerkaanroep;
- een manier waarop gegevens buiten de browser terechtkomen;
- een kwetsbaarheid in import, export of rendering;
- een wijziging die de Content Security Policy verzwakt;
- een fout waardoor de zelftests of boot-gate onterecht groen blijven.
