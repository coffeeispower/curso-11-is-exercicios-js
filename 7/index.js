/**
 * @type {HTMLCanvasElement}
 */
let canvas = document.getElementById("rectangle-canvas");

/**
 * @type {HTMLInputElement}
 */
let widthInput = document.getElementById("width");

/**
 * @type {HTMLInputElement}
 */
let heightInput = document.getElementById("height");

let rectangleWidth = widthInput.valueAsNumber;
let rectangleHeight = heightInput.valueAsNumber;

widthInput.addEventListener("input", (_) => {
    rectangleWidth = widthInput.valueAsNumber;
    redraw();
});
heightInput.addEventListener("input", (_) => {
    rectangleHeight = heightInput.valueAsNumber;
    redraw();
});
/**
 * Desenha o retângulo no contexto.
 * @param {CanvasRenderingContext2D} ctx - Contexto de desenho do canvas.
 * @param {number} x - Coordenada x do retângulo.
 * @param {number} y - Coordenada y do retângulo.
 * @param {number} width - Largura do retângulo.
 * @param {number} height - Altura do retângulo.
 */
function drawRectangle(ctx, x, y, width, height) {
    ctx.strokeStyle = "black";
    const borderRadius = Math.min(width, height) * 0.1;

    // Criar a forma do retângulo arredondado
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x + borderRadius, y);
    ctx.lineTo(x + width - borderRadius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + borderRadius);
    ctx.lineTo(x + width, y + height - borderRadius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - borderRadius, y + height);
    ctx.lineTo(x + borderRadius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - borderRadius);
    ctx.lineTo(x, y + borderRadius);
    ctx.quadraticCurveTo(x, y, x + borderRadius, y);
    ctx.closePath();
    // desenhar o retângulo arredondado
    ctx.stroke();

    // Usar o retângulo como máscara para não deixar desenhar fora do retângulo
    ctx.clip();

    // Desenhar as linhas no meio de preenchimento
    const spacing = 10;
    for (let offset = -height; offset < width; offset += spacing) {
        ctx.beginPath();
        ctx.moveTo(x + offset, y + height);
        ctx.lineTo(x + offset + height, y);
        ctx.stroke();
    }
    // Tirar o clip
    ctx.restore();
}

/**
 * Desenha uma seta horizontal com setas em ambas as extremidades.
 * @param {CanvasRenderingContext2D} ctx - Contexto de desenho do canvas.
 * @param {number} startX - Coordenada inicial x da seta.
 * @param {number} y - Coordenada y comum à linha da seta.
 * @param {number} length - Comprimento da seta.
 * @param {number} arrowHeadSize - Tamanho das cabeças da seta.
 */
function drawHorizontalArrow(ctx, startX, y, length, arrowHeadSize) {
    // Linha principal
    ctx.beginPath();
    ctx.moveTo(startX, y);
    ctx.lineTo(startX + length, y);
    ctx.stroke();

    // Seta da esquerda
    ctx.beginPath();
    ctx.moveTo(startX, y);
    ctx.lineTo(startX + arrowHeadSize, y - arrowHeadSize);
    ctx.moveTo(startX, y);
    ctx.lineTo(startX + arrowHeadSize, y + arrowHeadSize);
    ctx.stroke();

    // Seta da direita
    ctx.beginPath();
    ctx.moveTo(startX + length, y);
    ctx.lineTo(startX + length - arrowHeadSize, y - arrowHeadSize);
    ctx.moveTo(startX + length, y);
    ctx.lineTo(startX + length - arrowHeadSize, y + arrowHeadSize);
    ctx.stroke();
}

/**
 * Desenha uma seta vertical com setas em ambas as extremidades.
 * @param {CanvasRenderingContext2D} ctx - Contexto de desenho do canvas.
 * @param {number} x - Coordenada x comum à linha da seta.
 * @param {number} startY - Coordenada inicial y da seta.
 * @param {number} length - Comprimento da seta.
 * @param {number} arrowHeadSize - Tamanho das cabeças da seta.
 */
function drawVerticalArrow(ctx, x, startY, length, arrowHeadSize) {
    // Linha principal
    ctx.beginPath();
    ctx.moveTo(x, startY);
    ctx.lineTo(x, startY + length);
    ctx.stroke();

    // Seta superior
    ctx.beginPath();
    ctx.moveTo(x, startY);
    ctx.lineTo(x - arrowHeadSize, startY + arrowHeadSize);
    ctx.moveTo(x, startY);
    ctx.lineTo(x + arrowHeadSize, startY + arrowHeadSize);
    ctx.stroke();

    // Seta inferior
    ctx.beginPath();
    ctx.moveTo(x, startY + length);
    ctx.lineTo(x - arrowHeadSize, startY + length - arrowHeadSize);
    ctx.moveTo(x, startY + length);
    ctx.lineTo(x + arrowHeadSize, startY + length - arrowHeadSize);
    ctx.stroke();
}

/**
 * Desenha uma etiqueta horizontal (por exemplo, para a largura) com fundo branco para melhor visibilidade.
 * @param {CanvasRenderingContext2D} ctx - Contexto de desenho do canvas.
 * @param {string} text - Texto a exibir.
 * @param {number} centerX - Coordenada horizontal central da etiqueta.
 * @param {number} labelY - Coordenada vertical (base do retângulo) usada para posicionar a etiqueta.
 * @param {number} fontSize - Tamanho da fonte.
 */
function drawHorizontalLabel(ctx, text, centerX, labelY, fontSize) {
    ctx.font = `${fontSize}px \"Inter\", sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";
    const metrics = ctx.measureText(text);
    const textWidth = metrics.width;
    const textHeight = fontSize; // aproximação
    ctx.save();
    ctx.fillStyle = "white";
    ctx.fillRect(centerX - textWidth / 2 - 4, labelY - textHeight - 4, textWidth + 8, textHeight);
    ctx.restore();
    ctx.fillText(text, centerX, labelY - 4);
}

/**
 * Desenha uma etiqueta vertical (por exemplo, para a altura) com rotação e fundo branco para melhor visibilidade.
 * @param {CanvasRenderingContext2D} ctx - Contexto de desenho do canvas.
 * @param {string} text - Texto a exibir.
 * @param {number} arrowX - Coordenada x da seta vertical.
 * @param {number} centerY - Coordenada vertical central da etiqueta.
 * @param {number} fontSize - Tamanho da fonte.
 */
function drawVerticalLabel(ctx, text, arrowX, centerY, fontSize) {
    ctx.font = `${fontSize}px \"Inter\", sans-serif`;
    ctx.save();
    // Translada para posicionar a etiqueta à direita da seta e centralizada
    ctx.translate(arrowX + 10, centerY);
    ctx.rotate(Math.PI / 2);
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    const metrics = ctx.measureText(text);
    const textWidth = metrics.width;
    const textHeight = fontSize; // aproximação
    ctx.save();
    ctx.fillStyle = "white";
    ctx.fillRect(-textWidth / 2 - 4, -4, textWidth + 8, textHeight + 2);
    ctx.restore();
    ctx.fillText(text, 0, -4);
    ctx.restore();
}

/**
 * Desenha o texto da área no centro de um retângulo.
 * @param {CanvasRenderingContext2D} ctx 
 * @param {number} rectX 
 * @param {number} rectY 
 * @param {number} rectWidth 
 * @param {number} rectHeight 
 * @param {string} text 
 * @param {number} preferredFontSize 
 */
function drawTextInsideBoundingBox(ctx, rectX, rectY, rectWidth, rectHeight, text, preferredFontSize) {

    // Inicia com o tamanho de fonte preferido
    let fontSize = preferredFontSize;
    ctx.font = fontSize + "px \"Inter\", sans-serif";
    // Mede as dimensões do texto
    let metrics = ctx.measureText(text);
    let textWidth = metrics.width;
    let textHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    // Reduz o tamanho da fonte enquanto o texto ultrapassar as dimensões do retângulo
    while ((textWidth > rectWidth || textHeight > rectHeight) && fontSize > 0) {
      fontSize--;
      ctx.font = fontSize + "px \"Inter\", sans-serif";
      metrics = ctx.measureText(text);
      textWidth = metrics.width;
      textHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    }

    // Calcula o centro do retângulo
    let centerX = rectX + rectWidth / 2;
    let centerY = rectY + rectHeight / 2;

    const bgX = centerX - textWidth / 2;
    const bgY = centerY - (textHeight/2);
    const bgWidth = textWidth;
    const bgHeight = textHeight;

    const padding = fontSize*0.5;
    fontSize -= padding / 2;
    ctx.font = fontSize + "px \"Inter\", sans-serif";
    metrics = ctx.measureText(text);
    textWidth = metrics.width;
    textHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    
    // Centralizar o texto
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    
    
    // Salva o estilo de preenchimento atual e desenha o fundo branco
    const oldFillStyle = ctx.fillStyle;
    ctx.fillStyle = "white";
    ctx.fillRect(bgX, bgY, bgWidth, bgHeight);
    
    // Restaura o estilo original e desenha o texto centralizado
    ctx.fillStyle = oldFillStyle;
    ctx.fillText(text, centerX, centerY);
  }
  

/**
 * Redesenha o retângulo e os elementos associados (setas, etiquetas e texto da área).
 */
function redraw() {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Parâmetros de padding e da seta
    const padding = 40;
    const arrowGap = 10;
    const arrowHead = 6;

    // Área de desenho disponível
    const availableWidth = canvas.width - 2 * padding;
    const availableHeight = canvas.height - 2 * padding;

    // Calcula escala para que o retângulo caiba na área disponível
    const scale = Math.min(availableWidth / rectangleWidth, availableHeight / rectangleHeight, 1);
    const drawWidth = rectangleWidth * scale;
    const drawHeight = rectangleHeight * scale;

    // Centra o retângulo na área com padding
    const x = padding + (availableWidth - drawWidth) / 2;
    const y = padding + (availableHeight - drawHeight) / 2;

    // Desenha o retângulo
    drawRectangle(ctx, x, y, drawWidth, drawHeight);

    // Desenha a área (texto central)
    const area = rectangleWidth * rectangleHeight;
    const centerX = x + drawWidth / 2;
    const areaFontSize = Math.min(20, drawHeight);

    drawTextInsideBoundingBox(ctx, x, y, drawWidth, drawHeight, area.toString() + " px²", 20)

    // Desenha a seta horizontal (largura)
    const arrowY = y - arrowGap;
    if(drawWidth > 30)
        drawHorizontalArrow(ctx, x, arrowY, drawWidth, arrowHead);

    // Define o tamanho da fonte para a etiqueta da largura
    const fontSizeWidth = Math.min(20, drawWidth / rectangleWidth.toString().length);
    drawHorizontalLabel(ctx, rectangleWidth.toString() + " px", centerX, y, fontSizeWidth);

    // Desenha a seta vertical (altura)
    const arrowX = x + drawWidth + arrowGap;
    if(drawHeight > 18)
        drawVerticalArrow(ctx, arrowX, y, drawHeight, arrowHead);

    // Desenha a etiqueta da altura
    drawVerticalLabel(ctx, rectangleHeight.toString() + " px", arrowX, y + drawHeight / 2, areaFontSize);
}

redraw();
