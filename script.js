const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let currentInput = "";


// Escuchar botones

buttons.forEach(button => {

    button.addEventListener("click", () => {

        const value = button.textContent;

        handleInput(value);

    });

});


// Controlar acciones

function handleInput(value) {


    if (value === "AC") {

        clearDisplay();

    } 
    
    else if (value === "⌫") {

        deleteLast();

    } 
    
    else if (value === "=") {

        calculate();

    } 
    
    else if (value === "%") {

    calculatePercentage();

    }

    else {

    addValue(value);

    }

}



// Agregar números y operadores

function addValue(value) {

    // Evita escribir dos puntos decimales en el mismo número
    if (value === ".") {

        const lastNumber = currentInput.split(/[+\-×÷%]/).pop();

        if (lastNumber.includes(".")) {
            return;
        }

    }

    currentInput += value;

    display.value = currentInput;

}



// Limpiar pantalla

function clearDisplay() {

    currentInput = "";

    display.value = "";

}



// Borrar último carácter

function deleteLast() {

    currentInput = currentInput.slice(0, -1);

    display.value = currentInput;

}



// Realizar cálculo

function calculate() {

    try {

        const operation = currentInput
            .replaceAll("×", "*")
            .replaceAll("÷", "/")
            .replaceAll("−", "-");

        const result = eval(operation);

        if (result === Infinity || Number.isNaN(result)) {

            display.value = "Error";
            currentInput = "";
            return;

        }

        display.value = result;
        currentInput = result.toString();

    } catch {

        display.value = "Error";
        currentInput = "";

    }

}

function calculatePercentage() {

    if (currentInput === "") return;

    try {

        const result = parseFloat(currentInput) / 100;

        display.value = result;

        currentInput = result.toString();

    } catch {

        display.value = "Error";

        currentInput = "";

    }

}

// Soporte para teclado

document.addEventListener("keydown", (event) => {

    const key = event.key;

    if (!isNaN(key) || key === ".") {
        addValue(key);
    }

    else if (key === "+") {
        addValue("+");
    }

    else if (key === "-") {
        addValue("−");
    }

    else if (key === "*") {
        addValue("×");
    }

    else if (key === "/") {
        event.preventDefault();
        addValue("÷");
    }

    else if (key === "Enter") {
        calculate();
    }

    else if (key === "Backspace") {
        deleteLast();
    }

    else if (key === "Escape") {
        clearDisplay();
    }

});