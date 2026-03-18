/* ── StarGames ESA Space Background ────────────────────────────────────────
   Renders on a fixed <canvas id="spacebg"> behind all content.
   Features:
     • Deep star field with twinkling (gold, blue-white, white)
     • Earth glow (soft blue arc at bottom-left)
     • 3 orbital ellipses with moving satellites
     • Drifting nebula wisps
     • Occasional shooting star
   ────────────────────────────────────────────────────────────────────────── */

(function () {
  const cv  = document.getElementById('spacebg');
  if (!cv) return;
  const ctx = cv.getContext('2d');

  let W, H;
  let stars     = [];
  let nebulas   = [];
  let satellites = [];
  let shoot     = null;
  let shootTimer = 0;
  let t = 0;

  // ── Resize ──────────────────────────────────────────────────────────────
  function resize() {
    W = cv.width  = window.innerWidth;
    H = cv.height = window.innerHeight;
    initScene();
  }

  // ── Init scene objects ────────────────────────────────────────────────
  function initScene() {
    // Stars
    stars = Array.from({ length: 280 }, () => ({
      x:    Math.random() * W,
      y:    Math.random() * H,
      r:    Math.random() * 1.5 + 0.2,
      baseA: Math.random() * 0.65 + 0.15,
      speed: Math.random() * 0.006 + 0.001,
      phase: Math.random() * Math.PI * 2,
      color: pick(['#ffffff', '#ffffff', '#ffffff', '#f5c518', '#a0c8ff']),
    }));

    // Nebula wisps
    nebulas = Array.from({ length: 5 }, (_, i) => ({
      x:    Math.random() * W,
      y:    Math.random() * H * 0.8,
      rx:   120 + Math.random() * 160,
      ry:   60  + Math.random() * 90,
      a:    Math.random() * 0.04 + 0.015,
      rot:  Math.random() * Math.PI,
      driftX: (Math.random() - 0.5) * 0.12,
      driftY: (Math.random() - 0.5) * 0.06,
      color: pick([
        'rgba(99,51,255,VAL)',
        'rgba(0,160,220,VAL)',
        'rgba(180,50,120,VAL)',
        'rgba(30,130,200,VAL)',
      ]),
    }));

    // Orbital rings + satellites
    const cx0 = W * 0.12, cy0 = H * 0.88; // Earth center (bottom-left)
    satellites = [
      { cx: cx0, cy: cy0, rx: H * 0.48, ry: H * 0.18, tilt: -0.35, speed: 0.0008, phase: 0,    size: 3, color: '#00c8ff' },
      { cx: cx0, cy: cy0, rx: H * 0.62, ry: H * 0.24, tilt: -0.2,  speed: 0.0006, phase: 1.8,  size: 2.5, color: '#a78bff' },
      { cx: cx0, cy: cy0, rx: H * 0.78, ry: H * 0.30, tilt: -0.1,  speed: 0.0004, phase: 3.5,  size: 2, color: '#6ee7ff' },
    ];
  }

  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  // ── Draw loop ─────────────────────────────────────────────────────────
  function draw() {
    t++;
    ctx.clearRect(0, 0, W, H);

    // ─ Deep space gradient background ─────────────────────────────────
    const bg = ctx.createLinearGradient(0, 0, W * 0.3, H);
    bg.addColorStop(0,   '#03030f');
    bg.addColorStop(0.5, '#050510');
    bg.addColorStop(1,   '#020208');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // ─ Earth glow (bottom-left corner) ────────────────────────────────
    const ex = W * 0.08, ey = H * 0.92;
    const earthR = H * 0.38;
    const earthGrd = ctx.createRadialGradient(ex, ey, 0, ex, ey, earthR);
    earthGrd.addColorStop(0,    'rgba(30,100,220,0.22)');
    earthGrd.addColorStop(0.35, 'rgba(20,70,180,0.14)');
    earthGrd.addColorStop(0.7,  'rgba(10,30,120,0.06)');
    earthGrd.addColorStop(1,    'rgba(0,0,0,0)');
    ctx.beginPath();
    ctx.arc(ex, ey, earthR, 0, Math.PI * 2);
    ctx.fillStyle = earthGrd;
    ctx.fill();

    // Atmosphere rim
    ctx.beginPath();
    ctx.arc(ex, ey, earthR * 0.78, Math.PI * 1.05, Math.PI * 1.75);
    ctx.strokeStyle = 'rgba(80,160,255,0.18)';
    ctx.lineWidth   = 6;
    ctx.stroke();
    ctx.strokeStyle = 'rgba(120,200,255,0.08)';
    ctx.lineWidth   = 14;
    ctx.stroke();

    // ─ Nebula wisps ───────────────────────────────────────────────────
    nebulas.forEach(n => {
      n.x += n.driftX;
      n.y += n.driftY;
      if (n.x > W + 200) n.x = -200;
      if (n.x < -200)    n.x = W + 200;
      if (n.y > H + 150) n.y = -150;
      if (n.y < -150)    n.y = H + 150;

      ctx.save();
      ctx.translate(n.x, n.y);
      ctx.rotate(n.rot);
      const grd = ctx.createRadialGradient(0, 0, 0, 0, 0, n.rx);
      const col = n.color.replace('VAL', n.a);
      const col0= n.color.replace('VAL', n.a * 0.5);
      grd.addColorStop(0, col);
      grd.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.scale(1, n.ry / n.rx);
      ctx.beginPath();
      ctx.arc(0, 0, n.rx, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();
      ctx.restore();
    });

    // ─ Stars ──────────────────────────────────────────────────────────
    stars.forEach(s => {
      const alpha = s.baseA * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      if (s.r > 1.1) { ctx.shadowColor = s.color; ctx.shadowBlur = 4; }
      ctx.fillStyle = s.color === '#ffffff'
        ? `rgba(255,255,255,${alpha})`
        : s.color === '#f5c518'
        ? `rgba(245,197,24,${alpha})`
        : `rgba(160,200,255,${alpha})`;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    // ─ Orbital rings ──────────────────────────────────────────────────
    satellites.forEach(orb => {
      ctx.save();
      ctx.translate(orb.cx, orb.cy);
      ctx.rotate(orb.tilt);
      ctx.beginPath();
      ctx.ellipse(0, 0, orb.rx, orb.ry, 0, 0, Math.PI * 2);
      ctx.strokeStyle = orb.color.replace('#', 'rgba(').replace(/^rgba\((..)(..)(..)/, (_, r, g, b) => {
        return `rgba(${parseInt(r,16)},${parseInt(g,16)},${parseInt(b,16)}`;
      }) + ',0.12)';
      // Simpler: just use a fixed rgba
      ctx.strokeStyle = 'rgba(100,120,200,0.10)';
      ctx.lineWidth   = 1;
      ctx.setLineDash([4, 8]);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();
    });

    // ─ Satellites moving along orbits ─────────────────────────────────
    satellites.forEach(orb => {
      orb.phase += orb.speed;
      const angle = orb.phase;

      // Position on ellipse (with tilt)
      const lx = Math.cos(angle) * orb.rx;
      const ly = Math.sin(angle) * orb.ry;
      const sx = orb.cx + lx * Math.cos(orb.tilt) - ly * Math.sin(orb.tilt);
      const sy = orb.cy + lx * Math.sin(orb.tilt) + ly * Math.cos(orb.tilt);

      // Glow
      const grd = ctx.createRadialGradient(sx, sy, 0, sx, sy, orb.size * 5);
      grd.addColorStop(0, orb.color + 'aa');
      grd.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.arc(sx, sy, orb.size * 5, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      // Satellite body
      ctx.save();
      ctx.translate(sx, sy);
      ctx.rotate(angle + Math.PI / 4);
      // Body
      ctx.fillStyle = orb.color;
      ctx.shadowColor = orb.color;
      ctx.shadowBlur  = 8;
      ctx.fillRect(-orb.size * 0.6, -orb.size * 0.6, orb.size * 1.2, orb.size * 1.2);
      // Solar panels
      ctx.fillStyle = 'rgba(100,180,255,0.7)';
      ctx.fillRect(-orb.size * 2.5, -orb.size * 0.25, orb.size * 1.6, orb.size * 0.5);
      ctx.fillRect(orb.size * 0.9,  -orb.size * 0.25, orb.size * 1.6, orb.size * 0.5);
      ctx.shadowBlur = 0;
      ctx.restore();

      // Trail
      ctx.save();
      ctx.translate(orb.cx, orb.cy);
      ctx.rotate(orb.tilt);
      const trailLen = 0.5;
      const trailGrd = ctx.createLinearGradient(
        Math.cos(angle - trailLen) * orb.rx, Math.sin(angle - trailLen) * orb.ry,
        Math.cos(angle) * orb.rx,            Math.sin(angle) * orb.ry
      );
      trailGrd.addColorStop(0, 'rgba(100,200,255,0)');
      trailGrd.addColorStop(1, 'rgba(100,200,255,0.25)');
      ctx.beginPath();
      ctx.ellipse(0, 0, orb.rx, orb.ry, 0, angle - trailLen, angle);
      ctx.strokeStyle = trailGrd;
      ctx.lineWidth   = 1.5;
      ctx.stroke();
      ctx.restore();
    });

    // ─ Shooting star ──────────────────────────────────────────────────
    shootTimer++;
    if (shootTimer > 260 + Math.random() * 200) {
      shootTimer = 0;
      shoot = {
        x: Math.random() * W * 0.7,
        y: Math.random() * H * 0.4,
        vx: 6 + Math.random() * 4,
        vy: 2.5 + Math.random() * 2,
        life: 1,
        len: 80 + Math.random() * 60,
      };
    }
    if (shoot) {
      shoot.x    += shoot.vx;
      shoot.y    += shoot.vy;
      shoot.life -= 0.03;
      if (shoot.life <= 0) { shoot = null; }
      else {
        const grd = ctx.createLinearGradient(
          shoot.x - shoot.vx * shoot.len / shoot.vx,
          shoot.y - shoot.vy * shoot.len / shoot.vx,
          shoot.x, shoot.y
        );
        grd.addColorStop(0, 'rgba(255,255,255,0)');
        grd.addColorStop(1, `rgba(255,255,255,${shoot.life * 0.9})`);
        ctx.beginPath();
        ctx.moveTo(shoot.x - shoot.vx * 10, shoot.y - shoot.vy * 10);
        ctx.lineTo(shoot.x, shoot.y);
        ctx.strokeStyle = grd;
        ctx.lineWidth   = 1.5;
        ctx.stroke();
      }
    }

    requestAnimationFrame(draw);
  }

  // ── Init ───────────────────────────────────────────────────────────────
  resize();
  window.addEventListener('resize', resize);
  requestAnimationFrame(draw);
})();
