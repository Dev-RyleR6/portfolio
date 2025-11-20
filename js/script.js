
document.addEventListener('DOMContentLoaded', () => {
    // 1. DOM Element References
    const contactButton = document.querySelector('.contact-button');
    const portfolioContainer = document.querySelector('.portfolio-section');
    const navLinks = document.querySelectorAll('.footer-nav a');

    // 2. Main Logic/Event Listeners
    contactButton.addEventListener('click', handleContactClick);
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });

    // 3. Functions
    function handleContactClick(event) {
        event.preventDefault();
        // Maybe open a modal, or simply scroll to the contact section
        scrollToSection('contact'); 
    }

    // Function to add a class to the fixed nav bar on scroll (e.g., to change its color)
    window.addEventListener('scroll', checkNavStyling);

    function checkNavStyling() {
        const footerNav = document.querySelector('.footer-nav');
        if (window.scrollY > 100) {
            footerNav.classList.add('is-scrolled');
        } else {
            footerNav.classList.remove('is-scrolled');
        }
    }
    
    // Add more functions for portfolio filtering or project details here...

    function scrollToSection(id) {
        document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
    }
});