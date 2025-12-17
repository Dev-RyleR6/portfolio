document.addEventListener('DOMContentLoaded', () => {
    //navigation buttons
    const navButtons = document.querySelectorAll('.nav-button');
    
    
    // function to update which navigation button is active based on scroll position
    function updateActiveNav() {
        // get all sections with IDs
        const sections = document.querySelectorAll('section[id]');
        
        // get current scroll position
        const scrollPosition = window.scrollY + 200; 
        
        // loop through each section
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            console.log(`scrollPosition: ${scrollPosition} sectioTop: ${sectionTop} sectionHeight: ${sectionHeight} sectionID: ${sectionId}`)
            
            if(scrollPosition === 3776 && sectionTop === 3895){
                navButtons.forEach(btn => btn.classList.remove('active'));
                const activeButton = document.querySelector(`.nav-button[href="#contact"]`);
                if (activeButton) {
                    activeButton.classList.add('active');
                }
            }
            // Check if we're in this section's viewport
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // remove active class
                navButtons.forEach(btn => btn.classList.remove('active'));
  
                // attach aactive class
                const activeButton = document.querySelector(`.nav-button[href="#${sectionId}"]`);
                if (activeButton) {
                    activeButton.classList.add('active');
                }
            }
        });
    }
    // update active nav on scroll
    window.addEventListener('scroll', updateActiveNav);
    
    // also update on page load
    updateActiveNav();

   
});



// show/hide certificate section and update button text

function toggleCertificate() {
    const container = document.getElementById('certificateContainer');
    const button = document.querySelector('.certificate-button');
    const buttonText = button.querySelector('.certificate-button-text');
    
    if (container.style.display === 'none') {
        // Show certificate
        container.style.display = 'block';
        buttonText.textContent = 'Hide Certificate';
        
        // smooth transition
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
