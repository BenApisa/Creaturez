document.addEventListener('DOMContentLoaded', () => {
    const modeToggle = document.getElementById('mode-toggle');
    const modal = document.getElementById('card-modal');
    const closeButton = document.querySelector('.close-button');
    const cards = document.querySelectorAll('.card');

    // Check saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.add(savedTheme === 'dark' ? 'dark-mode' : 'light-mode');
    modeToggle.textContent = savedTheme === 'dark' ? 'Light Mode' : 'Dark Mode';

    // Toggle dark mode
    modeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        document.body.classList.toggle('light-mode');
        
        const isDarkMode = document.body.classList.contains('dark-mode');
        modeToggle.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
        
        // Save preference
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });

    // Open modal when card is clicked
    cards.forEach(card => {
        card.addEventListener('click', () => {
            modal.style.display = 'block';
        });
    });

    // Close modal when close button is clicked
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside of the modal content
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});