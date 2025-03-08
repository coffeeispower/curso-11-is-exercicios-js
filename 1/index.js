/**
  @param {string} selector
  @returns {number}
*/
function getInputAsNumber(selector) {
  const inputElement = document.querySelector(selector);
  const valueAsNumber = Number.parseFloat(inputElement.value);
  if(isNaN(valueAsNumber)) {
    throw new Error("Algum dos números é inválido")
  }
  return valueAsNumber;
}
/**
  @param {() => void} inner
*/
function reportErrorAsAlert(inner) {
  try {
    inner()
  } catch(e) {
    alert(e.message);
  }
}

const num1 = () => getInputAsNumber("input[name=txtA]");
const num2 = () => getInputAsNumber("input[name=txtB]");

/**
  @param {number} result
*/
function setOutput(result) {
  const outputElement = document.querySelector(`input[name="txtResultado"]`);
  outputElement.value = result.toPrecision(2);
}

document.querySelector("button#soma")
  .addEventListener("click", (e) => reportErrorAsAlert(() => {
      e.preventDefault();
      setOutput(num1() + num2())
  }))
  
document.querySelector("button#menos")
  .addEventListener("click", (e) => reportErrorAsAlert(() => {
      e.preventDefault();
      setOutput(num1() - num2())
  }))
  
document.querySelector("button#vezes")
  .addEventListener("click", (e) => reportErrorAsAlert(() => {
      e.preventDefault();
      setOutput(num1() * num2())
  }))
  
document.querySelector("button#dividir")
  .addEventListener("click", (e) => reportErrorAsAlert(() => {
      e.preventDefault();
      setOutput(num1() / num2())
  }))
