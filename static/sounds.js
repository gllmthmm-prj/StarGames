/**
 * sounds.js — StarGames Sound Effects
 * Uses Web Audio API only. No external files.
 * Lazy-inits AudioContext on first call.
 */
const SFX = (function () {
    let _ctx = null;

    function _getCtx() {
        if (!_ctx) {
            try {
                _ctx = new (window.AudioContext || window.webkitAudioContext)();
            } catch (e) {
                return null;
            }
        }
        if (_ctx.state === 'suspended') {
            try { _ctx.resume(); } catch (e) { /* ignore */ }
        }
        return _ctx;
    }

    function _playTone(opts) {
        // opts: { freq, type, startGain, endGain, duration, detune, delay }
        try {
            const ctx = _getCtx();
            if (!ctx) return;
            const now   = ctx.currentTime + (opts.delay || 0);
            const dur   = opts.duration || 0.2;

            const osc   = ctx.createOscillator();
            const gain  = ctx.createGain();

            osc.type    = opts.type || 'sine';
            osc.frequency.setValueAtTime(opts.freq || 440, now);
            if (opts.freqEnd) osc.frequency.linearRampToValueAtTime(opts.freqEnd, now + dur);
            if (opts.detune)  osc.detune.setValueAtTime(opts.detune, now);

            gain.gain.setValueAtTime(opts.startGain !== undefined ? opts.startGain : 0.3, now);
            gain.gain.exponentialRampToValueAtTime(
                Math.max(opts.endGain !== undefined ? opts.endGain : 0.001, 0.001),
                now + dur
            );

            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + dur + 0.01);
        } catch (e) { /* ignore */ }
    }

    /** Star caught — pleasant ascending chime */
    function catchSfx() {
        _playTone({ freq: 660, freqEnd: 880, type: 'sine',    startGain: 0.25, endGain: 0.001, duration: 0.18 });
        _playTone({ freq: 880, freqEnd: 1100, type: 'triangle', startGain: 0.12, endGain: 0.001, duration: 0.22, delay: 0.05 });
    }

    /** Missed / wrong — low short buzz */
    function miss() {
        _playTone({ freq: 160, freqEnd: 100, type: 'sawtooth', startGain: 0.3, endGain: 0.001, duration: 0.25 });
    }

    /** Quiz correct — bright success chime */
    function correct() {
        _playTone({ freq: 523, type: 'sine',    startGain: 0.28, endGain: 0.001, duration: 0.12 });
        _playTone({ freq: 659, type: 'sine',    startGain: 0.22, endGain: 0.001, duration: 0.12, delay: 0.10 });
        _playTone({ freq: 784, type: 'triangle', startGain: 0.28, endGain: 0.001, duration: 0.20, delay: 0.20 });
    }

    /** Quiz wrong — descending tone */
    function wrong() {
        _playTone({ freq: 380, freqEnd: 220, type: 'sawtooth', startGain: 0.28, endGain: 0.001, duration: 0.3 });
    }

    /** Timer tick — soft click */
    function tick() {
        _playTone({ freq: 1200, type: 'square', startGain: 0.08, endGain: 0.001, duration: 0.04 });
    }

    /**
     * Game over sound.
     * gameOver(true)  → short fanfare
     * gameOver(false) → sad trombone
     */
    function gameOver(won) {
        if (won) {
            // Fanfare: ascending 3-note chord
            _playTone({ freq: 523, type: 'sine',    startGain: 0.22, endGain: 0.001, duration: 0.18 });
            _playTone({ freq: 659, type: 'sine',    startGain: 0.2,  endGain: 0.001, duration: 0.18, delay: 0.14 });
            _playTone({ freq: 784, type: 'sine',    startGain: 0.2,  endGain: 0.001, duration: 0.25, delay: 0.28 });
            _playTone({ freq: 1047, type: 'triangle', startGain: 0.25, endGain: 0.001, duration: 0.35, delay: 0.42 });
        } else {
            // Sad trombone descent
            _playTone({ freq: 400, freqEnd: 320, type: 'sawtooth', startGain: 0.22, endGain: 0.12, duration: 0.22 });
            _playTone({ freq: 320, freqEnd: 260, type: 'sawtooth', startGain: 0.22, endGain: 0.12, duration: 0.22, delay: 0.22 });
            _playTone({ freq: 260, freqEnd: 180, type: 'sawtooth', startGain: 0.22, endGain: 0.001, duration: 0.28, delay: 0.44 });
        }
    }

    /** Dot connect — short satisfying click+tone */
    function connect() {
        _playTone({ freq: 880,  type: 'square', startGain: 0.15, endGain: 0.001, duration: 0.04 });
        _playTone({ freq: 1046, type: 'sine',   startGain: 0.22, endGain: 0.001, duration: 0.18, delay: 0.03 });
    }

    return { catch: catchSfx, miss, correct, wrong, tick, gameOver, connect };
})();
