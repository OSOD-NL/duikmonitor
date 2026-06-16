# Release notes v1.3.0

Datum: 2026-06-12

v1.3.0 herstelt de aansluiting op OSOD v0.1 op vier punten: de werkelijke diepte blijft overal een feit, de doelvalidator volgt het schema ook op de niet-leeg-eisen, de OSOD-import hanteert een harde scope-beperking en elk rekenend record draagt een sha256-rekenbronfingerprint.

## Conformiteitsclaim

Duikmonitor v1.3.0 implementeert OSOD v0.1, niveau S+R, binnen scope: afgeronde operationele ademluchtduiken die door de Duikmonitor-registratielaag volledig en betekenisbehoudend worden gedragen. Buiten de rekenkundige envelop worden feiten geregistreerd en wordt geen geldige rekenuitkomst geleverd; zulke records vallen niet onder een geslaagde Niveau R-berekening.

OSOD-import is beperkt tot records binnen de Duikmonitor-scope. Records buiten scope worden geweigerd en niet herschreven.

## Wijzigingen

- Werkelijke diepte boven 15 m blijft als feit bewaard in invoer, opslag, herladen, JSON-import en OSOD-export; de waarde wordt niet leeggemaakt en niet teruggezet naar 15 m. De invoer waarschuwt, `tabelDiepteM` wordt `null`, de berekening blokkeert met `RED` en `OUTSIDE_DEPTH_ENVELOPE`, `resultValid` is `false` en er wordt geen geldige rekenuitkomst gepresenteerd. Registratie en export blijven mogelijk. Plan- en standaardwaardevelden houden hun grens op 15 m; die plangrens overschrijft nooit een geregistreerd feit.
- Doelvalidator en export blokkeren op lege waarden in `context.veiligheidsregio`, `context.locatie.omschrijving` en `displayName` van elke persoonsreferentie, conform de minLength-eisen van het schema; `roles.duikers` vereist minstens één duiker.
- Import OSOD weigert records buiten de Duikmonitor-scope met een duidelijke melding, in plaats van ze te herschrijven. Elk kandidaat-record wordt na opname herbouwd via de eigen registratielaag en moet betekenisgelijk zijn aan het importrecord. Alleen de conservatieve richting is toegestaan: een geïmporteerd `GREEN` kan door extra eigen niet-blokkerende controles `AMBER` worden bij gelijke `resultValid`, lege `blockingReasons` en gelijke rekenuitkomsten.
- Elk record met claim R draagt `calculation.engine.tableFingerprintSha256`: de sha256 over de canonieke, deterministisch sleutel-gesorteerde JSON-weergave (UTF-8) van de diep bevroren DCIEM-rekenbron. Bron-id en fingerprint zijn zichtbaar in het verificatiescherm. De interne fnv1a32-bronbewaking blijft daarnaast bestaan.
- `docs/OSOD.md` bevat een ingevulde conformiteitsverklaring met toetsdatum en fingerprintwaarde, en is gecorrigeerd waar het schema en het dieptegedrag onjuist beschreven stonden.
- Oefencodeveld verruimd zodat officiële codes volgens BRW-BWD.NN en BRW-DPL.NN (10 tekens) niet worden afgekapt.
- Typografische lange strepen vervangen door gewone koppeltekens; verwijzingen naar de OSOD-repository vervangen door een aankondigingsformulering totdat die publicatie heeft plaatsgevonden.

## Borging

- Alle 357 zelftests groen, waaronder nieuwe tests voor de niet-leeg-eisen per veldsoort, de sha256-vectoren en fingerprintstabiliteit, de volledige diepte-als-feit-keten rond 16,4 m, de importweigeringen en de oefencodelengte. JS-syntaxcontrole en themakleurenlint groen.
- Exportrecords (GREEN en RED) zijn extern gevalideerd tegen `schema/osod-logbook-record.schema.json` uit de OSOD v0.1-referentieset (JSON Schema draft 2020-12).
- DCIEM-tabelwaarden, meterregels, daglimieten, opstijgingsregels en rekenuitkomsten binnen de envelop zijn inhoudelijk niet gewijzigd.
