// Initialize AOS library
AOS.init();

// Smooth Scrolling for Team member links (example)
document.querySelectorAll('.member-links a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        // Assuming there's an element with the ID of the team member
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
