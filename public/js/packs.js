document.addEventListener('DOMContentLoaded', () => {
    const packButton = document.querySelector('.pack-button');
    const packOpeningArea = document.querySelector('.pack-opening-area');
    const cardsReveal = document.querySelector('.cards-reveal');
    const closeRevealButton = document.querySelector('.close-reveal-button');

    packButton.addEventListener('click', () => {
        // Show pack opening area
        packOpeningArea.style.display = 'flex';
        
        // Simulate opening animation and card reveal
        setTimeout(() => {
            revealCards();
            closeRevealButton.style.display = 'block';
        }, 1000);
    });

    closeRevealButton.addEventListener('click', () => {
        packOpeningArea.style.display = 'none';
        cardsReveal.innerHTML = '';
        closeRevealButton.style.display = 'none';
    });

    function revealCards() {
        // For now, just show the cards we have
        const cards = [
            { image: '/assets/images/cards/card1.png', name: 'Creature 1' },
            { image: '/assets/images/cards/card2.jpg', name: 'Creature 2' },
            { image: '/assets/images/cards/card3.jpg', name: 'Shadow Walker' },
            { image: '/assets/images/cards/card1.png', name: 'Creature 1' },
            { image: '/assets/images/cards/card2.jpg', name: 'Creature 2' }
        ];

        cardsReveal.innerHTML = cards.map(card => `
            <div class="card" ${card.name === 'Shadow Walker' ? 'data-card="card3"' : ''}>
                <div class="card-image">
                    <img src="${card.image}" alt="${card.name}">
                </div>
                <div class="card-info">
                    <h3>${card.name}</h3>
                </div>
            </div>
        `).join('');
    }
});