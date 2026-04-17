// script.js - CÓDIGO PRINCIPAL DO SITE
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Website Diogo Duarte carregado!');

    // ===== DOWNLOAD AUTOMÁTICO =====
    function setupDownloadLinks() {
        // Links do hero section
        const downloadCV = document.getElementById('download-cv');
        const downloadPortfolio = document.getElementById('download-portfolio');
        
        // Links da secção de contactos
        const downloadCVContact = document.getElementById('download-cv-contact');
        const downloadPortfolioContact = document.getElementById('download-portfolio-contact');
        
        // Função para forçar download
        function forceDownload(event, url, filename) {
            event.preventDefault();
            
            // Criar um link temporário para download
            const link = document.createElement('a');
            link.href = url;
            link.download = filename || 'download';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Feedback visual
            const button = event.target.closest('a');
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i> Download Iniciado';
            button.style.background = 'var(--success-color)';
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.style.background = '';
            }, 2000);
        }
        
        // Configurar eventos para todos os botões de download
        if (downloadCV) {
            downloadCV.addEventListener('click', (e) => {
                forceDownload(e, 
                    'https://drive.google.com/uc?export=download&id=1-Qxj8nScjs9hfzQpkMtO2ZIM0ep5720j',
                    'Diogo_Duarte_Curriculo.pdf'
                );
            });
        }
        
        if (downloadPortfolio) {
            downloadPortfolio.addEventListener('click', (e) => {
                forceDownload(e,
                    'https://drive.google.com/uc?export=download&id=1ONiWYP3zuz4WTdBUzhc38hcJ2kWQsCis',
                    'Diogo_Duarte_Portfolio.pdf'
                );
            });
        }
        
        if (downloadCVContact) {
            downloadCVContact.addEventListener('click', (e) => {
                forceDownload(e,
                    'https://drive.google.com/uc?export=download&id=1-Qxj8nScjs9hfzQpkMtO2ZIM0ep5720j',
                    'Diogo_Duarte_Curriculo.pdf'
                );
            });
        }
        
        if (downloadPortfolioContact) {
            downloadPortfolioContact.addEventListener('click', (e) => {
                forceDownload(e,
                    'https://drive.google.com/uc?export=download&id=1ONiWYP3zuz4WTdBUzhc38hcJ2kWQsCis',
                    'Diogo_Duarte_Portfolio.pdf'
                );
            });
        }
    }

    // ===== MENU HAMBURGER =====
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Fechar menu ao clicar nos links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
        
        // Fechar menu ao clicar fora
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }

    // ===== SISTEMA DE TRADUÇÃO =====
    const translateBtn = document.getElementById('translate-btn');
    let currentLang = 'pt';
    
    const translations = {
        pt: {
            home: "Home",
            sobre: "Sobre",
            habilidades: "Habilidades",
            portfolio: "Portfólio",
            contato: "Contato",
            greeting: "Olá, eu sou",
            heroSubtitle: "Multimedia Designer & Web Developer",
            heroDescription: "Crio experiências digitais impressionantes combinando design criativo e desenvolvimento técnico para dar vida às suas ideias.",
            btnCV: "Download Currículo",
            btnPortfolio: "Download Portfólio",
            aboutTitle: "Sobre Mim",
            aboutText1: "Licenciado em Engenharia Multimédia pelo ISTEC – Instituto Superior de Tecnologias Avançadas, sou Web Developer e Designer Multimédia com experiência em desenvolvimento front-end e back-end.",
            aboutText2: "Domino linguagens e frameworks como HTML, CSS, JavaScript, React, Angular, Node.js e PHP, desenvolvendo soluções web completas, otimizadas e adaptadas às necessidades do utilizador. Tenho também experiência em integração de bases de dados, UX/UI design e otimização de performance.",
            aboutText3: "No âmbito do design e multimédia, utilizo ferramentas Adobe como Illustrator, Photoshop, After Effects e Premiere Pro para criar identidades visuais, animações e conteúdos digitais.",
            aboutText4: "A nível profissional, colaborei com a Restart, produzindo animações e materiais gráficos, e com a Reallife, onde atuei como Web Designer, desenvolvendo websites e suportes visuais para campanhas digitais. Atualmente, desenvolvo projetos próprios através da v.graphiks, focados em branding, motion design e desenvolvimento web personalizado.",
            statsExperience: "Anos de Experiência",
            skillsTitle: "Principais Competências",
            skillsMainTitle: "Habilidades Técnicas",
            designCategory: "Design & Multimedia",
            devCategory: "Desenvolvimento Web",
            portfolioTitle: "Meu Portfólio",
            filterAll: "Todos",
            filterDesign: "Design",
            filterWeb: "Web",
            filterVideo: "Vídeo",
            contactTitle: "Contactos",
            email: "Email",
            phone: "Telefone",
            location: "Localização",
            documents: "Documentos",
            btnDownloadCV: "Download Currículo",
            btnDownloadPortfolio: "Download Portfólio",
            footerSubtitle: "Multimedia Designer & Web Developer",
            rights: "Todos os direitos reservados."
        },
        en: {
            home: "Home",
            sobre: "About",
            habilidades: "Skills",
            portfolio: "Portfolio",
            contato: "Contact",
            greeting: "Hi, I'm",
            heroSubtitle: "Multimedia Designer & Web Developer",
            heroDescription: "I create impressive digital experiences combining creative design and technical development to bring your ideas to life.",
            btnCV: "Download CV",
            btnPortfolio: "Download Portfolio",
            aboutTitle: "About Me",
            aboutText1: "Graduated in Multimedia Engineering from ISTEC - Instituto Superior de Tecnologias Avançadas, I am a Web Developer and Multimedia Designer with experience in front-end and back-end development.",
            aboutText2: "I master languages and frameworks such as HTML, CSS, JavaScript, React, Angular, Node.js and PHP, developing complete web solutions, optimized and adapted to user needs. I also have experience in database integration, UX/UI design and performance optimization.",
            aboutText3: "In the field of design and multimedia, I use Adobe tools such as Illustrator, Photoshop, After Effects and Premiere Pro to create visual identities, animations and digital content.",
            aboutText4: "Professionally, I collaborated with Restart, producing animations and graphic materials, and with Reallife, where I worked as a Web Designer, developing websites and visual supports for digital campaigns. Currently, I develop my own projects through v.graphiks, focused on branding, motion design and personalized web development.",
            statsExperience: "Years of Experience",
            skillsTitle: "Main Skills",
            skillsMainTitle: "Technical Skills",
            designCategory: "Design & Multimedia",
            devCategory: "Web Development",
            portfolioTitle: "My Portfolio",
            filterAll: "All",
            filterDesign: "Design",
            filterWeb: "Web",
            filterVideo: "Video",
            contactTitle: "Contacts",
            email: "Email",
            phone: "Phone",
            location: "Location",
            documents: "Documents",
            btnDownloadCV: "Download CV",
            btnDownloadPortfolio: "Download Portfolio",
            footerSubtitle: "Multimedia Designer & Web Developer",
            rights: "All rights reserved."
        }
    };
    
    function applyTranslations(lang) {
        try {
            // Menu
            const menuLinks = document.querySelectorAll('.nav-link');
            if (menuLinks[0]) menuLinks[0].textContent = translations[lang].home;
            if (menuLinks[1]) menuLinks[1].textContent = translations[lang].sobre;
            if (menuLinks[2]) menuLinks[2].textContent = translations[lang].habilidades;
            if (menuLinks[3]) menuLinks[3].textContent = translations[lang].portfolio;
            if (menuLinks[4]) menuLinks[4].textContent = translations[lang].contato;
            
            // Hero
            const greeting = document.querySelector('.greeting');
            if (greeting) greeting.textContent = translations[lang].greeting;
            
            const heroSubtitle = document.querySelector('.hero-subtitle');
            if (heroSubtitle) heroSubtitle.textContent = translations[lang].heroSubtitle;
            
            const heroDescription = document.querySelector('.hero-description');
            if (heroDescription) heroDescription.textContent = translations[lang].heroDescription;
            
            const buttons = document.querySelectorAll('.hero-actions .btn');
            if (buttons[0]) buttons[0].textContent = translations[lang].btnCV;
            if (buttons[1]) buttons[1].textContent = translations[lang].btnPortfolio;
            
            // About
            const aboutTitle = document.querySelector('#sobre .section-title');
            if (aboutTitle) aboutTitle.textContent = translations[lang].aboutTitle;
            
            const aboutParagraphs = document.querySelectorAll('.about-text p');
            if (aboutParagraphs[0]) aboutParagraphs[0].textContent = translations[lang].aboutText1;
            if (aboutParagraphs[1]) aboutParagraphs[1].textContent = translations[lang].aboutText2;
            if (aboutParagraphs[2]) aboutParagraphs[2].textContent = translations[lang].aboutText3;
            if (aboutParagraphs[3]) aboutParagraphs[3].textContent = translations[lang].aboutText4;
            
            const stats = document.querySelectorAll('.stat-label');
            if (stats[0]) stats[0].textContent = translations[lang].statsExperience;
            
            const skillsTitle = document.querySelector('.about-skills h3');
            if (skillsTitle) skillsTitle.textContent = translations[lang].skillsTitle;
            
            // Skills
            const skillsMainTitle = document.querySelector('#habilidades .section-title');
            if (skillsMainTitle) skillsMainTitle.textContent = translations[lang].skillsMainTitle;
            
            const categoryTitles = document.querySelectorAll('.category-title');
            if (categoryTitles[0]) categoryTitles[0].innerHTML = '<i class="fas fa-palette"></i>' + translations[lang].designCategory;
            if (categoryTitles[1]) categoryTitles[1].innerHTML = '<i class="fas fa-code"></i>' + translations[lang].devCategory;
            
            // Portfolio
            const portfolioTitle = document.querySelector('#portfolio .section-title');
            if (portfolioTitle) portfolioTitle.textContent = translations[lang].portfolioTitle;
            
            const filterBtns = document.querySelectorAll('.filter-btn');
            if (filterBtns[0]) filterBtns[0].textContent = translations[lang].filterAll;
            if (filterBtns[1]) filterBtns[1].textContent = translations[lang].filterDesign;
            if (filterBtns[2]) filterBtns[2].textContent = translations[lang].filterWeb;
            if (filterBtns[3]) filterBtns[3].textContent = translations[lang].filterVideo;
            
            // Contact
            const contactTitle = document.querySelector('#contato .section-title');
            if (contactTitle) contactTitle.textContent = translations[lang].contactTitle;
            
            const contactItems = document.querySelectorAll('.contact-details h3');
            if (contactItems[0]) contactItems[0].textContent = translations[lang].email;
            if (contactItems[1]) contactItems[1].textContent = translations[lang].phone;
            if (contactItems[2]) contactItems[2].textContent = translations[lang].location;
            
            const downloadSection = document.querySelector('.download-section h3');
            if (downloadSection) downloadSection.textContent = translations[lang].documents;
            
            const downloadButtons = document.querySelectorAll('.download-buttons .btn');
            if (downloadButtons[0]) downloadButtons[0].textContent = translations[lang].btnDownloadCV;
            if (downloadButtons[1]) downloadButtons[1].textContent = translations[lang].btnDownloadPortfolio;
            
            // Footer
            const footerSubtitle = document.querySelector('.footer-info p');
            if (footerSubtitle) footerSubtitle.textContent = translations[lang].footerSubtitle;
            
            const footerBottom = document.querySelector('.footer-bottom p');
            if (footerBottom) footerBottom.textContent = `© 2024 Diogo Duarte. ${translations[lang].rights}`;
            
        } catch (error) {
            console.error('Erro na tradução:', error);
        }
    }
    
    if (translateBtn) {
        translateBtn.addEventListener('click', () => {
            currentLang = currentLang === 'pt' ? 'en' : 'pt';
            translateBtn.textContent = currentLang === 'pt' ? 'EN' : 'PT';
            applyTranslations(currentLang);
        });
    }

    // ===== FILTRO DO PORTFOLIO =====
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterBtns.length > 0 && portfolioItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class de todos os botões
                filterBtns.forEach(b => b.classList.remove('active'));
                // Adiciona active class ao botão clicado
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');
                
                portfolioItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // ===== ANIMAÇÃO DE SCROLL =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    const animateElements = document.querySelectorAll('.hero-text, .about-content, .skill-category, .portfolio-item, .contact-content');
    animateElements.forEach(el => {
        if (el) observer.observe(el);
    });

    // ===== HEADER SCROLL EFFECT =====
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(15, 23, 42, 0.98)';
                header.style.padding = '0.7rem 0';
            } else {
                header.style.background = 'rgba(15, 23, 42, 0.95)';
                header.style.padding = '1rem 0';
            }
        }
    });

    // ===== INICIALIZAÇÃO =====
    // Configurar downloads automáticos
    setupDownloadLinks();
    
    // Aplicar traduções iniciais
    applyTranslations(currentLang);
    
    console.log('✅ Todas as funcionalidades carregadas!');
});