document.addEventListener('DOMContentLoaded', () => {
    const cards = [
        { 
            id: 1,
            name: "Creature 1",
            image: "/assets/images/cards/card1.png",
            type: "Beast",
            attack: 1000,
            defense: 800,
            health: 2000
        },
        { 
            id: 2,
            name: "Creature 2",
            image: "/assets/images/cards/card2.jpg",
            type: "Dragon",
            attack: 1200,
            defense: 900,
            health: 2200
        }
    ];

    const playerCardsDiv = document.querySelector('.player-cards');
    let selectedCard = null;
    let opponentCard = null;
    let currentTurn = null;
    let gameActive = false;

    // Initialize card selection
    cards.forEach(card => {
        const cardElement = createCardElement(card);
        playerCardsDiv.appendChild(cardElement);
    });

    // Card selection handler
    function createCardElement(card) {
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `
            <div class="card-image">
                <img src="${card.image}" alt="${card.name}">
            </div>
            <div class="card-info">
                <h3>${card.name}</h3>
                <p>ATK: ${card.attack} / DEF: ${card.defense}</p>
                <p>HP: ${card.health}</p>
            </div>
        `;
        div.addEventListener('click', () => selectCard(card));
        return div;
    }

    function selectCard(card) {
        selectedCard = { ...card };
        document.getElementById('start-battle').disabled = false;
        document.querySelectorAll('.card').forEach(c => 
            c.style.border = c.querySelector('img').src === card.image ? '3px solid #7e57c2' : 'none'
        );
    }

    // Battle initialization
    document.getElementById('start-battle').addEventListener('click', startBattle);

    function startBattle() {
        opponentCard = { ...cards[Math.floor(Math.random() * cards.length)] };
        if (opponentCard.id === selectedCard.id) {
            opponentCard = { ...cards[(opponentCard.id % cards.length) + 1] };
        }

        document.querySelector('.card-selection').style.display = 'none';
        document.querySelector('.battle-arena').style.display = 'grid';

        displayBattleCard(selectedCard, 'player');
        displayBattleCard(opponentCard, 'opponent');

        const coinFlip = Math.random() < 0.5;
        currentTurn = coinFlip ? 'player' : 'opponent';
        document.getElementById('coin-flip').textContent = 
            `${coinFlip ? 'You' : 'Opponent'} go first!`;

        gameActive = true;
        updateBattleLog(`Battle started! ${coinFlip ? 'You' : 'Opponent'} won the coin flip!`);

        if (currentTurn === 'opponent') {
            setTimeout(opponentTurn, 1500);
        }
    }

    // Battle mechanics
    document.getElementById('attack-button').addEventListener('click', () => {
        if (gameActive && currentTurn === 'player') {
            playerTurn();
        }
    });

    function playerTurn() {
        const damage = calculateDamage(selectedCard.attack, opponentCard.defense);
        opponentCard.health -= damage;
        updateBattleLog(`You dealt ${damage} damage!`);
        updateStats();
        checkGameEnd();
        if (gameActive) {
            currentTurn = 'opponent';
            setTimeout(opponentTurn, 1500);
        }
    }

    function opponentTurn() {
        const damage = calculateDamage(opponentCard.attack, selectedCard.defense);
        selectedCard.health -= damage;
        updateBattleLog(`Opponent dealt ${damage} damage!`);
        updateStats();
        checkGameEnd();
        if (gameActive) {
            currentTurn = 'player';
        }
    }

    function calculateDamage(attack, defense) {
        return Math.max(0, attack - Math.floor(defense * 0.5));
    }

    function updateStats() {
        document.querySelector('.player-stats').textContent = 
            `HP: ${Math.max(0, selectedCard.health)}`;
        document.querySelector('.opponent-stats').textContent = 
            `HP: ${Math.max(0, opponentCard.health)}`;
    }

    function displayBattleCard(card, side) {
        const cardDiv = document.querySelector(`.${side}-card`);
        cardDiv.innerHTML = `
            <div class="card">
                <div class="card-image">
                    <img src="${card.image}" alt="${card.name}">
                </div>
                <div class="card-info">
                    <h3>${card.name}</h3>
                    <p>ATK: ${card.attack} / DEF: ${card.defense}</p>
                </div>
            </div>
        `;
        document.querySelector(`.${side}-stats`).textContent = `HP: ${card.health}`;
    }

    function updateBattleLog(message) {
        const battleLog = document.getElementById('battle-log');
        battleLog.innerHTML += `<div>${message}</div>`;
        battleLog.scrollTop = battleLog.scrollHeight;
    }

    function checkGameEnd() {
        if (selectedCard.health <= 0 || opponentCard.health <= 0) {
            gameActive = false;
            const winner = selectedCard.health > 0 ? 'You' : 'Opponent';
            updateBattleLog(`Game Over! ${winner} won!`);
            document.getElementById('attack-button').disabled = true;
        }
    }
});