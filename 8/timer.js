import * as audio from "./audio.js";
import * as config from "./config.js";

let timeLeft = config.INITIAL_TIME;
let timerInterval = null;
let soundInterval = null;

/**
 * Inicia o timer
 * @param {() => void} onTimeout Callback para quando o temporizador chega a 0
 */
export function startTimer(onTimeout) {
    clearInterval(timerInterval);
    clearInterval(soundInterval);
    timeLeft = config.INITIAL_TIME;
    updateTimerDisplay();
    let tick2 = false;
    timerInterval = setInterval(() => {
        timeLeft -= 0.1;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            clearInterval(soundInterval);
            timeLeft = 0;
            onTimeout();
        }
        updateTimerDisplay();
    }, 100);

    // Sistema de temporização do som
    let soundDelay = 1000;
    const playTick = () => {
        audio.playAudioWithPitch(tick2 ? audio.clocktick2 : audio.clocktick1);
        tick2 =! tick2;
    };
    const updateSoundInterval = () => {
        if (soundInterval) clearInterval(soundInterval);
        soundDelay = Math.max(30, 1000 * (timeLeft / config.INITIAL_TIME));
        soundInterval = setInterval(updateSoundInterval, soundDelay);
        playTick();
    };

    updateSoundInterval();
}

/**
 * Atualiza a exibição do temporizador no HTML
 */
export function updateTimerDisplay() {
    const timerElement = document.getElementById("timer");
    if (timerElement) {
        timerElement.textContent = `${Math.floor(timeLeft / 60)}:${Math.floor(timeLeft % 60).toString().padStart(2, '0')}`;
    }
}

/**
 * Para e reinicia o temporizador
 */
export function resetTimer() {
    clearInterval(timerInterval);
    clearInterval(soundInterval);
    timeLeft = 30;
    updateTimerDisplay();
}

/**
 * Obtém o tempo restante atual
 * @returns {number} Segundos restantes
 */
export function getTimeLeft() {
    return timeLeft;
}


/**
 * Para o temporizador
 */
export function stopTimer() {
    clearInterval(timerInterval);
    clearInterval(soundInterval);
    updateTimerDisplay();
}

updateTimerDisplay();