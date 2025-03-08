const inputIds = ["n1", "n2", "n3", "n4"];
const weightMap = {
    n1: 0.4,
    n2: 0.4,
    n3: 0.1,
    n4: 0.1,
}
/**
 * @type {HTMLInputElement}
 * */
const outputInput = document.getElementById("nfinal");
function onInputChange() {
    let result = 0;
    for (const inputId of inputIds) {
        const input = document.getElementById(inputId);
        const valueNumber = Number.parseFloat(input.value);
        if(isNaN(valueNumber) || valueNumber < 0 || valueNumber > 20) {
            return;
        }
        result += valueNumber * weightMap[inputId];
    }
    outputInput.value = result.toFixed(1);
}

for (const inputId of inputIds) {
    document.getElementById(inputId)
        .addEventListener("input", onInputChange);
}
// O browser pode guardar o valor dos inputs entre refreshes
// Então isto é para ter certeza que o input da nota final
// está preenchido
onInputChange();
