/**
 * THINKX QUIZ 2026 - Subtle Ambient Background System
 * Renders an elegant, non-distracting futuristic grid, faint neural filaments,
 * and slow-moving dust particles on an HTML5 Canvas.
 */

class AmbientBackground {
  constructor(canvasId = "bg-canvas") {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    this.particles = [];
    this.particleCount = 42;
    this.gridOffset = 0;
    this.pulsePhase = 0;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.running = true;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener("resize", () => this.resize());
    this.createParticles();
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        radius: Math.random() * 1.5 + 0.8,
        baseAlpha: Math.random() * 0.35 + 0.15,
        color: Math.random() > 0.25 ? "0, 240, 255" : "168, 85, 247" // Cyan or Violet
      });
    }
  }

  drawGrid() {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;

    // Subtle perspective horizon grid at bottom 45%
    const horizon = h * 0.62;
    const gridStep = 48;
    this.gridOffset = (this.gridOffset + 0.15) % gridStep;

    ctx.save();
    
    // Ambient radial glow behind central area
    const gradient = ctx.createRadialGradient(
      w * 0.5, h * 0.45, 50,
      w * 0.5, h * 0.45, Math.max(w, h) * 0.7
    );
    gradient.addColorStop(0, "rgba(9, 24, 52, 0.4)");
    gradient.addColorStop(0.5, "rgba(5, 12, 28, 0.2)");
    gradient.addColorStop(1, "rgba(4, 7, 16, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);

    // Subtle orthogonal background grid lines (very faint)
    ctx.strokeStyle = "rgba(0, 220, 255, 0.035)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    
    // Vertical grid lines
    const vStep = 80;
    for (let x = 0; x < w; x += vStep) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
    }
    // Horizontal grid lines
    const hStep = 80;
    for (let y = 0; y < h; y += hStep) {
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
    }
    ctx.stroke();

    // Soft horizontal scanline glow sweeping very slowly
    this.pulsePhase += 0.005;
    const sweepY = (Math.sin(this.pulsePhase) * 0.5 + 0.5) * h;
    const sweepGrad = ctx.createLinearGradient(0, sweepY - 80, 0, sweepY + 80);
    sweepGrad.addColorStop(0, "rgba(0, 240, 255, 0)");
    sweepGrad.addColorStop(0.5, "rgba(0, 240, 255, 0.02)");
    sweepGrad.addColorStop(1, "rgba(0, 240, 255, 0)");
    ctx.fillStyle = sweepGrad;
    ctx.fillRect(0, sweepY - 80, w, 160);

    ctx.restore();
  }

  drawParticles() {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;

    // Connect nearby particles with subtle filaments
    ctx.lineWidth = 0.75;
    for (let i = 0; i < this.particles.length; i++) {
      const p1 = this.particles[i];
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < 13000) { // approx 114px
          const dist = Math.sqrt(distSq);
          const alpha = (1 - dist / 114) * 0.12;
          ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }

    // Render particles
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < -10) p.x = w + 10;
      else if (p.x > w + 10) p.x = -10;
      if (p.y < -10) p.y = h + 10;
      else if (p.y > h + 10) p.y = -10;

      ctx.fillStyle = `rgba(${p.color}, ${p.baseAlpha})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();

      // Soft glow core
      ctx.fillStyle = `rgba(${p.color}, ${p.baseAlpha * 0.35})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius * 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  animate() {
    if (!this.running) return;
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.drawGrid();
    this.drawParticles();
    requestAnimationFrame(this.animate);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  window.ambientBg = new AmbientBackground("bg-canvas");
});
