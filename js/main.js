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
                            'Edi\u00e7\u00e3o de V\u00eddeo'
                        ]
                    },
                    skills: {
                        title: 'Habilidades T\u00e9cnicas',
                        categories: ['Design & Multim\u00e9dia', 'Desenvolvimento Web', 'Bases de Dados & Ferramentas']
                    },
                    specialties: {
                        title: 'Minhas Especialidades',
                        items: [
                            {
                                title: 'Desenvolvimento Front-end',
                                description: 'Crio interfaces modernas e responsivas utilizando as mais recentes tecnologias web. Foco em performance, acessibilidade e experi\u00eancia do utilizador para garantir que cada projeto seja visualmente impressionante e funcional em todos os dispositivos.'
                            },
                            {
                                title: 'Desenvolvimento Back-end',
                                description: 'Desenvolvo APIs robustas e sistemas server-side que garantem performance e seguran\u00e7a. Utilizo as melhores pr\u00e1ticas de desenvolvimento para criar solu\u00e7\u00f5es escal\u00e1veis que atendem \u00e0s necessidades espec\u00edficas de cada projeto.'
                            },
                            {
                                title: 'Design & Multim\u00e9dia',
                                description: 'Combino criatividade e t\u00e9cnica para criar identidades visuais impactantes e conte\u00fados multim\u00e9dia envolventes. Desde branding at\u00e9 motion graphics, cada projeto \u00e9 tratado com aten\u00e7\u00e3o aos detalhes e foco na comunica\u00e7\u00e3o visual eficaz.'
                            }
                        ]
                    },
                    experience: {
                        title: 'Experi\u00eancia Profissional',
                        roles: [
                            'Desenvolvedor Web',
                            'Web Designer',
                            'Designer de Motion Graphics',
                            'Desenvolvedor Freelance'
                        ],
                        descriptions: [
                            'Desenvolvedor Web especializado na cria\u00e7\u00e3o de websites, branding e suportes visuais para campanhas digitais. Respons\u00e1vel pelo design e desenvolvimento front-end de plataformas web e materiais gr\u00e1ficos para marketing digital.',
                            'Atua\u00e7\u00e3o como Web Designer, desenvolvendo websites, landing pages e suportes visuais para campanhas digitais. Trabalho com design responsivo, identidade visual e otimiza\u00e7\u00e3o de interfaces para melhor experi\u00eancia do utilizador.',
                            'Designer especializado em anima\u00e7\u00f5es e motion graphics. Respons\u00e1vel pela produ\u00e7\u00e3o de conte\u00fados animados, v\u00eddeos promocionais e materiais gr\u00e1ficos para campanhas digitais e redes sociais.',
                            'Desenvolvimento de projetos freelance focados em branding, motion design e desenvolvimento web personalizado. Trabalho com clientes para criar solu\u00e7\u00f5es digitais customizadas, desde websites at\u00e9 aplica\u00e7\u00f5es web completas.'
                        ],
                        dates: ['2022 - Presente', '2021 - 2022', '2020 - 2021', '2019 - Presente'],
                        tags: [
                            'React',
                            'JavaScript',
                            'CSS/SCSS',
                            'HTML5',
                            'Design UI/UX',
                            'Adobe Suite',
                            'Figma',
                            'Adobe Photoshop',
                            'Adobe Illustrator',
                            'HTML5',
                            'CSS3',
                            'Figma',
                            'Design Responsivo',
                            'After Effects',
                            'Premiere Pro',
                            'Photoshop',
                            'Illustrator',
                            'Motion Design',
                            'Edi\u00e7\u00e3o de V\u00eddeo',
                            'Next.js',
                            'React',
                            'Vue.js',
                            'Node.js',
                            'MongoDB',
                            'SQL',
                            'APIs REST',
                            'TypeScript',
                            'Adobe Suite'
                        ]
                    },
                    contact: {
                        title: 'Contactos',
                        labels: ['Email', 'Telefone', 'Localiza\u00e7\u00e3o'],
                        documentsTitle: 'Documentos',
                        buttons: ['Descarregar Curr\u00edculo', 'Descarregar Portf\u00f3lio']
                    },
                    footer: {
                        subtitle: 'Designer Multim\u00e9dia & Desenvolvedor Web',
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
                            'Web Designer',
                            'Motion Graphics Designer',
                            'Freelance Developer'
                        ],
                        descriptions: [
                            'Web Developer specialized in creating websites, branding, and visual assets for digital campaigns. Responsible for the front-end design and development of web platforms and graphic materials for digital marketing.',
                            'Worked as a Web Designer, developing websites, landing pages, and visual assets for digital campaigns. Focused on responsive design, visual identity, and interface optimization for a better user experience.',
                            'Designer specialized in animation and motion graphics. Responsible for producing animated content, promotional videos, and graphic materials for digital campaigns and social media.',
                            'Development of freelance projects focused on branding, motion design, and custom web development. Working with clients to create tailored digital solutions, from websites to complete web applications.'
                        ],
                        dates: ['2022 - Present', '2021 - 2022', '2020 - 2021', '2019 - Present'],
                        tags: [
                            'React',
                            'JavaScript',
                            'CSS/SCSS',
                            'HTML5',
                            'UI/UX Design',
                            'Adobe Suite',
                            'Figma',
                            'Adobe Photoshop',
                            'Adobe Illustrator',
                            'HTML5',
                            'CSS3',
                            'Figma',
                            'Responsive Design',
                            'After Effects',
                            'Premiere Pro',
                            'Photoshop',
                            'Illustrator',
                            'Motion Design',
                            'Video Editing',
                            'Next.js',
                            'React',
                            'Vue.js',
                            'Node.js',
                            'MongoDB',
                            'SQL',
                            'REST APIs',
                            'TypeScript',
                            'Adobe Suite'
                        ]
                    },
                    contact: {
                        title: 'Contact',
                        labels: ['Email', 'Phone', 'Location'],
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
                    titles[index].innerHTML = `<i class="${iconClass}"></i> ${label}`;
                }
            }

            function setDownloadButton(selector, label) {
                const button = document.querySelector(selector);
                if (button) {
                    button.innerHTML = `<i class="fas fa-download"></i> ${label}`;
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
                // Legacy manual translation block below is intentionally bypassed.
                return;
                
                if (isEnglish) {
                    // Traduzir para inglês
                    translateBtn.textContent = 'PT';
                    document.querySelector('.hero-subtitle').textContent = 'Multimedia Designer & Web Developer';
                    document.querySelector('.hero-description').textContent = 'I create impressive digital experiences by combining creative design and technical development to bring your ideas to life.';
                    document.querySelector('#download-cv').textContent = 'Download CV';
                    document.querySelector('#download-portfolio').textContent = 'Download Portfolio';
                    document.querySelector('.section-title').textContent = 'About Me';
                    document.querySelector('.about-skills h3').textContent = 'Main Skills';
                    document.querySelectorAll('.skill-tag')[0].textContent = 'Front-end Development';
                    document.querySelectorAll('.skill-tag')[1].textContent = 'Back-end Development';
                    document.querySelectorAll('.skill-tag')[2].textContent = 'UI/UX Design';
                    document.querySelector('.skills .section-title').textContent = 'Technical Skills';
                    document.querySelectorAll('.category-title')[0].innerHTML = '<i class="fas fa-palette"></i> Design & Multimedia';
                    document.querySelectorAll('.category-title')[1].innerHTML = '<i class="fas fa-code"></i> Web Development';
                    document.querySelector('.skills-showcase .section-title').textContent = 'My Specialties';
                    document.querySelectorAll('.showcase-title')[0].textContent = 'Front-end Development';
                    document.querySelectorAll('.showcase-description')[0].textContent = 'I create modern and responsive interfaces using the latest web technologies. I focus on performance, accessibility and user experience to ensure each project is visually impressive and functional on all devices.';
                    document.querySelectorAll('.showcase-title')[1].textContent = 'Back-end Development';
                    document.querySelectorAll('.showcase-description')[1].textContent = 'I develop robust APIs and server-side systems that ensure performance and security. I use the best development practices to create scalable solutions that meet the specific needs of each project.';
                    document.querySelectorAll('.showcase-title')[2].textContent = 'Design & Multimedia';
                    document.querySelectorAll('.showcase-description')[2].textContent = 'I combine creativity and technique to create impactful visual identities and engaging multimedia content. From branding to motion graphics, each project is treated with attention to detail and focus on effective visual communication.';
                    document.querySelector('.contact .section-title').textContent = 'Contact';
                    document.querySelector('.download-section h3').textContent = 'Documents';
                    document.querySelector('#download-cv-contact').innerHTML = '<i class="fas fa-download"></i> Download CV';
                    document.querySelector('#download-portfolio-contact').innerHTML = '<i class="fas fa-download"></i> Download Portfolio';
                    document.querySelectorAll('.nav-link')[0].textContent = 'Home';
                    document.querySelectorAll('.nav-link')[1].textContent = 'About';
                    document.querySelectorAll('.nav-link')[2].textContent = 'Skills';
                    document.querySelectorAll('.nav-link')[3].textContent = 'Contact';
                    document.querySelectorAll('.footer-link')[0].textContent = 'Home';
                    document.querySelectorAll('.footer-link')[1].textContent = 'About';
                    document.querySelectorAll('.footer-link')[2].textContent = 'Skills';
                    document.querySelectorAll('.footer-link')[3].textContent = 'Contact';
                } else {
                    // Traduzir para português
                    translateBtn.textContent = 'EN';
                    document.querySelector('.hero-subtitle').textContent = 'Designer Multimédia & Desenvolvedor Web';
                    document.querySelector('.hero-description').textContent = 'Crio experiências digitais impressionantes combinando design criativo e desenvolvimento técnico para dar vida às suas ideias.';
                    document.querySelector('#download-cv').textContent = 'Descarregar Currículo';
                    document.querySelector('#download-portfolio').textContent = 'Descarregar Portfólio';
                    document.querySelector('.section-title').textContent = 'Sobre Mim';
                    document.querySelector('.about-skills h3').textContent = 'Principais Competências';
                    document.querySelectorAll('.skill-tag')[0].textContent = 'Desenvolvimento Front-end';
                    document.querySelectorAll('.skill-tag')[1].textContent = 'Desenvolvimento Back-end';
                    document.querySelectorAll('.skill-tag')[2].textContent = 'Design UI/UX';
                    document.querySelector('.skills .section-title').textContent = 'Habilidades Técnicas';
                    document.querySelectorAll('.category-title')[0].innerHTML = '<i class="fas fa-palette"></i> Design & Multimédia';
                    document.querySelectorAll('.category-title')[1].innerHTML = '<i class="fas fa-code"></i> Desenvolvimento Web';
                    document.querySelector('.skills-showcase .section-title').textContent = 'Minhas Especialidades';
                    document.querySelectorAll('.showcase-title')[0].textContent = 'Desenvolvimento Front-end';
                    document.querySelectorAll('.showcase-description')[0].textContent = 'Crio interfaces modernas e responsivas utilizando as mais recentes tecnologias web. Foco em performance, acessibilidade e experiência do utilizador para garantir que cada projeto seja visualmente impressionante e funcional em todos os dispositivos.';
                    document.querySelectorAll('.showcase-title')[1].textContent = 'Desenvolvimento Back-end';
                    document.querySelectorAll('.showcase-description')[1].textContent = 'Desenvolvo APIs robustas e sistemas server-side que garantem performance e segurança. Utilizo as melhores práticas de desenvolvimento para criar soluções escaláveis que atendem às necessidades específicas de cada projeto.';
                    document.querySelectorAll('.showcase-title')[2].textContent = 'Design & Multimédia';
                    document.querySelectorAll('.showcase-description')[2].textContent = 'Combino criatividade e técnica para criar identidades visuais impactantes e conteúdos multimédia envolventes. Desde branding até motion graphics, cada projeto é tratado com atenção aos detalhes e foco na comunicação visual eficaz.';
                    document.querySelector('.contact .section-title').textContent = 'Contactos';
                    document.querySelector('.download-section h3').textContent = 'Documentos';
                    document.querySelector('#download-cv-contact').innerHTML = '<i class="fas fa-download"></i> Descarregar Currículo';
                    document.querySelector('#download-portfolio-contact').innerHTML = '<i class="fas fa-download"></i> Descarregar Portfólio';
                    document.querySelectorAll('.nav-link')[0].textContent = 'Início';
                    document.querySelectorAll('.nav-link')[1].textContent = 'Sobre';
                    document.querySelectorAll('.nav-link')[2].textContent = 'Habilidades';
                    document.querySelectorAll('.nav-link')[3].textContent = 'Contato';
                    document.querySelectorAll('.footer-link')[0].textContent = 'Início';
                    document.querySelectorAll('.footer-link')[1].textContent = 'Sobre';
                    document.querySelectorAll('.footer-link')[2].textContent = 'Habilidades';
                    document.querySelectorAll('.footer-link')[3].textContent = 'Contato';
                }
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

