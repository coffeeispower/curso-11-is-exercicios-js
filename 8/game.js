
import * as rendering from "./rendering.js";
import * as score from "./score.js"
import { renderScoreDeltas, ScoreDeltaText } from "./scoreDeltaTexts.js";
import * as config from "./config.js"
import * as audio from "./audio.js";
import * as statistics from "./statistics.js";
import * as timer from "./timer.js";

/**
 * Posição do alvo (coordenadas normalizadas de 0..1)
 */
let targetPosition = {
    x: 0.5,
    y: 0.5
};

/** @type {"start" | "running" | "gameOver"}  */
let gameState = "start";
/** Isto é usado para o utilizador não clicar muito cedo acidentalmente depois de perder */
let canResetGame = false;

function resetGame() {
    score.resetScore();
    statistics.resetStats();
    targetPosition = {x: 0.5, y: 0.5};
    gameState = "start";
    const gameOver = document.getElementById("game-over");
    gameOver.style.transform = "scale(0.0)";
    gameOver.style.removeProperty("animation-name");
    timer.resetTimer();
    canResetGame = false;
}

function endGame() {
    gameState = "gameOver";
    document.getElementById("game-over").style.animationName = "scale-easeInElastic";
    document.getElementById("game-over").style.transform = "scale(1.0)";
    statistics.showStats();
    setInterval(() => canResetGame = true, 1000);
}
const shouldGameOver = () => score.getScore() < 0 && gameState == "running";
function redraw() {
    if(shouldGameOver()) {
        endGame();
        timer.stopTimer();
    }
    rendering.resizeCanvas()
    const context = rendering.context();
    rendering.clearScreen(context);
    rendering.drawTarget(context, targetPosition);
    renderScoreDeltas(context);
    requestAnimationFrame(redraw);
}

redraw();
/**
 * Chamado quando o jogador clica no alvo
 * @param {number} distance Distância em pixeis até ao centro do alvo
 */
function onTargetClick(distance) {
    targetPosition.x = Math.random();
    targetPosition.y = Math.random();
    statistics.registerClickTime();
    const precision = (config.TARGET_RADIUS - distance) / config.TARGET_RADIUS;
    audio.playAudioWithPitch(audio.targetHitAudioData, 0.5 + precision);
    statistics.updateAveragePrecision(precision)
}

rendering.canvas.addEventListener("click", (event) => {
    const rect = rendering.canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const circleX = window.innerWidth * targetPosition.x;
    const circleY = window.innerHeight * targetPosition.y;
    const distance = Math.sqrt((mouseX - circleX) ** 2 + (mouseY - circleY) ** 2);
    if(gameState == "running" || gameState == "start") {
        const addedScore = score.calculateAddedScore(statistics.getClickTime(), distance, gameState);
        score.addScore(addedScore);
        if (distance <= config.TARGET_RADIUS) {
            onTargetClick(distance);
        } else {
            audio.playAudioWithPitch(audio.errorAudioData);
            statistics.registerMiss();
        }
        new ScoreDeltaText({ x: mouseX, y: mouseY }, addedScore);
    }
    if(gameState == "start") {
        gameState = "running";
        timer.startTimer(() => endGame());
    }
    if(gameState == "gameOver") {
        if(!canResetGame) return;
        resetGame();
    }
});
