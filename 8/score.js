import * as config from "./config.js"

let score = 0;

/**
 * Calcula a pontuação de precisão baseado na distância do cursor ao centro do circulo
 * @param {number} distance Distância em pixeis até o centro do circulo
 * @returns {number}
 */
export function calculateAccuracyScore(distance) {
    let accuracy = (config.TARGET_RADIUS - distance) / config.TARGET_RADIUS;
    return Math.round(accuracy * config.ACCURACY_SCORE_BASE);
}

/**
 * Calcula a pontuação de tempo
 * @param {number} time Tempo que o utilizador demorou a clicar no alvo em milisegundos 
 * @returns {number}
 */
export function calculateTimeScore(time) {
    return Math.round(config.TIME_SCORE_BASE * (500 / time));
}
export const getScore = () => score;
export const resetScore = () => updateScore(() => score = 0);
/**
 * Adiciona pontuação
 * @param {number} addedScore
 */
export const addScore  = (addedScore) => updateScore(() => score += addedScore);
/**
 * Calcula quanto o jogador pontuou ao clicar no alvo
 * 
 * @param {number} clickTime Quando tempo demorou para clicar no alvo
 * @param {number} distance A distância do rato ao centro do alvo
 * @param {"start" | "running"} gameState Estado do jogo
 * @returns {number}
 */
export function calculateAddedScore(clickTime, distance, gameState) {
    if(gameState == "start")
        return calculateAccuracyScore(distance)
    else 
        return calculateTimeScore(clickTime) + calculateAccuracyScore(distance)
}
/**
 * Atualiza o HTML depois de rodar a função `updator`
 * @param {() => number} updator Função que atualiza a pontuaçao
 */
export function updateScore(updator) {
    updator();
    document.getElementById("score").innerHTML = String(score);
    return score;
}