// ===== Navbar scroll effect =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
});

// ===== Mobile nav toggle =====
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
    });
});

// ===== Smooth scroll offset for fixed navbar =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const offset = navbar.offsetHeight + 20;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ===== Scroll-spy =====
const sections = document.querySelectorAll('[id]:is(.section, .hero)');
const navAnchors = document.querySelectorAll('.nav-menu a');

function updateSpy() {
    const nearBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 60;
    let current = '';
    if (nearBottom) {
        current = sections[sections.length - 1].id;
    } else {
        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - navbar.offsetHeight - 60) {
                current = section.id;
            }
        });
    }
    navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
}

// ===== Back to top =====
const backToTop = document.querySelector('.back-to-top');
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 300);
    updateSpy();
});

// ===== Section fade-in =====
document.querySelectorAll('.section, .hero').forEach(el => el.classList.add('reveal'));

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => fadeObserver.observe(el));
