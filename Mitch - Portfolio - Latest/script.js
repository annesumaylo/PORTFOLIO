// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.getElementById('navLinks');
mobileMenu ? .addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('active'));
});

// Smooth scroll function with offset for fixed header
function smoothScrollTo(targetElement) {
    const header = document.querySelector('.header');
    const headerHeight = header ? header.offsetHeight : 80;
    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - headerHeight;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

// Handle all anchor clicks for smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            smoothScrollTo(targetElement);
        }
    });
});

// Update active nav link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    const header = document.querySelector('.header');
    const headerHeight = header ? header.offsetHeight : 80;

    let currentSection = '';
    const scrollPosition = window.scrollY + headerHeight + 50;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Scroll Up Button functionality
const scrollUpBtn = document.getElementById('scrollUpBtn');

function toggleScrollUpButton() {
    if (window.scrollY > 300) {
        scrollUpBtn.classList.add('show');
    } else {
        scrollUpBtn.classList.remove('show');
    }
}

scrollUpBtn ? .addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Skill bar animation on scroll
const skillProgressBars = document.querySelectorAll('.skill-progress');
let skillsAnimated = false;

function animateSkillBars() {
    if (skillsAnimated) return;
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const rect = skillsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            skillProgressBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
            });
            skillsAnimated = true;
        }
    }
}

// Contact Form Handler
const contactForm = document.getElementById('contactForm');

function showToast(message, isError = false) {
    const existingToast = document.querySelector('.toast');
    if (existingToast) existingToast.remove();
    const toast = document.createElement('div');
    toast.className = `toast ${isError ? 'error' : ''}`;
    toast.innerHTML = `<i class="fas ${isError ? 'fa-exclamation-triangle' : 'fa-check-circle'}"></i> ${message}`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
}

contactForm ? .addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('formName').value.trim();
    const email = document.getElementById('formEmail').value.trim();
    const message = document.getElementById('formMessage').value.trim();

    if (!name || !email || !message) {
        showToast('Please fill in all fields', true);
        return;
    }
    if (!email.includes('@') || !email.includes('.')) {
        showToast('Please enter a valid email address', true);
        return;
    }
    showToast(`Thank you ${name}! Your message has been sent. I'll get back to you soon.`);
    contactForm.reset();
});

// Resume Download
document.getElementById('downloadResume') ? .addEventListener('click', () => {
    showToast('Resume download started! (Demo)');
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(10, 10, 10, 0.98)';
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
    } else {
        header.style.background = 'rgba(10, 10, 10, 0.95)';
        header.style.boxShadow = 'none';
    }
    toggleScrollUpButton();
    updateActiveNavLink();
    animateSkillBars();
});

// Initial calls
toggleScrollUpButton();
updateActiveNavLink();

// Trigger skill bars on page load if section is visible
setTimeout(animateSkillBars, 500);