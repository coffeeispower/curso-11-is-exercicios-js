/** @type {string[]} */
let disciplinas = ["Matemática", "Português", "Programação"];

/** @type {HTMLInputElement} */
const txtDisciplina = document.querySelector('#txtDisciplina');

/** @type {HTMLButtonElement} */
const btnInserir = document.querySelector('#btnInserir');
btnInserir.addEventListener('click', () => {
    const trimmedValue = txtDisciplina.value.trim();
    if (!trimmedValue || disciplinas.some(disciplina => disciplina === trimmedValue)) return;
    disciplinas.push(trimmedValue);
    txtDisciplina.value = "";
    reconstruirDivResultado();
})

/** @type {HTMLButtonElement} */
const btnEliminar = document.querySelector('#btnEliminar');
btnEliminar.addEventListener('click', () => {
    const disciplinasSelecionadas = Array.from(document.querySelectorAll('input[type=checkbox]:checked'));
    disciplinas = disciplinas.filter(disciplina => !disciplinasSelecionadas.some(checkbox => checkbox.getAttribute("data-disciplina") === disciplina));
    reconstruirDivResultado();
})

/** @type {HTMLDivElement} */
const divResultado = document.querySelector('#divResultado');

/**
 * @param element {HTMLElement}
 */
function limparFilhos(element) {
    while (element.lastElementChild) {
        element.removeChild(element.lastElementChild);
    }
}

function reconstruirDivResultado() {
    limparFilhos(divResultado);
    for (const disciplina of disciplinas.toSorted()) {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `disciplina-${disciplina}`;
        checkbox.setAttribute('data-disciplina', disciplina);
        const checkboxLabel = document.createElement('label');
        checkboxLabel.htmlFor = checkbox.id;
        checkboxLabel.innerText = disciplina;
        const div = document.createElement('div');
        div.appendChild(checkbox);
        div.appendChild(checkboxLabel);
        divResultado.appendChild(div);
    }
}

reconstruirDivResultado();