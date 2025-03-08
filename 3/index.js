const nameMap = [
    "Aires José Chirinda Fernando",
    "Alexandre Oliveira Duarte Gonçalves",
    "Ana Luiza Dias Rocha",
    "André Ricardo da Conceição Rocha",
    "Arthur Emanuel Vilasanti Alves",
    "Daniel David Melo Londoño",
    "Daniel Kucheryavenko",
    "Diogo Filipe Nunes Seixas",
    "Diogo Lisboa da Selva Nunes",
    "Eric Felipse de Pádua Canheiro Lopes",
    "Gabriela Pereira Timidate",
    "João Luís de Sousa Sampaio",
    "João Pedro Paiva Branquinho",
    "Joel Ângelo dos Anjos Espirito Santo",
    "Julieta Belen Tortosa",
    "Lucas Ornellas Costa Cosenza dos Santos",
    "Martin Pinto da Cunha",
    "Nerdwin Manuel Sanches Melendez",
    "Rafael Metzger de Pina Pira Amaro",
    "Salvador Gabriel Laranjeira Pinto",
    "Simão Furtado Silva Simões de Carvalho",
    "Tiago Dinis Ribeiro dos Santos",
];
/**
 *  @type {HTMLSelectElement}
 * */
const selectNumeroAluno = document.getElementById("numeroAluno");

for (const [numero, nome] of nameMap.entries()) {
    const option = document.createElement("option");
    option.text = numero + 1;
    option.value = nome;
    selectNumeroAluno.appendChild(option);
}
/**
 * @type {HTMLInputElement}
 * */
const outputNome = document.getElementById("nomeAluno");

function updateInput() {
    outputNome.value = selectNumeroAluno.value;
}

selectNumeroAluno.addEventListener("change", () => updateInput());
updateInput()