// ===== ANIMATIONS JAVASCRIPT =====

// Animation utilities and advanced effects
class AnimationController {
    constructor() {
        this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.animations = new Map();
        this.init();
    }

    init() {
        this.createAIAnimation();
        this.initScrollAnimations();
        this.initParticleSystem();
        this.initTypewriter();
        this.initMorphingShapes();
        this.initFloatingElements();
    }

    // ===== AI NEURAL NETWORK ANIMATION =====
    createAIAnimation() {
        const aiContainer = document.querySelector('.ai-animation');
        if (!aiContainer || this.isReducedMotion) return;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        aiContainer.appendChild(canvas);

        // Set canvas size
        const resizeCanvas = () => {
            const rect = aiContainer.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Neural network nodes
        const nodes = [];
        const connections = [];
        const numNodes = 15;
        
        // Create nodes
        for (let i = 0; i < numNodes; i++) {
            nodes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 3 + 2,
                pulse: Math.random() * Math.PI * 2,
                color: `hsl(${220 + Math.random() * 40}, 70%, 60%)`
            });
        }

        // Create connections
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const distance = Math.sqrt(
                    Math.pow(nodes[i].x - nodes[j].x, 2) + 
                    Math.pow(nodes[i].y - nodes[j].y, 2)
                );
                
                if (distance < 120) {
                    connections.push({
                        from: i,
                        to: j,
                        opacity: Math.max(0, 1 - distance / 120),
                        pulse: Math.random() * Math.PI * 2
                    });
                }
            }
        }

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw connections
            connections.forEach(connection => {
                const fromNode = nodes[connection.from];
                const toNode = nodes[connection.to];
                
                connection.pulse += 0.05;
                const pulseOpacity = (Math.sin(connection.pulse) + 1) * 0.5;
                
                ctx.beginPath();
                ctx.moveTo(fromNode.x, fromNode.y);
                ctx.lineTo(toNode.x, toNode.y);
                ctx.strokeStyle = `rgba(59, 130, 246, ${connection.opacity * pulseOpacity * 0.5})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            });

            // Update and draw nodes
            nodes.forEach(node => {
                // Update position
                node.x += node.vx;
                node.y += node.vy;

                // Bounce off edges
                if (node.x <= node.radius || node.x >= canvas.width - node.radius) {
                    node.vx *= -1;
                }
                if (node.y <= node.radius || node.y >= canvas.height - node.radius) {
                    node.vy *= -1;
                }

                // Pulse effect
                node.pulse += 0.03;
                const pulseSize = node.radius + Math.sin(node.pulse) * 1;

                // Draw node
                ctx.beginPath();
                ctx.arc(node.x, node.y, pulseSize, 0, Math.PI * 2);
                ctx.fillStyle = node.color;
                ctx.fill();
                
                // Glow effect
                ctx.beginPath();
                ctx.arc(node.x, node.y, pulseSize + 3, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(59, 130, 246, 0.2)`;
                ctx.fill();
            });

            requestAnimationFrame(animate);
        };

        animate();
    }

    // ===== SCROLL ANIMATIONS =====
    initScrollAnimations() {
        if (this.isReducedMotion) return;

        const observerOptions = {
            threshold: [0, 0.1, 0.5, 1],
            rootMargin: '-10px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const element = entry.target;
                const animation = element.dataset.animation;
                
                if (entry.isIntersecting) {
                    this.triggerAnimation(element, animation);
                } else if (element.dataset.repeat === 'true') {
                    this.resetAnimation(element, animation);
                }
            });
        }, observerOptions);

        // Observe elements with data-animation attribute
        document.querySelectorAll('[data-animation]').forEach(element => {
            observer.observe(element);
        });
    }

    triggerAnimation(element, animationType) {
        switch (animationType) {
            case 'fade-in':
                this.fadeIn(element);
                break;
            case 'slide-up':
                this.slideUp(element);
                break;
            case 'slide-left':
                this.slideLeft(element);
                break;
            case 'slide-right':
                this.slideRight(element);
                break;
            case 'scale-in':
                this.scaleIn(element);
                break;
            case 'rotate-in':
                this.rotateIn(element);
                break;
            case 'bounce-in':
                this.bounceIn(element);
                break;
            case 'typewriter':
                this.typewriter(element);
                break;
        }
    }

    resetAnimation(element, animationType) {
        element.style.transform = '';
        element.style.opacity = '';
        element.classList.remove('animated');
    }

    // ===== ANIMATION METHODS =====
    fadeIn(element) {
        element.style.opacity = '0';
        element.style.transition = 'opacity 0.8s ease-out';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.classList.add('animated');
        }, 50);
    }

    slideUp(element) {
        element.style.transform = 'translateY(50px)';
        element.style.opacity = '0';
        element.style.transition = 'transform 0.8s ease-out, opacity 0.8s ease-out';
        
        setTimeout(() => {
            element.style.transform = 'translateY(0)';
            element.style.opacity = '1';
            element.classList.add('animated');
        }, 50);
    }

    slideLeft(element) {
        element.style.transform = 'translateX(-50px)';
        element.style.opacity = '0';
        element.style.transition = 'transform 0.8s ease-out, opacity 0.8s ease-out';
        
        setTimeout(() => {
            element.style.transform = 'translateX(0)';
            element.style.opacity = '1';
            element.classList.add('animated');
        }, 50);
    }

    slideRight(element) {
        element.style.transform = 'translateX(50px)';
        element.style.opacity = '0';
        element.style.transition = 'transform 0.8s ease-out, opacity 0.8s ease-out';
        
        setTimeout(() => {
            element.style.transform = 'translateX(0)';
            element.style.opacity = '1';
            element.classList.add('animated');
        }, 50);
    }

    scaleIn(element) {
        element.style.transform = 'scale(0.8)';
        element.style.opacity = '0';
        element.style.transition = 'transform 0.6s ease-out, opacity 0.6s ease-out';
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
            element.style.opacity = '1';
            element.classList.add('animated');
        }, 50);
    }

    rotateIn(element) {
        element.style.transform = 'rotateY(-90deg)';
        element.style.opacity = '0';
        element.style.transition = 'transform 0.8s ease-out, opacity 0.8s ease-out';
        
        setTimeout(() => {
            element.style.transform = 'rotateY(0deg)';
            element.style.opacity = '1';
            element.classList.add('animated');
        }, 50);
    }

    bounceIn(element) {
        element.style.transform = 'scale(0)';
        element.style.transition = 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
            element.classList.add('animated');
        }, 50);
    }

    // ===== TYPEWRITER EFFECT =====
    typewriter(element) {
        const text = element.textContent;
        const speed = parseInt(element.dataset.speed) || 50;
        
        element.textContent = '';
        element.style.borderRight = '2px solid #3b82f6';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            element.textContent += text.charAt(i);
            i++;
            
            if (i >= text.length) {
                clearInterval(typeInterval);
                // Remove cursor after typing is complete
                setTimeout(() => {
                    element.style.borderRight = 'none';
                }, 1000);
            }
        }, speed);
    }

    // ===== PARTICLE SYSTEM =====
    initParticleSystem() {
        if (this.isReducedMotion) return;

        const particleContainers = document.querySelectorAll('.particle-container');
        
        particleContainers.forEach(container => {
            this.createParticleSystem(container);
        });
    }

    createParticleSystem(container) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        container.appendChild(canvas);

        const particles = [];
        const maxParticles = 50;

        const resizeCanvas = () => {
            canvas.width = container.offsetWidth;
            canvas.height = container.offsetHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Create particles
        for (let i = 0; i < maxParticles; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.2,
                vy: (Math.random() - 0.5) * 0.2,
                radius: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2,
                color: Math.random() > 0.5 ? '#3b82f6' : '#06b6d4'
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Wrap around edges
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;

                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.globalAlpha = particle.opacity;
                ctx.fill();
                ctx.globalAlpha = 1;
            });

            requestAnimationFrame(animate);
        };

        animate();
    }

    // ===== MORPHING SHAPES =====
    initMorphingShapes() {
        if (this.isReducedMotion) return;

        const morphingElements = document.querySelectorAll('.morphing-shape');
        
        morphingElements.forEach(element => {
            this.createMorphingShape(element);
        });
    }

    createMorphingShape(element) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        
        svg.setAttribute('viewBox', '0 0 200 200');
        svg.style.width = '100%';
        svg.style.height = '100%';
        
        element.appendChild(svg);
        svg.appendChild(path);

        const shapes = [
            'M100,20 L180,100 L100,180 L20,100 Z', // Diamond
            'M100,20 A80,80 0 0,1 180,100 A80,80 0 0,1 100,180 A80,80 0 0,1 20,100 A80,80 0 0,1 100,20 Z', // Circle
            'M100,20 L150,70 L150,130 L100,180 L50,130 L50,70 Z', // Hexagon
            'M100,30 L120,80 L170,80 L130,120 L150,170 L100,140 L50,170 L70,120 L30,80 L80,80 Z' // Star
        ];

        let currentShape = 0;
        path.setAttribute('d', shapes[currentShape]);
        path.setAttribute('fill', '#3b82f6');
        path.setAttribute('fill-opacity', '0.1');
        path.setAttribute('stroke', '#3b82f6');
        path.setAttribute('stroke-width', '2');

        setInterval(() => {
            currentShape = (currentShape + 1) % shapes.length;
            path.setAttribute('d', shapes[currentShape]);
            
            // Add transition
            path.style.transition = 'all 2s ease-in-out';
        }, 3000);
    }

    // ===== FLOATING ELEMENTS =====
    initFloatingElements() {
        if (this.isReducedMotion) return;

        const floatingElements = document.querySelectorAll('.floating-element');
        
        floatingElements.forEach((element, index) => {
            this.animateFloatingElement(element, index);
        });
    }

    animateFloatingElement(element, index) {
        const delay = index * 200; // Stagger animation
        const duration = 3000 + (index * 200); // Varying duration
        
        element.style.animationDelay = `${delay}ms`;
        element.style.animationDuration = `${duration}ms`;
        element.classList.add('float');
    }

    // ===== MOUSE INTERACTION EFFECTS =====
    initMouseEffects() {
        if (this.isReducedMotion) return;

        const interactiveElements = document.querySelectorAll('.mouse-interactive');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                this.handleMouseMove(e, element);
            });
            
            element.addEventListener('mouseleave', () => {
                this.resetMouseEffect(element);
            });
        });
    }

    handleMouseMove(e, element) {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }

    resetMouseEffect(element) {
        element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    }

    // ===== LOADING ANIMATIONS =====
    createLoadingAnimation() {
        const loader = document.createElement('div');
        loader.className = 'page-loader';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-logo">
                    <div class="loader-circle"></div>
                    <div class="loader-text">Centram</div>
                </div>
                <div class="loader-progress">
                    <div class="loader-bar"></div>
                </div>
            </div>
        `;
        
        document.body.appendChild(loader);
        
        // Simulate loading progress
        const progressBar = loader.querySelector('.loader-bar');
        let progress = 0;
        
        const loadInterval = setInterval(() => {
            progress += Math.random() * 10;
            if (progress >= 100) {
                progress = 100;
                clearInterval(loadInterval);
                
                setTimeout(() => {
                    loader.style.opacity = '0';
                    setTimeout(() => {
                        document.body.removeChild(loader);
                    }, 500);
                }, 500);
            }
            
            progressBar.style.width = `${progress}%`;
        }, 100);
    }

    // ===== UTILITY METHODS =====
    pauseAnimations() {
        document.body.classList.add('animations-paused');
    }

    resumeAnimations() {
        document.body.classList.remove('animations-paused');
    }

    // ===== PERFORMANCE MONITORING =====
    monitorPerformance() {
        let frameCount = 0;
        let lastTime = performance.now();
        
        const checkFPS = () => {
            frameCount++;
            const currentTime = performance.now();
            
            if (currentTime - lastTime >= 1000) {
                const fps = frameCount;
                frameCount = 0;
                lastTime = currentTime;
                
                // If FPS is too low, reduce animations
                if (fps < 30) {
                    console.warn('Low FPS detected, reducing animations');
                    this.pauseAnimations();
                } else if (fps > 50) {
                    this.resumeAnimations();
                }
            }
            
            requestAnimationFrame(checkFPS);
        };
        
        checkFPS();
    }
}

// ===== CSS ANIMATION CLASSES =====
const animationCSS = `
.fade-in {
    opacity: 0;
    animation: fadeIn 0.8s ease-out forwards;
}

.slide-up {
    transform: translateY(50px);
    opacity: 0;
    animation: slideUp 0.8s ease-out forwards;
}

.slide-left {
    transform: translateX(-50px);
    opacity: 0;
    animation: slideLeft 0.8s ease-out forwards;
}

.slide-right {
    transform: translateX(50px);
    opacity: 0;
    animation: slideRight 0.8s ease-out forwards;
}

.scale-in {
    transform: scale(0.8);
    opacity: 0;
    animation: scaleIn 0.6s ease-out forwards;
}

.bounce-in {
    transform: scale(0);
    animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
}

.float {
    animation: float 6s ease-in-out infinite;
}

@keyframes fadeIn {
    to { opacity: 1; }
}

@keyframes slideUp {
    to { 
        transform: translateY(0);
        opacity: 1;
    }
}

@keyframes slideLeft {
    to { 
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideRight {
    to { 
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes scaleIn {
    to { 
        transform: scale(1);
        opacity: 1;
    }
}

@keyframes bounceIn {
    to { transform: scale(1); }
}

@keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
}

.page-loader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    transition: opacity 0.5s ease;
}

.loader-content {
    text-align: center;
    color: white;
}

.loader-logo {
    margin-bottom: 2rem;
}

.loader-circle {
    width: 60px;
    height: 60px;
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-top: 4px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
}

.loader-text {
    font-size: 1.5rem;
    font-weight: 600;
}

.loader-progress {
    width: 200px;
    height: 4px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
    overflow: hidden;
    margin: 0 auto;
}

.loader-bar {
    height: 100%;
    background: white;
    transition: width 0.3s ease;
    width: 0%;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.animations-paused * {
    animation-play-state: paused !important;
}

@media (prefers-reduced-motion: reduce) {
    .fade-in, .slide-up, .slide-left, .slide-right, .scale-in, .bounce-in, .float {
        animation: none !important;
        opacity: 1 !important;
        transform: none !important;
    }
}
`;

// Inject CSS
const style = document.createElement('style');
style.textContent = animationCSS;
document.head.appendChild(style);

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const animationController = new AnimationController();
    
    // Expose to global scope
    window.AnimationController = animationController;
    
    // Show loading animation if element exists
    if (document.querySelector('.page-loader-trigger')) {
        animationController.createLoadingAnimation();
    }
    
    // Start performance monitoring
    animationController.monitorPerformance();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnimationController;
}