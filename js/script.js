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

    // Header behavior
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Mobile Menu Toggle (Drawer)
    const hamburger = document.getElementById('hamburger-icon'); // For SP
    const navMenu = document.getElementById('nav-menu'); // The main nav container
    const drawerCloseButton = document.querySelector('.drawer-close');
    // const pcRightMenuIcon = document.querySelector('.pc-right-sp-menu-icon.hamburger'); // If using a separate PC hamburger

    function toggleMenu() {
        if (hamburger) hamburger.classList.toggle('active');
        if (navMenu) navMenu.classList.toggle('active'); // This targets the SP drawer behavior
        // if (pcRightMenuIcon) pcRightMenuIcon.classList.toggle('active'); // For PC specific hamburger
    }

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', toggleMenu);
    }
    if (drawerCloseButton && navMenu) {
        drawerCloseButton.addEventListener('click', toggleMenu);
    }
    // if (pcRightMenuIcon && navMenu) { // If using a separate PC hamburger
    //     pcRightMenuIcon.addEventListener('click', toggleMenu);
    // }


    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Prevent default for actual fragment identifiers
            if (href.startsWith("#") && href.length > 1) {
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    e.preventDefault();
                    
                    const headerHeight = header ? header.offsetHeight : 0;
                    let targetPosition = targetElement.offsetTop - headerHeight;

                    // Additional offset for non-top targets or fixed elements
                    if (href !== "#top") {
                        targetPosition -= 20; // 20px offset, adjust as needed
                    }
                     if (href === "#top") { // Special handling for #top to go all the way up
                        targetPosition = 0;
                    }


                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open and it's a drawer link
                    if (navMenu && navMenu.classList.contains('active') && this.closest('.nav-menu-drawer')) {
                       toggleMenu();
                    }
                }
            } else if (href === "#") { // Prevent default for placeholder links like href="#"
                 e.preventDefault();
            }
            // Allow default for external links or non-fragment links
        });
    });


    // Intersection Observer for scroll animations
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    if (animatedElements.length > 0) {
        const observerOptions = {
            threshold: 0.1, // Trigger when 10% of the element is visible
            rootMargin: '0px 0px -50px 0px' // Start animation a bit before it's fully in view
        };

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    // Optional: Stop observing after animation to save resources
                    // obs.unobserve(entry.target); 
                }
            });
        }, observerOptions);

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }

    // Example: Close drawer if clicking outside of it (optional)
    document.addEventListener('click', function(event) {
        if (navMenu && navMenu.classList.contains('active')) {
            const isClickInsideMenu = navMenu.contains(event.target);
            const isClickOnHamburger = hamburger ? hamburger.contains(event.target) : false;
            // const isClickOnPcHamburger = pcRightMenuIcon ? pcRightMenuIcon.contains(event.target) : false;

            if (!isClickInsideMenu && !isClickOnHamburger /* && !isClickOnPcHamburger */) {
                toggleMenu();
            }
        }
    });

});
