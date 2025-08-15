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

    difficultySelect.addEventListener('change', updateSampleText);
    

    // Initialize with a random text from the default difficulty level
    updateSampleText();
});