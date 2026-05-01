document.addEventListener('DOMContentLoaded', function() {
            const canvas = document.getElementById('sphereCanvas');
            const ctx = canvas.getContext('2d');

            // Configurar canvas
            function resizeCanvas() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
            window.addEventListener('resize', resizeCanvas);
            resizeCanvas();

            // Criar pontos para a esfera
            const points = [];
            for (let i = 0; i < 100; i++) {
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.acos(Math.random() * 2 - 1);
                points.push({
                    x: Math.sin(phi) * Math.cos(theta),
                    y: Math.sin(phi) * Math.sin(theta),
                    z: Math.cos(phi)
                });
            }

            // Criar conexões entre pontos próximos
            const connections = [];
            for (let i = 0; i < points.length; i++) {
                for (let j = i + 1; j < points.length; j++) {
                    const dx = points[i].x - points[j].x;
                    const dy = points[i].y - points[j].y;
                    const dz = points[i].z - points[j].z;
                    const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
                    if (dist < 0.4) {
                        connections.push([i, j]);
                    }
                }
            }

            // Criar estrelas que rodam com a esfera
            const stars = [];
            for (let i = 0; i < 150; i++) {
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.acos(Math.random() * 2 - 1);
                stars.push({
                    x: Math.sin(phi) * Math.cos(theta),
                    y: Math.sin(phi) * Math.sin(theta),
                    z: Math.cos(phi),
                    size: Math.random() * 1.5 + 0.5,
                    opacity: Math.random() * 0.8 + 0.2,
                    radius: 250 + Math.random() * 100
                });
            }

            // Variáveis de rotação
            let autoRotation = 0;
            let mouseRotationX = 0;
            let mouseRotationY = 0;
            let targetMouseX = 0;
            let targetMouseY = 0;

            // Interação com o rato
            document.addEventListener('mousemove', (event) => {
                const mouseX = event.clientX;
                const mouseY = event.clientY;
                
                // Converter posição do rato para rotação (-0.5 a 0.5)
                targetMouseX = (mouseY / window.innerHeight - 0.5) * Math.PI;
                targetMouseY = (mouseX / window.innerWidth - 0.5) * Math.PI;
            });

            function rotatePoint(point, rotX, rotY) {
                let { x, y, z } = point;
                
                // Rotação X (vertical - com o rato)
                const cosX = Math.cos(rotX);
                const sinX = Math.sin(rotX);
                const y1 = y * cosX - z * sinX;
                const z1 = y * sinX + z * cosX;
                
                // Rotação Y (horizontal - com o rato)
                const cosY = Math.cos(rotY);
                const sinY = Math.sin(rotY);
                const x2 = x * cosY + z1 * sinY;
                const z2 = -x * sinY + z1 * cosY;
                
                return { x: x2, y: y1, z: z2 };
            }

            function animate() {
                // Limpar canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                // Suavizar a rotação do rato
                mouseRotationX += (targetMouseX - mouseRotationX) * 0.05;
                mouseRotationY += (targetMouseY - mouseRotationY) * 0.05;
                
                // Atualizar rotação automática
                autoRotation += 0.002;

                // Combinar rotações (auto + rato)
                const totalRotationX = mouseRotationX;
                const totalRotationY = autoRotation + mouseRotationY;

                // Rotacionar e projetar ESTRELAS
                ctx.fillStyle = 'white';
                stars.forEach(star => {
                    const rotatedStar = rotatePoint(star, totalRotationX, totalRotationY);
                    
                    const scale = 300 / (300 + rotatedStar.z * star.radius);
                    const px = rotatedStar.x * star.radius * scale + canvas.width / 2;
                    const py = rotatedStar.y * star.radius * scale + canvas.height / 2;

                    if (rotatedStar.z > -0.5) {
                        ctx.globalAlpha = star.opacity;
                        ctx.beginPath();
                        ctx.arc(px, py, star.size * scale, 0, Math.PI * 2);
                        ctx.fill();
                    }
                });

                ctx.globalAlpha = 1;

                // Rotacionar e projetar PONTOS da esfera
                const projectedPoints = points.map(point => {
                    const rotatedPoint = rotatePoint(point, totalRotationX, totalRotationY);
                    
                    const scale = 150 / (150 + rotatedPoint.z);
                    const px = rotatedPoint.x * 150 * scale + canvas.width / 2;
                    const py = rotatedPoint.y * 150 * scale + canvas.height / 2;
                    
                    return { ...rotatedPoint, px, py, scale };
                });

                // Desenhar CONEXÕES
                ctx.strokeStyle = 'rgba(37, 99, 235, 0.3)';
                ctx.lineWidth = 1;
                connections.forEach(([i, j]) => {
                    const p1 = projectedPoints[i];
                    const p2 = projectedPoints[j];
                    
                    if (p1.z > -0.5 && p2.z > -0.5) {
                        ctx.beginPath();
                        ctx.moveTo(p1.px, p1.py);
                        ctx.lineTo(p2.px, p2.py);
                        ctx.stroke();
                    }
                });

                // Desenhar PONTOS
                projectedPoints.forEach(point => {
                    if (point.z > -0.5) {
                        ctx.fillStyle = 'rgba(37, 99, 235, 0.8)';
                        ctx.beginPath();
                        ctx.arc(point.px, point.py, 2 * point.scale, 0, Math.PI * 2);
                        ctx.fill();
                    }
                });

                requestAnimationFrame(animate);
            }

            animate();

            // Menu toggle
            const menuToggle = document.getElementById('menu-toggle');
            const navMenu = document.querySelector('.nav-menu');
            const body = document.body;

            menuToggle.addEventListener('click', () => {
                menuToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
                body.classList.toggle('menu-open');
            });

            // Fechar menu ao clicar num link
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    menuToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    body.classList.remove('menu-open');
                });
            });

            // Scroll suave
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });

            // Botão de tradução
            const translateBtn = document.getElementById('translate-btn');
            let isEnglish = false;
            const translations = {
                pt: {
                    buttonLabel: 'EN',
                    documentTitle: 'Diogo Duarte - Designer Multim\u00e9dia & Desenvolvedor Web',
                    navLinks: ['In\u00edcio', 'Sobre', 'Habilidades', 'Experi\u00eancia', 'Contato'],
                    footerLinks: ['In\u00edcio', 'Sobre', 'Habilidades', 'Experi\u00eancia', 'Contato'],
                    hero: {
                        greeting: 'Ol\u00e1, eu sou',
                        subtitle: 'Designer Multim\u00e9dia & Desenvolvedor Web',
                        description: 'Crio experi\u00eancias digitais impressionantes combinando design criativo e desenvolvimento t\u00e9cnico para dar vida \u00e0s suas ideias.',
                        buttons: ['Descarregar Curr\u00edculo', 'Descarregar Portf\u00f3lio']
                    },
                    about: {
                        title: 'Sobre Mim',
                        paragraphs: [
                            'Licenciado em Engenharia Multim\u00e9dia pelo ISTEC - Instituto Superior de Tecnologias Avan\u00e7adas, sou Desenvolvedor Web e Designer Multim\u00e9dia com experi\u00eancia em desenvolvimento front-end e back-end.',
                            'Domino linguagens e frameworks como HTML, CSS, JavaScript, React, Angular, Node.js e PHP, desenvolvendo solu\u00e7\u00f5es web completas, otimizadas e adaptadas \u00e0s necessidades do utilizador. Tenho tamb\u00e9m experi\u00eancia em integra\u00e7\u00e3o de bases de dados, UX/UI design e otimiza\u00e7\u00e3o de performance.',
                            'No \u00e2mbito do design e multim\u00e9dia, utilizo ferramentas Adobe como Illustrator, Photoshop, After Effects e Premiere Pro para criar identidades visuais, anima\u00e7\u00f5es e conte\u00fados digitais.',
                            'A n\u00edvel profissional, colaborei com a Restart, produzindo anima\u00e7\u00f5es e materiais gr\u00e1ficos, e com a Reallife, onde atuei como Web Designer, desenvolvendo websites e suportes visuais para campanhas digitais. Atualmente, desenvolvo projetos pr\u00f3prios atrav\u00e9s da v.graphiks, focados em branding, motion design e desenvolvimento web personalizado.'
                        ],
                        statsLabel: 'Anos de Experi\u00eancia',
                        skillsTitle: 'Principais Compet\u00eancias',
                        skillTags: [
                            'Desenvolvimento Front-end',
                            'Desenvolvimento Back-end',
                            'Design UI/UX',
                            'React & Angular',
                            'Vue.js',
                            'Next.js',
                            'Node.js',
                            'PHP',
                            'Java',
                            'JavaScript',
                            'TypeScript',
                            'Integra\u00e7\u00e3o de Bases de Dados',
                            'MongoDB',
                            'SQL',
                            'APIs REST',
                            'Design Responsivo',
                            'Motion Graphics',
                            'Edição de Vídeo'
                        ]
                    },
                    skills: {
                        title: 'Habilidades Técnicas',
                        categories: ['Design & Multimédia', 'Desenvolvimento Web', 'Bases de Dados & Ferramentas']
                    },
                    specialties: {
                        title: 'Minhas Especialidades',
                        items: [
                            {
                                title: 'Desenvolvimento Front-end',
                                description: 'Crio interfaces modernas e responsivas utilizando as mais recentes tecnologias web. Foco em performance, acessibilidade e experiência do utilizador para garantir que cada projeto seja visualmente impressionante e funcional em todos os dispositivos.'
                            },
                            {
                                title: 'Desenvolvimento Back-end',
                                description: 'Desenvolvo APIs robustas e sistemas server-side que garantem performance e segurança. Utilizo as melhores práticas de desenvolvimento para criar soluções escaláveis que atendem às necessidades específicas de cada projeto.'
                            },
                            {
                                title: 'Design & Multimédia',
                                description: 'Combino criatividade e técnica para criar identidades visuais impactantes e conteúdos multimédia envolventes. Desde branding até motion graphics, cada projeto é tratado com atenção aos detalhes e foco na comunicação visual eficaz.'
                            }
                        ]
                    },
                    experience: {
                        title: 'Experiência Profissional',
                        roles: [
                            'Web Developer',
                            'Multimedia Developer'
                        ],
                        descriptions: [
                            'Desenvolvimento de aplicações web responsivas com foco em performance e experiência do utilizador. Desenvolvimento front-end com React e Angular, e backend com Node.js, incluindo criação e consumo de APIs RESTful. Integração com sistemas e contacto com bases de dados MongoDB e PostgreSQL através de APIs. Implementação de experiências interativas com WebGL e Three.js. Colaboração com equipas de marketing na criação de landing pages e campanhas digitais orientadas para conversão.',
                            'Desenvolvimento de conteúdos digitais interativos, incluindo motion graphics, animações 2D/3D e vídeo. Criação de assets para campanhas digitais, redes sociais e materiais promocionais. Colaboração com equipas de marketing para produção de conteúdos visuais.'
                        ],
                        dates: ['2025 – 2026', '2023'],
                        tags: [
                            'JavaScript',
                            'React',
                            'Angular',
                            'Node.js',
                            'HTML',
                            'CSS/SCSS',
                            'REST APIs',
                            'Three.js',
                            'WebGL',
                            'Next.js',
                            'MongoDB',
                            'PostgreSQL',
                            'UI/UX',
                            'Design Responsivo',
                            'Adobe XD',
                            'Illustrator',
                            'After Effects',
                            'Premiere Pro',
                            'Photoshop',
                            'Illustrator'
                        ]
                    },
                    contact: {
                        title: 'Contactos',
                        labels: ['Email', 'Telefone', 'Localização', 'GitLab'],
                        documentsTitle: 'Documentos',
                        buttons: ['Descarregar Currículo', 'Descarregar Portfólio']
                    },
                    footer: {
                        subtitle: 'Designer Multimédia & Desenvolvedor Web',
                        rights: 'Todos os direitos reservados.'
                    }
                },
                en: {
                    buttonLabel: 'PT',
                    documentTitle: 'Diogo Duarte - Multimedia Designer & Web Developer',
                    navLinks: ['Home', 'About', 'Skills', 'Experience', 'Contact'],
                    footerLinks: ['Home', 'About', 'Skills', 'Experience', 'Contact'],
                    hero: {
                        greeting: 'Hi, I am',
                        subtitle: 'Multimedia Designer & Web Developer',
                        description: 'I create impressive digital experiences by combining creative design and technical development to bring your ideas to life.',
                        buttons: ['Download CV', 'Download Portfolio']
                    },
                    about: {
                        title: 'About Me',
                        paragraphs: [
                            'Graduated in Multimedia Engineering from ISTEC - Instituto Superior de Tecnologias Avan\u00e7adas, I am a Web Developer and Multimedia Designer with experience in front-end and back-end development.',
                            'I work with languages and frameworks such as HTML, CSS, JavaScript, React, Angular, Node.js, and PHP, building complete web solutions optimized and adapted to user needs. I also have experience in database integration, UX/UI design, and performance optimization.',
                            'In design and multimedia, I use Adobe tools such as Illustrator, Photoshop, After Effects, and Premiere Pro to create visual identities, animations, and digital content.',
                            'Professionally, I collaborated with Restart, producing animations and graphic materials, and with Reallife, where I worked as a Web Designer, developing websites and visual assets for digital campaigns. Currently, I develop my own projects through v.graphiks, focused on branding, motion design, and custom web development.'
                        ],
                        statsLabel: 'Years of Experience',
                        skillsTitle: 'Main Skills',
                        skillTags: [
                            'Front-end Development',
                            'Back-end Development',
                            'UI/UX Design',
                            'React & Angular',
                            'Vue.js',
                            'Next.js',
                            'Node.js',
                            'PHP',
                            'Java',
                            'JavaScript',
                            'TypeScript',
                            'Database Integration',
                            'MongoDB',
                            'SQL',
                            'REST APIs',
                            'Responsive Design',
                            'Motion Graphics',
                            'Video Editing'
                        ]
                    },
                    skills: {
                        title: 'Technical Skills',
                        categories: ['Design & Multimedia', 'Web Development', 'Databases & Tools']
                    },
                    specialties: {
                        title: 'My Specialties',
                        items: [
                            {
                                title: 'Front-end Development',
                                description: 'I create modern and responsive interfaces using the latest web technologies. I focus on performance, accessibility, and user experience to ensure each project is visually impressive and functional on all devices.'
                            },
                            {
                                title: 'Back-end Development',
                                description: 'I develop robust APIs and server-side systems that ensure performance and security. I use best development practices to create scalable solutions that meet the specific needs of each project.'
                            },
                            {
                                title: 'Design & Multimedia',
                                description: 'I combine creativity and technique to create impactful visual identities and engaging multimedia content. From branding to motion graphics, each project is handled with attention to detail and a focus on effective visual communication.'
                            }
                        ]
                    },
                    experience: {
                        title: 'Professional Experience',
                        roles: [
                            'Web Developer',
                            'Multimedia Developer'
                        ],
                        descriptions: [
                            'Development of responsive web applications with focus on performance and user experience. Front-end development with React and Angular, and backend with Node.js, including creation and consumption of RESTful APIs. Integration with systems and databases MongoDB and PostgreSQL through APIs. Implementation of interactive experiences with WebGL and Three.js. Collaboration with marketing teams in creating landing pages and conversion-oriented digital campaigns.',
                            'Development of interactive digital content, including motion graphics, 2D/3D animations and video. Creation of assets for digital campaigns, social media and promotional materials. Collaboration with marketing teams for visual content production.'
                        ],
                        dates: ['2025 – 2026', '2023'],
                        tags: [
                            'JavaScript',
                            'React',
                            'Angular',
                            'Node.js',
                            'HTML',
                            'CSS/SCSS',
                            'REST APIs',
                            'Three.js',
                            'WebGL',
                            'Next.js',
                            'MongoDB',
                            'PostgreSQL',
                            'UI/UX',
                            'Responsive Design',
                            'Adobe XD',
                            'Illustrator',
                            'After Effects',
                            'Premiere Pro',
                            'Photoshop',
                            'Illustrator'
                        ]
                    },
                    contact: {
                        title: 'Contact',
                        labels: ['Email', 'Phone', 'Location', 'GitLab'],
                        documentsTitle: 'Documents',
                        buttons: ['Download CV', 'Download Portfolio']
                    },
                    footer: {
                        subtitle: 'Multimedia Designer & Web Developer',
                        rights: 'All rights reserved.'
                    }
                }
            };

            function setText(selector, text) {
                const element = document.querySelector(selector);
                if (element) {
                    element.textContent = text;
                }
            }

            function setTexts(selector, values) {
                const elements = document.querySelectorAll(selector);
                values.forEach((value, index) => {
                    if (elements[index]) {
                        elements[index].textContent = value;
                    }
                });
            }

            function setCategoryTitle(index, iconClass, label) {
                const titles = document.querySelectorAll('.category-title');
                if (titles[index]) {
                    const icon = document.createElement('i');
                    icon.className = iconClass;
                    titles[index].textContent = '';
                    titles[index].appendChild(icon);
                    titles[index].appendChild(document.createTextNode(' ' + label));
                }
            }

            function setDownloadButton(selector, label) {
                const button = document.querySelector(selector);
                if (button) {
                    const icon = document.createElement('i');
                    icon.className = 'fas fa-download';
                    button.textContent = '';
                    button.appendChild(icon);
                    button.appendChild(document.createTextNode(' ' + label));
                }
            }

            function applyTranslations(language) {
                const t = translations[language];

                document.title = t.documentTitle;
                translateBtn.textContent = t.buttonLabel;

                setTexts('.nav-link', t.navLinks);
                setText('.greeting', t.hero.greeting);
                setText('.hero-subtitle', t.hero.subtitle);
                setText('.hero-description', t.hero.description);
                setText('#download-cv', t.hero.buttons[0]);
                setText('#download-portfolio', t.hero.buttons[1]);

                setText('#sobre .section-title', t.about.title);
                setTexts('.about-text p', t.about.paragraphs);
                setText('.stat-label', t.about.statsLabel);
                setText('.about-skills h3', t.about.skillsTitle);
                setTexts('.skill-tag', t.about.skillTags);

                setText('#habilidades .section-title', t.skills.title);
                setCategoryTitle(0, 'fas fa-palette', t.skills.categories[0]);
                setCategoryTitle(1, 'fas fa-code', t.skills.categories[1]);
                setCategoryTitle(2, 'fas fa-database', t.skills.categories[2]);

                setText('.skills-showcase .section-title', t.specialties.title);
                setTexts('.showcase-title', t.specialties.items.map(item => item.title));
                setTexts('.showcase-description', t.specialties.items.map(item => item.description));

                setText('#experiencia .section-title', t.experience.title);
                setTexts('#experiencia .job-title', t.experience.roles);
                setTexts('#experiencia .experience-description', t.experience.descriptions);
                setTexts('#experiencia .experience-date', t.experience.dates);
                setTexts('#experiencia .experience-tag', t.experience.tags);

                setText('#contato .section-title', t.contact.title);
                setTexts('.contact-details h3', t.contact.labels);
                setText('.download-section h3', t.contact.documentsTitle);
                setDownloadButton('#download-cv-contact', t.contact.buttons[0]);
                setDownloadButton('#download-portfolio-contact', t.contact.buttons[1]);

                setText('.footer-info p', t.footer.subtitle);
                setTexts('.footer-link', t.footerLinks);
                setText('.footer-bottom p', `© 2024 Diogo Duarte. ${t.footer.rights}`);
            }

            applyTranslations('pt');
            
            translateBtn.addEventListener('click', () => {
                isEnglish = !isEnglish;
                applyTranslations(isEnglish ? 'en' : 'pt');
            });

            // Animação de revelação ao scroll
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in-up');
                    }
                });
            }, observerOptions);

            // Observar elementos para animação
            const elementsToAnimate = document.querySelectorAll('.showcase-item, .skill-category');
            elementsToAnimate.forEach(el => {
                observer.observe(el);
            });
        });

