# Changelog

Alle noemenswaardige wijzigingen aan de Duikmonitor worden hier bijgehouden.

## [1.4.0] - 2026-06-17

Domeincorrectie naar het live domein duikmonitor.nl, een knop op de Instellingen-pagina naar de installatiepagina en een opgeschoonde installatiepagina onder /webclip/.

### Toegevoegd

- Knop "Op je beginscherm zetten" op de Instellingen-pagina die naar de installatiepagina /webclip/ verwijst, zodat de gebruiker leest hoe hij Duikmonitor als pictogram op iPhone of iPad zet.

### Gewijzigd

- Publiek domein gecorrigeerd naar duikmonitor.nl op alle plekken in de app, de documentatie en de issue-sjabloonconfiguratie; het eerdere, onjuiste domein is overal vervangen. De bijbehorende zelftestwaarden voor de publieke website-url en het instellingenlabel schuiven mee.
- Installatiepagina /webclip/index.html vervangen door een opgeschoonde pagina met de Safari-route voorop en het configuratieprofiel als fallback.

## [1.3.0] - 2026-06-16

OSOD-herstel: feitbehoud van de werkelijke diepte, een doelvalidator die het schema volledig volgt, een import met harde scope-beperking en een sha256-rekenbronfingerprint in elk rekenend record.

### Toegevoegd

- Sha256-rekenbronfingerprint in `calculation.engine.tableFingerprintSha256` van elk record met claim R: de sha256 over de canonieke (deterministisch sleutel-gesorteerde, UTF-8) JSON-weergave van de diep bevroren DCIEM-rekenbron. Bron-id en fingerprint zijn zichtbaar in het verificatiescherm; de interne fnv1a32-bronbewaking blijft daarnaast bestaan en is niet vervangen.
- Conformiteitsverklaring in `docs/OSOD.md` met applicatieversie, OSOD-versie, schema, niveaus, toetsdatum, rekenbronfingerprint en afwijkingen, plus de expliciete claimformule en importafbakening in `README.md` en `docs/OSOD.md`.
- Zelftests voor de niet-leeg-eisen per veldsoort, de sha256-vectoren en fingerprintstabiliteit, de volledige diepte-als-feit-keten rond 16,4 m (invoer, opslag, herladen, state-import, OSOD-export en OSOD-import), de importweigeringen en de oefencodelengte.

### Gewijzigd

- Werkelijke diepte boven 15 m blijft overal een feit: invoer, opslag, herladen, JSON-import en OSOD-export bewaren de waarde en maken haar niet leeg en zetten haar niet terug naar 15 m. De invoer waarschuwt; de DCIEM-berekening blokkeert buiten de envelop met `RED` en `OUTSIDE_DEPTH_ENVELOPE`, `tabelDiepteM` wordt `null` en er wordt geen geldige rekenuitkomst gepresenteerd (geïntegreerd gedrag van basistoets R-BASIS-004). Plan- en standaardwaardevelden houden hun grens op 15 m; die plangrens overschrijft nooit een geregistreerd feit. De zelftests die het oude leegmaken en afvlakken borgden zijn omgezet naar borging van het feitbehoud.
- Doelvalidator volgt het schema nu ook op de niet-leeg-eisen: `context.veiligheidsregio`, `context.locatie.omschrijving` en `displayName` van elke persoonsreferentie (duikploegleider, elke duiker en, indien aanwezig, duikmedisch begeleider) moeten gevuld zijn; `roles.duikers` vereist minstens één duiker en de fingerprintvorm wordt gecontroleerd. De export blokkeert op deze punten met een duidelijke melding.
- Import OSOD hanteert een harde scope-beperking: alleen afgeronde ademluchtrecords die de registratielaag volledig en betekenisbehoudend kan dragen worden opgenomen; elk kandidaat-record wordt na opname herbouwd en moet betekenisgelijk zijn aan het importrecord. Records buiten scope worden geweigerd met een duidelijke melding, in plaats van herschreven: geen ander ademgas naar ademlucht, geen ophoging van een S-claim, geen stil vervangen van context, rollen, diepte of calculation-blok, geen behoud van recordId bij inhoudelijke herschrijving. Alleen de conservatieve richting is toegestaan: een geïmporteerd `GREEN` kan door extra eigen niet-blokkerende controles `AMBER` worden bij gelijke `resultValid`, lege `blockingReasons` en gelijke rekenuitkomsten.
- Oefencodeveld verruimd zodat officiële codes volgens BRW-BWD.NN en BRW-DPL.NN (10 tekens) niet worden afgekapt.
- Typografische lange strepen in app- en documentatieteksten vervangen door gewone koppeltekens, conform het publicatiebesluit over leesbare en gereedschapsneutrale tekst.
- Verwijzingen naar de OSOD-repository vervangen door een aankondigingsformulering totdat die publicatie heeft plaatsgevonden.
- `docs/OSOD.md` gecorrigeerd waar het document het schema en het dieptegedrag onjuist beschreef (het schema staat geen lege strings toe op de drie genoemde plekken; een diepte boven 15 m is registreerbaar en geeft `RED` met `OUTSIDE_DEPTH_ENVELOPE`, niet `BLOCKED` met `INVALID_INPUT`).
- Bronconflictformulering rond Tabel 4a (HG B, OI 2:00-2:59) neutraal gemaakt: de eerdere kwalificatie van de WOD-cel als vermoedelijke fout en de aanbeveling tot correctie door de bronhouder vervallen; de WOD-waarde 1,1 wordt neutraal als gedocumenteerd bronconflict beschreven, in lijn met de OSOD-bronpositie. De app blijft 1,2 hanteren; rekenuitkomsten ongewijzigd.
- Resterende en-streepjes en het minteken in app- en documentatieteksten vervangen door gewone koppeltekens, in aanvulling op de eerdere em-streepjes-opruiming, conform het publicatiebesluit over leesbare en gereedschapsneutrale tekst.
- Duiksysteemwaarden in lijn gebracht met besluit B-0018: de losse waarde `OLV` vervalt als duiksysteemwaarde (toegestaan: `SCUBA`, `SCUBA_OLV`, `SSE`, `anders`, `onbekend`); een bestaande of geimporteerde kale `OLV` wordt betekenisbehoudend genormaliseerd naar `SCUBA_OLV`. Rekenuitkomsten en tabelwaarden ongewijzigd.

### Niet gewijzigd

- DCIEM-tabelwaarden, meterregels, daglimieten, opstijgingsregels en de rekenuitkomsten binnen de envelop zijn inhoudelijk niet gewijzigd; de wijzigingen betreffen feitbehoud, validatie, import, fingerprint en documentatie.

## [1.2.1] - 2026-06-11

Borging aangescherpt: rekeninvarianten en CI-hardening. Geen functionele wijziging.

### Toegevoegd

- Zelftestcategorie `invariant` (boot-gate-kritiek): zeven eigenschapstests die structurele eigenschappen van tabellen en motor bewaken: HG niet-dalend in DT zonder gaten in Airtabel 1; HF niet-stijgend in OI, binnen 1,0 tot 2,0, lege cellen alleen vooraan in tabel 4a; herhalings-NDL niet-stijgend in HF in tabel 4b; EDT nooit kleiner dan DT; monotone blokkering bij tabelgrens en meterregel; determinisme van de rekenmotor; en de eigenschappen van de HG-aanpassing over alle lettercombinaties. Totaal 333 zelftests.

### Gewijzigd

- CI-workflow draait met minimale tokenrechten (`permissions: contents: read`).
- CI gebruikt een vastgezette Node-versie (22), zodat de controleomgeving lokaal en op GitHub voorspelbaar gelijk is.

### Niet gewijzigd

- Tabellen, regels, rekenuitkomsten, opslag, export en CSP zijn niet aangeraakt.

## [1.2.0] - 2026-06-11

OSOD v0.1-conformiteit: de registratie spreekt nu de open standaard.

### Toegevoegd

- OSOD-recordlaag (conformiteitsclaims S en R): elke werkelijke duik krijgt bij het boven komen een blijvend record-ID en is op elk moment als OSOD-record op te bouwen.
- Machineleesbare rekenuitkomsten: blokkerende meldingen dragen nu een code (onder meer `OUTSIDE_DEPTH_ENVELOPE`, `BOTTOM_TIME_EXCEEDS_TABLE`, `BOTTOM_TIME_EXCEEDS_METER_RULE`, `EMPTY_TABLE_CELL`, `INVALID_INPUT`) en worden vertaald naar een `calculation`-blok met `status`, `resultValid` en `blockingReasons`.
- Knoppen `Export OSOD` en `Import OSOD` in Beheer en export: JSON-uitwisseling (één record of een bundel per dag), met een ingebouwde doelvalidator die elk record vóór export toetst, en import van geldige records uit andere systemen.
- Projectvelden Veiligheidsregio, Activiteittype en Duiksysteem voor de OSOD-context.
- Zelftestcategorie `osod` (boot-gate-kritiek): de elf publieke basistoetsen R-BASIS-001 t/m R-BASIS-011 van de standaard, plus validator- en rondtriptests; totaal 326 zelftests.
- Nieuw document `docs/OSOD.md` met de conformiteitsverklaring, veldmapping, codecatalogus en beperkingen.

### Gewijzigd

- HG-aanpassing bij herhalingsduiken verplaatst naar een zuivere helper (`osodAdjustHG`); rekengedrag ongewijzigd en afgedekt door bestaande en nieuwe zelftests.
- Repositoryverwijzingen bijgewerkt naar `github.com/OSOD-NL/duikmonitor`.

### Niet gewijzigd

- DCIEM-tabelwaarden, meterregels, daglimieten, opstijgingsregels en alle rekenuitkomsten zijn inhoudelijk niet gewijzigd; de OSOD-laag beschrijft bestaande uitkomsten en voegt geen nieuwe rekenpaden toe.

## [1.1.0] - 2026-06-07

Release-afronding van de registratie- en instellingenwijziging.

### Gewijzigd

- Registratie- en logweergave rustiger gemaakt: administratieve kloktijden worden zonder seconden getoond.
- Live seconden, live timers, opkomstcontrole en drukcheck-aftelling behouden.
- Hoofdduiklog opgeschoond: geen aparte kolom Rol; rol-informatie blijft waar relevant zichtbaar in Bijzonderheden.
- Duikerweergave blijft herkenbaar als `D1 · AANDUIDING`.
- Veldlimieten aangescherpt voor daggegevens, aanduiding, seinhouder, materiaalnummers, drukwaarden en MDD/maxdiepte.
- “Over deze tool” in Instellingen standaard ingeklapt.
- Aanvullende zelftests toegevoegd/aangepast.

### Niet gewijzigd

- DCIEM-tabellen, meterregels, boot-gate, CSP en netwerkgedrag zijn inhoudelijk niet gewijzigd.

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
