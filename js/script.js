document.addEventListener('DOMContentLoaded', () => {
    // Remove loading screen
    const loading = document.getElementById('loading');
    if (loading) {
        window.addEventListener('load', () => {
            loading.style.opacity = '0';
            setTimeout(() => {
                loading.style.display = 'none';
            }, 500);
        });
    }

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === "#") { // Avoid scrolling for placeholder links like href="#"
                e.preventDefault();
                return;
            }

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = target.offsetTop - headerHeight - 20; // 20px offset

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // If mobile menu is open, close it after click
                if (navMenu && navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            }
        });
    });

    // Header background on scroll
    const header = document.querySelector('.header');
    if (header) {
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 50) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = '0 1px 10px rgba(0, 0, 0, 0.05)';
            }
            lastScroll = currentScroll;
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = entry.target.dataset.delay || '0.2s'; // Use data-delay if set
                entry.target.classList.add('animated'); // Add 'animated' to trigger CSS animation
                // obs.unobserve(entry.target); // Optional: stop observing after animation
            }
        });
    }, observerOptions);

    // Observe elements with class 'animate' (changed from 'animate-on-scroll')
    document.querySelectorAll('.animate-on-scroll').forEach((el, index) => {
        // el.dataset.delay = `${index * 0.1}s`; // Example: Stagger animations
        el.classList.add('animate'); // Add 'animate' class for initial styling (opacity: 0)
        observer.observe(el);
    });


    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Service card hover effect (This is already handled by CSS :hover, but if JS specific logic is needed in future)
    // document.querySelectorAll('.service-card').forEach(card => {
    //     card.addEventListener('mouseenter', function() {
    //         // Example: this.style.transform = 'translateY(-10px)';
    //     });
    //     card.addEventListener('mouseleave', function() {
    //         // Example: this.style.transform = 'translateY(0)';
    //     });
    // });
    // Note: The original JS for service card hover was redundant as CSS :hover already handles it.
    // I've commented it out but left the structure if you need JS-driven hover effects later.
});