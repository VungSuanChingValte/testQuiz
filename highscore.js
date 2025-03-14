const highScoreList = document.getElementById("highScoreList");
const highScores = JSON.parse(localStorage.getItem("highScore")) || [];

// Sort scores in descending order
highScores.sort((a, b) => b.score - a.score);

highScoreList.innerHTML = highScores
    .map(score => `<li class="high-score">${score.name} - ${score.score}</li>`)
    .join("");

// Function to clear high scores
function clearHighScores() {
    localStorage.removeItem("highScore");
    highScoreList.innerHTML = "<li>No high scores yet.</li>";
}

// Event listener for the clear button
document.getElementById("clearScores").addEventListener("click", clearHighScores);
