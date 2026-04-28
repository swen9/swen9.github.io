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
const sections = document.querySelectorAll('.section[id], header[id]');
const navAnchors = document.querySelectorAll('.nav-menu a');

function setActive(id) {
    navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + id);
    });
}

const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) setActive(entry.target.id);
    });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => spyObserver.observe(s));

// Activate last section when scrolled to bottom
window.addEventListener('scroll', () => {
    const nearBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 50;
    if (nearBottom) {
        const last = sections[sections.length - 1];
        if (last) setActive(last.id);
    }
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
