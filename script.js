class UltraAnimatedWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupPreloader();
        this.setupCustomCursor();
        this.setupAnimations();
        this.setupTheme();
        this.setupMagneticButtons();
        this.setupScrollAnimations();
        this.setupCounterAnimation();
    }

    setupPreloader() {
        window.addEventListener('load', () => {
            const preloader = document.querySelector('.preloader');
            setTimeout(() => {
                preloader.classList.add('loaded');
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 2000);
        });
    }

    setupCustomCursor() {
        const cursor = document.querySelector('.custom-cursor');
        const follower = document.querySelector('.cursor-follower');

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                follower.style.left = e.clientX + 'px';
                follower.style.top = e.clientY + 'px';
            }, 100);
        });

        // Эффект при наведении на интерактивные элементы
        const interactiveElements = document.querySelectorAll('a, button, .nav-link, .project-card');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.width = '20px';
                cursor.style.height = '20px';
                follower.style.width = '60px';
                follower.style.height = '60px';
                follower.style.background = 'rgba(99, 102, 241, 0.1)';
            });

            el.addEventListener('mouseleave', () => {
                cursor.style.width = '8px';
                cursor.style.height = '8px';
                follower.style.width = '40px';
                follower.style.height = '40px';
                follower.style.background = 'transparent';
            });
        });
    }

    setupAnimations() {
        // Анимация появления элементов при скролле
        this.setupScrollAnimations();
        
        // Параллакс эффект для фона
        this.setupParallax();
        
        // Анимация текста
        this.animateText();
    }

    setupTheme() {
        const themeToggle = document.querySelector('.theme-toggle');
        const savedTheme = localStorage.getItem('theme') || 'light';
        
        document.documentElement.setAttribute('data-theme', savedTheme);

        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    setupMagneticButtons() {
        const magneticButtons = document.querySelectorAll('.magnetic');
        
        magneticButtons.forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translate(0, 0)';
            });
        });
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Наблюдаем за всеми элементами которые нужно анимировать
        document.querySelectorAll('.skill-card, .project-card, .stat-item, .contact-item').forEach(el => {
            observer.observe(el);
        });
    }

    setupParallax() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.floating-shapes .shape');
            
            parallaxElements.forEach((shape, index) => {
                const speed = 0.5 + (index * 0.1);
                const yPos = -(scrolled * speed);
                shape.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    animateText() {
        // Анимация для заголовков
        const titles = document.querySelectorAll('.section-title');
        
        titles.forEach(title => {
            const text = title.textContent;
            title.innerHTML = '';
            
            text.split('').forEach((char, index) => {
                const span = document.createElement('span');
                span.textContent = char;
                span.style.animationDelay = `${index * 0.1}s`;
                span.classList.add('char-animate');
                title.appendChild(span);
            });
        });
    }

    setupCounterAnimation() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });

        document.querySelectorAll('.stat-number').forEach(stat => {
            observer.observe(stat);
        });
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }
}

// Инициализация сайта когда DOM загружен
document.addEventListener('DOMContentLoaded', () => {
    new UltraAnimatedWebsite();
});

// Добавляем CSS для анимации символов
const style = document.createElement('style');
style.textContent = `
    .char-animate {
        display: inline-block;
        opacity: 0;
        transform: translateY(30px);
        animation: slideUp 0.5s ease forwards;
    }
    
    .animate-in {
        animation: slideUp 0.8s ease forwards;
    }
    
    .skill-card, .project-card, .stat-item, .contact-item {
        opacity: 0;
        transform: translateY(30px);
    }
    
    @keyframes slideUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);