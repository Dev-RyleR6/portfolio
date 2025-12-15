/**
 * Portfolio Website JavaScript
 * Handles interactive features and smooth scrolling
 */

// Wait for the page to fully load before running JavaScript
document.addEventListener('DOMContentLoaded', () => {
    
    // ============================================
    // SMOOTH SCROLLING FOR NAVIGATION LINKS
    // ============================================
    
    // Get all navigation buttons
    const navButtons = document.querySelectorAll('.nav-button');
    
    // Add click event to each navigation button for smooth scrolling
    navButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            // Get the href attribute (e.g., "#hero", "#portfolio")
            const targetId = button.getAttribute('href');
            
            // If it's a hash link (starts with #)
            if (targetId.startsWith('#')) {
                event.preventDefault(); // Prevent default jump behavior
                
                // Find the target section
                const targetSection = document.querySelector(targetId);
                
                // If the section exists, scroll to it smoothly
                if (targetSection) {
                    targetSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ============================================
    // ACTIVE NAVIGATION HIGHLIGHTING
    // ============================================
    
    // Function to update which navigation button is active based on scroll position
    function updateActiveNav() {
        // Get all sections with IDs
        const sections = document.querySelectorAll('section[id]');
        
        // Get current scroll position
        const scrollPosition = window.scrollY + 200; // Offset for better UX
        
        // Loop through each section
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            // Check if we're in this section's viewport
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all nav buttons
                navButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to the corresponding nav button
                const activeButton = document.querySelector(`.nav-button[href="#${sectionId}"]`);
                if (activeButton) {
                    activeButton.classList.add('active');
                }
            }
        });
    }
    
    // Update active nav on scroll
    window.addEventListener('scroll', updateActiveNav);
    
    // Also update on page load
    updateActiveNav();

    // ============================================
    // PORTFOLIO ITEM HOVER EFFECTS
    // ============================================
    
    // Get all portfolio items
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    // Add hover effect to each portfolio item
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            // Optional: Add any additional hover effects here
            console.log('Portfolio item hovered');
        });
    });

    // ============================================
    // SMOOTH SCROLLING FOR ALL INTERNAL LINKS
    // ============================================
    
    // Get all links that point to sections on the same page
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            const targetId = link.getAttribute('href');
            
            // Skip if it's just "#" (empty hash)
            if (targetId === '#') {
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                event.preventDefault();
                targetElement.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ============================================
    // CONSOLE MESSAGE (Optional - for fun!)
    // ============================================
    
    console.log('%c👋 Hello! Thanks for checking out my portfolio!', 
        'color: #222; font-size: 16px; font-weight: bold;');
    console.log('%cFeel free to explore the code and reach out if you have any questions.', 
        'color: #666; font-size: 12px;');
});

// ============================================
// CERTIFICATE TOGGLE FUNCTION
// ============================================

/**
 * Toggle the visibility of the certificate iframe
 * Shows/hides the certificate container and updates button text
 */
function toggleCertificate() {
    const container = document.getElementById('certificateContainer');
    const button = document.querySelector('.certificate-button');
    const buttonText = button.querySelector('.certificate-button-text');
    
    if (container.style.display === 'none') {
        // Show certificate
        container.style.display = 'block';
        buttonText.textContent = 'Hide Certificate';
        
        // Smooth scroll to certificate after a short delay
        setTimeout(() => {
            container.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest' 
            });
        }, 100);
    } else {
        // Hide certificate
        container.style.display = 'none';
        buttonText.textContent = 'View Certificate';
    }
}
