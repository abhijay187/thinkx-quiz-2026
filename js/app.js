/**
 * THINKX QUIZ 2026 - Main Presentation Engine
 * Controls slide transitions, presenter keyboard commands, touch gestures,
 * and HUD updates with strictly smooth, non-glitch animation timing.
 */

class PresentationController {
  constructor(slidesData) {
    this.slides = slidesData;
    this.currentIndex = 0;
    this.isTransitioning = false;

    // DOM Elements
    this.viewport = document.getElementById("slide-viewport");
    this.headerBadge = document.getElementById("hud-round-badge");
    this.headerRoundText = document.getElementById("hud-round-text");
    this.counterCurrent = document.getElementById("hud-counter-current");
    this.counterTotal = document.getElementById("hud-counter-total");
    this.footerBrand = document.getElementById("hud-footer-brand");

    // Presenter buttons
    this.btnPrev = document.getElementById("btn-prev");
    this.btnNext = document.getElementById("btn-next");
    this.btnFullscreen = document.getElementById("btn-fullscreen");
    this.btnJump = document.getElementById("btn-jump");

    // Jump drawer
    this.jumpDrawer = document.getElementById("jump-drawer");
    this.btnCloseJump = document.getElementById("btn-close-jump");

    this.init();
  }

  init() {
    this.buildJumpDrawer();
    this.attachEventListeners();
    
    // Check URL hash for starting slide (e.g. #slide-5 or #q10)
    const hash = window.location.hash;
    if (hash) {
      const match = hash.match(/#slide-(\d+)/);
      if (match && match[1]) {
        const target = parseInt(match[1], 10);
        if (target >= 0 && target < this.slides.length) {
          this.currentIndex = target;
        }
      }
    }

    this.renderSlide(this.currentIndex, false);
  }

  attachEventListeners() {
    // Keyboard Controls
    window.addEventListener("keydown", (e) => {
      // Don't trigger presentation navigation if jump drawer is open and pressing Escape
      if (this.jumpDrawer && this.jumpDrawer.classList.contains("active")) {
        if (e.key === "Escape" || e.key === "j" || e.key === "J") {
          e.preventDefault();
          this.toggleJumpDrawer(false);
        }
        return;
      }

      switch (e.key) {
        // Next slide
        case "ArrowRight":
        case " ":
        case "Enter":
        case "PageDown":
          e.preventDefault();
          this.nextSlide();
          break;

        // Previous slide
        case "ArrowLeft":
        case "Backspace":
        case "PageUp":
          e.preventDefault();
          this.prevSlide();
          break;

        // Jump to first slide (Intro)
        case "Home":
          e.preventDefault();
          this.goToSlide(0);
          break;

        // Jump to last slide (Thank You)
        case "End":
          e.preventDefault();
          this.goToSlide(this.slides.length - 1);
          break;

        // Fullscreen Toggle
        case "f":
        case "F":
          e.preventDefault();
          this.toggleFullscreen();
          break;

        // Jump Drawer Toggle
        case "j":
        case "J":
        case "g":
        case "G":
          e.preventDefault();
          this.toggleJumpDrawer();
          break;
      }
    });

    // Presenter Button Clicks
    if (this.btnPrev) {
      this.btnPrev.addEventListener("click", () => this.prevSlide());
    }
    if (this.btnNext) {
      this.btnNext.addEventListener("click", () => this.nextSlide());
    }
    if (this.btnFullscreen) {
      this.btnFullscreen.addEventListener("click", () => this.toggleFullscreen());
    }
    if (this.btnJump) {
      this.btnJump.addEventListener("click", () => this.toggleJumpDrawer());
    }
    if (this.btnCloseJump) {
      this.btnCloseJump.addEventListener("click", () => this.toggleJumpDrawer(false));
    }

    // Close jump modal if clicking backdrop
    if (this.jumpDrawer) {
      this.jumpDrawer.addEventListener("click", (e) => {
        if (e.target === this.jumpDrawer) {
          this.toggleJumpDrawer(false);
        }
      });
    }

    // Touch Swipe Navigation for Tablets & Mobile
    let touchStartX = 0;
    let touchStartY = 0;
    window.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    window.addEventListener("touchend", (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      const touchEndY = e.changedTouches[0].screenY;
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;

      // Horizontal swipe threshold
      if (Math.abs(deltaX) > 60 && Math.abs(deltaY) < 100) {
        if (deltaX < 0) {
          this.nextSlide();
        } else {
          this.prevSlide();
        }
      }
    }, { passive: true });

    // Handle browser back/forward buttons
    window.addEventListener("hashchange", () => {
      const match = window.location.hash.match(/#slide-(\d+)/);
      if (match && match[1]) {
        const target = parseInt(match[1], 10);
        if (target !== this.currentIndex && target >= 0 && target < this.slides.length) {
          this.goToSlide(target);
        }
      }
    });
  }

  nextSlide() {
    if (this.isTransitioning) return;
    if (this.currentIndex < this.slides.length - 1) {
      this.goToSlide(this.currentIndex + 1);
    }
  }

  prevSlide() {
    if (this.isTransitioning) return;
    if (this.currentIndex > 0) {
      this.goToSlide(this.currentIndex - 1);
    }
  }

  goToSlide(targetIndex) {
    if (targetIndex < 0 || targetIndex >= this.slides.length) return;
    if (this.isTransitioning) return;

    this.isTransitioning = true;
    const oldWrapper = this.viewport.querySelector(".slide-content-wrapper");

    if (oldWrapper) {
      // Smooth fade-out of current slide
      oldWrapper.classList.remove("slide-entering");
      oldWrapper.classList.add("slide-exiting");

      setTimeout(() => {
        this.currentIndex = targetIndex;
        this.renderSlide(this.currentIndex, true);
        this.isTransitioning = false;
      }, 220);
    } else {
      this.currentIndex = targetIndex;
      this.renderSlide(this.currentIndex, true);
      this.isTransitioning = false;
    }

    // Update URL hash for bookmarking
    window.location.hash = `#slide-${this.currentIndex}`;
    this.updateJumpDrawerSelection();
  }

  renderSlide(index, animate = true) {
    const slide = this.slides[index];
    this.updateHUD(slide, index);

    // Build Slide Content HTML
    let contentHtml = "";

    switch (slide.type) {
      case "intro":
        contentHtml = this.generateIntroHtml(slide);
        break;
      case "rules":
        contentHtml = this.generateRulesHtml(slide);
        break;
      case "mcq":
        contentHtml = this.generateMCQHtml(slide);
        break;
      case "logo":
        contentHtml = this.generateLogoRoundHtml(slide);
        break;
      case "spot_difference":
        contentHtml = this.generateSpotDiffHtml(slide);
        break;
      case "thank_you":
        contentHtml = this.generateThankYouHtml(slide);
        break;
    }

    const wrapper = document.createElement("div");
    wrapper.className = `slide-content-wrapper ${animate ? "slide-entering" : ""}`;
    wrapper.innerHTML = contentHtml;

    this.viewport.innerHTML = "";
    this.viewport.appendChild(wrapper);

    // Update button states
    if (this.btnPrev) this.btnPrev.disabled = (index === 0);
    if (this.btnNext) this.btnNext.disabled = (index === this.slides.length - 1);
  }

  updateHUD(slide, index) {
    // Header Round Indicator
    if (this.headerRoundText) {
      this.headerRoundText.textContent = slide.category || "THINKX 2026";
    }

    // Top-Right Question Counter
    if (slide.qNum) {
      const parts = slide.qNum.split("/");
      if (this.counterCurrent) this.counterCurrent.textContent = parts[0];
      if (this.counterTotal) this.counterTotal.textContent = parts[1] || "30";
    } else if (slide.type === "intro") {
      if (this.counterCurrent) this.counterCurrent.textContent = "START";
      if (this.counterTotal) this.counterTotal.textContent = "THINKX";
    } else if (slide.type === "rules") {
      if (this.counterCurrent) this.counterCurrent.textContent = "RULES";
      if (this.counterTotal) this.counterTotal.textContent = "GUIDE";
    } else if (slide.type === "thank_you") {
      if (this.counterCurrent) this.counterCurrent.textContent = "END";
      if (this.counterTotal) this.counterTotal.textContent = "FINISH";
    }

    // Footer Tag
    if (this.footerBrand) {
      this.footerBrand.textContent = slide.footerText || "THINKX • QUIZ";
    }
  }

  generateIntroHtml(slide) {
    return `
      <div class="intro-slide">
        <div class="intro-panel corner-ticks">
          <img src="assets/images/intellix-logo.png" alt="INTELLIX Logo" class="intro-logo-large anim-image" />
          <div class="intro-dept-tag anim-badge">${slide.badge}</div>
          <h1 class="intro-title anim-title">${slide.title}</h1>
          <h2 class="intro-subtitle anim-badge">${slide.subtitle}</h2>
          <div class="intro-divider-bar"></div>
          <p class="intro-topics anim-title">${slide.tagline}</p>
          <div class="intro-start-hint anim-badge">
            <span>PRESS</span>
            <span class="key-tag">SPACE</span>
            <span>OR</span>
            <span class="key-tag">ENTER</span>
            <span>TO BEGIN</span>
          </div>
        </div>
      </div>
    `;
  }

  generateRulesHtml(slide) {
    const rulesList = slide.rules.map((rule, idx) => `
      <div class="rule-item anim-rule" style="animation-delay: ${100 + idx * 45}ms">
        <span class="rule-num">${rule.num}.</span>
        <span class="rule-text">${rule.text}</span>
      </div>
    `).join("");

    return `
      <div class="rules-slide">
        <div class="rules-panel corner-ticks">
          <div class="rules-header-row">
            <div class="rules-title-group">
              <span class="rules-category-tag anim-badge">${slide.category}</span>
              <h1 class="rules-main-title anim-title">${slide.title}</h1>
            </div>
            <span class="key-tag anim-badge">AIML INTELLIX</span>
          </div>
          <div class="rules-grid">
            ${rulesList}
          </div>
        </div>
      </div>
    `;
  }

  generateMCQHtml(slide) {
    const optionsHtml = slide.options.map((opt, idx) => `
      <div class="option-card anim-option-${idx + 1}">
        <span class="option-key">${opt.key}</span>
        <span class="option-text">${opt.text}</span>
      </div>
    `).join("");

    return `
      <div class="question-slide">
        <div class="question-box corner-ticks">
          <div class="question-meta-bar">
            <span class="question-badge anim-badge">${slide.badge}</span>
            <span class="key-tag anim-badge">${slide.category}</span>
          </div>
          <h2 class="question-text anim-title">${slide.question}</h2>
        </div>
        <div class="options-grid">
          ${optionsHtml}
        </div>
      </div>
    `;
  }

  generateLogoRoundHtml(slide) {
    return `
      <div class="logo-round-slide">
        <div class="logo-question-header">
          <h2 class="logo-question-title anim-title">${slide.question}</h2>
        </div>
        <div class="logo-display-frame corner-ticks anim-image">
          <img src="${slide.image}" alt="${slide.question}" class="logo-image-element" />
        </div>
      </div>
    `;
  }

  generateSpotDiffHtml(slide) {
    return `
      <div class="spot-diff-slide">
        <div class="spot-diff-header">
          <h2 class="spot-diff-title anim-title">${slide.question}</h2>
          <span class="spot-diff-sub anim-badge">${slide.subPrompt}</span>
        </div>
        <div class="spot-diff-frame corner-ticks anim-image">
          <img src="${slide.image}" alt="${slide.question}" class="spot-diff-image" />
        </div>
      </div>
    `;
  }

  generateThankYouHtml(slide) {
    return `
      <div class="thankyou-slide">
        <div class="thankyou-panel corner-ticks">
          <img src="assets/images/intellix-logo.png" alt="INTELLIX Logo" class="thankyou-logo anim-image" />
          <h1 class="thankyou-title anim-title">${slide.title}</h1>
          <h2 class="thankyou-sub anim-badge">${slide.subtitle}</h2>
          <div class="intro-divider-bar"></div>
          <div class="thankyou-brand anim-title">${slide.brandText}</div>
          <div class="thankyou-dept anim-badge">${slide.footerText}</div>
        </div>
      </div>
    `;
  }

  buildJumpDrawer() {
    const container = document.getElementById("jump-grid-container");
    if (!container) return;

    let html = "";
    
    // Group slides
    const sections = [
      { title: "Intro & Guidelines", filter: (s) => s.type === "intro" || s.type === "rules" },
      { title: "Round 1: General Knowledge & Tech (Q01 - Q09)", filter: (s) => s.type === "mcq" },
      { title: "Round 2: Logo Round (Q10 - Q19)", filter: (s) => s.type === "logo" },
      { title: "Round 3: Spot The Difference (Q20 - Q30)", filter: (s) => s.type === "spot_difference" },
      { title: "Conclusion", filter: (s) => s.type === "thank_you" }
    ];

    sections.forEach(sec => {
      html += `<div class="jump-section-title">${sec.title}</div><div class="jump-grid">`;
      this.slides.forEach((s, idx) => {
        if (sec.filter(s)) {
          let label = s.qNum ? `Q ${s.qNum}` : (s.type === "intro" ? "Start" : (s.type === "rules" ? "Rules" : "Thank You"));
          html += `
            <button class="jump-btn" data-index="${idx}">
              ${label}
            </button>
          `;
        }
      });
      html += `</div>`;
    });

    container.innerHTML = html;

    // Attach click listeners to jump buttons
    container.querySelectorAll(".jump-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.dataset.index, 10);
        this.goToSlide(idx);
        this.toggleJumpDrawer(false);
      });
    });
  }

  updateJumpDrawerSelection() {
    const container = document.getElementById("jump-grid-container");
    if (!container) return;
    container.querySelectorAll(".jump-btn").forEach(btn => {
      const idx = parseInt(btn.dataset.index, 10);
      if (idx === this.currentIndex) {
        btn.classList.add("current");
      } else {
        btn.classList.remove("current");
      }
    });
  }

  toggleJumpDrawer(show) {
    if (!this.jumpDrawer) return;
    if (show === undefined) {
      this.jumpDrawer.classList.toggle("active");
    } else if (show) {
      this.jumpDrawer.classList.add("active");
    } else {
      this.jumpDrawer.classList.remove("active");
    }
    this.updateJumpDrawerSelection();
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      const docEl = document.documentElement;
      if (docEl.requestFullscreen) docEl.requestFullscreen();
      else if (docEl.webkitRequestFullscreen) docEl.webkitRequestFullscreen();
      else if (docEl.msRequestFullscreen) docEl.msRequestFullscreen();
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
      else if (document.msExitFullscreen) document.msExitFullscreen();
    }
  }
}

// Instantiate presentation controller after DOM is ready
window.addEventListener("DOMContentLoaded", () => {
  window.presentation = new PresentationController(QUIZ_DATA);
});
