const progressBarNumber = document.querySelector('#progressBar .progress-value');
const buttonTypePomodoro = document.querySelector('#buttonTypePomodoro');

const audio = new Audio('./sounds/alarm.mp3');

const pomodoroEmSegundos = 60;
const TYPE_POMODORO = "POMODORO";

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
    progressInterval = setInterval(() => {
        valorTimer = valorTimer - 1;
        setProgressoTemporizador();
    }, 1000);
    
}

const pararTemporizador = () => clearInterval(progressInterval);

const resetarTemporizador = () => {
    clearInterval(progressInterval);

    valorTimer = pomodoroEmSegundos;

    setProgressoTemporizador();
}

function setProgressoTemporizador() {

    if (valorTimer === 0) {
        pararTemporizador();
        audio.play();
    }

    progressBarNumber.textContent = `${formataNumeroEmString(valorTimer)}`;

}