/**
 * Reproduz um audio com um pitch especifico
 * @param {ArrayBuffer} arrayBuffer Dados do aúdio
 * @param {number} pitch Porcentagem para diminuir ou aumentar a frequência do som
 * @returns {AudioBufferSourceNode}
 */
export function playAudioWithPitch(arrayBuffer, pitch = 1.0) {
    const audioContext = new window.AudioContext();
    const source = audioContext.createBufferSource();
    
    audioContext.decodeAudioData(structuredClone(arrayBuffer))
        .then(audioBuffer => {
            source.buffer = audioBuffer;
            source.detune.value = Math.log2(pitch) * 1200;
            source.connect(audioContext.destination);
            source.start(0);
        })
        .catch(error => console.error(`Erro ao carregar o áudio:`, error));
    
    return source;
}
/** @param {string} url */
const fetchArrayBuffer = (url) => fetch(url).then(response => response.arrayBuffer())

export const targetHitAudioData = await fetchArrayBuffer("targetHit.wav");
export const errorAudioData = await fetchArrayBuffer("error-notification.mp3");
export const clocktick1 = await fetchArrayBuffer("clocktick1.wav");
export const clocktick2 = await fetchArrayBuffer("clocktick2.wav");
