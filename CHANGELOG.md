# Changelog

Alle noemenswaardige wijzigingen aan de Duikmonitor worden hier bijgehouden.

## [1.24.0] - 2026-07-01

De Duikerstabel op Instellingen is op een smal scherm (staande telefoon) beter leesbaar gemaakt. Tot nu toe werden de kolommen op een smal scherm zo ver samengeknepen dat MDD, Set en Masker hun twee cijfers niet meer volledig toonden en Kenmerk en SH onleesbaar werden. Voortaan krijgt de tabel op een smal scherm zijn natuurlijke, ruimere breedte en schuift hij horizontaal binnen zijn eigen kader; elk veld toont zo zijn volledige inhoud en de gebruiker veegt van links naar rechts. Op een breed scherm blijft de weergave ongewijzigd.

### Gewijzigd

- De Duikerstabel op Instellingen krijgt op een smal scherm vaste kolombreedtes in plaats van breedtes in procenten. De twee tekstkolommen (Kenmerk en SH) worden breed genoeg voor leesbare tekst; de drie cijferkolommen (MDD, Set en Masker) worden breed genoeg om hun twee cijfers volledig te tonen. De tabel krijgt daardoor een grotere totale breedte dan een typisch telefoonscherm en schuift horizontaal binnen zijn bestaande kader, in plaats van dat de kolommen worden samengeknepen. De invoervelden vullen hun kolom en worden niet langer tot onleesbaar ingekort. De kolomkoppen blijven op een regel staan.
- Op een breed scherm (desktop) blijft de Duikerstabel ongewijzigd: de tabel past netjes binnen de breedte en de vaste-breedte-aanpak met horizontaal schuiven geldt daar niet.
- Appversielabel verhoogd naar v1.24.0; de bijbehorende zelftest controleert mee op v1.24.0.
- Het opstart-zelftest-aantal gaat van 430 naar 431 door een toegevoegde controle die borgt dat de cijferkolommen op een smal scherm hun minimale breedte houden en dat de tabel in een horizontaal schuifbaar kader staat. Een tegencontrole met te smalle kolommen bevestigt dat de controle niet vanzelf slaagt.

### Niet gewijzigd

- Dit is een weergavewijziging. De rekenkern, de DCIEM-tabellen, de rekenbronfingerprint, de meterregels, de blokkeerlogica, het statusmodel en de validatie zijn niet aangeraakt. De opbouw van de OSOD-records, de doelvalidator en de OSOD-, JSON- en XLSX-uitvoer zijn ongewijzigd. De invoervelden, hun maximale lengte en hun betekenis blijven gelijk; alleen de breedte waarmee de Duikerstabel op een smal scherm wordt getoond verandert. De overige tabellen in de app zijn niet gewijzigd. De Content-Security-Policy is ongewijzigd. _headers, site.webmanifest en de iconen blijven byte-identiek.

## [1.23.0] - 2026-06-30

De export- en importknoppen op twee schermen zijn opnieuw ingedeeld voor een duidelijke scheiding. Het scherm Dagregistratie is nu het werk- en back-upscherm: gegevens gaan eruit en erin. Het scherm Registratie is het uitvoerscherm naar buiten: alleen exporteren, in drie verwerkbare vormen. De Duikerstabel op Instellingen is beter leesbaar gemaakt op smalle en brede schermen.

### Toegevoegd

- Op het scherm Dagregistratie staat nu een knop Export XLSX. Deze levert de volledige dagregistratie (planning en werkelijk, beide datasets) als XLSX-bestand, met dezelfde inhoud als de eerdere CSV-uitvoer van dit scherm. Het bestand heeft een vette koprij, passende kolombreedtes, een filterregel, een bevroren bovenrij en schrijft zuivere getallen als getal en waarden met een voorloopnul als tekst.
- Op het scherm Registratie staat nu een knop Export OSOD. Deze levert exact dezelfde gevalideerde OSOD-records als voorheen; bij een ongeldig record blokkeert de export, net als daarvoor. Alleen de knop staat nu op dit scherm.

### Gewijzigd

- De Duikerstabel op Instellingen verdeelt de kolombreedtes opnieuw. De twee tekstkolommen (Kenmerk en SH) krijgen ruime, gelijke breedte; de twee tweecijferige kolommen (Set en Masker) blijven smal. Daardoor blijven de namen op een smal scherm leesbaar, rekken de cijferkolommen op een breed scherm niet onnodig uit en kappen de kolomkoppen niet meer af. De koppen blijven op een regel en de cijferkolommen blijven onderling gelijk uitgelijnd.
- Het scherm Dagregistratie toont onder Beheer en export nog drie knoppen: Export JSON, Import JSON en Export XLSX. De knoppen Export OSOD, Import OSOD, Export CSV en Print zijn van dit scherm verwijderd.
- Het scherm Registratie toont in de exportregel nog drie knoppen: Export OSOD, Export XLSX en Export JSON. De knoppen Print en Export CSV zijn van dit scherm verwijderd.
- De laatste, voor de gebruiker onbereikbare Print/PDF-knop op de printbare duiklogweergave is eveneens verwijderd, samen met het bijbehorende, nergens anders gebruikte printmechanisme. Daarmee staat er geen Print/PDF-knop meer in de bron. De printbare weergave zelf blijft bestaan.
- Het scherm Registratie blijft uitsluitend uitvoer; er is geen import op dit scherm.
- Appversielabel verhoogd naar v1.23.0; de bijbehorende zelftest controleert mee op v1.23.0.
- Het opstart-zelftest-aantal gaat van 422 naar 430. Acht tests bij het verwijderde OSOD-importmechanisme zijn vervallen; dertien interactietests zijn toegevoegd voor de verplaatste en nieuwe knoppen, en drie aanvullende controles horen bij het stil maken van de opstartcontrole en het verwijderen van de laatste Print/PDF-knop. Die tests doen de echte klik na en controleren het opgebouwde bestand en de gerenderde uitvoer, met negatieve controles die bevestigen dat de verwijderde knoppen weg zijn, dat de opstartcontrole geen melding meer toont en dat de tests niet vanzelf slagen.
- Twee van deze opstartcontroles zijn robuust gemaakt voor een echte browser. Ze steunden nog op hulpmiddelen die alleen in de testomgeving buiten de browser bestaan, waardoor de opstartbadge in de browser twee niet-kritieke meldingen toonde terwijl de app zelf goed werkte. De controles lezen de te controleren gegevens nu via dezelfde interne weg als de app en via de paginabron van de browser, zodat de opstartbadge in de browser geen niet-kritieke meldingen meer toont. De uitvoer, de knoppen en de rekenkern zijn hierbij niet gewijzigd; alleen de controles zelf.

### Niet gewijzigd

- De rekenkern, de DCIEM-tabellen, de rekenbronfingerprint, de meterregels, de blokkeerlogica, het statusmodel en de validatie zijn niet aangeraakt. De opbouw van de OSOD-records, de doelvalidator en de inhoud van de OSOD-, JSON- en XLSX-uitvoer blijven inhoudelijk identiek; alleen de knoppen verplaatsen, verschijnen of verdwijnen. De verplaatste OSOD-uitvoer is gelijk aan de vorige en de XLSX van de dagregistratie bevat dezelfde gegevens als de eerdere CSV van dat scherm. De OSOD-export blokkeert nog steeds bij een ongeldig record, met dezelfde melding; alleen de bijbehorende opstartcontrole is zo aangepast dat zij die melding bij het opstarten niet meer zichtbaar maakt. De Content-Security-Policy is ongewijzigd. _headers, site.webmanifest en de iconen blijven byte-identiek.

## [1.22.0] - 2026-06-28

De controle op een onmogelijke ademdrukmeting is verruimd. Tot nu toe gaf de luchtbewaking alleen een melding wanneer de laatste of einddruk hoger was dan de begindruk. Voortaan kijkt de bewaking ook naar de metingen onderling: als een latere meting een hogere druk laat zien dan een eerdere meting, verschijnt een korte controle-melding. Dit is en blijft een waarschuwing, geen drempel, grens of blokkade. De luchtberekening (verbruikstrend, resterende tijd tot 100 bar en de kritieke meldingen) blijft in alle gevallen gewoon doorlopen.

### Toegevoegd

- De live-luchtbewaking aan de waterkant en de samenvatting na het boven komen geven nu ook een controle-melding wanneer een latere ademdrukmeting hoger is dan een eerdere meting in dezelfde reeks. De reeks wordt op tijd geordend en op geldige druk gefilterd; bevat zij ergens een stijging tussen twee opeenvolgende metingen, dan volgt een enkele samenvattende melding, niet een melding per paar. De bestaande melding voor een laatste of einddruk hoger dan de begindruk blijft daarnaast bestaan zoals zij was.

### Gewijzigd

- Appversielabel verhoogd naar v1.22.0; de bijbehorende zelftest controleert mee op v1.22.0.
- Het opstart-zelftest-aantal gaat van 417 naar 422 door vijf toegevoegde interactietests. Twee tests doen een echte metingenreeks met een tussenstijging na en controleren in de teruggegeven meldingen dat de nieuwe controle-melding verschijnt, in zowel de live-bewaking als de samenvatting na het boven komen. Eén test bevestigt dat de luchtberekening bij zo'n stijging blijft doorlopen. Twee tegencontroles met een nette dalende reeks bevestigen dat de melding dan uitblijft, zodat de tests niet vanzelf slagen.

### Niet gewijzigd

- De rekenkern, de DCIEM-tabellen, de rekenbronfingerprint, de blokkeerlogica (waaronder de blokkade boven 15 m en de grens bij 100 bar), het statusmodel en de validatie zijn niet aangeraakt. De luchtberekening zelf (verbruikstrend, resterende tijd, het ademverbruik per minuut en de bijbehorende meldingen) is ongewijzigd: de verruiming voegt uitsluitend een melding toe en stelt niets uit, maakt niets leeg en blokkeert niets. Er is geen drempel, grens, minimum of maximum op de begindruk of op enige drukmeting toegevoegd; het toegestane drukbereik blijft gelijk. De OSOD-recordlaag, de doelvalidator en Export/Import OSOD zijn ongewijzigd, evenals het schema. De boot-verificatie en de standen van de verificatiebadge blijven werken zoals voorheen. De Content-Security-Policy is ongewijzigd. _headers, site.webmanifest en de iconen blijven byte-identiek.

## [1.21.0] - 2026-06-28

Drie kleine verbeteringen aan de bediening en de weergave aan de waterkant, zonder gevolgen voor de rekenkern of de registratie. De duikerkaartjes op het scherm Dagregistratie krijgen een duidelijke scheidingslijn tussen opeenvolgende kaartjes, zodat ze ook in fel zonlicht beter uit elkaar te houden zijn. Het tabblad Planning vooraf verdwijnt uit de onderste tabbalk; de planningsfunctie en het bijbehorende scherm blijven in hun geheel in de app aanwezig. De verificatiebadge bovenin wordt aantikbaar en opent de releasepagina van het project; kleur, tekst en standen van de badge blijven precies gelijk.

### Toegevoegd

- Tussen twee opeenvolgende duikerkaartjes op het scherm Dagregistratie staat nu een duidelijk zichtbare scheidingslijn. Het eerste kaartje krijgt bewust geen lijn aan de bovenkant; elk volgend kaartje wel. De lijn gebruikt een bestaande themakleur en klopt daardoor automatisch in zowel de dag- als de nachtmodus. De printweergave is niet gewijzigd.
- De verificatiebadge bovenin is aantikbaar gemaakt en opent de releasepagina van het project in een nieuw tabblad. De badge is bedienbaar met de muis en met het toetsenbord (Enter en spatie) en wordt als koppeling aangeboden. De kleur, de tekst en de drie standen (groen, oranje, rood) van de badge blijven precies gelijk; alleen de aantikbaarheid is toegevoegd.

### Gewijzigd

- Het tabblad Planning vooraf is uit de onderste tabbalk gehaald. De tabbalk toont nu Dagregistratie, Registratie en Instellingen. De planningsfunctie, het planningsscherm, de planningsberekeningen en alle opslag, migratie, import en export blijven volledig ongewijzigd; alleen de tab in de balk vervalt.
- Appversielabel verhoogd naar v1.21.0; de bijbehorende zelftest controleert mee op v1.21.0.
- Het opstart-zelftest-aantal gaat van 416 naar 417 door één toegevoegde interactietest die de aantikbare badge nadoet en de gerenderde uitkomst controleert, met een tegencontrole die faalt zodra de aantikbaarheid ontbreekt.

### Niet gewijzigd

- De rekenkern, de DCIEM-tabellen, de rekenbronfingerprint, de blokkeerlogica (waaronder de blokkade boven 15 m), het statusmodel en de validatie zijn niet aangeraakt. De OSOD-recordlaag, de doelvalidator en Export/Import OSOD zijn ongewijzigd, evenals het schema. De boot-verificatie en de standen van de verificatiebadge blijven werken zoals voorheen; alleen de aantikbaarheid is toegevoegd. De planningsberekeningen en het planning-dataspoor zijn volledig behouden. De Content-Security-Policy is ongewijzigd: de externe koppeling opent in een nieuw tabblad en valt buiten de verbindingsrichtlijn. _headers, site.webmanifest en de iconen blijven byte-identiek.

## [1.20.0] - 2026-06-28

De ingebouwde versiemelding is verwijderd. Op de standalone-webapp aan de waterkant had die melding in de praktijk geen waarneembaar nut: een nieuwe versie komt vanzelf binnen wanneer iOS de app uit het geheugen verwijdert en opnieuw laadt, en dat mechanisme blijft ongewijzigd. Doordat de app niet langer het eigen versiebestand hoeft op te halen, gaat de Content-Security-Policy terug naar de strengste stand waarin de app met geen enkele externe of eigen server verbindt. De rekenkern en alle registratielagen blijven ongemoeid.

### Verwijderd

- De versiemelding onderin het scherm en de bijbehorende controle die af en toe bij het eigen domein de nieuwste versie opvroeg, zijn volledig verwijderd, samen met de opmaak en de kleuren die alleen bij die melding hoorden. De live-duik-weergave die bij terugkeren naar de app ververst, blijft volledig werken; alleen de versiecontrole is uit dat terugkeer-moment gehaald.
- Het losse versiebestand dat de app voor die controle ophaalde, is uit de repository verwijderd en uit de controlegetallen gehaald, zodat het controlegetal nu alleen nog de applicatie zelf dekt.
- De uitleg "Versiemelding" in het kaartje Privacy en lokaal gebruik is verwijderd, omdat die uitleg niet meer klopt. De overige privacytekst over lokale opslag en het ontbreken van een server blijft ongewijzigd.

### Gewijzigd

- De Content-Security-Policy in de meegeleverde headers zet de verbindingsrichtlijn terug van de eigen oorsprong naar geen enkele verbinding, de strengste stand. Alle andere richtlijnen en headers blijven gelijk. Dit brengt de werkelijke instelling weer in lijn met wat de documentatie op twee plekken al beschrijft.
- Appversielabel verhoogd naar v1.20.0; de bijbehorende zelftest controleert mee op v1.20.0.
- De README verwijst voor de actuele publicatieversie nu naar de releases op GitHub in plaats van een vast versienummer dat met elke uitgave veroudert.
- Het opstart-zelftest-aantal gaat van 421 naar 416. De vijf vervallen controles toetsten uitsluitend de verwijderde versiemelding: de overeenkomst tussen het versiebestand en het versielabel, het verschijnen en herladen van de meldingsbalk, de plaatsing van die balk, de numerieke versievergelijking en de patroongrendel op de opgehaalde waarde. De overige controles blijven niet-tautologisch.

### Niet gewijzigd

- De rekenkern, de DCIEM-tabellen, de rekenbronfingerprint, de blokkeerlogica (waaronder de blokkade boven 15 m), het statusmodel en de validatie zijn niet aangeraakt. De OSOD-recordlaag, de doelvalidator en Export/Import OSOD zijn ongewijzigd, evenals het schema. De boot-verificatie en de geverifieerd/NIET GEVERIFIEERD-badge blijven werken zoals voorheen. De installatiestrook "Zet Duikmonitor op je beginscherm" blijft ongewijzigd. Geen andere richtlijn of header dan de verbindingsrichtlijn is aangepast. site.webmanifest en de iconen blijven byte-identiek.

## [1.19.0] - 2026-06-28

Twee kleine verbeteringen aan de presentatielaag, zonder gevolgen voor de rekenkern of de registratie. In nachtmodus krijgt de opengeklapte uitleg achter een i-knopje voortaan een volledig dekkende achtergrond, zodat velden en tekst eronder er niet meer doorheen schijnen; in dagmodus was dat al zo. Daarnaast zijn twee uitlegteksten ingekort op punten waar ze zichzelf gedeeltelijk herhaalden, zonder informatie te verliezen die nergens anders staat.

### Gewijzigd

- De achtergrond van de opengeklapte uitleg achter een i-knopje is in nachtmodus nu volledig dekkend in plaats van licht doorschijnend, zodat de inhoud eronder niet meer zichtbaar blijft. Alleen deze achtergrondkleur in nachtmodus is aangepast; de plaatsing, de breedte en het toon- en verberggedrag van de uitleg zijn ongewijzigd, en de dag- en printweergave blijven gelijk.
- De uitleg bij Dagregistratie aan de waterkant is met een zin ingekort. De toelichting bij de knop "+ Duiker erbij" verviel, omdat de knop dat al benoemt en het uitschakelen via het Actief-vinkje al bij de Duikers-uitleg op Instellingen staat. De knop en zijn werking zijn ongewijzigd.
- De uitleg bij het Werkplan is bij de luchtkolom L/H ingekort: de interne berekeningswijze verviel, terwijl de waarden voor laag en hoog ademtempo (40 en 72 l/min) en de waarschuwing dat het een planningsindicatie is en geen vervanging van de drukcheck tijdens de duik, behouden blijven.
- Appversielabel verhoogd naar v1.19.0; de bijbehorende zelftest controleert mee op v1.19.0. version.json bijgewerkt naar v1.19.0.
- Het opstart-zelftest-aantal gaat van 415 naar 421 door drie controles voor de dekkende uitleg-achtergrond in nachtmodus (met tegencontrole op een achtergebleven doorzichtigheid) en twee aanwezigheidscontroles voor de ingekorte uitlegteksten, plus de meegeschoven versielabelcontrole.

### Niet gewijzigd

- De rekenkern, de DCIEM-tabellen, de rekenbronfingerprint, de blokkeerlogica (waaronder de blokkade boven 15 m), het statusmodel en de validatie zijn niet aangeraakt. De OSOD-recordlaag, de doelvalidator en Export/Import OSOD zijn ongewijzigd, evenals het schema, de updatecontrole en de plaatsing van de versiemelding. De tabvolgorde en de schermen blijven gelijk. De knop "+ Duiker erbij", de Actief-werking en de verplichte velden zijn ongewijzigd. Aan de overige uitlegteksten en aan de plaatsing, breedte en gelaagdheid van de opengeklapte uitleg is niets veranderd. _headers, site.webmanifest en de iconen blijven byte-identiek.

## [1.18.0] - 2026-06-27

Een klein invoergemak aan de waterkant: bij een vervolgduik van dezelfde duiker stelt de app de begindruk alvast voor op basis van de einddruk van de vorige afgeronde duik. De waarde is zichtbaar gemarkeerd als voorstel en blijft gewoon overschrijfbaar; eigen invoer wint altijd. De rekenkern en alle registratielagen blijven ongemoeid. Tevens hersteld: een opstart-zelftest liet ongemerkt een testwaarde in de begindruk-tussenbuffer achter, waardoor het begindruk-veld van de eerste duiker bij elke start een onbedoelde waarde toonde die met Alles wissen niet verdween. De zelftesthelper isoleert de tussenbuffers nu volledig en Alles wissen leegt ze, zodat de app altijd schoon opstart.

### Toegevoegd

- Bij een niet-actieve duiker met een eerder afgeronde duik met een geldige einddruk wordt het begindruk-veld van de volgende duik alvast gevuld met die einddruk, met een rustige melding onder het veld dat het een voorstel uit de vorige duik is en dat het kan worden aangepast als het toestel is bijgevuld. De voorvulling verschijnt alleen als er daadwerkelijk een waarde over te nemen valt; een verse duiker of een vorige duik zonder geldige einddruk houdt een leeg veld zonder melding. Eigen invoer wint altijd: een zelf ingetypte waarde wordt nooit overschreven door de voorgestelde einddruk, en zodra de gebruiker de voorgestelde waarde wijzigt of leegmaakt verdwijnt de markering. De waarde gaat bij Start duik mee via het bestaande pad. Er is bewust geen controle, minimum, maximum, drempel of waarschuwing op de hoogte van de begindruk toegevoegd; de bestaande bereikafhandeling (1 t/m de bovengrens) is gedrag-identiek. Vijf UI-interactietests met tegencontrole borgen dit gedrag, inclusief een anti-limiet-controle dat er geen grenswaarde rond de voorvulling is ontstaan.

### Gewijzigd

- Appversielabel verhoogd naar v1.18.0; de bijbehorende zelftest controleert mee op v1.18.0. version.json bijgewerkt naar v1.18.0.
- De zelftesthelper herstelt voortaan naast de werktoestand ook de losse invoer-tussenbuffers, zodat geen enkele zelftest een waarde in die buffers kan achterlaten en de app schoon opstart. De begindruk-UI-test die een eigen waarde zette ruimt die nu bovendien zelf op.
- Alles wissen leegt voortaan ook de invoer-tussenbuffers (begindruk, einddruk en de luchtinvoervelden), zodat na een wis geen achtergebleven voorstel of tussenwaarde blijft staan.
- Het opstart-zelftest-aantal gaat van 407 naar 415 door de vijf UI-interactietests voor de begindruk-voorvulling en drie aanvullende regressietests met tegencontrole voor de buffer-isolatie en het legen bij Alles wissen.

### Niet gewijzigd

- De rekenkern, de DCIEM-tabellen, de rekenbronfingerprint, de blokkeerlogica (waaronder de blokkade boven 15 m), het statusmodel en de validatie zijn niet aangeraakt. De einddruk-invoer blijft zoals vastgelegd in v1.17.0 en v1.13.0: bij Boven/einde wordt de einddruk altijd opnieuw uitgevraagd en wordt een meting-op-diepte nooit stil als einddruk overgenomen; deze versie raakt uitsluitend de begindruk van een volgende duik. De OSOD-recordlaag, de doelvalidator en Export/Import OSOD zijn ongewijzigd, evenals het schema, de updatecontrole en de plaatsing van de versiemelding. Er is geen controle of grenswaarde op de begindruk toegevoegd. _headers, site.webmanifest en de iconen blijven byte-identiek.

## [1.17.0] - 2026-06-24

Een attente diepte-bevestiging bij het starten van een live-duik aan de waterkant. Net als de begindruk wordt nu ook de diepte op het juiste moment eenmalig bevestigd, zodat een duik niet ongemerkt op een onaangeraakte standaarddiepte start. Het blijft een bevestiging, geen blokkade: via OK kan altijd worden doorgegaan. De rekenkern, de blokkeerlogica en alle registratielagen blijven ongemoeid.

### Toegevoegd

- Bij Start duik verschijnt eenmalig een diepte-bevestiging ("Diepte voor deze duik is X m. Klopt dat?") met de actuele standaard-MDD van die duiker, nadat de begindruk geldig is bevonden en voordat de duik wordt aangemaakt. Bij OK start de duik met die diepte en komt de vraag niet opnieuw voor deze duiker; bij Annuleren start de duik niet en kan de diepte eerst worden aangepast. De bevestiging hangt bewust niet af van de dieptewaarde maar van de vraag of de diepte voor deze duiker al bewust is bevestigd of bewust is gezet, zodat een terechte ondiepe duik niet telkens wordt lastiggevallen. Het wijzigen van het MDD-veld (in de Duikerstabel of het live MDD-veld) geldt als een bewuste diepte-actie en onderdrukt de vraag voor die duiker. Na Alles wissen vraagt de eerste duik weer om bevestiging. Drie UI-interactietests met tegencontrole borgen dit gedrag.

### Niet gewijzigd

- De rekenkern, de DCIEM-tabellen, de rekenbronfingerprint, de blokkeerlogica (waaronder de blokkade boven 15 m), het statusmodel en de validatie zijn niet aangeraakt. De OSOD-recordlaag, de doelvalidator en Export/Import OSOD zijn ongewijzigd, evenals het schema en de updatecontrole. De rekenwaarde van de MDD en de terugval op 6 (cleanMddValue met fallback 6) blijven inhoudelijk gelijk; dit is geen leeg-veld- of verplicht-veld-wijziging in de zin van de standaard. De begindruk-controle bij de start is functioneel onveranderd: er is feitelijk een enkel handmatig start-pad en de bestaande melding geldt daar als vanouds.

## [1.16.0] - 2026-06-24

Een opmaak- en labelronde voor de Duikerstabel op de Instellingen-pagina: kortere kolomkoppen, een gelijkmatige kolomverdeling in portretmodus en een kleiner maar goed aantikbaar Actief-vinkje. De rekenkern en alle registratielagen blijven ongemoeid.

### Gewijzigd

- De kolomkoppen van de Duikerstabel op de Instellingen-pagina zijn korter en eenduidiger: "Aanduiding" wordt "Kenmerk", "Seinhouder" wordt "SH", en de hekjes vervallen bij "Set #" en "Masker #" (nu "Set" en "Masker"). De koppen "Actief", "Duiker" en "MDD" blijven gelijk. Het invoerveld voor het kenmerk krijgt het bijbehorende toegankelijkheidslabel "Kenmerk"; het seinhouderveld houdt bewust het volledige toegankelijkheidslabel "Seinhouder" zodat een schermlezer de betekenis voorleest.
- De uitleg achter het i-knopje van het Duikers-kaartje benoemt nu expliciet dat de kolom SH de seinhouder is, zodat de korte kop leesbaar blijft. De verwijzing naar "Set en Masker" is taalkundig gelijkgetrokken met de nieuwe koppen. De muted helptekst direct onder de tabel verwijst nu eveneens naar "Kenmerk" in plaats van "Aanduiding", zodat kop en helptekst consistent zijn.
- De Duikerstabel verdeelt zijn kolommen in portretmodus gelijkmatig. De tabel krijgt hiervoor een eigen scope ("diverstable") met een vaste kolomindeling op de schermweergave, waarbij Actief en Duiker een smalle vaste breedte houden en Kenmerk, SH, MDD, Set en Masker de resterende ruimte gelijk delen. De kopcellen breken niet meer over twee regels; past het echt niet, dan scrollt de tabel horizontaal binnen de bestaande tabelomhulling. Deze opmaak raakt uitsluitend de Duikerstabel en niet de duiklog, de registratie of andere tabellen. Het bestaande printgedrag is niet aangeraakt.
- Het selectievakje in de Actief-kolom is optisch kleiner gemaakt met behoud van een ruime, goed aantikbare klikzone. Dit geldt alleen voor het Actief-vinkje in deze tabel; andere selectievakjes en invoervelden zijn niet gewijzigd.
- Appversielabel verhoogd naar v1.16.0; de bijbehorende zelftest controleert mee op v1.16.0. version.json bijgewerkt naar v1.16.0.
- Het opstart-zelftal gaat van 400 naar 403. De bestaande zelftest die de volledige kop "Seinhouder" eiste is doelbewust herzien naar de nieuwe werkelijkheid (zichtbare kop "SH", betekenis in de uitleg-i) en er zijn drie nieuwe UI-interactietests bijgekomen voor de koppen, de gelijkmatige kolombreedte en de uitleg-i. Elke nieuwe zelftest heeft een tegencontrole tegen tautologie.

### Niet gewijzigd

- Rekenkern, DCIEM-tabellen, rekenbronfingerprint, blokkeerlogica, statussemantiek en validatie zijn niet aangeraakt. De OSOD-recordlaag, de doelvalidator en Export/Import OSOD zijn ongewijzigd, evenals het schema en het gedrag van de updatecontrole en de in v1.12.0 vastgelegde plaatsing van de versiemelding.
- De standaard-MDD (6 m) en de vraag welk veld verplicht is blijven ongewijzigd; dat is een aparte, latere kwestie. De duiksysteem-set blijft gelijk. De naamgeving op andere schermen (duiklog, compacte registratie, CSV-export) is in deze versie bewust niet meegewijzigd; consistentie elders kan een latere ronde zijn.
- _headers, site.webmanifest en de iconen blijven byte-identiek.

## [1.15.0] - 2026-06-23

Twee samenhangende wijzigingen aan de luchtweergave aan de waterkant: de monitor toont voortaan een ademhalingsindicatie (SAC) die de inspanning van de duiker zelf volgt, los van de diepte, en de flesinhoud is instelbaar geworden tussen 2x4 L en 2x6 L.

### Toegevoegd

- Een ademhalingsindicatie (SAC, Surface Air Consumption) aan de waterkant. De SAC wordt over het laatste meetinterval berekend en teruggerekend naar de oppervlakte, zodat het getal bij rustige ademhaling stabiel blijft, ook als de duiker op- en afdaalt. Loopt het op, dan werkt de duiker harder, ongeacht de diepte. De SAC is een live-hulpgetal: hij wordt nergens opgeslagen, niet in de registratie opgenomen en niet geexporteerd. Bij een nog onvolledig interval of een ontbrekende diepte bij een meting toont het veld een streepje met een korte melding in plaats van een getal; een ingevulde diepte van 0 m (oppervlak) geldt als geldige waarde.
- Een instelbare flessenset op de Instellingen-pagina, omschakelbaar tussen 2x4 L (8 L) en 2x6 L (12 L), geldig voor alle duikers. Omschakelen naar 2x6 L vraagt een bevestiging; terugschakelen naar 2x4 L niet. De keuze is vergrendeld zolang er een duik loopt, zodat de flesinhoud niet halverwege een actieve duik kan veranderen. Na "Alles wissen" valt de set terug op de veilige standaard 2x4 L.
- Negen zelftests die de berekening en de bediening echt nadoen en de uitkomst controleren: de SAC-normalisatie over het laatste interval met de gemiddelde intervaldiepte, de stabiliteit bij gelijke ademhaling op verschillende diepte, de afhandeling van een ontbrekende diepte, het onderscheid tussen een lege en een nul-diepte, het streepje bij een nog onvolledig interval, de standaard 2x4 L na reset, het doorwerken van de gekozen set in de berekening, de vergrendeling tijdens een lopende duik en de bevestiging bij 2x6 L. Elke zelftest heeft een tegencontrole tegen tautologie.

### Gewijzigd

- Het Trendverbruik-blok toont voortaan de SAC in L/min in plaats van de drukval per minuut (bar/min) en het verbruik op diepte (l/min). Die laatste twee waren een weergave op diepte en daardoor misleidend als ademhalingssignaal; ze zijn vervangen, niet aangevuld.
- De flesinhoud is niet langer vast op 8 L maar komt uit de instelling. De gekozen set werkt door in zowel de SAC als de berekening van de resterende tijd tot 100 bar.
- Appversielabel verhoogd naar v1.15.0; de bijbehorende zelftest controleert mee op v1.15.0. version.json bijgewerkt naar v1.15.0.
- Het opstart-zelftal gaat van 391 naar 400 door de negen nieuwe zelftests met hun tegencontroles.

### Niet gewijzigd

- De luchtveiligheidsberekening blijft ongewijzigd: de drukval per minuut, de resterende tijd tot 100 bar en het drukcheck-interval draaien onverminderd op de bestaande logica die de hoogste van twee verbruikssnelheden gebruikt. De SAC komt er als een tweede, los getal naast en verandert daar niets aan.
- Rekenkern, DCIEM-tabellen, rekenbronfingerprint, blokkeerlogica, statussemantiek, validatie en schema zijn niet aangeraakt. De OSOD-recordlaag, de doelvalidator en Export/Import OSOD zijn ongewijzigd, evenals het gedrag van de updatecontrole en de in v1.12.0 vastgelegde plaatsing van de versiemelding. _headers, site.webmanifest en de iconen blijven byte-identiek.

## [1.14.0] - 2026-06-23

Twee kleine wijzigingen aan de bediening en weergave rond Dagregistratie: het uitleg-i-knopje blijft bij openen op zijn plek, en aan de waterkant kun je met één tik het volgende duikerslot activeren.

### Toegevoegd

- Een knop "+ Duiker erbij" op de Dagregistratie, onder de rij duikerkaarten, die het eerstvolgende nog inactieve duikerslot activeert (de duiker met de laagste code die niet actief is). De knop voegt alleen toe; hij haalt nooit een duiker weg. Zijn alle twaalf sloten actief, dan is de knop uitgeschakeld. Daarvoor moest je eerder naar Instellingen om een slot aan te vinken.
- Twee zelftests die de bediening echt nadoen en de uitkomst controleren: dat het uitleg-i-knopje bij openen niet meeverhuist (de opengeklapte uitleg loopt uit de flexrij), en dat "+ Duiker erbij" precies één extra slot activeert, het eerstvolgende, tot maximaal twaalf, zonder ooit een duiker inactief te maken of een nieuw slot aan te maken. Beide zelftests hebben een tegencontrole.

### Gewijzigd

- De plaatsing van de uitleg-i is aangepast zodat het ronde i-knopje bij openen op zijn vaste plek rechts naast de titel blijft. Voorheen brak de titelrij af bij openen en verhuisde het knopje mee naar een nieuwe regel. De opengeklapte uitleg verschijnt nu onder de titelregel over de breedte van de kaart. Dit is een zuivere opmaakwijziging; het openen en sluiten van de uitleg en de visuele stijl van knopje en tekstblok blijven gelijk. De wijziging geldt app-breed voor alle uitleg-i-knopjes.
- Appversielabel verhoogd naar v1.14.0; de bijbehorende zelftest controleert mee op v1.14.0. version.json bijgewerkt naar v1.14.0.
- Het opstart-zelftal gaat van 389 naar 391 door de twee nieuwe zelftests met hun tegencontroles.

### Niet gewijzigd

- Rekenkern, tabelwaarden, rekenbronfingerprint, blokkeerlogica, statussemantiek, validatie en schema zijn niet aangeraakt. De OSOD-recordlaag, de doelvalidator en Export/Import OSOD zijn ongewijzigd. Het gedrag van de updatecontrole en de in v1.12.0 vastgelegde plaatsing van de versiemelding blijven gelijk. De begintoestand (D1 t/m D4 standaard actief) en het aantal duikersloten (twaalf) blijven ongewijzigd; de knop verandert alleen de live-toestand op gebruikersactie. _headers, site.webmanifest en de iconen blijven byte-identiek.

## [1.13.0] - 2026-06-23

Een ronde verbeteringen aan invoer en standaardwaarden: de einddruk wordt na een duik altijd uitgevraagd, de monitor start schoner op, en getalsvelden vangen ongeldige invoer beter op.

### Toegevoegd

- Vijf zelftests die de bediening echt nadoen en de uitkomst op het scherm controleren: dat de einddruk na Boven / einde wordt uitgevraagd, dat een schone start vier actieve duikers heeft, dat een lucht-/dieptemeting een diepte vereist, dat drukvelden een ongeldige waarde terugzetten, en dat Alles wissen alleen wist na een uitdrukkelijke bevestiging. Elke zelftest heeft een tegencontrole.

### Gewijzigd

- Na Boven / einde vraagt de monitor de einddruk van het toestel nu altijd uit. Voorheen kon een eerder ingevoerde luchtmeting stil als einddruk worden overgenomen; dat gebeurt niet meer, zodat de afgelezen einddruk van het toestel bewust wordt vastgelegd.
- Een schone monitor start met de eerste vier duikers (D1 t/m D4) actief in plaats van alle twaalf. De overige duikers zet je met het vinkje Actief aan wanneer je ze nodig hebt.
- Bij het opslaan van een lucht-/dieptemeting is de diepte nu verplicht. Een lege of niet-numerieke diepte wordt geweigerd met een korte melding. Een diepte boven 15 m wordt onverminderd als feit vastgelegd en blokkeert de berekening voor die duik.
- De getalsvelden voor druk zetten bij het verlaten van het veld een waarde buiten bereik of een niet-numerieke waarde terug, met een korte melding. De dieptevelden worden hierbij niet naar 15 m teruggezet; een geregistreerd feit blijft staan.
- Het keuzemenu Duiksysteem toont SCUBA_OLV bovenaan en een schone start kiest SCUBA_OLV als beginwaarde. De toegestane waarden en de validatie blijven gelijk.
- Het plaatsaanduidingsveld bij Aanduiding gebruikt nu hetzelfde neutrale streepje als de andere velden in die rij.
- Het drukcheck-geluid staat standaard aan.
- Alles wissen vraagt nu eerst om bevestiging en daarna om het woord WIS exact over te typen voordat er iets wordt gewist.
- Appversielabel verhoogd naar v1.13.0; de bijbehorende zelftest controleert mee op v1.13.0. version.json bijgewerkt naar v1.13.0.
- Het opstart-zelftal gaat van 377 naar 389 door de vijf nieuwe zelftests met hun tegencontroles en een gesplitste controle op de standaard actieve duikers.

### Niet gewijzigd

- Rekenkern, tabelwaarden, blokkeerlogica, statussemantiek, validatie en schema zijn niet aangeraakt. De OSOD-recordlaag, de doelvalidator en Export/Import OSOD zijn ongewijzigd. Het gedrag van de updatecontrole en de installatiestrook blijft gelijk. _headers, site.webmanifest en de iconen blijven byte-identiek.

## [1.12.0] - 2026-06-22

De versiemelding "Nieuwe versie beschikbaar" staat niet langer als zwevende balk over de inhoud, maar als vaste strook in de pagina.

### Toegevoegd

- Een zelftest die borgt dat de versiemelding in de pagina-flow boven de installatiestrook staat en niet zwevend is.

### Gewijzigd

- De versiemelding "Nieuwe versie beschikbaar" is van een zwevende balk onderin omgezet naar een vaste strook in de pagina, in dezelfde stijl als de strook "Zet Duikmonitor op je beginscherm" en daarboven geplaatst. De melding valt daardoor niet meer over de onderste regels van een volle duikerlijst.
- Appversielabel verhoogd naar v1.12.0; de bijbehorende zelftest controleert mee op v1.12.0. version.json bijgewerkt naar v1.12.0.
- Het opstart-zelftal gaat van 376 naar 377 door de nieuwe zelftest op de plaatsing van de versiemelding.

### Niet gewijzigd

- Het gedrag van de updatecontrole blijft gelijk: de melding verschijnt alleen bij een nieuwere versie, verdwijnt vanzelf en herlaadt pas na een tik. De installatiestrook zelf verandert niet. Rekenkern, tabelwaarden, blokkeerlogica, statussemantiek, validatie en schema zijn niet aangeraakt. _headers, site.webmanifest en de iconen blijven byte-identiek.

## [1.11.0] - 2026-06-21

Een extra zelfcontrole op het versiebestand en een kort informatiekaartje over de standaard waarop de app rust.

### Toegevoegd

- Een zelftest die bij het opstarten controleert dat het versienummer in version.json exact gelijk is aan het versienummer van de app. Schuift version.json bij een nieuwe versie niet mee, dan valt het opstart-zelftal en wordt dat meteen zichtbaar in plaats van stil mis te gaan.
- Een ingeklapt kaartje "Over de OSOD-standaard" op de Instellingen-pagina. Het legt kort uit dat OSOD de Open Standaard Operationele Duikregistratie is, dat deze app de referentie-implementatie ervan is en de rekenregels en het record-formaat van die standaard volgt, en dat de standaard zelf openbaar is. Een knop opent de standaard.

### Gewijzigd

- Appversielabel verhoogd naar v1.11.0; de bijbehorende zelftest controleert mee op v1.11.0. version.json bijgewerkt naar v1.11.0.
- Het opstart-zelftal gaat van 374 naar 376 door de twee nieuwe zelftests: de controle op version.json en de controle op het OSOD-kaartje in de Instellingen-pagina.

### Niet gewijzigd

- Rekenkern, tabelwaarden, blokkeerlogica, statussemantiek, validatie en schema zijn niet aangeraakt. De versiemelding zelf is ongewijzigd; de nieuwe zelftest leest version.json en verandert die melding niet. _headers, site.webmanifest en de iconen blijven byte-identiek.

## [1.10.0] - 2026-06-21

De app merkt voortaan zelf op wanneer er een nieuwere versie klaarstaat en biedt aan om te vernieuwen, zonder ooit ongevraagd te herladen.

### Toegevoegd

- Een rustige versiemelding. Wanneer de app weer zichtbaar wordt nadat hij even is weggeweest, vraagt hij aan de eigen server welk versienummer nu het nieuwste is. Staat er een nieuwere versie klaar, dan verschijnt onderin een tikbare melding "Nieuwe versie beschikbaar, tik om te vernieuwen". De app herlaadt uitsluitend na een tik van de gebruiker, nooit vanzelf, zodat een lopende registratie nooit wordt onderbroken. Offline of bij een storing gebeurt er niets storends; de melding blijft dan gewoon weg.
- Een korte uitleg bij de versiemelding in het instellingengedeelte onder Privacy en lokaal gebruik. Er gaan bij deze controle geen gegevens mee; alleen het versienummer wordt opgehaald en vergeleken.
- Een nieuw bestand version.json in de hoofdmap met uitsluitend het versienummer. Dit bestand schuift bij elke nieuwe versie mee.

### Gewijzigd

- De beveiligingsinstelling voor uitgaande verbindingen staat nu toe dat de app het eigen versiebestand ophaalt. Verbindingen naar andere domeinen blijven geblokkeerd; er is geen tracking, geen externe bron en geen synchronisatie.
- Appversielabel verhoogd naar v1.10.0; de bijbehorende zelftest controleert mee op v1.10.0.
- Het opstart-zelftal gaat van 371 naar 374 door nieuwe zelftests die de versiemelding controleren: de melding verschijnt alleen bij een echt nieuwere versie, een onverwachte waarde leidt nooit tot een melding, en de tik is gekoppeld aan het vernieuwen.

### Niet gewijzigd

- Rekenkern, tabelwaarden, blokkeerlogica, statussemantiek, validatie en schema zijn niet aangeraakt. De versiemelding staat daar volledig los van. site.webmanifest en de iconen blijven byte-identiek.

## [1.9.0] - 2026-06-20

De statusbalk bovenin springt op een iPhone in staande stand niet langer op en neer bij elke opslag.

### Gewijzigd

- De groene verificatiestand bovenin toont nu een groen vinkje in plaats van het woord "geverifieerd". Daardoor past de bovenrij ook in rust op een regel en blijft de inhoud eronder staan tijdens het opslaan. De telling en het versienummer blijven zichtbaar; een schermlezer leest nog steeds "geverifieerd" voor.
- Appversielabel verhoogd naar v1.9.0; de bijbehorende zelftest controleert mee op v1.9.0.
- Het opstart-zelftal gaat van 370 naar 371 door een nieuwe zelftest die de drie standen van de verificatiebadge in de gerenderde balk controleert.

### Niet gewijzigd

- De oranje en de rode waarschuwingsstand houden hun volledige tekst, omdat dat de zeldzame standen zijn die juist moeten opvallen. De pil "Lokaal opgeslagen" blijft ongewijzigd. Rekenkern, tabelwaarden, blokkeerlogica, statussemantiek, validatie en schema zijn niet aangeraakt. site.webmanifest, _headers en de iconen blijven byte-identiek.

## [1.8.0] - 2026-06-20

Op iPhone zoomt de app niet meer in bij het aanraken van een invoerveld en blijft het scherm na kantelen naar liggende stand niet langer uitvergroot.

### Gewijzigd

- De viewport-instelling krijgt maximum-scale=1, zodat Safari niet meer automatisch op invoervelden inzoomt en het beeld na het draaien van het toestel op de normale schaal blijft. Zoomen door de gebruiker met user-scalable wordt niet uitgezet; alleen de automatische focus-zoom verdwijnt.
- Appversielabel verhoogd naar v1.8.0; de bijbehorende zelftest controleert mee op v1.8.0.
- Het opstart-zelftal gaat van 369 naar 370 door een nieuwe zelftest die de viewport-instelling controleert.

### Niet gewijzigd

- Rekenkern, tabelwaarden, blokkeerlogica, statussemantiek, validatie en schema zijn niet aangeraakt. De bestaande invoerstabiliteit en alle stijlregels blijven ongemoeid. site.webmanifest, _headers en de iconen blijven byte-identiek.

## [1.7.0] - 2026-06-20

Veiligheidsregio wordt een keuzelijst met de 25 officiele veiligheidsregio's en een werkende optie "anders" voor afwijkende waarden.

### Toegevoegd

- Veiligheidsregio is nu een keuzelijst met de 25 veiligheidsregio's (VR01 tot en met VR25). Een lege beginoptie "Kies veiligheidsregio" staat voorop, zodat een nieuw record leeg blijft tot er een keuze is gemaakt.
- Optie "anders" met een eigen tekstveld voor een afwijkende veiligheidsregio. Zodra "anders" wordt gekozen verschijnt het tekstveld, ook bij een leeg veld, en de lijst blijft op "anders" staan zodat de waarde kan worden getypt.
- Een geladen of geimporteerde waarde die geen van de 25 codes is, valt automatisch terug op "anders" en blijft volledig behouden. De vrije tekst heeft een eigen lengtegrens van 40 tekens.

### Gewijzigd

- Appversielabel verhoogd naar v1.7.0; de bijbehorende zelftest controleert mee op v1.7.0.
- De begrenzing van de vrije veiligheidsregio-tekst loopt nu via een eigen grens van 40 tekens. De lengtegrens van Post/Ploeg blijft 25 tekens.
- Het opstart-zelftal gaat van 361 naar 369 door nieuwe zelftests rond de keuzelijst, de "anders"-stand, de terugval bij afwijkende waarden en de lengtegrenzen.

### Niet gewijzigd

- Het OSOD-schema en de OSOD-validatieregel voor veiligheidsregio blijven ongewijzigd: een vrije, niet-lege string zonder keuzelijst of opsomming. Een lege veiligheidsregio blijft de OSOD-export blokkeren.
- Rekenkern, tabelwaarden, blokkeerlogica, statussemantiek, fingerprint en toetsvectoren zijn niet aangeraakt. site.webmanifest, _headers en de iconen blijven ongemoeid.

## [1.6.0] - 2026-06-19

Installatiestrook in de app toegevoegd; de losse webclip-pagina is vervallen.

### Toegevoegd

- Installatiestrook boven in de app: een opvallende strook met een vaste petrol/oranje weergave (gelijk in dag- en nachtmodus) die uitnodigt om Duikmonitor op het beginscherm te zetten. De strook staat standaard ingeklapt en klapt open met twee routes: iPhone en iPad (via Safari, Delen, Zet op beginscherm) en Android (via het browsermenu, App installeren of Toevoegen aan startscherm).
- Standalone-detectie die de installatiestrook verbergt zodra de app al als webapp op het beginscherm draait, zodat vaste gebruikers hun schermruimte houden. Puur cosmetisch; rekenkern, zelftests en bestaand gedrag blijven ongemoeid.

### Gewijzigd

- Appversielabel verhoogd naar v1.6.0; de bijbehorende zelftest-assertie controleert mee op v1.6.0. Het opstart-zelftal blijft 361/361.

### Verwijderd

- Het kaartje "Op je beginscherm zetten" op de Instellingen-pagina dat naar de verwijderde webclip-pagina verwees, is weggehaald. De installatiestrook neemt die functie over; er is geen verwijzing naar een webclip-pagina, configuratieprofiel of mobileconfig meer in de app.

### Niet gewijzigd

- Rekenkern, tabelwaarden, blokkeerlogica, statussemantiek, schema en toetsvectoren zijn niet aangeraakt. site.webmanifest, _headers en de iconen blijven ongemoeid.

## [1.5.0] - 2026-06-18

Officieel Duikmonitor-app-icoon (variant B helder) op het beginscherm en in de browser, en de knop naar de installatiepagina geeft voortaan de actieve schermstand mee.

### Toegevoegd

- Officiele app-iconen in de hoofdmap: favicon (SVG met PNG- en ICO-terugval in 16, 32, 192 en 512), maskable icoon van 512, apple-touch-iconen (algemeen, 120, 152, 167) en een webmanifest. Het iOS-beginscherm en de browser tonen nu het Duikmonitor-icoon in plaats van de terugval-letter D.
- Icoon-, manifest- en titelregels in de head van de app, met behoud van het bestaande dag- en nacht-themasysteem en de dynamische themakleur.

### Gewijzigd

- De knop "Op je beginscherm zetten" op de Instellingen-pagina geeft de opgeloste schermstand mee aan de installatiepagina (/webclip/?theme=day of /webclip/?theme=night), ook wanneer de voorkeur op automatisch staat. Knoptekst en stijl blijven gelijk.

### Niet gewijzigd

- Rekenkern, tabellen, daglimieten, opstijgingsregels, blokkeerlogica, statussemantiek, schema en toetsvectoren zijn niet aangeraakt. De installatiepagina en het configuratieprofiel onder /webclip/ blijven in deze versie ongewijzigd.

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
