document.addEventListener('DOMContentLoaded', () => {
    const modeToggle = document.getElementById('mode-toggle');
    if (modeToggle) {
        const modal = document.getElementById('card-modal');
        const closeButton = document.querySelector('.close-button');
        const cards = document.querySelectorAll('.card');

        // Check saved theme preference
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.body.classList.add(savedTheme === 'dark' ? 'dark-mode' : 'light-mode');
        // Removed text content setting

        // Toggle dark mode
        modeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            document.body.classList.toggle('light-mode');
            
            const isDarkMode = document.body.classList.contains('dark-mode');
            // Removed text content setting
            
            // Save preference
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        });

        // Open modal when card is clicked
        cards.forEach(card => {
            card.addEventListener('click', () => {
                if (modal) {
                    modal.style.display = 'block';
                }
            });
        });

        // Close modal when close button is clicked
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                if (modal) {
                    modal.style.display = 'none';
                }
            });
        }

        // Close modal when clicking outside of the modal content
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    } else {
        console.error('Element with ID "mode-toggle" not found.');
    }
});

// Card Carousel functionality
document.addEventListener('DOMContentLoaded', () => {
    const carouselTrack = document.querySelector('.carousel-track');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    
    // Updated card data to match existing files
    const cards = [
        { image: '/assets/images/cards/card1.png', name: 'Creature 1' },
        { image: '/assets/images/cards/card2.jpg', name: 'Creature 2' }
    ];
    
    // Add cards to carousel
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'carousel-card';
        cardElement.innerHTML = `
            <img src="${card.image}" alt="${card.name}">
            <h3>${card.name}</h3>
        `;
        carouselTrack.appendChild(cardElement);
    });
    
    let currentIndex = 0;
    
    function updateCarousel() {
        const offset = currentIndex * -100;
        carouselTrack.style.transform = `translateX(${offset}%)`;
    }
    
    // Adjusted interval for better viewing with fewer cards
    setInterval(() => {
        currentIndex = (currentIndex + 1) % cards.length;
        updateCarousel();
    }, 4000); // Increased to 4 seconds since there are only 2 cards
    
    // Manual navigation
    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % cards.length;
        updateCarousel();
    });
    
    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateCarousel();
    });
});