/* ========================================
   GZY ENERJİ - Main JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    Preloader.init();
    Navbar.init();
    MobileMenu.init();
    HeroParticles.init();
    ScrollReveal.init();
    CounterAnimation.init();
    SmoothScroll.init();
    ContactForm.init();
});

/* ===== PRELOADER ===== */
const Preloader = {
    init() {
        const preloader = document.getElementById('preloader');
        if (!preloader) return;

        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('hidden');
                setTimeout(() => {
                    preloader.remove();
                }, 600);
            }, 800);
        });

        // Fallback: remove after 3s
        setTimeout(() => {
            preloader.classList.add('hidden');
            setTimeout(() => preloader.remove(), 600);
        }, 3000);
    }
};

/* ===== NAVBAR ===== */
const Navbar = {
    init() {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;

        let lastScroll = 0;
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;

            // Toggle scrolled state
            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            lastScroll = currentScroll;

            // Update active link
            this.updateActiveLink(navLinks);
        }, { passive: true });
    },

    updateActiveLink(navLinks) {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 200;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
};

/* ===== MOBILE MENU ===== */
const MobileMenu = {
    init() {
        const toggle = document.getElementById('nav-toggle');
        const menu = document.getElementById('mobile-menu');
        const links = document.querySelectorAll('.mobile-nav-link');

        if (!toggle || !menu) return;

        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            menu.classList.toggle('active');
            document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
        });

        links.forEach(link => {
            link.addEventListener('click', () => {
                toggle.classList.remove('active');
                menu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
};

/* ===== HERO PARTICLES ===== */
const HeroParticles = {
    init() {
        const container = document.getElementById('hero-particles');
        if (!container) return;

        const particleCount = window.innerWidth < 768 ? 15 : 30;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');

            const x = Math.random() * 100;
            const delay = Math.random() * 6;
            const duration = 4 + Math.random() * 4;
            const size = 2 + Math.random() * 3;
            const isAmber = Math.random() > 0.7;

            particle.style.cssText = `
                left: ${x}%;
                bottom: ${Math.random() * 30}%;
                width: ${size}px;
                height: ${size}px;
                animation-delay: ${delay}s;
                animation-duration: ${duration}s;
                background: ${isAmber ? 'var(--accent-amber)' : 'var(--accent-blue)'};
                box-shadow: 0 0 ${size * 3}px ${isAmber ? 'rgba(245, 158, 11, 0.5)' : 'rgba(14, 165, 233, 0.5)'};
            `;

            container.appendChild(particle);
        }
    }
};

/* ===== SCROLL REVEAL ===== */
const ScrollReveal = {
    init() {
        // Add reveal classes to elements
        const elements = [
            ...document.querySelectorAll('.service-card'),
            ...document.querySelectorAll('.about-feature'),
            ...document.querySelectorAll('.contact-card'),
            ...document.querySelectorAll('.section-header'),
            ...document.querySelectorAll('.about-visual'),
            ...document.querySelectorAll('.about-content'),
            ...document.querySelectorAll('.contact-form-wrapper'),
            ...document.querySelectorAll('.cta-content'),
        ];

        elements.forEach((el, index) => {
            el.classList.add('reveal');
            // Add stagger delay for grid items
            const delayClass = `reveal-delay-${(index % 5) + 1}`;
            el.classList.add(delayClass);
        });

        // Create observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        document.querySelectorAll('.reveal').forEach(el => {
            observer.observe(el);
        });
    }
};

/* ===== COUNTER ANIMATION ===== */
const CounterAnimation = {
    init() {
        const counters = document.querySelectorAll('.stat-number');
        if (!counters.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    },

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }
};

/* ===== SMOOTH SCROLL ===== */
const SmoothScroll = {
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    const offset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - offset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
};

/* ===== CONTACT FORM ===== */
const ContactForm = {
    init() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            // Construct mailto or WhatsApp link
            const name = data.name || '';
            const phone = data.phone || '';
            const service = form.querySelector('#service')?.selectedOptions[0]?.text || '';
            const message = data.message || '';

            const whatsappText = encodeURIComponent(
                `Merhaba, GZY Enerji web sitesinden ulaşıyorum.\n\n` +
                `Ad Soyad: ${name}\n` +
                `Telefon: ${phone}\n` +
                `Hizmet: ${service}\n` +
                `Mesaj: ${message}`
            );

            // Show success state
            const submitBtn = form.querySelector('#form-submit');
            const originalHTML = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>✓ Gönderildi!</span>';
            submitBtn.style.background = 'var(--accent-green)';
            submitBtn.disabled = true;

            // Open WhatsApp
            window.open(`https://wa.me/905510080594?text=${whatsappText}`, '_blank');

            // Reset after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalHTML;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
                form.reset();
            }, 3000);
        });
    }
};

/* ===== PARALLAX EFFECT (subtle) ===== */
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-bg-img');
    if (hero && window.scrollY < window.innerHeight) {
        const speed = 0.3;
        hero.style.transform = `scale(1.05) translateY(${window.scrollY * speed}px)`;
    }
}, { passive: true });
