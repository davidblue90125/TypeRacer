document.addEventListener('DOMContentLoaded', function() {
    setupTestButtons();

    const easyTexts = [
        "The cat sat on the mat.",
        "A quick brown fox jumps over the lazy dog.",
        "She sells seashells by the seashore."
    ];

    const mediumTexts = [
        "To be or not to be, that is the question.",
        "All that glitters is not gold.",
        "A journey of a thousand miles begins with a single step."
    ];

    const hardTexts = [
        "It was the best of times, it was the worst of times.",
        "In the beginning God created the heavens and the earth.",
        "The only thing we have to fear is fear itself."
    ];

    const difficultySelect = document.getElementById('difficulty');
    const sampleTextDiv = document.getElementById('sample-text');
    let startTime = null;
    let endTime = null;

    function getRandomText(textArray) {
        const randomIndex = Math.floor(Math.random() * textArray.length);
        return textArray[randomIndex];
    }

    function updateSampleText() {
        let selectedDifficulty = difficultySelect.value;
        let selectedText;

        if (selectedDifficulty === 'easy') {
            selectedText = getRandomText(easyTexts);
        } else if (selectedDifficulty === 'medium') {
            selectedText = getRandomText(mediumTexts);
        } else if (selectedDifficulty === 'hard') {
            selectedText = getRandomText(hardTexts);
        }

        sampleTextDiv.textContent = selectedText;
        updateTypingFeedback();
    }

    function startTest() {
    startTime = performance.now();
    endTime = null;
    disableButton('start-btn', true);
    disableButton('stop-btn', false);
    clearUserInput();
    }

function stopTest() {
    if (startTime) {
        endTime = performance.now();
        const elapsedSeconds = ((endTime - startTime) / 1000).toFixed(2);
        displayTime(elapsedSeconds);
    }
    disableButton('start-btn', false);
    disableButton('stop-btn', true);
}

function disableButton(buttonId, shouldDisable) {
    const btn = document.getElementById(buttonId);
    if (btn) {
        btn.disabled = shouldDisable;
    }
}

function displayTime(time) {
    const timeSpan = document.getElementById('time');
    if (timeSpan) {
        timeSpan.textContent = time;
    }
}

function clearUserInput() {
    const input = document.getElementById('user-input');
    if (input) {
        input.value = '';
        input.focus();
        updateTypingFeedback();
    }
}

function setupTestButtons() {
    const startBtn = document.getElementById('start-btn');
    const stopBtn = document.getElementById('stop-btn');
    if (startBtn && stopBtn) {
        startBtn.addEventListener('click', startTest);
        stopBtn.addEventListener('click', stopTest);
        disableButton('stop-btn', true); // Stop button disabled initially
    }
}

function getCorrectWordCount(userInput, sampleText) {
    const userWords = userInput.trim().split(/\s+/);
    const sampleWords = sampleText.trim().split(/\s+/);
    let correctCount = 0;
    for (let i = 0; i < Math.min(userWords.length, sampleWords.length); i++) {
        if (userWords[i] === sampleWords[i]) {
            correctCount++;
        }
    }
    return correctCount;
}

function displayWPM(wpm) {
    const wpmSpan = document.getElementById('wpm');
    if (wpmSpan) {
        wpmSpan.textContent = wpm;
    }
}

function displayLevel(level) {
    const levelSpan = document.getElementById('level');
    if (levelSpan) {
        levelSpan.textContent = level.charAt(0).toUpperCase() + level.slice(1);
    }
}

function stopTest() {
    if (startTime) {
        endTime = performance.now();
        const elapsedSeconds = ((endTime - startTime) / 1000).toFixed(2);
        displayTime(elapsedSeconds);

        const userInput = document.getElementById('user-input').value;
        const sampleText = document.getElementById('sample-text').textContent;
        const correctWords = getCorrectWordCount(userInput, sampleText);
        const minutes = (endTime - startTime) / 60000;
        const wpm = minutes > 0 ? Math.round(correctWords / minutes) : 0;
        displayWPM(wpm);

        const difficultySelect = document.getElementById('difficulty');
        displayLevel(difficultySelect.value);
    }
    disableButton('start-btn', false);
    disableButton('stop-btn', true);
}

function updateTypingFeedback() {
    const userInput = document.getElementById('user-input').value;
    const sampleText = document.getElementById('sample-text').textContent;
    const feedbackArea = document.getElementById('feedback-area');
    const userWords = userInput.trim().split(/\s+/);
    const sampleWords = sampleText.trim().split(/\s+/);

    let feedbackHTML = '';
    for (let i = 0; i < userWords.length; i++) {
        if (userWords[i] === sampleWords[i]) {
            feedbackHTML += `<span style="color:blue;">${userWords[i]}</span> `;
        } else {
            feedbackHTML += `<span style="color:red;">${userWords[i]}</span> `;
        }
    }
    feedbackArea.innerHTML = feedbackHTML.trim();
}

function setupTypingFeedback() {
    const userInput = document.getElementById('user-input');
    if (userInput) {
        userInput.addEventListener('input', updateTypingFeedback);
    }
}

    difficultySelect.addEventListener('change', updateSampleText);
    setupTypingFeedback();
    updateSampleText();
});