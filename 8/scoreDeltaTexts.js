export class ScoreDeltaText {
    /** Progresso da animação em porcentagem */
    animationProgress = 0
    /** Quando o ultimo frame foi renderizado */
    lastTime = Date.now()
    addedScore
    position
    
    /**
     * @param {{x: number, y: number}} position 
     * @param {number} addedScore 
     */
    constructor(position, addedScore) {
        this.addedScore = addedScore;
        this.position = position;
        scoreDeltaTexts.push(this);
    }
    /**
     * @param {CanvasRenderingContext2D} context 
     */
    render(context) {
        context.save();
        context.globalAlpha = Math.min((1 - this.animationProgress)*2, 1.0);
        context.fillStyle = 'white';
        context.font = `${Math.max(20, (this.addedScore/400)*50)}px "Gang Of Three"`;
        context.textAlign = "center";
        context.textBaseline = "bottom";
        const textX = this.position.x;
        const textY = this.position.y + (this.position.y > 100 ? this.animationProgress * -50 : this.animationProgress * 50);
        const text = `${this.addedScore >= 0 ? "+" : "-"}${Math.abs(this.addedScore)}`;
        context.fillText(text, textX, textY);
        context.restore();
        this.update();
    }

    update() {
        const currentTime = Date.now();
        const deltaTime = (currentTime - this.lastTime) / 1000; // Convert to seconds
        this.lastTime = currentTime;
        this.animationProgress += (1 - this.animationProgress) * deltaTime * 2;
    }
}

/**
 * @type {ScoreDeltaText[]}
 */
let scoreDeltaTexts = [];

/**
 * @param {CanvasRenderingContext2D} context 
*/
export function renderScoreDeltas(context) {
    for(const scoreDeltaText of scoreDeltaTexts) {
        scoreDeltaText.render(context);
    }
    scoreDeltaTexts = scoreDeltaTexts.filter((scoreText) => scoreText.animationProgress < 0.98)
}