import { TARGET_RADIUS } from "./config.js";


/** @type {HTMLCanvasElement}  */
export const canvas = document.getElementsByTagName('canvas')[0];

export function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

/**
 * @param {CanvasRenderingContext2D} context 
 * @param {number} x 
 * @param {number} y 
 * @param {number} radius 
 * @param {string} color 
 * @param {number} lineWidth 
 */
export function drawHollowCircle(context, x, y, radius, color, lineWidth) {
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, true);
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    context.stroke();
    context.closePath();
}
/**
 * @param {CanvasRenderingContext2D} context 
 * @param {number} x 
 * @param {number} y 
 * @param {number} radius 
 * @param {string} color 
 */
export function drawFilledCircle(context, x, y, radius, color) {
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, true);
    context.fillStyle = color;
    context.fill();
    context.closePath();
}
/**
 * Limpa o ecrã inteiro
 * @param {CanvasRenderingContext2D} context 
 * @param {string} color 
 */
export function clearScreen(context) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
}

/**
 * Desenha o alvo com centro em `targetPosition`
 * 
 * @param {CanvasRenderingContext2D} context 
 * @param {{x: number, y: number}} targetPosition 
 */
export function drawTarget(context, targetPosition) {
    drawFilledCircle(context, window.innerWidth * targetPosition.x, window.innerHeight * targetPosition.y, TARGET_RADIUS, "white", 3);
    drawFilledCircle(context, window.innerWidth * targetPosition.x, window.innerHeight * targetPosition.y, TARGET_RADIUS * 0.1, "red", 3);
    drawHollowCircle(context, window.innerWidth * targetPosition.x, window.innerHeight * targetPosition.y, TARGET_RADIUS * 0.2, "red", 3);
    drawHollowCircle(context, window.innerWidth * targetPosition.x, window.innerHeight * targetPosition.y, TARGET_RADIUS * 0.4, "red", 3);
    drawHollowCircle(context, window.innerWidth * targetPosition.x, window.innerHeight * targetPosition.y, TARGET_RADIUS * 0.6, "red", 3);
    drawHollowCircle(context, window.innerWidth * targetPosition.x, window.innerHeight * targetPosition.y, TARGET_RADIUS * 0.8, "red", 3);
    drawHollowCircle(context, window.innerWidth * targetPosition.x, window.innerHeight * targetPosition.y, TARGET_RADIUS, "red", 3);
}

/** @returns {CanvasRenderingContext2D}  */
export function context() {
    return canvas.getContext("2d")
}

resizeCanvas();
window.addEventListener("resize", () => resizeCanvas());
