/* ============================================================
   NEXORAA — Interactive Core Engine & Layered Smart Room Motion
   ============================================================ */

(function () {
  'use strict';

  var PHONE = '8133942204';
  var WA = '918133942204';
  var MAIL = 'chirag@nexorahomesolution.com';

  /* ---------- Nav & Header Scroll ---------- */
  var hdr = document.getElementById('hdr');
  var mobileToggle = document.getElementById('mobile-toggle');
  var navLinks = document.getElementById('nav-links');

  window.addEventListener('scroll', function () {
    if (!hdr) return;
    if (window.scrollY > 20) {
      hdr.classList.add('stuck');
    } else {
      hdr.classList.remove('stuck');
    }
  });

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', function () {
      navLinks.classList.toggle('active');
      var isExpanded = navLinks.classList.contains('active');
      mobileToggle.setAttribute('aria-expanded', isExpanded);
    });
  }

  // Highlight active menu link based on URL
  var currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ---------- Scroll Reveal Animations ---------- */
  var observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.12
  };

  var revealObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal-up').forEach(function (el) {
    revealObserver.observe(el);
  });

  /* ---------- INTERACTIVE HERO CONTROL DEMO & PARALLAX BACKDROP ---------- */
  var heroBgImg = document.querySelector('.hero-bg-img');

  var lightSlider = document.getElementById('light-slider');
  var lightVal = document.getElementById('light-val');
  var lightSub = document.getElementById('light-sub');

  var blindSlider = document.getElementById('blind-slider');
  var blindVal = document.getElementById('blind-val');
  var blindSub = document.getElementById('blind-sub');

  var tempVal = document.getElementById('temp-val');
  var tempMinus = document.getElementById('temp-minus');
  var tempPlus = document.getElementById('temp-plus');
  var currentTemp = 22;

  var lockBtn = document.getElementById('lock-btn');
  var secBtn = document.getElementById('sec-btn');
  var playBtn = document.getElementById('play-btn');
  var audioSub = document.getElementById('audio-sub');
  var isPlaying = false;

  var currentColorTemp = '2700K';

  // Ambient Lighting Slider UI Demo
  if (lightSlider) {
    lightSlider.addEventListener('input', function () {
      var val = this.value;
      if (lightVal) lightVal.textContent = val + '%';
      if (lightSub) {
        if (val == 0) lightSub.textContent = 'Lights Off • 0%';
        else if (val <= 15) lightSub.textContent = 'Cinema Ambience • 15%';
        else if (val <= 40) lightSub.textContent = 'Relaxed Evening • 40%';
        else if (val <= 75) lightSub.textContent = 'Main Cove • ' + currentColorTemp;
        else lightSub.textContent = 'Full Illumination • ' + currentColorTemp;
      }
    });
  }

  // Motorized Blinds Slider UI Demo
  if (blindSlider) {
    blindSlider.addEventListener('input', function () {
      var val = this.value;
      if (blindVal) blindVal.textContent = val + '%';
      if (blindSub) {
        if (val == 0) blindSub.textContent = 'Blackout Position';
        else if (val == 50) blindSub.textContent = 'Half Open Privacy';
        else if (val == 100) blindSub.textContent = 'Fully Open Daylight';
        else if (val < 50) blindSub.textContent = 'Filter Privacy Shades';
        else blindSub.textContent = 'Daylight Entry';
      }
    });
  }

  // Color Temp Preset Buttons UI Demo
  document.querySelectorAll('.k-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.k-btn').forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      currentColorTemp = this.getAttribute('data-k');
      if (lightSlider) lightSlider.dispatchEvent(new Event('input'));
    });
  });

  // Temperature Adjuster UI Demo
  if (tempMinus) {
    tempMinus.addEventListener('click', function () {
      if (currentTemp > 16) {
        currentTemp--;
        if (tempVal) tempVal.textContent = currentTemp + '°C';
      }
    });
  }

  if (tempPlus) {
    tempPlus.addEventListener('click', function () {
      if (currentTemp < 30) {
        currentTemp++;
        if (tempVal) tempVal.textContent = currentTemp + '°C';
      }
    });
  }

  // Smart Lock UI Demo
  if (lockBtn) {
    lockBtn.addEventListener('click', function () {
      var isLocked = this.classList.contains('locked');
      if (isLocked) {
        this.classList.remove('locked');
        this.classList.add('unlocked');
        this.querySelector('.dash-lock-status').textContent = 'Unlocked';
      } else {
        this.classList.remove('unlocked');
        this.classList.add('locked');
        this.querySelector('.dash-lock-status').textContent = 'Locked';
      }
    });
  }

  // Security Status Toggle UI Demo
  if (secBtn) {
    secBtn.addEventListener('click', function () {
      var isActive = this.classList.contains('active');
      if (isActive) {
        this.classList.remove('active');
        this.classList.add('standby');
        this.querySelector('.dash-sec-status').textContent = 'Standby';
      } else {
        this.classList.remove('standby');
        this.classList.add('active');
        this.querySelector('.dash-sec-status').textContent = 'Active';
      }
    });
  }

  // Media Play/Pause UI Demo
  if (playBtn) {
    playBtn.addEventListener('click', function () {
      isPlaying = !isPlaying;
      if (isPlaying) {
        this.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';
        if (audioSub) audioSub.textContent = 'Playing: Bang & Olufsen Spatial Lounge';
      } else {
        this.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
        if (audioSub) audioSub.textContent = 'Paused • Tap to Play';
      }
    });
  }

  // Preset Scenes Handler UI Demo
  document.querySelectorAll('.dash-scenes .scene-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.dash-scenes .scene-btn').forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      var scene = this.getAttribute('data-scene');

      if (scene === 'morning') {
        currentColorTemp = '3000K';
        document.querySelectorAll('.k-btn').forEach(function (b) {
          b.classList.toggle('active', b.getAttribute('data-k') === '3000K');
        });
        if (lightSlider) lightSlider.value = 80;
        if (blindSlider) blindSlider.value = 75;
        currentTemp = 24;
      } else if (scene === 'night') {
        currentColorTemp = '2700K';
        document.querySelectorAll('.k-btn').forEach(function (b) {
          b.classList.toggle('active', b.getAttribute('data-k') === '2700K');
        });
        if (lightSlider) lightSlider.value = 70;
        if (blindSlider) blindSlider.value = 20;
        currentTemp = 22;
      } else if (scene === 'cinema') {
        currentColorTemp = '2700K';
        document.querySelectorAll('.k-btn').forEach(function (b) {
          b.classList.toggle('active', b.getAttribute('data-k') === '2700K');
        });
        if (lightSlider) lightSlider.value = 15;
        if (blindSlider) blindSlider.value = 0;
        currentTemp = 21;
      } else if (scene === 'away') {
        if (lightSlider) lightSlider.value = 0;
        if (blindSlider) blindSlider.value = 0;
        currentTemp = 26;
        if (lockBtn) {
          lockBtn.className = 'dash-lock-btn locked';
          lockBtn.querySelector('.dash-lock-status').textContent = 'Locked';
        }
        if (secBtn) {
          secBtn.className = 'dash-sec-btn active';
          secBtn.querySelector('.dash-sec-status').textContent = 'Active';
        }
      }

      if (tempVal) tempVal.textContent = currentTemp + '°C';
      if (lightSlider) lightSlider.dispatchEvent(new Event('input'));
      if (blindSlider) blindSlider.dispatchEvent(new Event('input'));
    });
  });

  // Parallax Mouse Depth effect on Dashboard UI Card & Hero Background Image
  var heroStage = document.querySelector('.hero-stage');
  var smartDash = document.querySelector('.smart-dashboard');
  if (heroStage) {
    heroStage.addEventListener('mousemove', function (e) {
      var rect = heroStage.getBoundingClientRect();
      var x = e.clientX - rect.left - rect.width / 2;
      var y = e.clientY - rect.top - rect.height / 2;

      if (smartDash) {
        smartDash.style.transform = 'rotateY(' + (x * 0.012) + 'deg) rotateX(' + (-y * 0.012) + 'deg) translateY(-4px)';
      }
      if (heroBgImg) {
        heroBgImg.style.transform = 'scale(1.03) translate(' + (x * 0.008) + 'px, ' + (y * 0.008) + 'px)';
      }
    });

    heroStage.addEventListener('mouseleave', function () {
      if (smartDash) {
        smartDash.style.transform = 'rotateY(0deg) rotateX(0deg) translateY(0px)';
      }
      if (heroBgImg) {
        heroBgImg.style.transform = 'scale(1.02) translate(0px, 0px)';
      }
    });
  }

  /* ---------- Projects Gallery Filters ---------- */
  var filterBtns = document.querySelectorAll('.filter-btn');
  var projectCards = document.querySelectorAll('.project-card-item');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      var filterValue = this.getAttribute('data-filter');

      projectCards.forEach(function (card) {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'block';
          setTimeout(function () { card.style.opacity = '1'; card.style.transform = 'scale(1)'; }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(function () { card.style.display = 'none'; }, 300);
        }
      });
    });
  });

  /* ---------- FAQ Accordion ---------- */
  document.querySelectorAll('.faq-head').forEach(function (head) {
    head.addEventListener('click', function () {
      var item = this.parentElement;
      var isActive = item.classList.contains('active');

      document.querySelectorAll('.faq-item').forEach(function (i) { i.classList.remove('active'); });

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  /* ---------- Form Handling & WhatsApp Builder ---------- */
  var enquiryForm = document.getElementById('enquiry-form');
  if (enquiryForm) {
    enquiryForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('form-name') ? document.getElementById('form-name').value : '';
      var phone = document.getElementById('form-phone') ? document.getElementById('form-phone').value : '';
      var service = document.getElementById('form-service') ? document.getElementById('form-service').value : 'Smart Home Automation';
      var msg = document.getElementById('form-msg') ? document.getElementById('form-msg').value : '';

      var text = 'Hi Nexoraa Team,\n\n'
        + 'I would like to inquire about a smart home setup.\n\n'
        + 'Name: ' + name + '\n'
        + 'Phone: ' + phone + '\n'
        + 'Service Interest: ' + service + '\n'
        + (msg ? 'Notes: ' + msg + '\n' : '');

      window.open('https://wa.me/' + WA + '?text=' + encodeURIComponent(text), '_blank');
    });
  }

  var yrSpan = document.getElementById('yr');
  if (yrSpan) {
    yrSpan.textContent = new Date().getFullYear();
  }

  /* ---------- Ambient Cursor Luminance System ---------- */
  function initAmbientCursor() {
    // Mobile, touch, and reduced-motion checks
    if (window.innerWidth <= 1024) return;
    if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia && window.matchMedia('(hover: none)').matches) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if ('ontouchstart' in window && !window.matchMedia('(pointer: fine)').matches) return;

    var glowEl = document.createElement('div');
    glowEl.className = 'cursor-ambient-glow';
    document.body.appendChild(glowEl);

    var targetX = -100;
    var targetY = -100;
    var currentX = -100;
    var currentY = -100;
    var isInitialized = false;
    var isHovering = false;
    var clickTimeout = null;

    function updatePosition() {
      if (!isInitialized) return;

      // Tight, responsive positioning following cursor precisely (lerp 0.45 = tight coupling, zero trailing/delayed animation)
      currentX += (targetX - currentX) * 0.45;
      currentY += (targetY - currentY) * 0.45;

      if (Math.abs(targetX - currentX) < 0.05) currentX = targetX;
      if (Math.abs(targetY - currentY) < 0.05) currentY = targetY;

      glowEl.style.transform = 'translate3d(' + currentX.toFixed(1) + 'px, ' + currentY.toFixed(1) + 'px, 0)';

      requestAnimationFrame(updatePosition);
    }

    window.addEventListener('pointermove', function (e) {
      if (e.pointerType === 'touch') {
        glowEl.classList.remove('is-visible');
        return;
      }

      targetX = e.clientX;
      targetY = e.clientY;

      if (!isInitialized) {
        currentX = targetX;
        currentY = targetY;
        isInitialized = true;
        glowEl.classList.add('is-visible');
        requestAnimationFrame(updatePosition);
      } else {
        glowEl.classList.add('is-visible');
      }
    }, { passive: true });

    document.addEventListener('mouseleave', function () {
      glowEl.classList.remove('is-visible');
    });

    document.addEventListener('mouseenter', function () {
      glowEl.classList.add('is-visible');
    });

    // Delegated hover detection for interactive elements
    var interactiveSelector = 'a, button, .btn, .btn-p, .card, .service-card, .project-card, .partner-logo-card, .ecosystem-cat-card, input, select, textarea, label, summary, [role="button"], [tabindex]:not([tabindex="-1"])';

    document.addEventListener('pointerover', function (e) {
      if (!e.target || e.target === document) return;
      var target = e.target;
      var interactiveEl = target.closest ? target.closest(interactiveSelector) : null;

      if (interactiveEl || (window.getComputedStyle && window.getComputedStyle(target).cursor === 'pointer')) {
        isHovering = true;
        glowEl.classList.add('is-hovering');
      }
    }, { passive: true });

    document.addEventListener('pointerout', function (e) {
      if (!e.target || e.target === document) return;
      var target = e.target;
      var related = e.relatedTarget;

      var interactiveEl = target.closest ? target.closest(interactiveSelector) : null;
      if (interactiveEl) {
        var relatedInteractive = related && related.closest ? related.closest(interactiveSelector) : null;
        if (!relatedInteractive) {
          isHovering = false;
          glowEl.classList.remove('is-hovering');
        }
      }
    }, { passive: true });

    // Tiny momentary brightness bump on click (no ripple, no expanding circle)
    window.addEventListener('mousedown', function (e) {
      if (e.button !== 0) return;
      if (window.innerWidth <= 1024) return;
      if (!glowEl.classList.contains('is-visible')) return;

      glowEl.classList.add('is-clicking');

      if (clickTimeout) clearTimeout(clickTimeout);
      clickTimeout = setTimeout(function () {
        glowEl.classList.remove('is-clicking');
      }, 150);
    }, { passive: true });

    window.addEventListener('resize', function () {
      if (window.innerWidth <= 1024) {
        glowEl.classList.remove('is-visible');
      }
    }, { passive: true });
  }

  // Initialize Ambient Cursor Luminance
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAmbientCursor);
  } else {
    initAmbientCursor();
  }

})();



