let jsonData = [
    {
        "meaning": " prep.(在，向)的外面(的)",
        "word": "outside"
    },
    {
        "meaning": "n.片，块，段，件；断片，碎块 vt.拼合(凑)",
        "word": "piece"
    },
    {
        "meaning": " adv.有时，间或",
        "word": "sometimes"
    },
    {
        "meaning": "n.美，美丽；美人，美的东西",
        "word": "beauty"
    },
    {
        "meaning": "n.贸易，商业；行业 vi.贸易 vt.交换",
        "word": "trade"
    },
    {
        "meaning": "n.害怕，恐惧；危险 vt.畏惧，害怕，担心",
        "word": "fear"
    },
    {
        "meaning": "n.要求；需要 vt.要求；需要；询问，查问",
        "word": "demand"
    },
    {
        "meaning": "v.感到疑惑(好奇)，想知道 n.惊奇；奇迹",
        "word": "wonder"
    },
    {
        "meaning": "n.表，目录，名单 vt.把…编列成表，列举",
        "word": "list"
    },
    {
        "meaning": " vt.接(领,收)受；承认,同意；相信",
        "word": "accept"
    }
];

let currentPairIndex = -1;
let score = 0;

function startChooseMode() {
    currentPairIndex = -1;
    score = 0;
    clearMainDiv();
    loadNextQuestion();
}

function startFillBlankMode() {
    currentPairIndex = -1;
    score = 0;
    clearMainDiv();
    loadNextMeaning();
}

function clearMainDiv() {
    const mainDiv = document.getElementById('main');
    mainDiv.innerHTML = '';
}

function loadNextQuestion() {
    clearMainDiv();
    currentPairIndex = (currentPairIndex + 1) % jsonData.length;
    const word = jsonData[currentPairIndex].word;
    const options = getOptions(currentPairIndex);

    const wordDiv = document.createElement('div');
    wordDiv.id = 'word';
    wordDiv.textContent = word;

    const optionsDiv = document.createElement('div');
    optionsDiv.id = 'options';
    options.forEach((option, index) => {
        const optionButton = document.createElement('button');
        optionButton.className = 'option';
        optionButton.textContent = option.meaning;
        optionButton.onclick = () => checkAnswer(index);
        optionsDiv.appendChild(optionButton);
    });

    const mainDiv = document.getElementById('main');
    mainDiv.appendChild(wordDiv);
    mainDiv.appendChild(optionsDiv);
}

function loadNextMeaning() {
    clearMainDiv();
    currentPairIndex = (currentPairIndex + 1) % jsonData.length;
    const meaning = jsonData[currentPairIndex].meaning;

    const meaningDiv = document.createElement('div');
    meaningDiv.id = 'meaning';
    meaningDiv.textContent = meaning;

    const inputDiv = document.createElement('div');
    inputDiv.id = 'input';
    const inputBox = document.createElement('input');
    inputBox.type = 'text';
    inputDiv.appendChild(inputBox);

    const submitButton = document.createElement('button');
    submitButton.textContent = '确认';
    submitButton.onclick = () => checkFillBlankAnswer(inputBox.value);
    inputDiv.appendChild(submitButton);

    const mainDiv = document.getElementById('main');
    mainDiv.appendChild(meaningDiv);
    mainDiv.appendChild(inputDiv);
}

function getOptions(correctIndex) {
    const options = [jsonData[correctIndex]];
    while (options.length < 3) {
        const randomIndex = Math.floor(Math.random() * jsonData.length);
        const randomOption = jsonData[randomIndex];
        if (options.indexOf(randomOption) === -1 && randomIndex !== correctIndex) {
            options.push(randomOption);
        }
    }
    shuffleArray(options);
    return options;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


// index.js - Part 4
function checkAnswer(selectedIndex) {
    const userSelectedWord = getOptions(currentPairIndex)[selectedIndex].word.trim().toLowerCase();
    const correctWord = jsonData[currentPairIndex].word.trim().toLowerCase();

    if (userSelectedWord === correctWord) {
        score++;
        alert('恭喜你，答对了！！');
    } else {
        alert('很抱歉，回答错误。');
    }
    loadNextQuestion();
}

function checkFillBlankAnswer(userInput) {
    const userEnteredWord = userInput.trim().toLowerCase();
    const correctWord = jsonData[currentPairIndex].word.trim().toLowerCase();

    if (userEnteredWord === correctWord) {
        score++;
        alert('恭喜你，答对了！！');
    } else {
        alert('很抱歉，回答错误。');
    }
    loadNextMeaning();
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('chooseButton').addEventListener('click', startChooseMode);
    document.getElementById('fillButton').addEventListener('click', startFillBlankMode);
});
