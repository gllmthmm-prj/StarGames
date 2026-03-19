/**
 * achievements.js — StarGames Achievements & Badges System
 * Self-contained IIFE, no dependencies.
 * Exposes a global `Achievements` object.
 */
(function (global) {
  'use strict';

  // ─────────────────────────────────────────────
  // Constants
  // ─────────────────────────────────────────────
  var STORAGE_KEY = 'sg_achievements';
  var TOAST_CONTAINER_ID = 'sg-toast-container';
  var TOAST_DURATION = 4000; // ms before auto-dismiss

  // ─────────────────────────────────────────────
  // Achievement definitions
  // ─────────────────────────────────────────────
  var ACHIEVEMENTS = [
    // Per-game milestones
    {
      id: 'first_play',
      name: 'First Launch',
      description: 'Play any game for the first time',
      icon: '🚀',
      category: 'milestone',
    },
    {
      id: 'first_win',
      name: 'Victory!',
      description: 'Win any game',
      icon: '⭐',
      category: 'milestone',
    },
    {
      id: 'score_1000',
      name: 'Star Scorer',
      description: 'Reach 1000 points in any game',
      icon: '💫',
      category: 'milestone',
    },
    {
      id: 'score_5000',
      name: 'Cosmic Champion',
      description: 'Reach 5000 points in any game',
      icon: '🏆',
      category: 'milestone',
    },
    {
      id: 'top_rank',
      name: 'Leaderboard Legend',
      description: 'Achieve rank #1 in any game',
      icon: '👑',
      category: 'milestone',
    },
    {
      id: 'all_games',
      name: 'Galaxy Explorer',
      description: 'Play all 9 games at least once',
      icon: '🌌',
      category: 'milestone',
    },
    {
      id: 'play_10',
      name: 'Astronaut in Training',
      description: 'Play 10 total games',
      icon: '🛸',
      category: 'milestone',
    },
    {
      id: 'play_50',
      name: 'Space Veteran',
      description: 'Play 50 total games',
      icon: '🌠',
      category: 'milestone',
    },

    // Game-specific
    {
      id: 'asteroid_10',
      name: 'Asteroid Hunter',
      description: 'Destroy 10 asteroids in one run',
      icon: '☄️',
      category: 'game',
    },
    {
      id: 'asteroid_lv5',
      name: 'Deep Space Pilot',
      description: 'Reach level 5 in Asteroid Dodge',
      icon: '🎮',
      category: 'game',
    },
    {
      id: 'trivia_perfect',
      name: 'Omniscient',
      description: 'Answer all questions correctly in Trivia Showdown',
      icon: '🧠',
      category: 'game',
    },
    {
      id: 'trivia_speed',
      name: 'Speed of Light',
      description: 'Answer 5 questions in a row in under 3 seconds each',
      icon: '⚡',
      category: 'game',
    },
    {
      id: 'constdraw_s',
      name: 'Master Cartographer',
      description: 'Get S rank in Constellation Draw',
      icon: '🗺️',
      category: 'game',
    },
    {
      id: 'constdraw_allcorrect',
      name: 'Perfect Sky',
      description: 'Draw all connections correctly in a round',
      icon: '✨',
      category: 'game',
    },
    {
      id: 'orbit_fast',
      name: 'Orbital Mechanics',
      description: 'Complete Planet Orbit in under 30 seconds',
      icon: '🪐',
      category: 'game',
    },
    {
      id: 'quiz_streak5',
      name: 'Trivia Star',
      description: 'Answer 5 Galaxy Quiz questions in a row correctly',
      icon: '🌟',
      category: 'game',
    },
    {
      id: 'wiki_explorer',
      name: 'Wiki Scholar',
      description: 'View 20 different constellation entries in the Wiki',
      icon: '📚',
      category: 'game',
    },
  ];

  // Build a lookup map for O(1) access by id
  var ACHIEVEMENT_MAP = {};
  for (var i = 0; i < ACHIEVEMENTS.length; i++) {
    ACHIEVEMENT_MAP[ACHIEVEMENTS[i].id] = ACHIEVEMENTS[i];
  }

  // Total number of distinct games (used for all_games check)
  var TOTAL_GAMES = 9;

  // ─────────────────────────────────────────────
  // CSS injection (runs once on first load)
  // ─────────────────────────────────────────────
  function injectStyles() {
    if (document.getElementById('sg-achievements-style')) return;
    var style = document.createElement('style');
    style.id = 'sg-achievements-style';
    style.textContent = [
      '#sg-toast-container {',
      '  position: fixed;',
      '  bottom: 24px;',
      '  right: 24px;',
      '  z-index: 9999;',
      '  display: flex;',
      '  flex-direction: column;',
      '  gap: 10px;',
      '  pointer-events: none;',
      '}',
      '.sg-toast {',
      '  background: rgba(7,7,16,0.95);',
      '  border: 1px solid rgba(196,168,255,0.3);',
      '  border-radius: 14px;',
      '  padding: 14px 18px;',
      '  display: flex;',
      '  align-items: center;',
      '  gap: 12px;',
      '  box-shadow: 0 8px 32px rgba(0,0,0,0.6), 0 0 20px rgba(196,168,255,0.1);',
      '  min-width: 280px;',
      '  max-width: 340px;',
      '  animation: sgToastIn 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards;',
      '}',
      '.sg-toast.out {',
      '  animation: sgToastOut 0.3s ease-in forwards;',
      '}',
      '@keyframes sgToastIn {',
      '  from { transform: translateX(120%); opacity: 0; }',
      '  to   { transform: translateX(0);    opacity: 1; }',
      '}',
      '@keyframes sgToastOut {',
      '  from { opacity: 1; transform: translateX(0);    }',
      '  to   { opacity: 0; transform: translateX(40px); }',
      '}',
      '.sg-toast-icon {',
      '  font-size: 1.8rem;',
      '  flex-shrink: 0;',
      '}',
      '.sg-toast-body {}',
      '.sg-toast-label {',
      '  font-size: 0.6rem;',
      '  letter-spacing: 0.25em;',
      '  text-transform: uppercase;',
      '  color: #c4a8ff;',
      '  margin-bottom: 3px;',
      '}',
      '.sg-toast-name {',
      '  font-size: 0.95rem;',
      '  font-weight: 700;',
      '  color: #fff;',
      '  margin-bottom: 2px;',
      '}',
      '.sg-toast-desc {',
      '  font-size: 0.78rem;',
      '  color: rgba(255,255,255,0.45);',
      '}',
    ].join('\n');
    document.head.appendChild(style);
  }

  // ─────────────────────────────────────────────
  // Storage helpers
  // ─────────────────────────────────────────────
  function loadStore() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        // Ensure required shape
        if (!parsed.earned) parsed.earned = {};
        if (!parsed.stats)  parsed.stats  = {};
        return parsed;
      }
    } catch (e) {
      // Corrupt data — reset silently
    }
    return { earned: {}, stats: {} };
  }

  function saveStore(store) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    } catch (e) {
      // Storage full or unavailable — fail silently
    }
  }

  // ─────────────────────────────────────────────
  // Toast container
  // ─────────────────────────────────────────────
  function getOrCreateContainer() {
    var container = document.getElementById(TOAST_CONTAINER_ID);
    if (!container) {
      container = document.createElement('div');
      container.id = TOAST_CONTAINER_ID;
      document.body.appendChild(container);
    }
    return container;
  }

  // ─────────────────────────────────────────────
  // Public API
  // ─────────────────────────────────────────────

  /**
   * Unlock an achievement by id.
   * Returns { isNew: true, achievement: def } on first unlock,
   *         { isNew: false, achievement: def } if already earned,
   * or null if the id is unknown.
   */
  function unlock(id) {
    var def = ACHIEVEMENT_MAP[id];
    if (!def) return null;

    var store = loadStore();
    var isNew = !(id in store.earned);

    if (isNew) {
      store.earned[id] = Date.now();
      saveStore(store);
    }

    return { isNew: isNew, achievement: def };
  }

  /**
   * Returns true if the achievement with the given id has been earned.
   */
  function isUnlocked(id) {
    var store = loadStore();
    return id in store.earned;
  }

  /**
   * Returns an array of all achievement definitions enriched with
   * earned:boolean and earnedAt:number|null.
   */
  function getAll() {
    var store = loadStore();
    return ACHIEVEMENTS.map(function (def) {
      var earnedAt = store.earned[def.id] !== undefined ? store.earned[def.id] : null;
      return Object.assign({}, def, {
        earned: earnedAt !== null,
        earnedAt: earnedAt,
      });
    });
  }

  /**
   * Returns only the earned achievements, enriched with earnedAt.
   */
  function getEarned() {
    return getAll().filter(function (a) { return a.earned; });
  }

  /**
   * Returns the current stats object.
   */
  function getStats() {
    var store = loadStore();
    return Object.assign({
      total_plays: 0,
      total_score: 0,
      games_played: {},
    }, store.stats);
  }

  /**
   * Increment a numeric stat by `amount` (defaults to 1).
   * Returns the new value.
   */
  function incrementStat(key, amount) {
    amount = (typeof amount === 'number') ? amount : 1;
    var store = loadStore();
    var current = typeof store.stats[key] === 'number' ? store.stats[key] : 0;
    store.stats[key] = current + amount;
    saveStore(store);
    return store.stats[key];
  }

  /**
   * Set a stat to an explicit value.
   */
  function setStat(key, value) {
    var store = loadStore();
    store.stats[key] = value;
    saveStore(store);
  }

  /**
   * Auto-check and unlock achievements based on a trigger key + optional value.
   *
   * Supported triggers:
   *   'play'           — increment total_plays, check first_play / play_10 / play_50
   *   'win'            — check first_win
   *   'score', number  — update total_score (cumulative), check score_1000 / score_5000
   *   'rank1'          — check top_rank
   *   'all_games', id  — mark gameId as played, check all_games (9 distinct games)
   *
   * Returns an array of { isNew, achievement } objects for every unlocked achievement
   * (may be empty).
   */
  function checkAndUnlock(triggerKey, value) {
    var results = [];

    function tryUnlock(id) {
      var result = unlock(id);
      if (result && result.isNew) {
        results.push(result);
        showToast(id);
      }
    }

    switch (triggerKey) {
      case 'play': {
        var plays = incrementStat('total_plays', 1);
        tryUnlock('first_play');
        if (plays >= 10)  tryUnlock('play_10');
        if (plays >= 50)  tryUnlock('play_50');
        break;
      }

      case 'win': {
        tryUnlock('first_win');
        break;
      }

      case 'score': {
        var numVal = typeof value === 'number' ? value : parseInt(value, 10) || 0;
        // Update high-water total_score (use incrementStat with the raw value so
        // individual game scores accumulate; callers can also use setStat for a
        // single-session high score approach).
        incrementStat('total_score', numVal);
        if (numVal >= 1000) tryUnlock('score_1000');
        if (numVal >= 5000) tryUnlock('score_5000');
        break;
      }

      case 'rank1': {
        tryUnlock('top_rank');
        break;
      }

      case 'all_games': {
        // `value` should be a string game identifier
        var gameId = String(value);
        var store = loadStore();
        if (!store.stats.games_played || typeof store.stats.games_played !== 'object') {
          store.stats.games_played = {};
        }
        store.stats.games_played[gameId] = true;
        saveStore(store);

        var distinctCount = Object.keys(store.stats.games_played).length;
        if (distinctCount >= TOTAL_GAMES) tryUnlock('all_games');
        break;
      }

      default:
        // Unknown trigger — no-op
        break;
    }

    return results;
  }

  /**
   * Returns an HTML string for a toast notification for the given achievement def.
   * @param {Object} achievement — a definition object from ACHIEVEMENTS
   */
  function renderToast(achievement) {
    return (
      '<div class="sg-toast">' +
        '<div class="sg-toast-icon">' + achievement.icon + '</div>' +
        '<div class="sg-toast-body">' +
          '<div class="sg-toast-label">Achievement Unlocked</div>' +
          '<div class="sg-toast-name">' + _escapeHtml(achievement.name) + '</div>' +
          '<div class="sg-toast-desc">' + _escapeHtml(achievement.description) + '</div>' +
        '</div>' +
      '</div>'
    );
  }

  /**
   * Inject and display a floating toast in the DOM for the given achievement id.
   * Auto-dismisses after TOAST_DURATION ms with a fade-out animation.
   */
  function showToast(id) {
    var def = ACHIEVEMENT_MAP[id];
    if (!def) return;

    // Ensure styles and container exist
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () {
        injectStyles();
        _appendToast(def);
      });
    } else {
      injectStyles();
      _appendToast(def);
    }
  }

  // ─────────────────────────────────────────────
  // Private helpers
  // ─────────────────────────────────────────────

  function _appendToast(def) {
    var container = getOrCreateContainer();

    var wrapper = document.createElement('div');
    wrapper.innerHTML = renderToast(def);
    var toastEl = wrapper.firstChild;

    container.appendChild(toastEl);

    // Auto-dismiss
    var dismissTimer = setTimeout(function () {
      _dismissToast(toastEl);
    }, TOAST_DURATION);

    // Allow manual dismiss on click (pointer-events re-enabled for the element)
    toastEl.style.pointerEvents = 'auto';
    toastEl.style.cursor = 'pointer';
    toastEl.addEventListener('click', function () {
      clearTimeout(dismissTimer);
      _dismissToast(toastEl);
    });
  }

  function _dismissToast(toastEl) {
    if (!toastEl || !toastEl.parentNode) return;
    toastEl.classList.add('out');
    // Remove from DOM after animation completes (~300ms)
    setTimeout(function () {
      if (toastEl.parentNode) {
        toastEl.parentNode.removeChild(toastEl);
      }
    }, 350);
  }

  function _escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // ─────────────────────────────────────────────
  // Expose global
  // ─────────────────────────────────────────────
  var Achievements = {
    unlock:          unlock,
    isUnlocked:      isUnlocked,
    getAll:          getAll,
    getEarned:       getEarned,
    getStats:        getStats,
    incrementStat:   incrementStat,
    setStat:         setStat,
    checkAndUnlock:  checkAndUnlock,
    renderToast:     renderToast,
    showToast:       showToast,
    // Expose the definitions list for UI enumeration
    definitions:     ACHIEVEMENTS,
  };

  global.Achievements = Achievements;

}(typeof window !== 'undefined' ? window : this));
