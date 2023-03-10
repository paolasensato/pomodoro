const progressBarNumber = document.querySelector('#progressBar .progress-value');
const buttonTypePomodoro = document.querySelector('#buttonTypePomodoro');
const buttonTypePausa = document.querySelector('#buttonTypePausa');
const contador = document.querySelector("#contador");

const audio = new Audio('./sounds/alarm.mp3');

const pomodoroEmSegundos = 60 * 25;
const pausaEmSegundos = 60 * 5;

const TYPE_POMODORO = "POMODORO";
const TYPE_PAUSA = "PAUSA";

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

function contaPomodoro() {
    if (pomodoroTipo === TYPE_POMODORO && valorTimer === pomodoroEmSegundos) contPomodoro++;

    contador.innerHTML = contPomodoro;
}

function setProgressoTemporizador() {

    if (valorTimer === 0) {
        pararTemporizador();
        audio.play();
        contaPomodoro();
    }

    progressBarNumber.textContent = `${formataNumeroEmString(valorTimer)}`;

}

const setTipoPomodoro = (tipo) => {
    pomodoroTipo = tipo;

    resetarTemporizador();
}