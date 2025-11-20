let clickCount = 0;

function updateStars() {
    for (let i = 1; i <= 5; i++) {
        document.getElementById("star" + i).classList.remove("active");
    }
    for (let i = 1; i <= clickCount && i <= 5; i++) {
        document.getElementById("star" + i).classList.add("active");
    }
}

function toggleNumber(event) {
    const numberBox = event.target;
    numberBox.classList.toggle("active");
    clickCount++;
    updateStars();
}

// Generar números infinitos (solo primeros 75 visibles)
const container = document.getElementById("numbers-container");

for (let i = 1; i <= 75; i++) {
    const box = document.createElement("div");
    box.className = "number";
    box.textContent = i;
    box.onclick = toggleNumber;
    container.appendChild(box);
}
