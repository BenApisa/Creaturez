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
        },
        {
            id: 3,
            name: "Shadow Walker",
            image: "/assets/images/cards/card3.jpg",
            type: "Ghost",
            attack: 1500,
            defense: 600,
            health: 1800
        }
    ];

    const playerCardsDiv = document.querySelector('.player-cards');
    let selectedCard = null;
    let opponentCard = null;
    let currentTurn = null;
    let gameActive = false;
    let isDefending = false;

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
        document.querySelectorAll('.card').forEach(c => {
            if (c.querySelector('img').src === card.image) {
                c.classList.add('selected');
            } else {
                c.classList.remove('selected');
            }
        });
    }

    // Battle initialization
    document.getElementById('start-battle').addEventListener('click', startBattle);

    function startBattle() {
        // Add battle-mode class to body
        document.body.classList.add('battle-mode');

        opponentCard = { ...cards[Math.floor(Math.random() * cards.length)] };
        if (opponentCard.id === selectedCard.id) {
            opponentCard = { ...cards[(opponentCard.id % cards.length) + 1] };
        }

        document.querySelector('.card-selection').style.display = 'none';
        document.querySelector('.battle-arena').style.display = 'grid';

        displayBattleCard(selectedCard, 'player');
        displayBattleCard(opponentCard, 'opponent');

        // Coin flip animation
        const coin = document.querySelector('.coin');
        const coinFlip = Math.random() < 0.5;
        
        coin.classList.add('flipping');
        
        setTimeout(() => {
            coin.classList.remove('flipping');
            currentTurn = coinFlip ? 'player' : 'opponent';
            document.getElementById('coin-flip').textContent = 
                `${coinFlip ? 'You' : 'Opponent'} go first!`;
            
            gameActive = true;
            updateBattleLog(`Battle started! ${coinFlip ? 'You' : 'Opponent'} won the coin flip!`);
            
            if (currentTurn === 'opponent') {
                setTimeout(opponentTurn, 1500);
            }
        }, 2000);
    }

    // Battle mechanics
    document.getElementById('attack-button').addEventListener('click', () => {
        if (gameActive && currentTurn === 'player') {
            playerTurn();
        }
    });

    document.getElementById('defense-button').addEventListener('click', () => {
        if (gameActive && currentTurn === 'player') {
            playerDefend();
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

    function playerDefend() {
        isDefending = true;
        updateBattleLog('You take a defensive stance!');
        currentTurn = 'opponent';
        setTimeout(opponentTurn, 1500);
    }

    function opponentTurn() {
        let damage = calculateDamage(opponentCard.attack, selectedCard.defense);
        if (isDefending) {
            damage = Math.floor(damage * 0.5); // Reduce damage by 50% when defending
            isDefending = false; // Reset defense status
        }
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
                    <div class="stats-display">
                        <p>ATK: ${card.attack}</p>
                        <p>DEF: ${card.defense}</p>
                    </div>
                </div>
            </div>
        `;
        document.querySelector(`.${side}-stats`).innerHTML = 
            `<div class="stats-display">HP: ${card.health}</div>`;
    }

    function updateBattleLog(message) {
        const battleLog = document.getElementById('battle-log');
        const logEntry = document.createElement('div');
        logEntry.textContent = message;
        logEntry.style.marginBottom = '5px';
        battleLog.appendChild(logEntry);
        battleLog.scrollTop = battleLog.scrollHeight;
    }

    function checkGameEnd() {
        if (selectedCard.health <= 0 || opponentCard.health <= 0) {
            gameActive = false;
            const winner = selectedCard.health > 0 ? 'You' : 'Opponent';
            updateBattleLog(`Game Over! ${winner} won!`);
            document.getElementById('attack-button').disabled = true;
            document.getElementById('defense-button').disabled = true;
            
            // Remove battle-mode class when game ends
            setTimeout(() => {
                document.body.classList.remove('battle-mode');
            }, 2000);
        }
    }
});