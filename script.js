// script.js

document.addEventListener('DOMContentLoaded', function() {
    
    // Carregar depoimentos
    loadTestimonials();
    
    // Configurar controles dos depoimentos
    setupTestimonialControls();
    
    // Configurar FAQ accordion
    setupFAQ();
    
    // Smooth scroll para links internos
    setupSmoothScroll();
    
    // Adicionar efeito de fade-in às seções
    setupScrollAnimation();
});

// Carregar imagens de depoimento
function loadTestimonials() {
    const testimonialsGrid = document.getElementById('testimonialsGrid');
    
    // Limpar conteúdo existente
    testimonialsGrid.innerHTML = '';
    
    // Criar elementos de imagem para cada depoimento
    for (let i = 1; i <= 9; i++) {
        const img = document.createElement('img');
        img.src = `assets/depoimento${i}.jpg`;
        img.alt = `Depoimento ${i} - Mulher que fez o Guia My Glow Up`;
        img.className = 'testimonial-img';
        img.loading = 'lazy';
        
        // Adicionar fallback se a imagem não carregar
        img.onerror = function() {
            // Criar placeholder personalizado para imagens que não existem
            this.onerror = null;
            this.src = 'data:image/svg+xml;base64,' + btoa(`
                <svg xmlns="http://www.w3.org/2000/svg" width="300" height="250" viewBox="0 0 300 250">
                    <rect width="300" height="250" fill="#f4a7b9" opacity="0.1"/>
                    <circle cx="150" cy="100" r="40" fill="#f4a7b9" opacity="0.2"/>
                    <text x="150" y="170" text-anchor="middle" font-family="Arial" font-size="16" fill="#666">Depoimento ${i}</text>
                    <text x="150" y="190" text-anchor="middle" font-family="Arial" font-size="14" fill="#999">Guia My Glow Up</text>
                </svg>
            `);
        };
        
        testimonialsGrid.appendChild(img);
    }
}

// Configurar controles de navegação dos depoimentos
function setupTestimonialControls() {
    const testimonialsGrid = document.getElementById('testimonialsGrid');
    const prevButton = document.getElementById('prevTestimonial');
    const nextButton = document.getElementById('nextTestimonial');
    
    // Para desktop, não precisamos de scroll horizontal
    // Para mobile, configuramos o scroll manual
    if (window.innerWidth < 768) {
        // Configurar scroll horizontal com os botões
        prevButton.addEventListener('click', function() {
            testimonialsGrid.scrollBy({
                left: -250,
                behavior: 'smooth'
            });
        });
        
        nextButton.addEventListener('click', function() {
            testimonialsGrid.scrollBy({
                left: 250,
                behavior: 'smooth'
            });
        });
        
        // Mostrar os controles apenas em mobile
        document.querySelector('.testimonials-controls').style.display = 'flex';
    } else {
        // Esconder controles em desktop
        document.querySelector('.testimonials-controls').style.display = 'none';
    }
}

// Configurar FAQ accordion
function setupFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            // Fechar todas as outras respostas
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== question) {
                    otherQuestion.classList.remove('active');
                    otherQuestion.nextElementSibling.classList.remove('active');
                }
            });
            
            // Alternar estado atual
            this.classList.toggle('active');
            const answer = this.nextElementSibling;
            answer.classList.toggle('active');
        });
    });
}

// Configurar smooth scroll para links internos
function setupSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Configurar animação de scroll para elementos
function setupScrollAnimation() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar todas as seções
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(section);
    });
    
    // Observar cards de razões
    const reasonCards = document.querySelectorAll('.reason-card');
    reasonCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transitionDelay = `${index * 0.1}s`;
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
}

// Reconfigurar controles de depoimento quando a janela for redimensionada
window.addEventListener('resize', function() {
    setupTestimonialControls();
});