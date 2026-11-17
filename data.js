const DEFAULT_CANDIDATES = [
  { id: 1, nome: "Nico Arezzo", brano: "Volo", genere: "Cantautorato Pop", bio: "Cantautore siciliano con uno stile intimo, chitarra acustica e testi diretti.", votes: 142, img: "https://unsplash.com", spec: "1080p • 184MB", link: "https://youtube.com" },
  { id: 2, nome: "Sarah Toscano", brano: "Tacchi (fra le dita)", genere: "Dance Pop", bio: "Giovane voce pop italiana dal sound moderno, ritmato e perfetto per il palco.", votes: 158, img: "https://unsplash.com", spec: "4K • 390MB", link: "https://youtube.com" },
  { id: 3, nome: "Sethu", brano: "Cause perse", genere: "Alt Urban", bio: "Artista ligure che mescola sonorità urban, chitarre distorte ed energia punk.", votes: 131, img: "https://unsplash.com", spec: "1080p • 120MB", link: "https://youtube.com" },
  { id: 4, nome: "ISIDE", brano: "Paradiso", genere: "Elettropop", bio: "Progetto bergamasco caratterizzato da sintetizzatori sognanti e beat elettronici.", votes: 119, img: "https://unsplash.com", spec: "1080p • 215MB", link: "https://youtube.com" },
  { id: 5, nome: "Tony Boy", brano: "Leanin'", genere: "Melodic Urban", bio: "Rapper padovano tra i nomi più seguiti della nuova onda urban introspettiva.", votes: 165, img: "https://unsplash.com", spec: "1080p • 260MB", link: "https://youtube.com" },
  { id: 6, nome: "Birthh", brano: "Supermarket", genere: "Alt Pop", bio: "Cantautrice e producer toscana dal respiro internazionale con beat ricercati.", votes: 111, img: "https://unsplash.com", spec: "1080p • 150MB", link: "https://youtube.com" },
  { id: 7, nome: "bnkr44", brano: "Governo Punk", genere: "Alt Pop / Punk", bio: "Collettivo toscano esplosivo che unisce pop punk, elettronica e club culture.", votes: 150, img: "https://unsplash.com", spec: "4K • 440MB", link: "https://youtube.com" },
  { id: 8, nome: "GINEVRA", brano: "Club Metro", genere: "Nu-Soul / Electro", bio: "Cantautrice e producer torinese dalle atmosfere notturne, R&B ed elettroniche.", votes: 128, img: "https://unsplash.com", spec: "1080p • 175MB", link: "https://youtube.com" },
  { id: 9, nome: "Chiara Cami", brano: "Fiori di plastica", genere: "Indie Pop", bio: "Giovane cantautrice selezionata tra le nuove promesse della scena indie.", votes: 98, img: "https://unsplash.com", spec: "1080p • 290MB", link: "https://youtube.com" },
  { id: 10, nome: "Delia", brano: "Sicilia Bedda", genere: "Folk / World Pop", bio: "Artista siciliana che fonde tradizione vocale mediterranea e suoni moderni.", votes: 137, img: "https://unsplash.com", spec: "1080p • 140MB", link: "https://youtube.com" }
];

function getCandidates() {
  const stored = localStorage.getItem('neonote_candidates_v3');
  if (!stored) {
    localStorage.setItem('neonote_candidates_v3', JSON.stringify(DEFAULT_CANDIDATES));
    return DEFAULT_CANDIDATES;
  }
  return JSON.parse(stored);
}

function getVotedList() {
  return JSON.parse(localStorage.getItem('neonote_voted_v3')) || [];
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem('neonote_user_v2'));
}

function renderNavbarAuth() {
  const box = document.getElementById('navAuthArea');
  if (!box) return;
  const user = getCurrentUser();
  if (user) {
    box.innerHTML = `
      <span style="font-size:0.82rem; color:var(--lime-neon); font-weight:600;">● ${user.nome}</span>
      <button onclick="logoutUser()" class="btn btn-outline">Logout</button>
    `;
  } else {
    box.innerHTML = `
      <a href="registrazione.html?tab=login" class="btn btn-purple">Login</a>
      <a href="registrazione.html?tab=utente" class="btn btn-lime">Sign up</a>
    `;
  }
}

function logoutUser() {
  localStorage.removeItem('neonote_user_v2');
  window.location.reload();
}

function voteForCandidate(id, callback) {
  const user = getCurrentUser();
  if (!user) {
    alert("Devi effettuare il Login o registrarti per poter votare!");
    window.location.href = "registrazione.html?tab=login";
    return;
  }
  const voted = getVotedList();
  if (voted.includes(id)) {
    alert("Hai già votato questo candidato!");
    return;
  }
  const list = getCandidates().map(c => c.id === id ? { ...c, votes: c.votes + 1 } : c);
  voted.push(id);
  localStorage.setItem('neonote_candidates_v3', JSON.stringify(list));
  localStorage.setItem('neonote_voted_v3', JSON.stringify(voted));
  if (callback) callback();
}

function injectGlobalLayout() {
  const nav = document.querySelector('.nav-links');
  if (nav) {
    const current = window.location.pathname.split('/').pop() || 'index.html';
    const pages = [
      { href: 'index.html', label: 'Home' },
      { href: 'candidati.html', label: 'Candidati' },
      { href: 'votazioni.html', label: 'Votazioni' },
      { href: 'biglietti.html', label: 'Biglietti' },
      { href: 'challenge.html', label: 'Challenge' },
      { href: 'galleria.html', label: 'Eventi Precedenti' },
      { href: 'regolamento.html', label: 'Regolamento & Video' },
      { href: 'legale.html', label: 'Info & Contatti' }
    ];
    nav.innerHTML = pages.map(p =>
      `<a href="${p.href}" class="${current === p.href ? 'active' : ''}">${p.label}</a>`
    ).join('');
  }

  let footer = document.querySelector('footer');
  if (!footer) {
    footer = document.createElement('footer');
    document.body.appendChild(footer);
  }
  footer.innerHTML = `
    <div class="footer-wrap">
      <div class="footer-col">
        <div class="logo"><span class="logo-mark">M</span> neoNote®</div>
        <p style="color:var(--lime-neon); font-size:0.84rem; font-weight:700; margin-top:0.6rem;">"NeoNote Turn Up the Neon, Rock the Boat!"</p>
        <p style="color:var(--text-muted); font-size:0.82rem; margin-top:0.4rem;">Roma, Piazza S. Giovanni in Laterano<br>Email: neonotemusiccontest@gmail.com</p>
      </div>
      <div class="footer-col">
        <h4>Esplora</h4>
        <ul>
          <li><a href="index.html">Home Page</a></li>
          <li><a href="candidati.html">Pagina Candidati</a></li>
          <li><a href="votazioni.html">Votazioni Candidati</a></li>
          <li><a href="biglietti.html">Vendita Biglietti</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Evento & Regole</h4>
        <ul>
          <li><a href="challenge.html">Fan Challenges & Sponsor</a></li>
          <li><a href="galleria.html">Eventi Precedenti</a></li>
          <li><a href="regolamento.html">Regolamento & Formato Video</a></li>
          <li><a href="legale.html">Informative & Contatti</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Area Utenti</h4>
        <ul>
          <li><a href="registrazione.html?tab=login">Login / Logout</a></li>
          <li><a href="registrazione.html?tab=utente">Registrazione Utente</a></li>
          <li><a href="registrazione.html?tab=artista">Candida Artista</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Community Ufficiale</h4>
        <ul>
          <li><a href="https://t.me/+NQBwgEVVpE84NDlk" target="_blank">Canale Telegram ↗</a></li>
          <li><a href="https://whatsapp.com/channel/0029VbDxUZD2v1Irr0lQc72j" target="_blank">Canale WhatsApp ↗</a></li>
          <li><a href="https://www.facebook.com/groups/3578936242268492/" target="_blank">Gruppo Facebook ↗</a></li>
          <li><a href="https://www.tiktok.com/@neonote4?_r=1&_t=ZN-9BU9Bjp5RX4" target="_blank">TikTok @neonote4 ↗</a></li>
        </ul>
      </div>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  injectGlobalLayout();
  renderNavbarAuth();
});
