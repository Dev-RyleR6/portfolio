document.addEventListener('DOMContentLoaded', () => {
    //navigation buttons
    const navButtons = document.querySelectorAll('.nav-button');
    
    
    //update which navigation button is active based on scroll position
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navButtons = document.querySelectorAll('.nav-button');
        
        let currentSection = "";
        const scrollPosition = window.scrollY + 200;

        // Special case: hit the bottom of the page
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
            currentSection = sections[sections.length - 1].getAttribute('id');
        } else {
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    currentSection = section.getAttribute('id');
                }
            });
        }

        if (currentSection) {
            navButtons.forEach(btn => {
                btn.classList.remove('active');
                if (btn.getAttribute('href') === `#${currentSection}`) {
                    btn.classList.add('active');
                }
            });
        }
    }
    // update active nav on scroll
    window.addEventListener('scroll', updateActiveNav);
    
    // also update on page load
    updateActiveNav();
    // Scroll Reveal Animation Logic
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all sections and other elements to reveal
    document.querySelectorAll('.section, .hero, .blog-card, .portfolio-item').forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    // Filter Logic for Archive Page
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter projects
            projects.forEach(project => {
                const category = project.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    project.style.display = 'block';
                    setTimeout(() => project.style.opacity = '1', 10);
                } else {
                    project.style.opacity = '0';
                    setTimeout(() => project.style.display = 'none', 400);
                }
            });
        });
    });
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
