document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       1. LOADER REMOVAL
       ========================================================================== */
    window.addEventListener('load', () => {
        const loader = document.getElementById('loader');
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            // Trigger initial animations after loader
            revealOnScroll();
            animateProgressBars();
        }, 500);
    });

    /* ==========================================================================
       2. SINGLE PAGE APPLICATION (SPA) ROUTING
       ========================================================================== */
    const navLinks = document.querySelectorAll('.nav-link, .nav-link-trigger');
    const sections = document.querySelectorAll('.view-section');
    const navMenu = document.getElementById('nav-links');
    const hamburger = document.getElementById('hamburger');

    function switchView(targetId) {
        // Hide all sections
        sections.forEach(sec => {
            sec.classList.remove('active');
        });
        
        // Remove active class from nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });

        // Show target section
        const targetSection = document.getElementById(targetId);
        if(targetSection) {
            targetSection.classList.add('active');
            
            // Specific logic for home page progress bars
            if(targetId === 'home') {
                setTimeout(animateProgressBars, 100);
            }
            
            // Re-trigger scroll reveal for new view
            setTimeout(revealOnScroll, 100);
        }

        // Add active class to corresponding nav link
        const activeNav = document.querySelector(`.nav-link[data-target="${targetId}"]`);
        if(activeNav) activeNav.classList.add('active');

        // Close mobile menu if open
        if(navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        }

        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('data-target');
            switchView(target);
        });
    });

    /* ==========================================================================
       3. MOBILE HAMBURGER MENU
       ========================================================================== */
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        if(navMenu.classList.contains('active')) {
            hamburger.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });

    /* ==========================================================================
       4. TYPING EFFECT (Hero Section)
       ========================================================================== */
    const typedTextSpan = document.querySelector(".typed-text");
    const textArray = ["Front-End Developer", "UI/UX Enthusiast", "Problem Solver"];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }

    if(textArray.length) setTimeout(type, newTextDelay + 250);

    /* ==========================================================================
       5. SCROLL REVEAL ANIMATION & PROGRESS BARS
       ========================================================================== */
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.reveal');
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            // If element is within viewport
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    }

    function animateProgressBars() {
        const homeSection = document.getElementById('home');
        if(!homeSection.classList.contains('active')) return;

        const progressBars = document.querySelectorAll('.progress');
        progressBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
        });
    }

    window.addEventListener('scroll', revealOnScroll);

    /* ==========================================================================
       6. SCROLL TO TOP BUTTON & STICKY NAV LOGIC
       ========================================================================== */
    const scrollBtn = document.getElementById('scrollToTop');
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        // Header Shadow toggle
        if(window.scrollY > 50) {
            header.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
        }

        // Scroll to Top visibility
        if (window.scrollY > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* ==========================================================================
       7. FORM VALIDATION (Front-End Only)
       ========================================================================== */
    const form = document.getElementById('contact-form');
    const successBox = document.getElementById('success-message');

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent page reload

        let isValid = true;
        
        // Get inputs
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');

        // Validation functions
        const showError = (input, groupID) => {
            document.getElementById(groupID).classList.add('error');
            isValid = false;
        }
        const clearError = (groupID) => {
            document.getElementById(groupID).classList.remove('error');
        }

        // Check Name
        if(name.value.trim() === '') showError(name, 'group-name');
        else clearError('group-name');

        // Check Email (Simple Regex)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email.value.trim())) showError(email, 'group-email');
        else clearError('group-email');

        // Check Subject
        if(subject.value.trim() === '') showError(subject, 'group-subject');
        else clearError('group-subject');

        // Check Message
        if(message.value.trim() === '') showError(message, 'group-message');
        else clearError('group-message');

        // If Valid -> Show Success without reload
        if(isValid) {
            successBox.style.display = 'block';
            form.reset(); // Clear form
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successBox.style.display = 'none';
            }, 5000);
        }
    });
});