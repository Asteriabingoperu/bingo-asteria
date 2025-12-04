document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('bingo-board');
    const callBtn = document.getElementById('call-number-btn');
    const lastCalledDisplay = document.getElementById('last-called-number');
    
    const maxNumber = 75;
    let numbersCalled = new Set();
    let boardNumbers = [];
    // Contador para las estrellas de cada número en el cartón
    let starCounts = {}; 

    // Lógica del juego: 4 números se repiten 5 veces de forma aleatoria.
    // Esto lo definimos internamente como la "condición de victoria"
    const winningNumbers = new Set();
    while (winningNumbers.size < 4) {
        winningNumbers.add(Math.floor(Math.random() * maxNumber) + 1);
    }
    console.log("Números ganadores internos (solo para desarrollador):", [...winningNumbers]);

    // --- Generar Cartón de Bingo ---
    function generateBoard() {
        // Generar 24 números aleatorios únicos para el cartón (el centro es libre)
        let availableNumbers = Array.from({ length: maxNumber }, (_, i) => i + 1);
        shuffleArray(availableNumbers);
        boardNumbers = availableNumbers.slice(0, 24);
        
        // Añadir espacio libre en el centro
        boardNumbers.splice(12, 0, 'FREE');

        boardNumbers.forEach((number, index) => {
            const cell = document.createElement('div');
            cell.classList.add('bingo-cell');
            cell.dataset.number = number;
            
            const numberSpan = document.createElement('span');
            numberSpan.classList.add('cell-number');
            numberSpan.textContent = number;
            
            cell.appendChild(numberSpan);

            // Añadir 5 estrellas/soles debajo de cada número
            const starsContainer = document.createElement('div');
            starsContainer.classList.add('stars-container');
            for (let i = 0; i < 5; i++) {
                const star = document.createElement('i');
                star.classList.add('fas', 'fa-star', 'star');
                starsContainer.appendChild(star);
            }
            cell.appendChild(starsContainer);

            board.appendChild(cell);
            starCounts[number] = 0;
        });
    }

    // --- Función para llamar un número ---
    function callNumber() {
        if (numbersCalled.size >= maxNumber) {
            alert("¡Todos los números han sido llamados!");
            return;
        }

        callBtn.disabled = true; // Desactivar botón durante la animación

        // 1. Iniciar animación de "slot spin" en todas las casillas del cartón
        document.querySelectorAll('.bingo-cell').forEach(cell => {
            if (cell.dataset.number !== 'FREE') {
                cell.classList.add('spinning');
            }
        });

        // Simular el tiempo de "giro" antes de revelar el resultado
        setTimeout(() => {
            // 2. Detener animaciones y revelar el número
            document.querySelectorAll('.bingo-cell').forEach(cell => {
                cell.classList.remove('spinning');
            });
            
            let newNumber;
            do {
                newNumber = Math.floor(Math.random() * maxNumber) + 1;
            } while (numbersCalled.has(newNumber));

            numbersCalled.add(newNumber);
            lastCalledDisplay.textContent = newNumber;

            // 3. Resaltar la casilla y las estrellas correspondientes
            const targetCell = document.querySelector(`[data-number="${newNumber}"]`);
            if (targetCell) {
                highlightCell(targetCell, newNumber);
            }

            callBtn.disabled = false; // Reactivar botón
        }, 1500); // Tiempo de la animación en ms
    }

    // --- Función para resaltar y actualizar estrellas ---
    function highlightCell(cell, number) {
        cell.classList.add('called');
        if (winningNumbers.has(number)) {
            starCounts[number]++;
            const stars = cell.querySelectorAll('.star');
            for (let i = 0; i < starCounts[number]; i++) {
                stars[i].classList.add('active');
            }

            // Verificar si hay 5 repeticiones (victoria)
            if (starCounts[number] === 5) {
                alert(`¡BINGO ASTERIA! ¡Has conseguido 5 repeticiones del número ${number}!`);
                // Aquí puedes añadir más efectos visuales de victoria
            }
        }
    }

    // --- Utilidad para mezclar arrays (para la generación del cartón) ---
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // --- Inicialización ---
    generateBoard();
    callBtn.addEventListener('click', callNumber);
});

