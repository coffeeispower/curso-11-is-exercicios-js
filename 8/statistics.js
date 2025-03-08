const DEFAULT_STATISTICS = {
    /** @type {number | null} */
    avgClickTime: null,
    clicks: 0,
    hits: 0,
    misses: 0,
    /** @type {number | null} */
    avgPrecision: null
};

let statistics = structuredClone(DEFAULT_STATISTICS);
let lastClickedTimestamp = +new Date();

/**
 * Regista o tempo que demorou para clicar
 * 
 * Após o tempo ser registado, o tempo vai ser resetado e vai
 * contar nas estatisticas.
 * @returns {number} quanto tempo demorou para clicar
 */
export function registerClickTime() {
    let currentTime = Date.now();
    let deltaTime = currentTime - lastClickedTimestamp;
    lastClickedTimestamp = currentTime;
    if(statistics.avgClickTime == null) {
        statistics.avgClickTime = deltaTime;
    } else{ 
        statistics.avgClickTime = ((statistics.avgClickTime * statistics.clicks) + deltaTime) / ++statistics.clicks;
    }
    statistics.hits++;
    statistics.clicks++;
    return deltaTime;
}
export function registerMiss() {
    statistics.misses++;
    statistics.clicks++;
    updateAveragePrecision(0);
}
/**
 * Atualiza a precisão média
 * @param {number} precision um número de 0 até 1 que representa o quão próximo do centro do alvo o jogador clicou
 */
export function updateAveragePrecision(precision) {
    if(statistics.avgPrecision == null) {
        statistics.avgPrecision = precision;
    } else {
        console.log("precision:", precision);
        console.log("statistics:", statistics)
        statistics.avgPrecision = ((statistics.avgPrecision * (statistics.clicks - 1)) + precision) / statistics.clicks;
    }
}
/**
 * Calcula quanto tempo se passou desde o ultimo clique sem registar
 * nada
 * 
 * @returns {number} Tempo em milisegundos
 */
export function getClickTime() {
    return Date.now() - lastClickedTimestamp;
}

export function resetStats() {
    statistics = structuredClone(DEFAULT_STATISTICS)
}


export function showStats() {
    const statisticsElements = {
        "avg-time": (statistics.avgClickTime/1000).toFixed(1)+"s",
        "total-clicks": statistics.clicks,
        "hits": statistics.hits,
        "misses": statistics.misses,
        "avg-precision": (statistics.avgPrecision*100).toFixed(1)+"%"
    };
    for (const [id, value] of Object.entries(statisticsElements)) {
        document.getElementById(id).innerText = value;
    }
}