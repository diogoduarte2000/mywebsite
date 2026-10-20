<script setup lang="ts">
useHead({
  htmlAttrs: { lang: 'en' },
  title: 'Diogo Duarte Portfolio',
  meta: [
    { name: 'description', content: 'Diogo Duarte portfolio — front-end, full-stack development and multimedia.' }
  ],
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,400;0,500;0,600;0,800;1,400&family=JetBrains+Mono:wght@400;500;700&display=swap' }
  ]
})
</script>

<template>
<div id="cursor-layer" aria-hidden="true"></div>

<div class="rails" aria-hidden="true">
  <span style="left:12%"></span><span style="left:34%"></span>
  <span style="left:62%"></span><span style="left:86%"></span>
</div>

<header class="topbar">
  <div class="topbar-in">
    <a class="mark" href="#top"><span class="box">D</span><span class="nm">Diogo Duarte</span></a>
    <nav class="nav">
      <a href="#perfil">Perfil</a><a href="#percurso">Percurso</a>
      <a href="#stack">Stack</a><a href="#repos">GitHub</a><a href="#contacto">Contacto</a>
    </nav>
    <button class="lang-switch" id="language-switch" type="button" aria-label="Switch language to Portuguese" aria-pressed="true">
      <span class="lang-pt">PT</span><span class="lang-divider">/</span><span class="lang-en">EN</span>
    </button>
    <div class="status">
      <span id="clock">--:--</span><span>Lisboa</span>
      <span class="dot"></span><span class="avail">Disponível</span>
    </div>
  </div>
</header>

<main id="top">
<div class="wrap">

  <section class="hero" style="padding-top:clamp(36px,6vw,80px)">
    <div>
      <div class="eyebrow">Full Stack Developer</div>
      <h1>Diogo<span class="thin">Duarte</span></h1>
      <p class="lede">Construo interfaces em Angular e TypeScript, ligo-as a APIs REST e a bases de dados,
      e trago um fundo de design e multimédia para o meio do processo. Lisboa, Portugal.</p>
      <div class="specs">
        <div><span class="k">Função</span><span class="v">Full Stack Developer</span></div>
        <div><span class="k">Formação</span><span class="v">Eng. Multimédia, ISTEC</span></div>
      </div>
      <div class="cta-row">
        <a class="btn primary" href="#contacto">Vamos falar?</a>
        <a class="btn" href="https://github.com/diogoduarte2000" target="_blank" rel="noopener">GitHub</a>
        <a class="btn" href="https://www.linkedin.com/in/diogo-duarte-471a221b6/" target="_blank" rel="noopener">LinkedIn</a>
      </div>
    </div>
    <div class="scope">
      <div class="scope-head"><span>Render // torus ASCII</span><span id="scope-fps">30 fps</span></div>
      <div class="scope-body"><pre id="donut" aria-label="Animação ASCII de um toro a girar"></pre></div>
      <div class="scope-foot"><span>R1 1.0 · R2 2.0 · K2 5.0</span><span>texto puro, sem libs</span></div>
    </div>
  </section>
</div>

<div class="ticker" aria-hidden="true"><div class="ticker-in" id="tick"></div></div>

<div class="wrap">

  <section id="perfil">
    <div class="sec-head">
      <span class="idx">01</span><h2>Perfil</h2>
      <span class="meta">Quem está do outro lado</span>
    </div>
    <div class="prose">
      <p>Tirei a <strong>Licenciatura em Engenharia Multimédia no ISTEC</strong> e entrei no mercado pelo lado do
      design e do motion. Fui para o código e fiquei lá: hoje o meu dia-a-dia é <strong>front-end com Angular e
      TypeScript</strong> — componentes, formulários, estado, consumo de APIs REST — com trabalho regular do lado
      do servidor e das bases de dados.</p>
      <p>Tenho cerca de <strong>um ano de experiência profissional em equipa</strong>, em diferentes contextos de trabalho.
      O que isso me deu não foi só sintaxe: foi aprender a entrar em projetos já
      começados, a investigar um bug até à causa e a trabalhar dentro das práticas de uma equipa com Git e Scrum.</p>
      <p>O fundo em multimédia é a parte que me distingue de outro júnior com o mesmo stack. Percebo o ficheiro de
      design antes de o transformar em componentes, e consigo produzir eu próprio os assets, a animação e o vídeo
      quando o projeto precisa. <span>Também tenho conhecimentos aprofundados sobre LLMs: arquitetura Transformer, mecanismos de atenção, tokenização, embeddings, janelas de contexto, inferência, RAG e pesquisa vetorial, além de VLMs e sistemas multimodais.</span> A direção a médio prazo é clara: <strong>aprofundar JavaScript, TypeScript e Java,
      e crescer para Senior</strong>.</p>
    </div>

    <div class="tickets">
      <article class="ticket" data-tilt>
        <div class="ticket-top">
          <div class="ref">REF. A — FRONT-END</div>
          <h3>Front-end</h3>
          <p class="sub">Transformo um ficheiro de design em componentes que <em>aguentam mudanças</em> e falam com a API sem partir.</p>
          <ul>
            <li>Angular · TypeScript</li><li>Componentes e serviços</li>
            <li>Reactive Forms e validação</li><li>HttpClient e APIs REST</li>
            <li>HTML5 · CSS3 · SCSS</li><li>Responsivo mobile-first</li>
          </ul>
        </div>
        <div class="perf"></div>
        <div class="ticket-foot">
          <div class="row"><span>Nível</span><b>●●○ autónomo</b></div>
          <div class="barcode"></div>
          <div class="fine">O DESIGN NÃO SE NEGOCEIA A MEIO</div>
        </div>
      </article>

      <article class="ticket" data-tilt>
        <div class="ticket-top">
          <div class="ref">REF. B — PONTA A PONTA</div>
          <h3>Full Stack</h3>
          <p class="sub">Ligo interface, API e dados para entregar funcionalidades <em>completas</em>, do browser ao deployment.</p>
          <ul>
            <li>Angular · TypeScript · Node.js</li><li>APIs REST e integração</li>
            <li>PostgreSQL · SQL · MongoDB</li><li>Docker e ambientes</li>
            <li>Git · GitHub · GitLab</li><li>Deployment end-to-end</li>
          </ul>
        </div>
        <div class="perf"></div>
        <div class="ticket-foot">
          <div class="row"><span>Nível</span><b>●●○ autónomo</b></div>
          <div class="barcode"></div>
          <div class="fine">UM 500 É SEMPRE CULPA DE ALGUÉM</div>
        </div>
      </article>

      <article class="ticket" data-tilt>
        <div class="ticket-top">
          <div class="ref">REF. C — SERVIDOR &amp; DADOS</div>
          <h3>Back-end</h3>
          <p class="sub">Desenho endpoints, modelo os dados e trato dos erros <em>antes</em> de chegarem ao ecrã.</p>
          <ul>
            <li>Node.js · Express</li><li>Desenho de endpoints REST</li>
            <li>PostgreSQL · SQL</li><li>MongoDB</li>
            <li>Docker · Kubernetes</li><li>Validação, erros e segurança</li>
          </ul>
        </div>
        <div class="perf"></div>
        <div class="ticket-foot">
          <div class="row"><span>Nível</span><b>●●○ autónomo</b></div>
          <div class="barcode"></div>
          <div class="fine">DADOS CONSISTENTES, ERROS PREVISÍVEIS</div>
        </div>
      </article>
    </div>
  </section>

  <section id="percurso">
    <div class="sec-head">
      <span class="idx">02</span><h2>Percurso</h2>
      <span class="meta">Passa por cima · clica para abrir</span>
    </div>
    <div class="roles">
      <div class="career-timeline" aria-hidden="true">
        <div class="career-track"><span class="career-progress"></span></div>
        <div class="career-milestone" data-year="2022"><span class="career-dot"></span><span>2022</span></div>
        <div class="career-milestone" data-year="2025"><span class="career-dot"></span><span>2025</span></div>
        <div class="career-milestone" data-year="2026"><span class="career-dot"></span><span>2026</span></div>
      </div>

      <button class="role" type="button" data-role="duall" aria-haspopup="dialog">
        <div class="role-inner">
          <div class="face front">
            <div class="f-top">
              <span class="tag">Atual</span>
              <div class="mono-big">ATUAL</div>
              <div class="range">JUN 2026 → PRESENTE</div>
            </div>
            <div class="f-body">Desenvolvimento e manutenção de websites de cliente, incluindo integração de ferramentas de inteligência artificial em projetos web. Lisboa, híbrido.</div>
            <div class="f-bar"><span>Full Stack Developer</span><span class="ar">↗</span></div>
          </div>
          <div class="face back">
            <div class="b-head">O que faço lá</div>
            <ul>
              <li>Sites de cliente em Webflow e em Astro + Sanity CMS</li>
              <li>Animação e scroll com GSAP, Lenis e Barba.js</li>
              <li>Bug fixing e manutenção em sites já em produção</li>
              <li>SEO técnico, structured data e tracking</li>
              <li>Uso de Claude, GitHub Copilot no Visual Studio Code e ChatGPT (OpenAI) como apoio ao desenvolvimento de projetos web</li>
            </ul>
            <div class="clickme"><span>Clica para ver mais</span><span class="blink">●</span></div>
          </div>
        </div>
      </button>

      <button class="role" type="button" data-role="reallife" aria-haspopup="dialog">
        <div class="role-inner">
          <div class="face front">
            <div class="f-top">
              <span class="tag">10 meses</span>
              <div class="mono-big">EXPERIÊNCIA</div>
              <div class="range">MAI 2025 → FEV 2026</div>
            </div>
            <div class="f-body">Front-end com Angular em equipa Agile. Algés, remoto.</div>
            <div class="f-bar"><span>Frontend Developer</span><span class="ar">↗</span></div>
          </div>
          <div class="face back">
            <div class="b-head">O que fiz lá</div>
            <ul>
              <li>Componentes Angular e consumo de APIs REST</li>
              <li>HTML, CSS e JavaScript em projetos já a correr</li>
              <li>Git em equipa: branches, PRs, resolução de conflitos</li>
              <li>Metodologia Agile/Scrum, sprints e code review</li>
            </ul>
            <div class="clickme"><span>Clica para ver mais</span><span class="blink">●</span></div>
          </div>
        </div>
      </button>

      <button class="role" type="button" data-role="restart" aria-haspopup="dialog">
        <div class="role-inner">
          <div class="face front">
            <div class="f-top">
              <span class="tag">Estágio</span>
              <div class="mono-big">ESTÁGIO</div>
              <div class="range">MAR 2022 → AGO 2022</div>
            </div>
            <div class="f-body">Design gráfico, edição de vídeo e motion. Lisboa, remoto.</div>
            <div class="f-bar"><span>Produtor de Multimédia</span><span class="ar">↗</span></div>
          </div>
          <div class="face back">
            <div class="b-head">O que fiz lá</div>
            <ul>
              <li>Assets visuais e identidade em Illustrator</li>
              <li>Edição de vídeo em Premiere Pro</li>
              <li>Motion graphics em After Effects</li>
              <li>Conteúdo para campanhas digitais e redes sociais</li>
            </ul>
            <div class="clickme"><span>Clica para ver mais</span><span class="blink">●</span></div>
          </div>
        </div>
      </button>

    </div>
  </section>

  <section id="stack">
    <div class="sec-head">
      <span class="idx">03</span><h2>Stack</h2>
    </div>
    <div class="stack">
      <div>
        <h3>Core</h3>
        <div class="srow"><span>Angular</span><span class="lvl"><i class="on"></i><i class="on"></i><i class="on"></i></span></div>
        <div class="srow"><span>TypeScript</span><span class="lvl"><i class="on"></i><i class="on"></i><i></i></span></div>
        <div class="srow"><span>JavaScript</span><span class="lvl"><i class="on"></i><i class="on"></i><i></i></span></div>
        <div class="srow"><span>HTML / CSS</span><span class="lvl"><i class="on"></i><i class="on"></i><i class="on"></i></span></div>
        <div class="srow"><span>React</span><span class="lvl"><i class="on"></i><i></i><i></i></span></div>
      </div>
      <div>
        <h3>Servidor &amp; Dados</h3>
        <div class="srow"><span>APIs REST</span><span class="lvl"><i class="on"></i><i class="on"></i><i class="on"></i></span></div>
        <div class="srow"><span>Node.js</span><span class="lvl"><i class="on"></i><i class="on"></i><i></i></span></div>
        <div class="srow"><span>SQL / PostgreSQL</span><span class="lvl"><i class="on"></i><i class="on"></i><i class="on"></i></span></div>
        <div class="srow"><span>MongoDB</span><span class="lvl"><i class="on"></i><i class="on"></i><i class="on"></i></span></div>
        <div class="srow"><span>Java</span><span class="lvl"><i class="on"></i><i></i><i></i></span></div>
        <div class="srow"><span>Kubernetes</span><span class="lvl"><i class="on"></i><i></i><i></i></span></div>
      </div>
      <div>
        <h3>Ferramentas</h3>
        <div class="srow"><span>Git / GitHub</span><span class="lvl"><i class="on"></i><i class="on"></i><i class="on"></i></span></div>
        <div class="srow"><span>Docker</span><span class="lvl"><i class="on"></i><i class="on"></i><i></i></span></div>
        <div class="srow"><span>Deployment</span><span class="lvl"><i class="on"></i><i class="on"></i><i></i></span></div>
        <div class="srow"><span>Webflow</span><span class="lvl"><i class="on"></i><i class="on"></i><i></i></span></div>
        <div class="srow"><span>GSAP</span><span class="lvl"><i class="on"></i><i class="on"></i><i></i></span></div>
        <div class="srow"><span>Three.js</span><span class="lvl"><i class="on"></i><i></i><i></i></span></div>
      </div>
      <div>
        <h3>Multimédia</h3>
        <div class="srow"><span>Illustrator</span><span class="lvl"><i class="on"></i><i class="on"></i><i class="on"></i></span></div>
        <div class="srow"><span>Premiere Pro</span><span class="lvl"><i class="on"></i><i class="on"></i><i class="on"></i></span></div>
        <div class="srow"><span>After Effects</span><span class="lvl"><i class="on"></i><i class="on"></i><i></i></span></div>
        <div class="srow"><span>Photoshop</span><span class="lvl"><i class="on"></i><i class="on"></i><i></i></span></div>
        <div class="srow"><span>UI/UX</span><span class="lvl"><i class="on"></i><i class="on"></i><i></i></span></div>
      </div>
      <div>
        <h3>AI</h3>
        <div class="srow"><span>ChatGPT</span><span class="lvl"><i class="on"></i><i class="on"></i><i class="on"></i></span></div>
        <div class="srow"><span>Claude</span><span class="lvl"><i class="on"></i><i class="on"></i><i class="on"></i></span></div>
        <div class="srow"><span>GitHub Copilot</span><span class="lvl"><i class="on"></i><i class="on"></i><i></i></span></div>
        <div class="srow"><span>Google Gemini</span><span class="lvl"><i class="on"></i><i></i><i></i></span></div>
      </div>
    </div>
    <p class="legend">●●● uso diário, resolvo sozinho e explico a outros · ●●○ desenvolvo de forma autónoma · ●○○ bases sólidas, em aprofundamento</p>
  </section>

  <section id="repos">
    <div class="sec-head">
       <span class="idx">04</span><h2>Repositórios</h2>
       <span class="meta">Fixados no GitHub</span>
    </div>
    <div class="repo-bar">
      <span class="led" id="repo-led"></span>
      <span id="repo-status">GET repositórios fixados de diogoduarte2000</span>
      <span id="repo-count"></span>
    </div>
    <div class="repos" id="repo-grid">
      <div class="skel"><div></div><div></div><div></div></div>
      <div class="skel"><div></div><div></div><div></div></div>
      <div class="skel"><div></div><div></div><div></div></div>
    </div>
    <p class="legend">Os mesmos seis repositórios fixados no topo do perfil de GitHub, pela mesma ordem.</p>
  </section>

  <section id="contacto">
    <div class="sec-head">
      <span class="idx">05</span><h2>Contacto</h2>
      <span class="meta">Resposta em 24h</span>
    </div>
    <div class="contact">
      <div>
        <h2 class="big">Vamos<br><em>falar?</em></h2>
      </div>
      <div>
        <a class="crow" href="https://www.linkedin.com/in/diogo-duarte-471a221b6/" target="_blank" rel="noopener"><span class="k">LinkedIn</span><span class="v">/in/diogo-duarte ↗</span></a>
        <a class="crow" href="https://github.com/diogoduarte2000" target="_blank" rel="noopener"><span class="k">GitHub</span><span class="v">diogoduarte2000 ↗</span></a>
        <a class="crow" href="https://gitlab.com/diogoduarte2000" target="_blank" rel="noopener"><span class="k">GitLab</span><span class="v">diogoduarte2000 ↗</span></a>
        <a class="crow" href="https://drive.google.com/uc?export=download&amp;id=1-Qxj8nScjs9hfzQpkMtO2ZIM0ep5720j" download target="_blank" rel="noopener"><span class="k">Currículo</span><span class="v">Descarregar PDF ↓</span></a>
      </div>
    </div>
  </section>

  <footer>
    <span>© 2026 Diogo Duarte</span><span>Lisboa, PT</span>
  </footer>
</div>
</main>

<div class="modal" id="modal" role="dialog" aria-modal="true" aria-labelledby="m-title" hidden>
  <div class="modal-card">
    <div class="m-head">
      <div class="mt">
        <span class="kicker" id="m-kicker"></span>
        <h3 id="m-title"></h3>
      </div>
      <button class="m-close" id="m-close" type="button">FECHAR ✕</button>
    </div>
    <div class="m-body">
      <div class="m-meta" id="m-meta"></div>
      <p id="m-intro"></p>
      <div class="m-sub">O que fiz</div>
      <ul class="m-list" id="m-tasks"></ul>
      <div class="m-sub">Tecnologias</div>
      <div class="chips" id="m-chips"></div>
    </div>
  </div>
</div>
</template>
