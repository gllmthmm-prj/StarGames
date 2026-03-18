/**
 * scores.js — StarGames High Score Manager
 * Uses localStorage, no external dependencies.
 */
const ScoreManager = (function () {
    function _key(gameId) {
        return 'sg_hs_' + gameId;
    }

    function _load(gameId) {
        try {
            const raw = localStorage.getItem(_key(gameId));
            if (!raw) return [];
            const parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? parsed : [];
        } catch (e) {
            return [];
        }
    }

    function _persist(gameId, arr) {
        try {
            localStorage.setItem(_key(gameId), JSON.stringify(arr));
        } catch (e) { /* ignore quota errors */ }
    }

    /**
     * Save a score. Returns { isNew: bool, rank: int }.
     * isNew = true if this score made it into the top-5.
     * rank = 1-based position in the top-5 (1 = best).
     */
    function save(gameId, score) {
        const scores = _load(gameId);
        scores.push(score);
        scores.sort((a, b) => b - a);
        const top5 = scores.slice(0, 5);
        _persist(gameId, top5);

        const rank = top5.indexOf(score) + 1; // 1-based; -1 means not in top5 → rank 0
        const isNew = rank >= 1 && rank <= 5;
        return { isNew, rank: isNew ? rank : 0 };
    }

    /** Returns the single best score (number). 0 if no scores yet. */
    function getBest(gameId) {
        const scores = _load(gameId);
        return scores.length > 0 ? scores[0] : 0;
    }

    /** Returns array of up to 5 top scores, sorted descending. */
    function getTop5(gameId) {
        return _load(gameId).slice(0, 5);
    }

    /**
     * Returns an HTML string for a rank badge.
     * If isNew && rank === 1 → "🏆 New Best!"
     * If isNew              → "Rank #N"
     * else                  → "" (empty)
     */
    function renderBadge(gameId, score) {
        const result = save(gameId, score);
        if (!result.isNew) return '';
        if (result.rank === 1) return '<span class="score-badge score-badge--best">🏆 New Best!</span>';
        return `<span class="score-badge">Rank #${result.rank}</span>`;
    }

    return { save, getBest, getTop5, renderBadge };
})();
