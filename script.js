// script.js

let currentQuestionIndex = 0;
let currentPlayer = 0;
let playerAnswers = ["1","2","3","3"];
let playerPreviousScores = [0,0,0,0];
let roundsPlayed = 0;
let scores = [];
let players = [];
let questions = [
    { text: "Welches französische Skigebiet hat die meisten Pistenkilometer in Frankreich?", answers: ["Megève (Mont Blanc)", "La Toussuire", "Tignes", "Saint Sorlin (Les Sybelles)"], correct: "Megève (Mont Blanc)", weight: 1},
    { text: "Welches französischen Skigebiet hat die am höchsten gelegenen Teile in Frankreich?", answers: ["Vaujany (Alpe d'Huez)", "Val Thorens (Les 3 Vallées)", "Val d'Isère", "Les 2 Alpes"], correct: "Les 2 Alpes", weight: 1},
    { text: "Bis in welche Höhe erstreckt sich das am höchsten gelegene französische Skigebiet?", answers: ["3.560 m", "3.456 m", "3.330 m", "3.798 m"], correct: "3.560 m", weight: 1},
    { text: "Wieviele Pistenkilometer hat das französische Skigebiet Val Cenis?", answers: ["135", "160", "125", "110"], correct: "125", weight: 1},
    { text: "In welchem Land befindet sich das Skigebiet Vars?", answers: ["Deutschland", "Frankreich", "Österreich", "Schweiz"], correct: "Frankreich", weight: 1},
    { text: "In welcher Region befindet sich der in Italien gelegene Ort Brixen?", answers: ["Eisacktal", "Fassatal", "Paganella", "Campiglio"], correct: "Eisacktal", weight: 1},
    { text: "Welcher dieser Orte befindet sich in der Region Allgäu?", answers: ["Füssen", "Kartitsch", "Suhl", "Bodenmais"], correct: "Füssen", weight: 1},
    { text: "In welchem Land befindet sich der Ort Winterberg?", answers: ["Deutschland", "Frankreich", "Österreich", "Schweiz"], correct: "Deutschland", weight: 1},
    { text: "Welches dieser Skigebiete ist das kleinste?", answers: ["Waldmünchen (Bayerischer Wald)", "Oberharmersbach (Schwarzwald)", "Altmünster am Traunsee (Traunsee)", "Bodenmais (Bayerischer Wald)"], correct: "Waldmünchen (Bayerischer Wald)", weight: 0},
    { text: "Wie heißt die größte Skiregion Italiens?", answers: ["Via Lattea", "Les Sybelles", "Monte Rosa", "Seiser Alm"], correct: "Via Lattea", weight: 1},
    { text: "Welches Skigebiet Deutschlands hat mit 60km die größte Summe an Pistenlänge?", answers: ["Oberwiesenthal (Erzgebirge)", "Oberstaufen (Allgäu)", "Winterberg", "Grainau (Zugspitze)"], correct: "Grainau (Zugspitze)", weight: 1},
    { text: "Wie hoch ist der tiefste Punkt des französischen Skigebietes Alpe d'Huez?", answers: ["1.125 km", "975 m", "1.250 km", "620 m"], correct: "1.125 km", weight: 1},
    { text: "Wieviele km an Piste gibt es in den Kitzbüheler Alpen in Österreich?", answers: ["188", "186", "205", "69"], correct: "188", weight: 1},
    { text: "Wieviele Urlaubsorte befinden sich in der Region SkiWelt Wilder Kaiser-Brixental?", answers: ["8", "9", "7", "6"], correct: "8", weight: 1},
    { text: "Welches Skigebiet Österreichs hat die größte Summe an Pistenlänge?", answers: ["St. Anton am Arlberg", "Saalbach-Hinterglemm", "Kufsteinerland", "Paznauntal"], correct: "St. Anton am Arlberg", weight: 1},
	{ text: "Wieviele km an Piste gibt es im Grand Massif in Frankreich?", answers: ["250", "265", "280", "320"], correct: "265", weight: 1},
	{ text: "In welcher Region befindet sich der in Italien gelegene Ort Champoluc?", answers: ["Eisacktal", "Paganella", "Via Lattea", "Monte Rosa"], correct: "Monte Rosa", weight: 1},
	{ text: "In welcher Region befindet sich der in Österreich gelegene Ort Hochfilzen?", answers: ["Kitzbüheler Alpen", "Seiser Alm", "Pillerseetal", "Gerlos-Königsleiten"], correct: "Pillerseetal", weight: 1},
	{ text: "Welcher dieser Orte befindet sich in den Kitzbüheler Alpen?", answers: ["Kirchdorf in Tirol", "Waidring", "St. Ulrich", "Wolkenstein"], correct: "Kirchdorf in Tirol", weight: 1},
	{ text: "Wieviele km an Piste gibt es im Skigebiet des in Italien gelegenen Ortes Bormio?", answers: ["30", "40", "50", "60"], correct: "50", weight: 1},
    // Add more questions as needed
];

let posComments = ["Du hast dich deutlich verbessert!" , "Mehr als letzte Runde!" , "Du hast dich gesteigert!" , "So langsam geht's bergauf!" ]
let neutComments = [ "Weder besser noch schlechter als zuvor!" , "Genau die gleiche Punktzahl wie beim letzten Mal!" , "Zwar nicht mehr aber immerhin auch nicht weniger als vorher!" , "Du bist immerhin konstant!" ]
let negComments = [ "Du hast nachgelassen!" , "Ich bin enttäuscht!" , "Du bist tatsächlich schlechter geworden!" , "Ich dachte nicht, dass du dich selber unterbieten würdest!" ]
let pointComment = [ "Du scheinst ein richtiger Skigebiets Experte zu sein!" , "Das war knapp! Schaffst du beim nächsten Mal die volle Punktzahl?" , "Noch zwei Punkte mehr wären perfekt gewesen!" , "Du hast mehr als zwei Drittel der Fragen richtig beantwortet!" , "Hey, mehr als die Hälfte der Antworten ist korrekt!", "Du hast die Hälfte richtig!" , "Knapp weniger als die Hälfte immerhin!", "Drei? Das kannst du sicher besser!" , "Weniger als der Durchschnitt bei zufälligen Antworten!" , "Das kann doch nicht dein Ernst sein?!" , "Keine einzige Antwort richtig, du legst es wohl drauf an!"]
let usedQuestions = [];
let availableQuestions = [];
let timer;
let timeLeft = 10;
let timerEnabled = false;

function startGame() {
	if (timerEnabled) {
		clearInterval(timer)
		}
    const playerCount = document.getElementById('player-count').value;
    timerEnabled = document.getElementById('timer-option').checked;
    const nameInputsContainer = document.getElementById('name-inputs'); // Show the name input screen
    nameInputsContainer.innerHTML = ''; // Clear any previous inputs
    for (let i = 0; i < playerCount; i++) {
		const inputDiv = document.createElement('div');
        inputDiv.style.marginBottom = '10px'; // Adds space between inputs
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = `Name für Spieler ${i + 1}`;
        input.id = `player-name-${i}`;
        inputDiv.appendChild(input);
        nameInputsContainer.appendChild(inputDiv);
    }
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('name-input-screen').classList.remove('hidden');
    document.getElementById('submit-names').onclick = collectPlayerNames;
}

function collectPlayerNames() {
    const playerCount = document.getElementById('player-count').value;
    players = [];
    scores = [];
	
    for (let i = 0; i < playerCount; i++) {
        let playerName = document.getElementById(`player-name-${i}`).value.trim();
        if (playerName === '') {
            playerName  = `Spieler ${i + 1}`
        }
        players.push(playerName);
        scores.push(0);
    }

    document.getElementById('name-input-screen').classList.add('hidden');
    document.getElementById('question-screen').classList.remove('hidden');

    if (playerCount < 2) {
        document.getElementById('turn-text').classList.add('hidden');
		document.getElementById('as-turn-text').classList.add('hidden');
    } else {
        document.getElementById('turn-text').classList.remove('hidden');
		document.getElementById('as-turn-text').classList.remove('hidden');
    }
    usedQuestions = [];
    currentPlayer = 0;
	document.getElementById('turn-text').innerText = `${players[currentPlayer]} ist an der Reihe:`;
    nextQuestion();
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function nextQuestion() {
	document.getElementById('answer-screen').classList.add('hidden');
	document.getElementById('question-screen').classList.remove('hidden');
    if (usedQuestions.length === 10) {
        endGame();
        return;
    }
	if (timerEnabled) {
		clearInterval(timer)
        timeLeft = 10;
        document.getElementById('timer').classList.remove('hidden');
        document.getElementById('time-left').innerText = timeLeft;
        timer = setInterval(() => {
            timeLeft--;
            document.getElementById('time-left').innerText = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timer);
                submitAnswer(true, 'No Answer');
            }
        }, 1000);
    } 
	else {
        document.getElementById('timer').classList.add('hidden');
    }
    currentQuestionIndex = getRandomQuestion();
	usedQuestions.push(questions[currentQuestionIndex]);
    const question = questions[currentQuestionIndex];
	questions[currentQuestionIndex].weight = questions[currentQuestionIndex].weight + 1;
    document.getElementById('question-text').innerText = question.text;
	const answersDiv = document.getElementById('answers');
    const shuffledAnswers = question.answers;
	shuffleArray(shuffledAnswers);
	answersDiv.innerHTML = '';
	shuffledAnswers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.innerText = answer;
        button.onclick = () => submitAnswer(false, answer);
        answersDiv.appendChild(button);
    });
}

function getRandomQuestion() {
	let randomNum = Math.round(Math.random() * questions.length);
	if (randomNum == questions.length) {randomNum = 0};
	let randomNum2 = Math.round(Math.random() * questions[randomNum].weight);
	if (randomNum2 == 0) {randomNum == questions[randomNum].weight};
	
	do {
		if (questions[randomNum].weight == 1 && !(usedQuestions.includes(questions[randomNum]))) {return randomNum}
		else {
			if (randomNum2 == questions[randomNum].weight && !(usedQuestions.includes(questions[randomNum]))) {return randomNum};
			randomNum2 = Math.round(Math.random() * questions[randomNum].weight);
			if (randomNum2 == 0) {randomNum = questions[randomNum].weight};
			}
		randomNum = Math.round(Math.random() * questions.length);
		if (randomNum == questions.length) {randomNum = 0};
		}
	while ((usedQuestions.includes(questions[randomNum])) || randomNum2 != questions[randomNum].weight)
	return randomNum;
// if weight > 1 then generate random number between 0 and weight of the question and only if random number is equal to the weight, the question is used and it's index number is returned otherwise a new random pick is generated until either a question with weight 1 gets picked or a question with weight > 1 rolls it's weight as confirmation.
}

function submitAnswer(timedOut, answerContent) {
//reset timer and consequence
	if (timerEnabled) {
		clearInterval(timer)
        timeLeft = 10;
        document.getElementById('timer').classList.remove('hidden');
        document.getElementById('time-left').innerText = timeLeft;
        timer = setInterval(() => {
            timeLeft--;
            document.getElementById('time-left').innerText = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timer);
                submitAnswer(true, 'No Answer');
            }
        }, 1000);}
// Define question constant as the entry nr currentQuestionIndex of array questions    
	const question = questions[currentQuestionIndex];
    if (!timedOut && answerContent === question.correct) {
        scores[currentPlayer]++;
		}
	playerAnswers[currentPlayer] = answerContent;
	if (currentPlayer == players.length-1) {
		currentPlayer = 0;
		document.getElementById('turn-text').innerText = `${players[currentPlayer]} ist an der Reihe:`;
		answerEvaluation()
		}
	else {
		currentPlayer++
		document.getElementById('turn-text').innerText = `${players[currentPlayer]} ist an der Reihe:`;
		}
}

function endGame() {
	if (timerEnabled) {
		clearInterval(timer)
		}
    document.getElementById('question-screen').classList.add('hidden');
	document.getElementById('answer-screen').classList.add('hidden');
    document.getElementById('final-screen').classList.remove('hidden');
	shuffleArray(posComments);
	shuffleArray(neutComments);
	shuffleArray(negComments);
    const scoresDiv = document.getElementById('scores');
    scoresDiv.innerHTML = '';
    scores.forEach((score, index) => {
		const commentNumber = 10-score
        const playerScore = document.createElement('div');
			if (roundsPlayed == 0) {playerScore.innerText = `${players[index]}: ${score}/10. ${pointComment[commentNumber]}`}
			else {
				if (score > playerPreviousScores[index]) {playerScore.innerText = `${players[index]}: ${score}/10. ${pointComment[commentNumber]} ${posComments[index]}`}
				else if (score == playerPreviousScores[index]){playerScore.innerText = `${players[index]}: ${score}/10. ${pointComment[commentNumber]} ${neutComments[index]}`}
				else {playerScore.innerText = `${players[index]}: ${score}/10. ${pointComment[commentNumber]} ${negComments[index]}`}
				}
        scoresDiv.appendChild(playerScore);
		playerPreviousScores[index] = scores[index]
    })
	roundsPlayed++;
}

function startNewGame() {
    usedQuestions = [];
    currentPlayer = 0;
    scores = scores.map(() => 0);
    nextQuestion();
    document.getElementById('question-screen').classList.remove('hidden');
    document.getElementById('final-screen').classList.add('hidden');
}

function resetGame() {
	usedQuestions = [];
	roundsPlayed = 0;
    currentPlayer = 0;
    scores = scores.map(() => 0);
	playerPreviousScores = [0,0,0,0];
	for (let i = 0; i < questions.length; i++) {questions[i].weight = 1}
    document.getElementById('final-screen').classList.add('hidden');
    document.getElementById('start-screen').classList.remove('hidden');
}

function answerEvaluation() {
	if (timerEnabled) {
		clearInterval(timer)
		}
	document.getElementById('answer-screen').classList.remove('hidden');
	document.getElementById('question-screen').classList.add('hidden');
	let question = questions[currentQuestionIndex];
	document.getElementById('as-question-text').innerText = question.text;
	document.getElementById('correct-answer').innerText = question.correct;
	const answersDiv = document.getElementById('player-answers');
    answersDiv.innerHTML = '';

	for (let i = 0; i < players.length; i++) {
				const playerScore = document.createElement('div');
			if (playerAnswers[i] == 'No Answer') {
				if (players.length == 1) {playerScore.innerText = `Du hast die Frage nicht rechtzeitig beantwortet.`}
			else {playerScore.innerText = `${players[i]} hat die Frage nicht rechtzeitig beantwortet.`}
				}
			else if  (playerAnswers[i] == question.correct) {
				if (players.length == 1) {playerScore.innerText = `Du hast die richtige Antwort gewählt!`}
			else {playerScore.innerText = `${players[i]} hat die richtige Antwort gewählt.`}
				}
			else {
				if (players.length == 1) {playerScore.innerText = `Deine Antwort (${playerAnswers[0]}) ist falsch!`}
			else {playerScore.innerText = `${players[i]}'s Antwort (${playerAnswers[i]}) ist falsch!`}
				}
			answersDiv.appendChild(playerScore);
		}
	}

function moveAlong() {
    if (currentPlayer === 0 && usedQuestions.length === 10) {
        endGame();
    } else {
		document.getElementById('turn-text').innerText = `${players[currentPlayer]} ist an der Reihe:`;
        nextQuestion();
	}
}