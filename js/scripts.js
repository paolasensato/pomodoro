const progressBarNumber = document.querySelector('#progressBar .progress-value');
const buttonTypePomodoro = document.querySelector('#buttonTypePomodoro');
const buttonTypePausa = document.querySelector('#buttonTypePausa');
const contador = document.querySelector("#contador");
const timeInput = document.querySelector("input");

const audio = new Audio('./sounds/alarm.mp3');

let pomodoroEmSegundos = 60 * 25;
let pausaEmSegundos = 60 * 5;

const TYPE_POMODORO = "POMODORO";
const TYPE_PAUSA = "PAUSA";

let time;
let contPomodoro = 0;
let progressInterval;
let pomodoroTipo = TYPE_POMODORO;
let valorTimer = pomodoroEmSegundos;

function formataNumeroEmString(number) {

    const minutos = Math.trunc(number / 60)
        .toString()
        .padStart(2, '0');
    const segundos = Math.trunc(number % 60)
        .toString()
        .padStart(2, '0');

    return `${minutos}:${segundos}`;
}

const setTimer = () => {
    pararTemporizador();
    
    time = timeInput.value;

    if (time == 0) {
        alert("O tempo deve ser maior que 0");
        return;
    }
    
    valorTimer = 60 * time;

    setProgressoTemporizador();
    
}

const comecarTemporizador = () => {

    valorTimer === 0 && resetarTemporizador();

    progressInterval = setInterval(() => {
        valorTimer = valorTimer - 1;
        setProgressoTemporizador();
    }, 1000);

}

const pararTemporizador = () => clearInterval(progressInterval);

const resetarTemporizador = () => {
    clearInterval(progressInterval);

    valorTimer = (pomodoroTipo === TYPE_POMODORO)
        ? pomodoroEmSegundos
        : pausaEmSegundos

    setProgressoTemporizador();
}

const sugerirDescanso = () => {
    if (window.confirm("Deseja ter um descanso de 10 minutos?")) {
        pausaEmSegundos = 60 * 10;
        setTipoPomodoro(TYPE_PAUSA);
    }
}

function contaPomodoro() {
    if (pomodoroTipo === TYPE_POMODORO) contPomodoro++;

    return contador.innerHTML = contPomodoro;
}

function setProgressoTemporizador() {

    if (valorTimer === 0) {
        pararTemporizador();
        audio.play();
        contaPomodoro();
        if (contPomodoro % 4 == 0 && contPomodoro != 0) sugerirDescanso();
    }

    return progressBarNumber.textContent = `${formataNumeroEmString(valorTimer)}`;

}

const setTipoPomodoro = (tipo) => {
    pomodoroTipo = tipo;

    resetarTemporizador();
}