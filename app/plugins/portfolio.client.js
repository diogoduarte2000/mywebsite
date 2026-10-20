export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:mounted', () => {

(function(){
"use strict";

/* ====== cursor com rasto ====== */
(function cursor(){
  var fine = window.matchMedia && window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  if (!fine) return;

  var layer = document.getElementById('cursor-layer');
  layer.style.display = 'block';
  document.body.classList.add('cursor-on');

  var N = reduce ? 0 : 14;
  var nodes = [], pts = [];
  for (var i = 0; i <= N; i++){
    var el = document.createElement('div');
    el.className = i === 0 ? 'cur' : 'cur tail';
    if (i === 0) el.id = 'cur-main';
    else {
      var t = i / N;                       // 0 → 1 ao longo do rasto
      var s = 1 - t * 0.78;                // encolhe
      el.style.width = el.style.height = (20 * s).toFixed(1) + 'px';
      el.style.margin = (-10 * s).toFixed(1) + 'px 0 0 ' + (-10 * s).toFixed(1) + 'px';
      el.style.opacity = (0.16 * (1 - t)).toFixed(3);   // muito, muito leve
    }
    layer.appendChild(el);
    nodes.push(el);
    pts.push({x:-100, y:-100});
  }

  var mx = -100, my = -100, seen = false;
  window.addEventListener('mousemove', function(e){
    mx = e.clientX; my = e.clientY;
    if (!seen){ seen = true; for (var k=0;k<pts.length;k++){ pts[k].x=mx; pts[k].y=my; } }
  }, {passive:true});
  document.addEventListener('mouseleave', function(){ mx = -100; my = -100; });

  (function run(){
    requestAnimationFrame(run);
    pts[0].x += (mx - pts[0].x) * 0.38;
    pts[0].y += (my - pts[0].y) * 0.38;
    for (var i = 1; i < pts.length; i++){
      pts[i].x += (pts[i-1].x - pts[i].x) * 0.30;
      pts[i].y += (pts[i-1].y - pts[i].y) * 0.30;
    }
    for (var j = 0; j < nodes.length; j++){
      nodes[j].style.transform = 'translate3d(' + pts[j].x.toFixed(1) + 'px,' + pts[j].y.toFixed(1) + 'px,0)';
    }
  })();
})();

/* ====== relógio ====== */
var clock = document.getElementById('clock');
function tick(){
  try{
    clock.textContent = new Intl.DateTimeFormat('pt-PT',{hour:'2-digit',minute:'2-digit',hour12:false,timeZone:'Europe/Lisbon'}).format(new Date());
  }catch(e){ clock.textContent = '--:--'; }
}
tick(); setInterval(tick, 20000);

/* ====== ticker ====== */
(function(){
  var words = ['Angular','TypeScript','APIs REST','PostgreSQL','MongoDB','Node.js','GSAP','After Effects','Git','Webflow'];
  var half = '';
  for (var r=0;r<2;r++) for (var w=0;w<words.length;w++) half += '<span>'+words[w]+'</span><b>◆</b>';
  document.getElementById('tick').innerHTML = half + half;
})();

/* ====== tilt 3D nos bilhetes ====== */
(function(){
  var fine = window.matchMedia && window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  if (!fine || reduce) return;
  var cards = document.querySelectorAll('[data-tilt]');
  Array.prototype.forEach.call(cards, function(card){
    var targetX = 0, targetY = 0, currentX = 0, currentY = 0;
    var targetLift = 0, currentLift = 0, targetScale = 1, currentScale = 1;
    var frame = 0;

    function animate(){
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      currentLift += (targetLift - currentLift) * 0.12;
      currentScale += (targetScale - currentScale) * 0.12;

      card.style.setProperty('--tilt-x', currentX.toFixed(2) + 'deg');
      card.style.setProperty('--tilt-y', currentY.toFixed(2) + 'deg');
      card.style.setProperty('--card-lift', currentLift.toFixed(2) + 'px');
      card.style.setProperty('--card-scale', currentScale.toFixed(4));

      var settling = Math.abs(targetX - currentX) > 0.02
        || Math.abs(targetY - currentY) > 0.02
        || Math.abs(targetLift - currentLift) > 0.05
        || Math.abs(targetScale - currentScale) > 0.001;
      if (settling) frame = requestAnimationFrame(animate);
      else frame = 0;
    }

    function schedule(){
      if (!frame) frame = requestAnimationFrame(animate);
    }

    card.addEventListener('mousemove', function(e){
      var r = card.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width - 0.5;
      var py = (e.clientY - r.top) / r.height - 0.5;
      targetX = -py * 7;
      targetY = px * 7;
      targetLift = 14;
      targetScale = 1.012;
      card.style.boxShadow = '0 26px 60px rgba(0,0,0,.55)';
      schedule();
    });
    card.addEventListener('mouseleave', function(){
      targetX = 0;
      targetY = 0;
      targetLift = 0;
      targetScale = 1;
      card.style.boxShadow = '';
      schedule();
    });
  });
})();

/* ====== modal do percurso ====== */
var DATA = {
  duall: {
    kicker:'Atual · Jun 2026 → presente',
    title:'Full Stack Developer',
    meta:[['Local','Lisboa · híbrido'],['Regime','Full-time'],['Equipa','Estúdio de design e web'],['Duração','Em curso']],
    intro:'Desenvolvo e mantenho websites de cliente, sobretudo com Angular, React e SQL, desde os primeiros layouts até ao pós-lançamento. Uso Claude, GitHub Copilot no Visual Studio Code e ChatGPT (OpenAI) como apoio ao desenvolvimento e à integração de ferramentas de inteligência artificial em projetos web, além de trabalhar em SEO técnico, tracking e conteúdo via CMS.',
    tasks:[
      'Desenvolvimento maioritariamente em Angular, com React e SQL no dia-a-dia',
      'Construção de sites de cliente em Webflow e em stack própria com Astro + Sanity CMS',
      'Animação de scroll e transições de página com GSAP, Lenis e Barba.js',
      'Bug fixing e manutenção em sites já em produção, com clientes à espera',
      'SEO técnico: structured data em JSON-LD, metadados e correções de indexação',
      'Implementação de tracking e analytics',
      'Integração de conteúdo via CMS para o cliente poder editar sozinho',
      'Uso de Claude, GitHub Copilot no Visual Studio Code e ChatGPT (OpenAI) como apoio ao desenvolvimento de projetos web'
    ],
    chips:[['Angular','#DD0031'],['React','#61DAFB'],['SQL','#4479A1'],['Webflow','#4353FF'],['Astro','#FF5D01'],['Sanity','#F03E2F'],['GSAP','#88CE02'],['Lenis','#8E8E8E'],['Barba.js','#D63AFF'],['Three.js','#C9C9C9'],['JavaScript','#F7DF1E'],['Node.js','#539E43'],['Docker','#2496ED'],['PostgreSQL','#4169E1'],['Git','#F05032'],['GitHub','#FFFFFF'],['JSON-LD','#FF5A14'],['Claude','#D97757'],['GitHub Copilot','#FFFFFF'],['ChatGPT','#74AA9C']]
  },
  reallife: {
    kicker:'10 meses · Mai 2025 → Fev 2026',
    title:'Frontend Developer',
    meta:[['Local','Algés · remoto'],['Regime','Temporário'],['Método','Agile / Scrum'],['Duração','10 meses']],
    intro:'O meu primeiro contexto de equipa a sério. Entrei em projetos Angular já a meio e a maior aprendizagem não foi a framework: foi ler código de outros, perceber porque é que estava escrito assim e mexer sem partir o resto.',
    tasks:[
      'Criação de componentes Angular e integração com APIs REST',
      'Desenvolvimento com HTML, CSS e JavaScript em bases de código existentes',
      'Consumo e tratamento de dados assíncronos vindos do back-end',
      'Controlo de versões com Git em equipa: branches, pull requests e conflitos',
      'Participação no ciclo Agile/Scrum — sprints, dailies e code review',
      'Investigação de bugs até à causa, em vez de contornar o sintoma'
    ],
    chips:[['Angular','#DD0031'],['TypeScript','#3178C6'],['JavaScript','#F7DF1E'],['HTML5','#E34F26'],['CSS3','#1572B6'],['Node.js','#539E43'],['APIs REST','#FF5A14'],['Git','#F05032']]
  },
  restart: {
    kicker:'Estágio · Mar 2022 → Ago 2022',
    title:'Produtor de Multimédia · Estágio',
    meta:[['Local','Lisboa · remoto'],['Regime','Estágio'],['Área','Design e vídeo'],['Duração','6 meses']],
    intro:'Antes do código veio isto. Seis meses a produzir conteúdo visual a sério, com prazos e clientes — e é daqui que vem a parte do meu perfil que outro júnior com o mesmo stack normalmente não tem.',
    tasks:[
      'Criação de assets visuais e peças gráficas em Adobe Illustrator',
      'Edição de vídeo promocional em Adobe Premiere Pro',
      'Motion graphics e animação em Adobe After Effects',
      'Produção de conteúdo para campanhas digitais e redes sociais',
      'Tratamento de imagem em Photoshop',
      'Trabalho dentro de guidelines de marca já definidas'
    ],
    chips:[['Illustrator','#FF9A00'],['After Effects','#9999FF'],['Premiere Pro','#9999FF'],['Photoshop','#31A8FF'],['Motion Design','#FF5A14']]
  }
};

/* ====== linha temporal do percurso ====== */
(function(){
  var section = document.getElementById('percurso');
  var roles = section && section.querySelector('.roles');
  var progressLine = section && section.querySelector('.career-progress');
  var milestones = section && section.querySelectorAll('.career-milestone');
  if (!section || !progressLine || !milestones.length) return;

  var cards = roles && roles.querySelectorAll('.role');
  if (cards && 'IntersectionObserver' in window){
    roles.classList.add('has-reveal');
    var revealObserver = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, {threshold:0.01, rootMargin:'0px 0px -40% 0px'});
    Array.prototype.forEach.call(cards, function(card){ revealObserver.observe(card); });
  } else if (cards){
    Array.prototype.forEach.call(cards, function(card){ card.classList.add('is-visible'); });
  }

  var frame = 0;
  function update(){
    frame = 0;
    var bounds = section.getBoundingClientRect();
    var start = window.innerHeight * 0.9;
    var end = -section.offsetHeight * 0.65;
    var progress = Math.max(0, Math.min(1, (start - bounds.top) / (start - end)));
    progressLine.style.transform = 'scaleY(' + progress + ')';
    Array.prototype.forEach.call(milestones, function(milestone, index){
      var threshold = milestones.length === 1 ? 0 : index / (milestones.length - 1);
      milestone.classList.toggle('is-active', progress >= threshold);
    });
  }
  function scheduleUpdate(){
    if (!frame) frame = requestAnimationFrame(update);
  }

  window.addEventListener('scroll', scheduleUpdate, {passive:true});
  window.addEventListener('resize', scheduleUpdate, {passive:true});
  update();
})();

var modal = document.getElementById('modal');
var lastFocus = null;

/* Ícones oficiais/recogníveis para frameworks, linguagens e programas. */
var TECH_ICONS = {
  'Angular':['https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg'],
  'TypeScript':['https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg'],
  'JavaScript':['https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg'],
  'HTML / CSS':['https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg','https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg'],
  'HTML5':['https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg'],
  'CSS3':['https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg'],
  'React':['https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg'],
  'APIs REST':['https://cdn.simpleicons.org/openapiinitiative/6BA539'],
  'Node.js':['https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg'],
  'SQL / PostgreSQL':['https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg'],
  'SQL':['https://cdn.simpleicons.org/postgresql/4169E1'],
  'PostgreSQL':['https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg'],
  'MongoDB':['https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg'],
  'Java':['https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg'],
  'Git / GitHub':['https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg','https://cdn.simpleicons.org/github/FFFFFF'],
  'Git':['https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg'],
  'GitHub':['https://cdn.simpleicons.org/github/FFFFFF'],
  'Docker':['https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg'],
  'Deployment':['https://cdn.simpleicons.org/vercel/FFFFFF'],
  'Webflow':['https://cdn.simpleicons.org/webflow/4353FF'],
  'Astro':['https://cdn.simpleicons.org/astro/FF5D01'],
  'Sanity':['https://cdn.simpleicons.org/sanity/F03E2F'],
  'GSAP':['https://cdn.simpleicons.org/greensock/88CE02'],
  'Three.js':['https://cdn.simpleicons.org/threedotjs/FFFFFF'],
  'Illustrator':['https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/illustrator/illustrator-plain.svg'],
  'Premiere Pro':['https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/premierepro/premierepro-original.svg'],
  'After Effects':['https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/aftereffects/aftereffects-original.svg'],
  'Photoshop':['https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-original.svg'],
  'UI/UX':['https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg'],
  'ChatGPT':['https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/openai.svg'],
  'Claude':['https://cdn.simpleicons.org/anthropic/D97757'],
  'GitHub Copilot':['https://cdn.simpleicons.org/githubcopilot/FFFFFF'],
  'Google Gemini':['https://cdn.simpleicons.org/googlegemini/8E75B2']
};

function techIcons(name){
  var icons = TECH_ICONS[name] || [];
  return icons.map(function(src){
    var modifier = name === 'ChatGPT' ? ' tech-icon--openai' : '';
    return '<img class="tech-icon'+modifier+'" src="'+esc(src)+'" alt="" loading="lazy" decoding="async">';
  }).join('');
}

Array.prototype.forEach.call(document.querySelectorAll('.srow > span:first-child'), function(label){
  var name = label.textContent.trim();
  var icons = techIcons(name);
  if (icons) label.innerHTML = '<span class="tech-icons" aria-hidden="true">'+icons+'</span><span>'+esc(name)+'</span>';
  label.classList.add('tech-name');
});

function esc(s){
  return String(s).replace(/[&<>"']/g, function(c){
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
  });
}

function openModal(key){
  var d = DATA[key];
  if (!d) return;
  lastFocus = document.activeElement;
  document.getElementById('m-kicker').textContent = d.kicker;
  document.getElementById('m-title').textContent = d.title;
  document.getElementById('m-intro').textContent = d.intro;

  document.getElementById('m-meta').innerHTML = d.meta.map(function(m){
    return '<div><span class="k">'+esc(m[0])+'</span><span class="v">'+esc(m[1])+'</span></div>';
  }).join('');

  document.getElementById('m-tasks').innerHTML = d.tasks.map(function(t){
    return '<li>'+esc(t)+'</li>';
  }).join('');

  document.getElementById('m-chips').innerHTML = d.chips.map(function(c){
    var icon = techIcons(c[0]);
    return '<span class="chip">'+(icon || '<i style="background:'+esc(c[1])+'"></i>')+esc(c[0])+'</span>';
  }).join('');

  modal.hidden = false;
  requestAnimationFrame(function(){ modal.classList.add('open'); });
  document.body.style.overflow = 'hidden';
  document.getElementById('m-close').focus();
}

function closeModal(){
  modal.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(function(){ modal.hidden = true; }, 240);
  if (lastFocus && lastFocus.focus) lastFocus.focus();
}

Array.prototype.forEach.call(document.querySelectorAll('.role'), function(btn){
  btn.addEventListener('click', function(){ openModal(btn.getAttribute('data-role')); });
});
document.getElementById('m-close').addEventListener('click', closeModal);
modal.addEventListener('click', function(e){ if (e.target === modal) closeModal(); });
document.addEventListener('keydown', function(e){ if (e.key === 'Escape' && !modal.hidden) closeModal(); });

/* ====== repositórios fixados no topo do GitHub ====== */
(function(){
  var grid   = document.getElementById('repo-grid');
  var led    = document.getElementById('repo-led');
  var stat   = document.getElementById('repo-status');
  var countEl= document.getElementById('repo-count');

  var LANG = {JavaScript:'#F7DF1E',TypeScript:'#3178C6',HTML:'#E34F26',CSS:'#1572B6',SCSS:'#C6538C',
    Vue:'#41B883',Java:'#EA2D2E',Python:'#3572A5','C#':'#178600',PHP:'#777BB4',Astro:'#FF5D01',Shell:'#89E051'};

  function when(iso){
    var d = new Date(iso), now = new Date();
    var days = Math.floor((now - d) / 86400000);
    if (days < 1) return 'hoje';
    if (days < 30) return 'há ' + days + ' dia' + (days>1?'s':'');
    var months = Math.floor(days / 30);
    if (months < 12) return 'há ' + months + ' ' + (months>1?'meses':'mês');
    var years = Math.floor(months / 12);
    return 'há ' + years + ' ano' + (years>1?'s':'');
  }

  var PINNED_SNAPSHOT = [
    {name:'mywebsite',description:'',language:'HTML',languageColor:'#E34F26',stars:1},
    {name:'iFound',description:'',language:'HTML',languageColor:'#E34F26',stars:0},
    {name:'WealthSphere',description:'',language:'HTML',languageColor:'#E34F26',stars:0},
    {name:'COSMOSXP',description:'',language:'TypeScript',languageColor:'#3178C6',stars:0},
    {name:'SUMMUS',description:'',language:'CSS',languageColor:'#663399',stars:0},
    {name:'V.GRAPHIKS',description:'',language:'CSS',languageColor:'#663399',stars:1}
  ];

  function normalize(r){
    return {
      name:r.name,
      description:r.description || '',
      language:r.language || '',
      color:r.languageColor || LANG[r.language] || '#FF5A14',
      stars:Number(r.stars || 0),
      url:r.html_url || 'https://github.com/'+(r.author || 'diogoduarte2000')+'/'+r.name
    };
  }

  function render(list){
    grid.innerHTML = list.map(function(r){
      r = normalize(r);
      return '<a class="repo" href="'+esc(r.url)+'" target="_blank" rel="noopener">'+
        '<span class="rn">'+esc(r.name)+'</span>'+
        '<span class="rd">'+esc(r.description || 'Sem descrição no repositório.')+'</span>'+
        '<span class="rf">'+
          (r.language ? '<span class="lang"><i style="background:'+esc(r.color)+'"></i>'+esc(r.language)+'</span>' : '') +
          '<span>★ '+r.stars+'</span>'+
          '<span>fixado no perfil</span>'+
        '</span></a>';
    }).join('');
  }

  function useSnapshot(){
    led.className = 'led live';
    stat.textContent = 'Pins do GitHub · cópia de segurança';
    countEl.textContent = '· 6 repositórios';
    render(PINNED_SNAPSHOT);
  }

  var url = '/api/github-pinned';
  var ctrl = typeof AbortController !== 'undefined' ? new AbortController() : null;
  var killer = setTimeout(function(){ if (ctrl) ctrl.abort(); }, 8000);

  fetch(url, ctrl ? {signal: ctrl.signal} : undefined)
    .then(function(res){
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    })
    .then(function(data){
      clearTimeout(killer);
      if (!Array.isArray(data)) throw new Error('resposta inesperada');
      var list = data.slice(0, 6);
      if (!list.length) throw new Error('sem repositórios fixados');
      led.className = 'led live';
      stat.textContent = '200 OK · pins do GitHub';
      countEl.textContent = '· ' + list.length + ' repositórios';
      render(list);
    })
    .catch(function(err){
      clearTimeout(killer);
      console.warn('GitHub pins unavailable; using the saved snapshot.', err);
      useSnapshot();
    });
})();

/* ====== toro ASCII ====== */
(function(){
  var pre = document.getElementById('donut');
  var COLS = 64, ROWS = 24, CH = '.,-~:;=!*#$@';
  var A = 0.9, B = 0.4;

  function fit(){
    var w = pre.parentElement.clientWidth - 12;
    var size = Math.max(5, Math.min(13, w / (COLS * 0.602)));
    pre.style.fontSize = size.toFixed(2) + 'px';
  }

  function frame(a, b){
    var out = new Array(COLS * ROWS).fill(' ');
    var zb = new Float32Array(COLS * ROWS);
    var cA = Math.cos(a), sA = Math.sin(a), cB = Math.cos(b), sB = Math.sin(b);
    var KX = COLS * 0.55, KY = KX * 0.47;
    for (var th = 0; th < 6.2832; th += 0.07){
      var ct = Math.cos(th), st = Math.sin(th), cx = 2 + ct;
      for (var ph = 0; ph < 6.2832; ph += 0.02){
        var cp = Math.cos(ph), sp = Math.sin(ph);
        var z = 5 + cA * cx * sp + st * sA, ooz = 1 / z;
        var xp = cx * (cB * cp + sA * sB * sp) - st * cA * sB;
        var yp = cx * (sB * cp - sA * cB * sp) + st * cA * cB;
        var xi = Math.round(COLS / 2 + KX * ooz * xp);
        var yi = Math.round(ROWS / 2 - KY * ooz * yp);
        if (xi < 0 || xi >= COLS || yi < 0 || yi >= ROWS) continue;
        var o = xi + COLS * yi;
        if (ooz <= zb[o]) continue;
        var L = cp * ct * sB - cA * ct * sp - sA * st + cB * (cA * st - ct * sA * sp);
        if (L <= 0) continue;
        zb[o] = ooz;
        var li = Math.round(L * 8);
        out[o] = CH[li > 11 ? 11 : li];
      }
    }
    var txt = '';
    for (var row = 0; row < ROWS; row++) txt += out.slice(row*COLS, row*COLS+COLS).join('') + '\n';
    pre.textContent = txt;
  }

  fit();
  window.addEventListener('resize', fit);

  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    frame(A, B);
    document.getElementById('scope-fps').textContent = 'estático';
  } else {
    var last = 0;
    (function loop(t){
      requestAnimationFrame(loop);
      if (t - last < 33) return;
      last = t;
      A += 0.013; B += 0.0062;
      frame(A, B);
    })(0);
  }
})();

})();
  })
})
