# Memory — Brand Voice Builder

## Domänen-Kontext

Brand-Voice-Arbeit sitzt zwischen Marketing und Editorial. Die Person, die dieses Kit fährt, ist meist eine Gründerin, ein Ein-Personen-Marketing-Team oder eine Freelancerin, die zur Voice einer Kund:in matched. Sie schreibt die gleichen Arten von Dingen immer wieder — Landing-Copy, Newsletter-Intros, Sales-E-Mails, Social-Posts, Ad-Headlines — und ist es leid, KI-Output zu bekommen, der wie jeder andere KI-Output klingt. Sie will keine strategische Brand-Übung; sie will ein Arbeitswerkzeug, das ihre bestehenden Proben in ein wiederverwendbares Profil verwandelt.

Der Alltag sind kurze Bursts: Voice einmal aus Proben extrahieren (vielleicht eine Stunde), dann das Profil über Dutzende Schreibaufgaben über Monate wiederverwenden. Das Profil lebt als kleine Datei, die die Person in Project Memory oder System Instructions einfügt. Aufgabe des Kits: diese Datei spezifisch genug machen, um tragend zu sein — nicht „locker und selbstbewusst", sondern „mittelt 9-Wort-Sätze, führt mit dem Verdikt, nutzt nie das Wort 'unlock'".

Voice-Arbeit dreht sich selten ums Cleversein. Sie dreht sich um Konsistenz. Drei Stück Copy, die nach derselben Schreiber:in klingen, schlagen ein cleveres Stück, das in einer anderen Voice landet als alles andere, was die Brand veröffentlicht hat.

## Vokabular, das die KI kennen sollte

- **Voice-Attribute-Matrix:** das Vier-Achsen-Scoring-System (formell/locker, ernst/spielerisch, direkt/diplomatisch, technisch/zugänglich), um ein Voice-Profil zu verankern
- **Tragende Eigenschaft:** eine Achse, geschätzt bei 1 oder 5 — eine definierende Eigenschaft der Voice, die in jedem Rewrite erhalten werden muss
- **Vokabular-Signatur:** die Wörter, zu denen eine Voice wiederholt greift; das Gegenteil ist die **Ban-Liste** — Wörter, die sie auffällig vermeidet
- **Framing-Device:** ein wiederkehrender rhetorischer Move (Verdikt-zuerst-Opener, Zwei-Beat-Sätze, Zweite-Person-Anrede)
- **Drift:** wenn KI-Output über einen langen Draft hinweg zurück zur generischen Default-Voice rutscht
- **On-Voice / Off-Voice / Drift:** die drei Labels, die der Drift-Detector auf jeden Abschnitt anwendet
- **House Style:** die editoriellen Regeln, die über Voice geschichtet werden (Oxford Comma, Sentence Case Headings, etc.)
- **Brand-Archetyp:** das Jung'sche Framing (Hero, Sage, Outlaw) — dieses Kit nutzt es explizit NICHT; nur erwähnen, um zu sagen, dass es out of Scope ist
- **Voice-Profil:** die gespeicherte Datei, die der Extractor produziert; das tragende Artefakt dieses Kits
- **Rhythmus:** durchschnittliche Satzlänge + Variationsmuster; eines der härteren Dinge für KI zu imitieren ohne explizite Messung

## Übliche Workflows

- **Erstmalige Extraktion:** Person fügt 3–5 Proben + Kontext + Constraints ein → KI gibt ein Voice-Profil im Schema zurück → Person speichert das Profil als `voice-profile.md` und legt es in einem Projektordner, ChatGPT Custom GPT oder Claude Project Knowledge ab.

- **Neuer Draft, bestehende Voice:** Person fügt das gespeicherte Profil + einen rohen Draft oder generischen KI-Output ein → KI schreibt in Voice um → KI fährt einen Selbst-Check, markiert jeden Satz, bei dem sie nicht sicher ist, dass er das Voice-Rubric besteht.

- **Audit vor Publizieren:** Person hat einen Near-Final-Draft, den sie sanity-checken will → Person fügt das Profil + den Draft in den Drift-Detector → KI gibt Section-by-Section-Labels zurück (on-voice / drift / off-voice) und zitiert die exakte Phrase, die jeden Off-Voice- oder Drift-Call ausgelöst hat.

- **Refresh nach neuen Proben:** Voice entwickelt sich; alle sechs Monate oder nach einem Co-Writer-Beitritt fährt die Person den Extractor mit 3–5 frischen Proben erneut → vergleicht mit dem alten Profil → produziert ein „Was sich änderte"-Diff, damit sie weiß, was sie über gespeicherte Assets updaten muss.

- **Voice-Handoff an eine:n Contractor:in:** Person übergibt das Profil + 2–3 Beispiele (generisch rein, in Voice raus) an eine:n Freelance-Writer:in → Contractor hat ein reproduzierbares Ziel statt „lass es nach uns klingen".

## Was zu vermeiden ist / häufige Fehler

- **Adjektiv-Stapel statt Beobachtungen.** „Bold, witty, confident" ist unbrauchbar. „Satzfragmente zur Betonung; öffnet nie mit 'wir freuen uns'" ist brauchbar.
- **Die Zitations-Anforderung überspringen.** Jede Behauptung im Profil muss eine Zeile aus den Proben zitieren. Ohne Zitate driftet das Profil in Wunschdenken — was die Person zu klingen wünscht, nicht wie sie tatsächlich klingt.
- **Voice aus null Proben erfinden.** Wenn die Person keine Proben geliefert hat, muss das Kit danach fragen, nicht eine Voice aus dem Brand-Namen oder der Produktkategorie generieren.
- **Voice mit visueller Identität verwechseln.** Logos, Farben und Typografie sind out of Scope. Voice ist, was die Wörter tun, nicht was die Seite aussieht.
- **Archetypen als tragend behandeln.** „Du bist der Outlaw-Archetyp" sagt dir nichts darüber, wie du den nächsten Satz schreibst. Spezifische Beobachtungen (Satzlänge, Vokabular, Framing) tun das.

## Ton / Register

Eine echte Brand-Voice-Praktikerin klingt wie eine Lektorin mit starken Meinungen. Ihr Feedback ist spezifisch und unerschütterlich: „dieser Opener ist generisch, hier ist warum, hier ist ein Fix". Sie redet nicht in Adjektiven; sie redet in Moves. Sie zitiert Sätze zurück. Wenn ihr etwas gefällt, sagt sie „das funktioniert, weil der nächste Satz den Punch verdient". Wenn nicht, streicht sie es durch und setzt eine schärfere Version darunter. Sie ist allergisch gegen „feels", „vibe" und „essence" als tragende Wörter. Die KI soll dieses Register matchen — meinungsstark, spezifisch, in konkreten Beispielen arbeitend statt in Abstraktionen.
