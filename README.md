# Portfólio Diogo Duarte

> **Multimedia Designer & Web Developer**
> 
> Website portfolio pessoal com design moderno, animações 3D interativas e sistema de internacionalização (PT/EN).

---

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Funcionalidades Principais](#funcionalidades-principais)
- [Como Funciona](#como-funciona)
- [Design e UI](#design-e-ui)
- [Instalação e Uso](#instalação-e-uso)
- [Detalhes Técnicos](#detalhes-técnicos)

---

## 🎯 Visão Geral

Este portfólio apresenta as competências e experiências de Diogo Duarte como Multimedia Designer & Web Developer. O destaque principal é uma **esfera 3D interativa em WebGL/Canvas** que responde ao movimento do rato, criando uma experiência visual imersiva e moderna.

### Características Principais:
- ✅ Esfera 3D animada com pontos e conexões dinâmicas
- ✅ Sistema de tradução completo (Português/Inglês)
- ✅ Design responsivo para mobile e desktop
- ✅ Animações de scroll suaves
- ✅ Navegação intuitiva com menu mobile
- ✅ Download de CV e Portfolio

---

## 🛠️ Tecnologias Utilizadas

### Frontend Core
| Tecnologia | Descrição |
|------------|-----------|
| **HTML5** | Estrutura semântica do website |
| **CSS3** | Estilização com variáveis CSS, flexbox, grid e animações |
| **JavaScript (Vanilla)** | Lógica interativa sem dependências externas |
| **Canvas API** | Renderização da esfera 3D e animações |

### Design & Estilo
- **CSS Variables** - Sistema de cores consistente
- **Flexbox & CSS Grid** - Layouts responsivos
- **Keyframes & Transitions** - Animações suaves
- **Font Awesome** - Ícones vetoriais
- **Google Fonts (Inter)** - Tipografia moderna

### Funcionalidades Avançadas
- **WebGL/Canvas 2D** - Esfera 3D interativa
- **Intersection Observer API** - Animações ao scroll
- **Sistema de Tradução** - Objetos JSON para i18n
- **GitHub Pages** - Hosting estático

---

## 📁 Estrutura do Projeto

```
myportfolio/
├── index.html              # Página principal (estrutura HTML)
├── css/
│   └── styles.css         # Estilos completos (variáveis, layouts, animações)
├── js/
│   └── main.js            # Lógica JavaScript (esfera 3D, traduções, interações)
├── WEB_GL/                # Recursos WebGL adicionais
├── .github/               # Configurações GitHub
├── .nojekyll              # Desativa Jekyll no GitHub Pages
└── README.md              # Documentação
```

---

## ✨ Funcionalidades Principais

### 1. Esfera 3D Interativa (Canvas)
A funcionalidade mais distintiva do portfolio - uma esfera wireframe 3D que anima automaticamente e responde ao movimento do rato.

**Características técnicas:**
- **100 pontos** distribuídos em coordenadas esféricas aleatórias
- **Conexões dinâmicas** entre pontos próximos (distância < 0.4)
- **150 estrelas** no background com opacidade variável
- **Rotação automática** contínua no eixo Y
- **Interação com rato** - rotação nos eixos X e Y baseada na posição do cursor
- **Projeção 3D para 2D** com cálculo de perspectiva (escala baseada na profundidade Z)

### 2. Sistema de Tradução (i18n)
Sistema completo de internacionalização entre Português e Inglês.

**Implementação:**
- Objeto `translations` com chaves `pt` e `en`
- Função `applyTranslations(lang)` que atualiza todo o conteúdo
- Traduções para: navegação, hero, sobre, habilidades, experiência, contacto
- Botão de alternância no header (PT/EN)

### 3. Animações de Scroll
Elementos animam ao entrar na viewport durante o scroll.

**Tecnica:**
- `IntersectionObserver` API nativa
- Classes `.animate-on-scroll` para elementos animáveis
- Animações: `fadeInUp`, `fadeInLeft`, `fadeInRight`, `scaleIn`

### 4. Menu Mobile Responsivo
- Menu hamburger para dispositivos móveis
- Transição suave de abertura/fecho
- Fecha automaticamente ao clicar num link

---

## 🔧 Como Funciona

### A Esfera 3D

#### Geração dos Pontos
```javascript
// Coordenadas esféricas para distribuição uniforme
const theta = Math.random() * Math.PI * 2;        // Ângulo horizontal
const phi = Math.acos(Math.random() * 2 - 1);     // Ângulo vertical

// Conversão para cartesianas (x, y, z)
x = Math.sin(phi) * Math.cos(theta);
y = Math.sin(phi) * Math.sin(theta);
z = Math.cos(phi);
```

#### Rotação 3D
A rotação combina **rotação automática** + **interação do rato**:

1. **Rotação em X (vertical):**
   ```
   y' = y * cos(θ) - z * sin(θ)
   z' = y * sin(θ) + z * cos(θ)
   ```

2. **Rotação em Y (horizontal):**
   ```
   x' = x * cos(φ) + z' * sin(φ)
   z' = -x * sin(φ) + z' * cos(φ)
   ```

#### Projeção 2D
```javascript
// Escala baseada na profundidade (perspectiva)
const scale = 150 / (150 + z);

// Projeção para coordenadas de ecrã
const px = x * 150 * scale + canvas.width / 2;
const py = y * 150 * scale + canvas.height / 2;
```

#### Interatividade
- O rato controla a rotação target
- Interpolação suave (5% por frame) para movimento fluido
- Pontos e conexões só desenham se estiverem visíveis (z > -0.5)

### Sistema de Tradução

#### Estrutura de Dados
```javascript
const translations = {
    pt: { /* conteúdo português */ },
    en: { /* conteúdo inglês */ }
};
```

#### Funções Auxiliares
- `setText(selector, text)` - Atualiza texto de um elemento
- `setTexts(selector, values)` - Atualiza múltiplos elementos
- `setCategoryTitle(index, icon, label)` - Atualiza títulos com ícones
- `setDownloadButton(selector, label)` - Atualiza botões de download

#### Segurança XSS
O sistema usa `textContent` e `createElement` em vez de `innerHTML` para prevenir injeção de código malicioso.

---

## 🎨 Design e UI

### Paleta de Cores (CSS Variables)
```css
--primary-color: #2563eb;      /* Azul principal */
--primary-dark: #1d4ed8;       /* Azul escuro */
--accent-color: #06b6d4;       /* Ciano accent */
--dark-bg: #0f172a;            /* Background escuro */
--darker-bg: #020617;          /* Background mais escuro */
--card-bg: #1e293b;            /* Background cards */
--text-light: #f8fafc;         /* Texto claro */
--text-muted: #94a3b8;         /* Texto secundário */
--success-color: #10b981;      /* Verde sucesso */
```

### Tipografia
- **Fonte principal:** Inter, Segoe UI, sans-serif
- **Tamanho base:** 16px
- **Headings:** Peso 600-700, tracking tight
- **Body:** Peso 400, line-height 1.6

### Layout Responsivo
| Breakpoint | Largura | Ajustes |
|------------|---------|---------|
| Mobile | < 768px | Menu hamburger, colunas únicas |
| Tablet | 768px - 1024px | Grid 2 colunas |
| Desktop | > 1024px | Layout completo, esfera visível |

### Animações
- **Duração padrão:** 0.3s - 0.6s
- **Easing:** cubic-bezier(0.4, 0, 0.2, 1)
- **Stagger:** 100ms entre elementos sequenciais

---

## 🚀 Instalação e Uso

### Requisitos
- Navegador moderno com suporte para ES6+
- Git (para clonar o repositório)

### Clonar e Executar
```bash
# Clonar repositório
git clone https://github.com/diogoduarte2000/mywebsite.git

# Entrar na pasta
cd mywebsite

# Abrir no navegador (ou usar Live Server)
open index.html
```

### Deploy no GitHub Pages
O projeto já está configurado para GitHub Pages:
1. Ficheiro `.nojekyll` presente (desativa processamento Jekyll)
2. Branch `main` configurada para Pages
3. Acesso: `https://diogoduarte2000.github.io/mywebsite/`

---

## 🔍 Detalhes Técnicos

### Performance
- **Canvas otimizado:** Apenas desenha elementos visíveis
- **requestAnimationFrame:** Loop de animação eficiente
- **CSS containment:** Isolamento de layouts para reflow mínimo
- **Lazy loading:** Imagens carregam sob demanda

### Acessibilidade
- Navegação por teclado suportada
- Contraste de cores WCAG 2.1 AA
- Estrutura semântica HTML5
- Labels descritivos em botões

### Compatibilidade
| Navegador | Suporte |
|-----------|---------|
| Chrome | ✅ 90+ |
| Firefox | ✅ 88+ |
| Safari | ✅ 14+ |
| Edge | ✅ 90+ |
| Mobile | ✅ iOS 14+, Android 10+ |

### Otimizações
- CSS minificado inline (para primeira renderização rápida)
- JavaScript modularizado por funcionalidade
- Event listeners com cleanup adequado
- Resize observer eficiente para canvas

---

## 📝 Notas de Desenvolvimento

### Princípios Aplicados
1. **Mobile-first** - Design responsivo desde o início
2. **Progressive Enhancement** - Funciona sem JavaScript (degradation graciosa)
3. **DRY** - Código reutilizável com funções auxiliares
4. **Segurança** - Prevenção XSS em todas as entradas de texto

### Melhorias Futuras Possíveis
- [ ] PWA com service worker
- [ ] Modo escuro/claro toggle
- [ ] Mais idiomas (FR, ES)
- [ ] Blog integrado
- [ ] Formulário de contacto funcional

---

## 👤 Autor

**Diogo Duarte**
- 📧 Email: diogo.silvanoduarte@gmail.com
- 💼 LinkedIn: [linkedin.com/in/diogo-duarte-471a221b6](https://www.linkedin.com/in/diogo-duarte-471a221b6/)
- 🐙 GitHub: [github.com/diogoduarte2000](https://github.com/diogoduarte2000)

---

## 📄 Licença

Este projeto é de uso pessoal. Todos os direitos reservados.

---

*Última atualização: Abril 2026*
