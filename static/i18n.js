/* ── StarGames i18n ─────────────────────────────────────────────────────────
   Usage: add data-i18n="key" to any element whose textContent should be
   translated. For inputs use data-i18n-ph="key" for placeholder.
   Call initLang() on DOMContentLoaded.
   ────────────────────────────────────────────────────────────────────────── */

const TRANSLATIONS = {
  en: {
    // Nav
    nav_home:        'Home',
    nav_games:       'Games',
    nav_const:       'Constellations',
    nav_wiki:        '★ Wiki Stars',
    nav_back:        '← Back to games',

    // Index hero
    hero_badge:      '🚀 Your Cosmic Arcade',
    hero_h1a:        'Games Born',
    hero_h1b:        'in the Stars',
    hero_sub:        'Explore the universe through puzzles, trivia, and reflex games. The cosmos is waiting.',
    hero_browse:     'Browse Games',
    hero_featured:   'Featured: Constellation Quiz →',

    // Index stats
    stat_games:      'Games',
    stat_const:      'Constellations',
    stat_know:       'Star Knowledge',

    // Index section
    sec_title:       'All Games',
    sec_sub:         'Pick your mission',
    card_featured:   'Featured',
    card_play_now:   'Play now →',
    card_play:       'Play →',

    // HUD
    hud_score:       'Score',
    hud_time:        'Time',
    hud_round:       'Round',
    hud_best:        'Best',
    hud_pairs:       'Pairs',
    hud_moves:       'Moves',

    // Overlays / buttons
    btn_start:       'Start Game',
    btn_again:       'Play Again',
    btn_next:        'Next →',
    btn_results:     'See Results',

    // Constellation quiz
    cq_hint:         'Identify this constellation',
    cq_complete:     'Quiz Complete!',
    cq_complete_sub: 'constellation quiz',
    cq_stellar:      'Stellar astronomer!',
    cq_good:         'Good explorer!',
    cq_keep:         'Keep studying the cosmos!',

    // Star Catcher
    sc_title:        'Star Catcher',
    sc_sub:          'Click the falling stars before they disappear!',
    sc_stellar:      'Stellar!',
    sc_gameover:     'Game Over',
    sc_caught:       'You caught',
    sc_star:         'star',
    sc_stars:        'stars',

    // Star Memory
    sm_title:        'Star Memory',
    sm_sub:          'Match each constellation name to its star pattern. The fewer moves, the better!',
    sm_easy:         'Easy (8 pairs)',
    sm_medium:       'Medium (10 pairs)',
    sm_hard:         'Hard (12 pairs)',
    sm_perfect:      'Perfect Memory!',
    sm_welldone:     'Well done!',

    // Dot Connect
    dc_title:        'Dot Connect',
    dc_sub:          'Connect the numbered stars in order to trace each constellation before time runs out!',
    dc_inst:         'Click star 1 first',
    dc_gameover:     'Game Over!',
    dc_stellar:      'Stellar navigator!',
    dc_good:         'Good star tracer!',
    dc_keep:         'Keep practicing!',

    // Galaxy Quiz
    gq_title:        'Galaxy Quiz',
    gq_sub:          'Test your space knowledge with rapid-fire trivia.',
    gq_loading:      'Loading…',
    gq_complete:     'Quiz Complete',
    gq_stellar:      'Stellar astronomer!',
    gq_good:         'Good explorer!',
    gq_keep:         'Keep studying the cosmos!',

    // Your Records
    rec_title:       'Your Records',
    rec_sub:         'Best scores · saved locally',

    // Knowledge section
    know_tag:        '★ Star Knowledge',
    know_title:      'Did You Know?',
    know_sub:        'Fascinating facts, funny anecdotes & discovery stories from across the cosmos.',

    // Constellation guide
    const_title:     'Star Constellations',
    const_sub:       'Navigate the night sky',

    // Wiki Stars (index page)
    wiki_title:      'Wiki Stars',
    wiki_sub:        'from infinity and beyond',
    wiki_tab_all:      'All',
    wiki_tab_general:  'General Knowledge',
    wiki_tab_history:  'History',
    wiki_tab_anec:     'Anecdotes',

    // Wiki page — hero
    wiki_badge:      '★ Star Knowledge Base',
    wiki_h1a:        'Explore',
    wiki_h1b:        'The Universe',
    wiki_page_sub:   'Science, history, myths and curious anecdotes about the cosmos — all in one place.',

    // Wiki page — nav tab links
    tab_nav_general:     'General',
    tab_nav_stars:       '★ Famous Stars',
    tab_nav_history:     'History',
    tab_nav_guide:       'Constellations',
    tab_nav_galaxies:    'Galaxies',
    tab_nav_solarsystem: 'Solar System',
    tab_nav_anecdotes:   'Anecdotes',

    // Wiki page — tab buttons
    tab_general:         '🔭 General Knowledge',
    tab_stars:           '⭐ Famous Stars',
    tab_history:         '📜 History',
    tab_guide:           '🌌 Constellation Guide',
    tab_galaxies:        '🔭 Galaxies',
    tab_solarsystem:     '🪐 Solar System',
    tab_anecdotes:       '💫 Anecdotes',

    // Wiki page — section headers
    sec_general_tag:     'Stars & Constellations',
    sec_general_title:   'General Knowledge',
    sec_general_sub:     'The essentials — star life cycles, types, clusters, and the structure of the cosmos.',
    sec_stars_tag:       'Individual Stars',
    sec_stars_title:     'Famous Stars',
    sec_stars_sub:       'The brightest, the biggest, the closest, the strangest — stars that have shaped history and science.',
    sec_history_tag:     '5,000 Years of Discovery',
    sec_history_title:   'History of Astronomy',
    sec_history_sub:     "From Babylonian clay tablets to the first image of a black hole — a timeline of humanity's quest to understand the cosmos.",
    sec_guide_tag:       'Navigate the Night Sky',
    sec_guide_title:     'Constellation Guide',
    sec_guide_sub:       'Everything you need to know about the 88 officially recognised star patterns — with seasonal visibility, mythology, and key stars.',
    sec_galaxies_tag:    'Island Universes',
    sec_galaxies_title:  'Galaxies',
    sec_galaxies_sub:    'From our own Milky Way to the most distant giants — a guide to the great island universes that make up the fabric of the cosmos.',
    sec_solarsystem_tag: 'Our Cosmic Neighbourhood',
    sec_solarsystem_title: 'Solar System',
    sec_solarsystem_sub: 'The Sun, eight planets, moons, dwarf planets, comets and asteroids — everything in our local corner of the Milky Way.',
    sec_anecdotes_tag:   'Curious & Surprising',
    sec_anecdotes_title: 'Cosmic Anecdotes',
    sec_anecdotes_sub:   "The cosmos is full of surprises — and so are the people who study it. Bizarre blunders, lucky accidents, and legendary moments from behind the science.",

    // Footer
    footer:          '© 2026 StarGames — Play Beyond The Universe',
  },

  fr: {
    // Nav
    nav_home:        'Accueil',
    nav_games:       'Jeux',
    nav_const:       'Constellations',
    nav_wiki:        '★ Wiki Étoiles',
    nav_back:        '← Retour aux jeux',

    // Index hero
    hero_badge:      '🚀 Votre Arcade Cosmique',
    hero_h1a:        'Des Jeux Nés',
    hero_h1b:        'dans les Étoiles',
    hero_sub:        "Explorez l'univers à travers des puzzles, des quiz et des jeux de réflexes. Le cosmos vous attend.",
    hero_browse:     'Voir les jeux',
    hero_featured:   'À la une : Quiz Constellations →',

    // Index stats
    stat_games:      'Jeux',
    stat_const:      'Constellations',
    stat_know:       'Savoir Stellaire',

    // Index section
    sec_title:       'Tous les jeux',
    sec_sub:         'Choisissez votre mission',
    card_featured:   'À la une',
    card_play_now:   'Jouer →',
    card_play:       'Jouer →',

    // HUD
    hud_score:       'Score',
    hud_time:        'Temps',
    hud_round:       'Manche',
    hud_best:        'Meilleur',
    hud_pairs:       'Paires',
    hud_moves:       'Coups',

    // Overlays / buttons
    btn_start:       'Commencer',
    btn_again:       'Rejouer',
    btn_next:        'Suivant →',
    btn_results:     'Voir les résultats',

    // Constellation quiz
    cq_hint:         'Identifiez cette constellation',
    cq_complete:     'Quiz terminé !',
    cq_complete_sub: 'quiz de constellations',
    cq_stellar:      'Astronome hors pair !',
    cq_good:         'Bon explorateur !',
    cq_keep:         'Continuez à étudier le cosmos !',

    // Star Catcher
    sc_title:        'Chasseur d\'Étoiles',
    sc_sub:          'Cliquez sur les étoiles tombantes avant qu\'elles disparaissent !',
    sc_stellar:      'Stellaire !',
    sc_gameover:     'Partie terminée',
    sc_caught:       'Vous avez attrapé',
    sc_star:         'étoile',
    sc_stars:        'étoiles',

    // Star Memory
    sm_title:        'Mémoire Stellaire',
    sm_sub:          'Associez chaque constellation à son dessin. Moins de coups = meilleur score !',
    sm_easy:         'Facile (8 paires)',
    sm_medium:       'Moyen (10 paires)',
    sm_hard:         'Difficile (12 paires)',
    sm_perfect:      'Mémoire parfaite !',
    sm_welldone:     'Bravo !',

    // Dot Connect
    dc_title:        'Relier les Points',
    dc_sub:          'Reliez les étoiles numérotées dans l\'ordre pour tracer chaque constellation avant la fin du temps !',
    dc_inst:         'Cliquez d\'abord sur l\'étoile 1',
    dc_gameover:     'Partie terminée !',
    dc_stellar:      'Navigateur stellaire !',
    dc_good:         'Bon traceur d\'étoiles !',
    dc_keep:         'Continuez à vous entraîner !',

    // Galaxy Quiz
    gq_title:        'Quiz Galactique',
    gq_sub:          'Testez vos connaissances spatiales avec des questions rapides.',
    gq_loading:      'Chargement…',
    gq_complete:     'Quiz terminé',
    gq_stellar:      'Astronome hors pair !',
    gq_good:         'Bon explorateur !',
    gq_keep:         'Continuez à étudier le cosmos !',

    // Your Records
    rec_title:       'Vos Records',
    rec_sub:         'Meilleurs scores · sauvegardés localement',

    // Knowledge section
    know_tag:        '★ Savoir Stellaire',
    know_title:      'Le Saviez-Vous ?',
    know_sub:        'Faits fascinants, anecdotes amusantes et histoires de découvertes de tout l\'univers.',

    // Constellation guide
    const_title:     'Constellations',
    const_sub:       'Naviguer le ciel nocturne',

    // Wiki Stars (index page)
    wiki_title:      'Wiki Étoiles',
    wiki_sub:        "de l'infini et au-delà",
    wiki_tab_all:      'Tout',
    wiki_tab_general:  'Savoir Général',
    wiki_tab_history:  'Histoire',
    wiki_tab_anec:     'Anecdotes',

    // Wiki page — hero
    wiki_badge:      '★ Base de Connaissances',
    wiki_h1a:        'Explorez',
    wiki_h1b:        "L'Univers",
    wiki_page_sub:   "Sciences, histoire, mythes et anecdotes curieuses sur le cosmos — tout en un seul endroit.",

    // Wiki page — nav tab links
    tab_nav_general:     'Général',
    tab_nav_stars:       '★ Étoiles Célèbres',
    tab_nav_history:     'Histoire',
    tab_nav_guide:       'Constellations',
    tab_nav_galaxies:    'Galaxies',
    tab_nav_solarsystem: 'Système Solaire',
    tab_nav_anecdotes:   'Anecdotes',

    // Wiki page — tab buttons
    tab_general:         '🔭 Savoir Général',
    tab_stars:           '⭐ Étoiles Célèbres',
    tab_history:         '📜 Histoire',
    tab_guide:           '🌌 Guide des Constellations',
    tab_galaxies:        '🔭 Galaxies',
    tab_solarsystem:     '🪐 Système Solaire',
    tab_anecdotes:       '💫 Anecdotes',

    // Wiki page — section headers
    sec_general_tag:     'Étoiles & Constellations',
    sec_general_title:   'Savoir Général',
    sec_general_sub:     "L'essentiel — cycles de vie des étoiles, types, amas et structure du cosmos.",
    sec_stars_tag:       'Étoiles Individuelles',
    sec_stars_title:     'Étoiles Célèbres',
    sec_stars_sub:       "Les plus brillantes, les plus grandes, les plus proches, les plus étranges — des étoiles qui ont marqué l'histoire.",
    sec_history_tag:     '5 000 Ans de Découvertes',
    sec_history_title:   "Histoire de l'Astronomie",
    sec_history_sub:     "Des tablettes d'argile babyloniennes à la première image d'un trou noir — une chronologie de la quête humaine vers le cosmos.",
    sec_guide_tag:       'Naviguer le Ciel Nocturne',
    sec_guide_title:     'Guide des Constellations',
    sec_guide_sub:       "Tout ce qu'il faut savoir sur les 88 constellations officielles — visibilité saisonnière, mythologie et étoiles clés.",
    sec_galaxies_tag:    'Univers-Îles',
    sec_galaxies_title:  'Galaxies',
    sec_galaxies_sub:    "De notre Voie Lactée aux géantes les plus lointaines — un guide des grands univers-îles qui forment le cosmos.",
    sec_solarsystem_tag: 'Notre Voisinage Cosmique',
    sec_solarsystem_title: 'Système Solaire',
    sec_solarsystem_sub: "Le Soleil, huit planètes, lunes, planètes naines, comètes et astéroïdes — tout dans notre coin de la Voie Lactée.",
    sec_anecdotes_tag:   'Curieux & Surprenant',
    sec_anecdotes_title: 'Anecdotes Cosmiques',
    sec_anecdotes_sub:   "Le cosmos est plein de surprises — tout comme ceux qui l'étudient. Bévues étranges, accidents heureux et moments légendaires.",

    // Footer
    footer:          '© 2026 StarGames — Jouez au-delà de l\'Univers',
  }
};

/* ── Apply translations ─────────────────────────────────────────────────── */
function applyLang(lang) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS['en'];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) el.textContent = t[key];
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    if (t[key] !== undefined) el.placeholder = t[key];
  });
  // Sync all selectors on page
  document.querySelectorAll('.lang-select').forEach(sel => sel.value = lang);
}

function setLang(lang) {
  localStorage.setItem('sg_lang', lang);
  applyLang(lang);
}

function initLang() {
  const lang = localStorage.getItem('sg_lang') || 'en';
  applyLang(lang);
  document.querySelectorAll('.lang-select').forEach(sel => sel.value = lang);
}

/* ── Easter egg modal ───────────────────────────────────────────────────── */
function initEggModal() {
  if (document.getElementById('egg-modal')) return;

  const style = document.createElement('style');
  style.textContent = `
    .egg-btn {
      background: none; border: none; font-size: 1.3rem;
      cursor: pointer; line-height: 1; padding: 2px 4px;
      transition: transform 0.25s;
      filter: grayscale(0.2);
    }
    .egg-btn:hover { transform: scale(1.3) rotate(-10deg); }

    #egg-modal {
      position: fixed; inset: 0; z-index: 9999;
      display: flex; align-items: center; justify-content: center;
      background: rgba(0,0,0,0.75); backdrop-filter: blur(10px);
      opacity: 0; pointer-events: none;
      transition: opacity 0.35s;
    }
    #egg-modal.open { opacity: 1; pointer-events: all; }

    .egg-box {
      background: rgba(14,12,36,0.97);
      border: 1px solid rgba(167,139,255,0.35);
      border-radius: 24px; padding: 48px 52px;
      text-align: center; max-width: 440px;
      box-shadow: 0 0 80px rgba(99,51,255,0.3), 0 30px 60px rgba(0,0,0,0.7);
      transform: scale(0.88) translateY(20px);
      transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
    }
    #egg-modal.open .egg-box { transform: scale(1) translateY(0); }

    .egg-box-icon { font-size: 3.5rem; margin-bottom: 20px; animation: eggWobble 2s ease-in-out infinite; }
    @keyframes eggWobble {
      0%,100% { transform: rotate(-5deg); }
      50%      { transform: rotate(5deg); }
    }

    .egg-box-text {
      font-size: 1.3rem; font-weight: 700; line-height: 1.55;
      background: linear-gradient(135deg, #c4a8ff, #6ee7ff, #f5c518);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    }

    .egg-box-close {
      margin-top: 28px; background: linear-gradient(135deg,#6333ff,#3b82f6);
      color: #fff; border: none; padding: 10px 32px;
      border-radius: 50px; font-size: 0.9rem; font-weight: 600;
      cursor: pointer; box-shadow: 0 6px 22px rgba(99,51,255,0.4);
      transition: transform 0.15s, box-shadow 0.2s;
    }
    .egg-box-close:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(99,51,255,0.6); }
  `;
  document.head.appendChild(style);

  const modal = document.createElement('div');
  modal.id = 'egg-modal';
  modal.innerHTML = `
    <div class="egg-box">
      <div class="egg-box-icon">🥚</div>
      <div class="egg-box-text">Giulian et Milán,<br>c'est pour vous mes fils&nbsp;❤️</div>
      <br>
      <button class="egg-box-close" onclick="closeEgg()">✨ Fermer</button>
    </div>`;
  document.body.appendChild(modal);
  modal.addEventListener('click', e => { if (e.target === modal) closeEgg(); });
}

function openEgg()  {
  initEggModal();
  document.getElementById('egg-modal').classList.add('open');
}
function closeEgg() {
  const m = document.getElementById('egg-modal');
  if (m) m.classList.remove('open');
}

/* ── Lang selector HTML helper ─────────────────────────────────────────── */
function langSelectorHTML() {
  return `
    <select class="lang-select" onchange="setLang(this.value)" title="Language">
      <option value="en">🌐 EN</option>
      <option value="fr">🌐 FR</option>
    </select>`;
}
