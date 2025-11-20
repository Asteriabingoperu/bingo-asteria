/* -----------------------------
   VARIABLES PRINCIPALES
--------------------------------*/
let clickCount = 0;
let bolaActiva = false;

/* -----------------------------
   PRE-CARGAR SONIDO
--------------------------------*/
const sonidoBingo = new Audio("sounds/get-lucky.mp3");
sonidoBingo.volume = 0.65;   // volumen agradable
sonidoBingo.preload = "auto";

/* -----------------------------
   ACTUALIZAR ESTRELLAS
--------------------------------*/
function updateStars() {
    for (let i = 1; i <= 5; i++) {
        document.getElementById("star" + i).classList.remove("active");
    }
    for (let i = 1; i <= clickCount && i <= 5; i++) {
        document.getElementById("star" + i).classList.add("active");
    }
}

/* -----------------------------
   ACTIVAR NÚMERO CLICKADO
--------------------------------*/
function toggleNumber(event) {
    const numberBox = event.target;
    numberBox.classList.toggle("active");

    clickCount++;
    updateStars();

    reproducirEfectoBola(numberBox.textContent);
}

/* -----------------------------
   EFECTO DE BOLA + SONIDO
--------------------------------*/
function reproducirEfectoBola(numero) {
    if (bolaActiva) return;

    bolaActiva = true;
    const bola = document.getElementById("bola-numero");
    const luz = document.querySelector(".bola-luz");
    const explosion = document.querySelector(".explosion-colores");

    bola.textContent = numero;

    // Giro
    bola.classList.add("girar");
    luz.classList.add("encendida");

    // Reproducir sonido
    sonidoBingo.currentTime = 0; // reiniciar para que suene siempre
    sonidoBingo.play().catch(() => {});

    // Explosión
    setTimeout(() => {
        explosion.classList.add("activar-explosion");
    }, 900);

    // Finalizar animación
    setTimeout(() => {
        bola.classList.remove("girar");
        luz.classList.remove("encendida");
        explosion.classList.remove("activar-explosion");
        bolaActiva = false;
    }, 2000);
}

/* -----------------------------
   GENERAR NÚMEROS 1–75
--------------------------------*/
const container = document.getElementById("numbers-container");

for (let i = 1; i <= 75; i++) {
    const box = document.createElement("div");
    box.className = "number";
    box.textContent = i;
    box.onclick = toggleNumber;
    container.appendChild(box);
}
