// DOM Elements
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav-link');
const backToTopBtn = document.querySelector('.back-to-top');
const header = document.querySelector('.header');
const timelineItems = document.querySelectorAll('.timeline-item');
const skillCategories = document.querySelectorAll('.skill-category');
const projectCards = document.querySelectorAll('.project-card');
const contactForm = document.getElementById('contactForm');

// Mobile Menu Toggle
menuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuBtn.querySelector('i').classList.toggle('fa-bars');
    menuBtn.querySelector('i').classList.toggle('fa-times');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        menuBtn.querySelector('i').classList.add('fa-bars');
        menuBtn.querySelector('i').classList.remove('fa-times');
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Back to top button
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
    
    // Scroll animation for timeline items
    animateOnScroll(timelineItems, 'visible');
    
    // Scroll animation for skill categories
    animateOnScroll(skillCategories, 'visible');
    
    // Scroll animation for project cards
    animateOnScroll(projectCards, 'visible');
});

// Back to top functionality
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scroll for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            link.classList.add('active');
            
            // Scroll to target section
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for scroll animations
function animateOnScroll(elements, className) {
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect();
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition.top < screenPosition) {
            element.classList.add(className);
        }
    });
}

// Initialize scroll animations on page load
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll(timelineItems, 'visible');
    animateOnScroll(skillCategories, 'visible');
    animateOnScroll(projectCards, 'visible');
    
    // Add scroll delay for staggered animations
    timelineItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.2}s`;
    });
    
    skillCategories.forEach((category, index) => {
        category.style.transitionDelay = `${index * 0.1}s`;
    });
    
    projectCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
});

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send the data to a server
    // For now, we'll just show a success message
    showNotification('Message sent successfully! I will get back to you soon.', 'success');
    
    // Reset form
    contactForm.reset();
    
    // Remove focus from submit button
    e.target.querySelector('button').blur();
});

// Notification system
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles for notification
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            display: flex;
            align-items: center;
            gap: 0.75rem;
            z-index: 10000;
            transform: translateX(150%);
            transition: transform 0.3s ease;
            border-left: 4px solid;
            max-width: 400px;
        }
        .notification-success { border-left-color: #10b981; }
        .notification i { font-size: 1.25rem; }
        .notification-success i { color: #10b981; }
        .notification span { flex: 1; }
        .notification-close {
            background: none;
            border: none;
            color: #64748b;
            cursor: pointer;
            padding: 0.25rem;
            font-size: 0.875rem;
            transition: color 0.2s ease;
        }
        .notification-close:hover { color: #ef4444; }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Add close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(150%)';
        setTimeout(() => {
            notification.remove();
            style.remove();
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(150%)';
            setTimeout(() => {
                notification.remove();
                style.remove();
            }, 300);
        }
    }, 5000);
}

// Add active class to nav links based on scroll position
function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 100;
    
    navLinks.forEach(link => {
        const section = document.querySelector(link.getAttribute('href'));
        if (section) {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        }
    });
}

// Update active nav link on scroll
window.addEventListener('scroll', updateActiveNavLink);

// Initialize active nav link on page load
updateActiveNavLink();

// Add animation for skill bars
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-level');
    
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 300);
    });
}

// Animate skill bars when skills section comes into view
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observe skills section
const skillsSection = document.querySelector('.skills-section');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Add typing effect for hero description
function initTypingEffect() {
    const heroDescription = document.querySelector('.hero-description');
    if (!heroDescription) return;
    
    const text = heroDescription.textContent;
    heroDescription.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroDescription.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 20);
        }
    };
    
    // Start typing effect after a delay
    setTimeout(typeWriter, 500);
}

// Initialize typing effect on page load
window.addEventListener('load', initTypingEffect);

// Add parallax effect to hero section
function initParallaxEffect() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        heroSection.style.backgroundPosition = `center ${rate}px`;
    });
}

// Initialize parallax effect
initParallaxEffect();

// Research Section Animations
function initResearchAnimations() {
    // Animate counters
    const statNumbers = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                animateCounter(counter, target);
                counterObserver.unobserve(counter);
            }
        });
    }, observerOptions);

    statNumbers.forEach(stat => counterObserver.observe(stat));

    // Animate publication cards on scroll
    const publicationCards = document.querySelectorAll('.publication-card');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 100);
                cardObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    publicationCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        cardObserver.observe(card);
    });

    // Animate progress bars
    const progressBars = document.querySelectorAll('.progress-fill');
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0%';
                
                setTimeout(() => {
                    bar.style.width = width;
                }, 300);
                
                progressObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => progressObserver.observe(bar));
}

// Animate counter
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const duration = 1500;
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

// Initialize research animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add after other initializations
    initResearchAnimations();
    
    // Add hover effects for publication cards
    const publicationCards = document.querySelectorAll('.publication-card');
    publicationCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateX(10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateX(10px)';
        });
    });
    

    // Research Interests Animations
function initResearchInterests() {
    // Animate interest tags on hover
    const interestTags = document.querySelectorAll('.interest-tag');
    interestTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            const icon = tag.querySelector('i');
            icon.style.transform = 'scale(1.2) rotate(10deg)';
        });
        
        tag.addEventListener('mouseleave', () => {
            const icon = tag.querySelector('i');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Category hover effects
    const interestCategories = document.querySelectorAll('.interest-category');
    interestCategories.forEach(category => {
        category.addEventListener('mouseenter', () => {
            const icon = category.querySelector('.category-icon i');
            icon.style.animation = 'bounce 0.5s ease';
            
            // Add floating animation to tags
            const tags = category.querySelectorAll('.interest-tag');
            tags.forEach((tag, index) => {
                setTimeout(() => {
                    tag.style.transform = 'translateX(5px)';
                }, index * 50);
            });
        });
        
        category.addEventListener('mouseleave', () => {
            const tags = category.querySelectorAll('.interest-tag');
            tags.forEach((tag, index) => {
                setTimeout(() => {
                    tag.style.transform = 'translateX(0)';
                }, index * 50);
            });
        });
    });
    
    // Interactive visualization
    const circleRings = document.querySelectorAll('.circle-ring');
    circleRings.forEach(ring => {
        ring.addEventListener('mouseenter', () => {
            // Highlight the ring
            ring.style.boxShadow = '0 0 40px rgba(0, 0, 0, 0.3)';
            ring.style.transform = 'scale(1.1)';
            
            // Add glow effect
            const color = getComputedStyle(ring).background;
            ring.style.boxShadow = `0 0 40px ${getColorFromGradient(color)}`;
        });
        
        ring.addEventListener('mouseleave', () => {
            ring.style.boxShadow = '';
            ring.style.transform = '';
        });
        
        ring.addEventListener('click', () => {
            const tooltip = ring.getAttribute('data-tooltip');
            showInterestNotification(tooltip);
        });
    });
    
    // Animate legend items on scroll
    const legendItems = document.querySelectorAll('.legend-item');
    const legendObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 100);
                legendObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    legendItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        legendObserver.observe(item);
    });
}

// Helper function to extract color from gradient
function getColorFromGradient(gradient) {
    // Simple extraction - for demo purposes
    if (gradient.includes('#48bb78')) return '#48bb78';
    if (gradient.includes('#4299e1')) return '#4299e1';
    if (gradient.includes('#ed8936')) return '#ed8936';
    if (gradient.includes('#805ad5')) return '#805ad5';
    return 'rgba(66, 153, 225, 0.5)';
}

// Show interest notification
function showInterestNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'interest-notification';
    notification.innerHTML = `
        <i class="fas fa-lightbulb"></i>
        <span>${message}</span>
    `;
    
    // Add notification styles
    const style = document.createElement('style');
    style.textContent = `
        .interest-notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #2d3748, #4a5568);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            z-index: 10000;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            animation: slideInRight 0.3s ease, slideOutRight 0.3s ease 2.7s;
            max-width: 300px;
        }
        
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        .interest-notification i {
            color: #48bb78;
            font-size: 1.25rem;
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
        style.remove();
    }, 3000);
}

// Initialize research interests when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initResearchInterests();
    
    // Add keyboard navigation for accessibility
    const focusableElements = document.querySelectorAll('.interest-tag, .circle-ring, .legend-item');
    focusableElements.forEach(el => {
        el.setAttribute('tabindex', '0');
        
        el.addEventListener('focus', () => {
            el.style.outline = '2px solid #4299e1';
            el.style.outlineOffset = '2px';
        });
        
        el.addEventListener('blur', () => {
            el.style.outline = 'none';
        });
        
        el.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (el.classList.contains('circle-ring')) {
                    const tooltip = el.getAttribute('data-tooltip');
                    showInterestNotification(tooltip);
                }
                el.click();
            }
        });
    });
});

// Mobile menu
document.querySelector('.menu-btn').onclick = () => {
    document.querySelector('.nav').classList.toggle('active');
    const icon = document.querySelector('.menu-btn i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
};

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav').classList.remove('active');
        document.querySelector('.menu-btn i').classList.add('fa-bars');
        document.querySelector('.menu-btn i').classList.remove('fa-times');
    });
});

// Set active navigation link based on current page
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href');
        
        if ((currentPage === 'index.html' && linkHref === 'index.html') ||
            (currentPage === 'experience.html' && linkHref === 'experience.html') ||
            (currentPage === 'skills.html' && linkHref === 'skills.html') ||
            (currentPage === 'research.html' && linkHref === 'research.html') ||
            (currentPage === 'certificate.html' && linkHref === 'certificate.html') ||
            (currentPage === 'contact.html' && linkHref === 'contact.html')) {
            link.classList.add('active');
        }
    });
}

// Call function on page load
document.addEventListener('DOMContentLoaded', setActiveNavLink);

// Fade-in animation (only for elements that need it)
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Back to top button
const backToTopBtn = document.querySelector('.back-to-top');
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.onsubmit = e => {
        e.preventDefault();
        alert("Message sent successfully.");
        e.target.reset();
    };
}

// Research stats counter (only on research page)
const statNumbers = document.querySelectorAll('.stat-number');
if (statNumbers.length > 0) {
    const researchStatsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                animateCounter(counter, target);
                researchStatsObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => researchStatsObserver.observe(stat));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const duration = 1500;
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}
    // Add click effect for GUI links
    const guiLinks = document.querySelectorAll('.gui-link');
    guiLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Create a notification
            const notification = document.createElement('div');
            notification.className = 'gui-notification';
            notification.innerHTML = `
                <i class="fas fa-laptop-code"></i>
                <span>GUI tool will be available upon publication</span>
            `;
            
            // Add notification styles
            const style = document.createElement('style');
            style.textContent = `
                .gui-notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: linear-gradient(135deg, #4299e1, #667eea);
                    color: white;
                    padding: 1rem 1.5rem;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    z-index: 10000;
                    box-shadow: 0 10px 30px rgba(66, 153, 225, 0.3);
                    animation: slideIn 0.3s ease, slideOut 0.3s ease 2.7s;
                }
                
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            
            document.head.appendChild(style);
            document.body.appendChild(notification);
            
            // Remove notification after 3 seconds
            setTimeout(() => {
                notification.remove();
                style.remove();
            }, 3000);
        });
    });
});