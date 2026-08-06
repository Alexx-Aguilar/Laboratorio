const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let currentInput = "";


// Escuchar botones

buttons.forEach(button => {

    button.addEventListener("click", () => {

        const sound = document.getElementById("clickSound");

        sound.currentTime = 0;
        sound.play();

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
    } else {
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

    const lastNumberMatch = currentInput.match(/(\d+(?:\.\d+)?)$/);
    if (lastNumberMatch) {
        const percentageValue = parseFloat(lastNumberMatch[0]) / 100;
        currentInput = currentInput.slice(0, -lastNumberMatch[0].length) + percentageValue;
        display.value = currentInput;
        return;
    }

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
        return;
    }

    if (key === "+") {
        addValue("+");
        return;
    }

    if (key === "-") {
        addValue("−");
        return;
    }

    if (key === "*") {
        addValue("×");
        return;
    }

    if (key === "/") {
        event.preventDefault();
        addValue("÷");
        return;
    }

    if (key === "%") {
        handleInput("%");
        return;
    }

    if (key === "Enter") {
        event.preventDefault();
        calculate();
        return;
    }

    if (key === "Backspace") {
        deleteLast();
        return;
    }

    if (key === "Escape") {
        clearDisplay();
    }
});

function updateClock() {
    const clock = document.getElementById("clock");
    const now = new Date();
    clock.textContent = "🕒 " + now.toLocaleTimeString();
}

setInterval(updateClock, 1000);

updateClock()

const modoBtn = document.getElementById("modoBtn");

modoBtn.addEventListener("click", () => {
    document.body.classList.toggle("modo-oscuro");

    if (document.body.classList.contains("modo-oscuro")) {
        modoBtn.textContent = "☀️ Modo claro";
    } else {
        modoBtn.textContent = "🌙 Modo oscuro";
    }
});