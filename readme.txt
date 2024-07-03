Skigebiet-Quiz								Robin Neff, 3. Juli 2024
(Einstiegsbewertungsaufgabe FIA)

Das große Skigebiets-Quiz ist eine HTML/CSS und JavaScript basierte Quiz Anwendung, die Nutzern Fragen zu verschiedenen Skigebieten stellt, die richtigen Antworten zählt und am Ende des Quiz auswertet.
Die den Fragen zugrundeliegenden Daten wurden dem SnowTrex Skigebietsberater (https://www.snowtrex.de/skigebietsberater.html) entnommen.


Folgende Anforderungen waren zu erfüllen 
(in Klammern meine Kommentare zur Umsetzung in dieser Anwendung):

1. Der Spieler soll vor dem Start des Quiz seinen Namen eingeben können.
(Nach dem Startbildschirm, wo via dropdown Menü die Anzahl der Spieler zwischen 1 und 4 und die Option der Zeitbegrenzung aktiviert werden kann, gelangt der Spieler zur Nameneingabe. Falls für einen Spieler kein Name eingegeben wird, wird sein Name als Spieler X gespeichert, wobei X die Nummer des Spielers ist.)

2. Dem Spieler sollen nacheinander die Quizfragen präsentiert werden. Jede Frage soll 4 mögliche
Antwortmöglichkeiten bereitstellen (a, b, c, d) aus denen der Spieler eine Antwort wählen muss.
(Neben der Umsetzung dieser Anforderungen wurde auch ein 'Durchmischen' der Antworten bei jedem erneuten Fragen der Frage implementiert, sodass die richtige Antwort an verschiedenen Positionen erscheint.

3. Ein Durchgang soll 10 Fragen beinhalten. Um den Wiederspielwert zu erhöhen, sollen insgesamt
mindestens 20 Fragen verfügbar sein, aus denen bei jedem Start des Quiz 10 Fragen zufällig ausgewählt werden.
(Es sind nun 20 Fragen implementiert und mehr sind einfach hinzuzufügen. Fragen werden nacheinander zufällig ausgewählt [nicht alle auf einmal], dabei wird immer überprüft, dass die Frage in diesem Durchgang noch nicht gestellt wurde.)

4. Nach jeder Antwort soll dem Spieler kommuniziert werden, ob die Antwort richtig oder falsch war, bevor die nächste Frage präsentiert wird.
(Im Solospiel wird dem Spieler sofort nach der Antwort kommuniziert, welche Antwort richtig war und ob er richtig oder falsch lag. Falls das Zeitlimit aktiviert wurde, kann hier auch stehen, dass die Frage nicht rechtzeitig beantwortet wurde.
Im Spiel mit mehreren Spielern wird die richtige Antwort erst gezeigt, nachdem alle Spieler die Frage beantwortet haben, da momentan jede Frage von allen Spielern beantwortet wird.
Sobald die Anzahl an verfügbaren Fragen größer ist, soll auch eine Option implementiert werden, für jeden Spieler eine andere Frage zu würfeln.)

5. Für jede richtige Antwort gibt es einen Punkt.
(Ja. Für Zeitüberschreitung gibt es genauso 0 Punkte wie für Falschantworten.)

6. Nach der letzten Frage soll den Spieler sein Punktestand angezeigt werden. Je nach Punktestand soll der Spieler zur Belohnung einen Spruch präsentiert bekommen, der ihn dazu motiviert, es nochmal zu versuchen.
	a. Beispiele:
		i. 10 Punkte: Du scheinst ein richtiger Experte zu sein! SchaBst du das auch ein zweites
		Mal?
		ii. 9 Punkt: Das war knapp! SchaBst du beim nächsten Mal die volle Punktzahl?
		iii. Etc...
(Auf dem Endbildschirm bekommt jeder Spieler seinen Gesamtpunktestand und den entsprechenden Spruch präsentiert.)

7. Danach soll der Spieler vom Spiel gefragt werden, ob er nochmal spielen möchte. Wenn der Spieler sich dafür entscheidet, sollen erneut 10 Fragen zufällig aus der Menge der verfügbaren Fragen ausgewählt und das Quiz von vorne gestartet werden, ohne dass der Spieler nochmal seinen Namen eingeben muss.
(Auf dem Endbildschirm ist nicht nur ein Button, mit dem man zum Hauptmenü zurück kommen kann, sondern auch einer mit dem man das Spiel mit denselben Einstellungen und Spielern neustarten kann.)

8. BONUSAUFGABE (optional): Wenn der Spieler mehrfach spielt, sollen bevorzugt Fragen für das Quiz ausgewählt werden, die der Spieler noch nicht bzw. nicht so oft gesehen hat.
(Jede Frage hat zu Beginn ein 'Gewicht' von 1. Jedes Mal wenn eine Frage gestellt wird, erhöht sich ihr Gewicht um 1. Je höher das Gewicht einer Frage, desto größer wird die Wahrscheinlichkeit, dass sie neugewürfelt wird anstatt dass sie tatsächlich gestellt wird.
Diese Umsetzung funktioniert genau so wie ich es möchte, aber über sehr sehr viele Runden würde es eventuell das Spiel verlangsamen, insbesondere bei einem kleinen Pool an Fragen. Auch wenn diese Umsetzung nicht optimal ist, funktioniert sie für diese Anwendung problemlos, denn bevor die Performance spürbar beeinträchtigt würde, müsste jede Frage in einer Sitzung mit denselben Spielern/Optionen hunderte Male gefragt worden sein. Mit mehr Zeit würde ich hier noch einen neuen Algorithmus implementieren, der ohne diesen Nachteil funktioniert.)

9. BONUSAUFGABE (optional): Das Spiel merkt sich die Punktezahl aus der vorherigen Runde und gratuliert oder tröstet den Spieler, wenn es besser oder schlechter als in der Runde zuvor gelaufen ist.
(Das Spiel merkt sich die Punktezahl aus der vorherigen Runde und vergleicht sie mit der aktuellen. Je nach dem ob ein Spieler mehr, weniger, oder genausoviele Punkte hat wie zuvor, bekommt er einen positiven, negativen, oder neutralen Kommentar. Für jeden der 3 Kommentartypen existieren 4 Kommentare, die zufällig gemischt werden, sodass im Fall von 4 Spielern niemals derselbe Kommentar mehrmals auf dem Endbildschirm erscheint.)

10. BONUSAUFGABE (optional): Man kann sich zu Beginn entscheiden, ob man das Quiz allein oder zu zweit spielen möchte. Spielt man zu zweit, wird auch der zweite Spieler nach seinem Namen gefragt und die Spieler bekommen nacheinander je 10 Fragen präsentiert. Am Ende gewinnt der Spieler, der mehr Punkte gesammelt hat (oder es endet unentschieden bei gleicher Punktzahl).
(Auf dem Startbildschirm kann die Spielerzahl zwischen 1 und 4 gewählt werden. Jede Frage wird nacheinander von Spieler 1 bis 4 beantwortet, bevor die Auflösung präsentiert wird. Aktuell wird noch kein Gewinner explizit ausgerufen [aber die Punktezahl und Sprüche und Kommentare werden für jeden Spieler angezeigt])