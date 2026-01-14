// Dark mode detection
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark');
}
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    if (event.matches) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
});

// Language translations
let currentLang = 'fr';

function toggleLanguage() {
    currentLang = currentLang === 'fr' ? 'en' : 'fr';
    document.getElementById('currentLang').textContent = currentLang.toUpperCase();

    // Update all translatable elements
    document.querySelectorAll('[data-fr]').forEach(el => {
        el.textContent = el.getAttribute(`data-${currentLang}`);
    });

    // Update placeholders
    document.querySelectorAll('[data-placeholder-fr]').forEach(el => {
        el.placeholder = el.getAttribute(`data-placeholder-${currentLang}`);
    });
}

document.getElementById('langToggle').addEventListener('click', toggleLanguage);

// Mobile menu
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const closeMobileMenu = document.getElementById('closeMobileMenu');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

function openMobileMenu() {
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenuFunc() {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
}

mobileMenuBtn.addEventListener('click', openMobileMenu);
closeMobileMenu.addEventListener('click', closeMobileMenuFunc);
mobileMenuOverlay.addEventListener('click', closeMobileMenuFunc);

// Close mobile menu on link click
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileMenuFunc);
});

// Mobile accordion
document.querySelectorAll('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', function() {
        const content = this.nextElementSibling;
        const icon = this.querySelector('.accordion-icon');

        content.classList.toggle('open');
        icon.style.transform = content.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0)';
    });
});

// Scroll reveal animation
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', reveal);
reveal(); // Initial check

// Header scroll effect
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('shadow-lg');
    } else {
        header.classList.remove('shadow-lg');
    }
});

// Form submission
const quoteForm = document.getElementById('quoteForm');
const successModal = document.getElementById('successModal');

quoteForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Show success modal
    successModal.classList.add('active');
    const modalContent = successModal.querySelector('.modal-content');
    setTimeout(() => {
        modalContent.style.transform = 'scale(1)';
        modalContent.style.opacity = '1';
    }, 100);

    // Reset form
    quoteForm.reset();
});

function closeModal() {
    const modalContent = successModal.querySelector('.modal-content');
    modalContent.style.transform = 'scale(0.95)';
    modalContent.style.opacity = '0';
    setTimeout(() => {
        successModal.classList.remove('active');
    }, 300);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});  




// script.js - Version optimisée
document.addEventListener('DOMContentLoaded', function() {
    // Variables
    let currentLang = 'fr';
    const isMobile = window.innerWidth <= 768;

    // Initialisation
    initAnimations();
    initMobileMenu();
    initAccordions();
    initForm();
    initScrollReveal();
    initDropdowns();

    // Langue
    document.getElementById('langToggle').addEventListener('click', toggleLanguage);

    // Mode sombre
    if (localStorage.getItem('darkMode') === 'true' || 
        (!('darkMode' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.body.classList.add('dark');
    }

    // Animations
    function initAnimations() {
        // Animate on scroll
        const animateElements = document.querySelectorAll('.animate-slide-left, .animate-slide-right, .animate-slide-up');
        
        animateElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.animationDelay = `${index * 100}ms`;
            
            setTimeout(() => {
                el.style.animationPlayState = 'running';
            }, 100);
        });

        // Floating animation
        const floatElements = document.querySelectorAll('.float-animation');
        floatElements.forEach(el => {
            if (!isMobile) {
                el.style.animation = 'float 6s ease-in-out infinite';
            }
        });
    }

    // Menu mobile
    function initMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const closeMobileMenu = document.getElementById('closeMobileMenu');
        const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
        const mobileMenu = document.getElementById('mobileMenu');

        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        }

        function closeMenu() {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }

        if (closeMobileMenu) closeMobileMenu.addEventListener('click', closeMenu);
        if (mobileMenuOverlay) mobileMenuOverlay.addEventListener('click', closeMenu);

        // Fermer menu en cliquant sur un lien
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }

    // Accordions
    function initAccordions() {
        const accordionTriggers = document.querySelectorAll('.accordion-trigger');
        
        accordionTriggers.forEach(trigger => {
            trigger.addEventListener('click', function() {
                const content = this.nextElementSibling;
                const icon = this.querySelector('.accordion-icon');
                
                this.classList.toggle('active');
                content.classList.toggle('open');
                
                if (content.classList.contains('open')) {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    icon.style.transform = 'rotate(180deg)';
                } else {
                    content.style.maxHeight = '0';
                    icon.style.transform = 'rotate(0deg)';
                }
            });
        });
    }

    // Formulaire
    function initForm() {
        const form = document.getElementById('quoteForm');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validation basique
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#ef4444';
                } else {
                    field.style.borderColor = '';
                }
            });
            
            if (isValid) {
                // Simulation d'envoi
                showSuccessModal();
                form.reset();
            } else {
                alert(currentLang === 'fr' 
                    ? 'Veuillez remplir tous les champs obligatoires.' 
                    : 'Please fill in all required fields.');
            }
        });
    }

    // Scroll reveal
    function initScrollReveal() {
        const revealElements = document.querySelectorAll('.reveal');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        revealElements.forEach(el => revealObserver.observe(el));
    }

    // Dropdowns desktop
    function initDropdowns() {
        if (isMobile) return;
        
        const dropdowns = document.querySelectorAll('.dropdown');
        
        dropdowns.forEach(dropdown => {
            const button = dropdown.querySelector('button');
            const menu = dropdown.querySelector('.dropdown-menu');
            
            dropdown.addEventListener('mouseenter', () => {
                menu.style.opacity = '1';
                menu.style.visibility = 'visible';
                menu.style.transform = 'translateY(0)';
            });
            
            dropdown.addEventListener('mouseleave', () => {
                menu.style.opacity = '0';
                menu.style.visibility = 'hidden';
                menu.style.transform = 'translateY(10px)';
            });
        });
    }

    // Langue
    function toggleLanguage() {
        currentLang = currentLang === 'fr' ? 'en' : 'fr';
        document.getElementById('currentLang').textContent = currentLang.toUpperCase();
        
        // Mettre à jour tout le texte
        updateAllText();
    }

    function updateAllText() {
        document.querySelectorAll('[data-fr]').forEach(element => {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                const placeholder = element.getAttribute(`data-placeholder-${currentLang}`);
                if (placeholder) element.placeholder = placeholder;
            } else {
                const text = element.getAttribute(`data-${currentLang}`);
                if (text) element.textContent = text;
            }
        });
    }

    // Modal
    function showSuccessModal() {
        const modal = document.getElementById('successModal');
        modal.classList.add('active');
    }

    window.closeModal = function() {
        const modal = document.getElementById('successModal');
        modal.classList.remove('active');
    }

    // Fermer modal avec ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // Smooth scroll pour les ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Gestion du scroll pour le header
    let lastScroll = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            if (currentScroll > lastScroll && !isMobile) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        }
        
        lastScroll = currentScroll;
    });
});


