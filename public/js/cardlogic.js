class CardManager {
    constructor() {
        this.cards = [];
    }

    async loadCards() {
        try {
            const response = await fetch('/data/cards.json');
            const data = await response.json();
            this.cards = data.cards;
            return this.cards;
        } catch (error) {
            console.error('Error loading cards:', error);
        }
    }

    displayCard(cardId) {
        const card = this.cards.find(card => card.id === cardId);
        if (!card) return null;

        return card;
    }
}