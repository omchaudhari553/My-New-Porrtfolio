// Intersection Observer for section animations
const sections = document.querySelectorAll('.section');
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
});

// Handle image loading
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });
    });
});

// Scroll to top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.className = 'scroll-top';
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const menuIcon = document.querySelector('.menu-toggle i');

// Make sure menu is closed on page load
window.addEventListener('DOMContentLoaded', () => {
    navLinks.style.display = 'none';
    navLinks.classList.remove('show');
    menuIcon.classList.remove('fa-times');
    menuIcon.classList.add('fa-bars');
});

if (menuToggle && navLinks && menuIcon) {
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isMenuOpen = navLinks.classList.contains('show');
        
        if (!isMenuOpen) {
            navLinks.style.display = 'flex';
            // Small delay to ensure display: flex is applied before animation
            setTimeout(() => {
                navLinks.classList.add('show');
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-times');
            }, 10);
        } else {
            navLinks.classList.remove('show');
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
            // Wait for transition to finish before hiding
            setTimeout(() => {
                if (!navLinks.classList.contains('show')) {
                    navLinks.style.display = 'none';
                }
            }, 400);
        }
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('show');
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
            setTimeout(() => {
                navLinks.style.display = 'none';
            }, 400);
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('show')) {
            navLinks.classList.remove('show');
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
            setTimeout(() => {
                navLinks.style.display = 'none';
            }, 400);
        }
    });
}

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navLinks.style.display = 'flex';
        navLinks.style.right = '0';
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    } else if (!navLinks.classList.contains('show')) {
        navLinks.style.display = 'none';
        navLinks.style.right = '-100%';
    }
});

// Mobile menu toggle
const navContent = document.querySelector('.nav-content');
if (window.innerWidth <= 768) {
    navContent.insertBefore(menuToggle, navLinks);
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navLinks.classList.remove('show');
            setTimeout(() => {
                navLinks.style.display = 'none';
            }, 400);
        }
    });
});

// Form submission handling with animation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // Add loading animation
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual form submission logic)
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
            submitBtn.style.backgroundColor = '#28a745';
            contactForm.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.backgroundColor = '';
                submitBtn.disabled = false;
            }, 3000);
        } catch (error) {
            submitBtn.innerHTML = '<i class="fas fa-times"></i> Error';
            submitBtn.style.backgroundColor = '#dc3545';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.backgroundColor = '';
                submitBtn.disabled = false;
            }, 3000);
        }
    });
}

// Skill icons animation on hover
const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        const icon = item.querySelector('i');
        icon.style.animation = 'none';
        icon.offsetHeight; // Trigger reflow
        icon.style.animation = 'bounce 1s ease';
    });
});

// Project cards hover effect
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Three.js Particle Animation
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create the Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg-animation'),
    alpha: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 1);

// Create Geometry for Particles
const particleGeometry = new THREE.BufferGeometry();
const particleCount = 2500;  
const positions = new Float32Array(particleCount * 3);

// Set Random Positions for Particles
for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 30;     
    positions[i + 1] = (Math.random() - 0.5) * 30; 
    positions[i + 2] = (Math.random() - 0.5) * 30; 
}

// Add positions to Geometry
particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

// Create PointsMaterial with aqua color
const particleMaterial = new THREE.PointsMaterial({
    color: 0x00ffff,
    size: 0.05,      
    transparent: true,
    opacity: 0.8,    
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true
});

// Create Points (Particle System)
const particles = new THREE.Points(particleGeometry, particleMaterial);
scene.add(particles);

// Mouse movement tracking
let mouseX = 0;
let mouseY = 0;
document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - window.innerWidth / 2) * 0.0002;  
    mouseY = (event.clientY - window.innerHeight / 2) * 0.0002;
});

// Animation Loop
function animate() {
    requestAnimationFrame(animate);

    // Constant rotation even without mouse movement
    particles.rotation.y += 0.0008;
    particles.rotation.x += 0.0003;
    particles.rotation.z += 0.0002;

    // Update particle positions for continuous wave effect
    const positions = particles.geometry.attributes.position.array;
    const time = Date.now() * 0.00008;

    for(let i = 0; i < positions.length; i += 3) {
        // Continuous wave motion in multiple directions
        positions[i] += Math.cos(time + positions[i + 1]) * 0.01;     // X movement
        positions[i + 1] += Math.sin(time + positions[i]) * 0.01;     // Y movement
        positions[i + 2] += Math.sin(time * 0.5 + positions[i]) * 0.01; // Z movement
        
        // Keep particles within bounds
        if (Math.abs(positions[i]) > 15) positions[i] *= 0.99;
        if (Math.abs(positions[i + 1]) > 15) positions[i + 1] *= 0.99;
        if (Math.abs(positions[i + 2]) > 15) positions[i + 2] *= 0.99;
    }
    particles.geometry.attributes.position.needsUpdate = true;

    // Automatic camera movement
    const autoTime = Date.now() * 0.0001;
    camera.position.x = Math.cos(autoTime) * 2;
    camera.position.y = Math.sin(autoTime) * 2;
    
    // Combine automatic movement with mouse movement
    if (Math.abs(mouseX) > 0.001 || Math.abs(mouseY) > 0.001) {
        camera.position.x += (mouseX - camera.position.x) * 0.05;
        camera.position.y += (-mouseY - camera.position.y) * 0.05;
    }
    
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start animation
animate();

// Add hover effects to education cards
document.querySelectorAll('.education-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});
