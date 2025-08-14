// Typing test sample texts by difficulty
const sampleTexts = {
	easy: [
		"The cat sat on the mat.",
		"Dogs bark at night.",
		"Birds fly in the sky."
	],
	medium: [
		"Typing is a useful skill for everyone.",
		"Practice makes perfect in every activity.",
		"The quick brown fox jumps over the lazy dog."
	],
	hard: [
		"She sells seashells by the seashore, and the shells she sells are surely seashells.",
		"Amazingly few discotheques provide jukeboxes.",
		"The five boxing wizards jump quickly over the lazy dog."
	]
};

function getRandomText(level) {
	const texts = sampleTexts[level] || sampleTexts.easy;
	return texts[Math.floor(Math.random() * texts.length)];
}

function updateSampleText() {
	const difficultySelect = document.getElementById('difficulty');
	const sampleTextDiv = document.getElementById('sample-text');
	const level = difficultySelect.value;
	const text = getRandomText(level);
	sampleTextDiv.textContent = text;
}

document.addEventListener('DOMContentLoaded', function() {
	const difficultySelect = document.getElementById('difficulty');
	if (difficultySelect) {
		difficultySelect.addEventListener('change', updateSampleText);
		updateSampleText(); // Set initial text
	}
});

