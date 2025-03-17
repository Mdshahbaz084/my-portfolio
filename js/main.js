// Main JavaScript file for Madrasa Sikariya website

// DOM Elements
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menuToggle');
const contactForm = document.getElementById('contactForm');

// Toggle sidebar on mobile
menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

// Close sidebar when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 1024 && 
        !sidebar.contains(e.target) && 
        !menuToggle.contains(e.target) && 
        sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
    }
});

// Slideshow functionality
let slideIndex = 1;
let slideTimer;

// Initialize the slideshow when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    showSlides(slideIndex);
    // Start automatic slideshow
    startSlideTimer();
});

// Next/previous controls
function changeSlide(n) {
    showSlides(slideIndex += n);
    resetSlideTimer(); // Reset timer when manually changing slides
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
    resetSlideTimer(); // Reset timer when manually changing slides
}

function showSlides(n) {
    let i;
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");
    
    // Handle edge cases
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    
    // Hide all slides
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    
    // Remove active-dot class from all dots
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active-dot", "");
    }
    
    // Show the current slide and highlight the current dot
    if (slides.length > 0 && slideIndex <= slides.length) {
        slides[slideIndex-1].style.display = "block";
    }
    
    if (dots.length > 0 && slideIndex <= dots.length) {
        dots[slideIndex-1].className += " active-dot";
    }
}

// Auto advancing slides
function startSlideTimer() {
    slideTimer = setInterval(() => {
        changeSlide(1);
    }, 5000); // Change slide every 5 seconds
}

function resetSlideTimer() {
    clearInterval(slideTimer);
    startSlideTimer();
}

// Pause slideshow when user interacts with it
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        clearInterval(slideTimer);
    } else {
        startSlideTimer();
    }
});

// Contact Form Handling
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            name: contactForm.name.value,
            email: contactForm.email.value,
            message: contactForm.message.value
        };
        
        try {
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
            
            contactForm.reset();
            contactForm.appendChild(successMessage);
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
            
        } catch (error) {
            console.error('Error sending message:', error);
            
            // Show error message
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = 'Sorry, there was an error sending your message. Please try again later.';
            
            contactForm.appendChild(errorMessage);
            
            // Remove error message after 5 seconds
            setTimeout(() => {
                errorMessage.remove();
            }, 5000);
        }
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Close mobile sidebar if open
            if (window.innerWidth <= 1024) {
                sidebar.classList.remove('active');
            }
            
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add active class to nav links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            currentSection = '#' + section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentSection) {
            link.classList.add('active');
        }
    });
});

// Add CSS class for fade-in animation on scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.section, .service-item, .donation-card, .contact-card').forEach(element => {
    observer.observe(element);
});

// Handle donation button clicks
document.querySelectorAll('.donate-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const donationPage = button.getAttribute('href');
        window.open(donationPage, '_blank');
    });
});
