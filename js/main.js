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
  });  /* ---------- Global Ambient Background Pointer Light System ---------- */
  function initAmbientBackgroundLight() {
    // Mobile, touch, and reduced-motion checks
    if (window.innerWidth <= 1024) return;
    if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia && window.matchMedia('(hover: none)').matches) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var root = document.documentElement;
    var targetX = 50;
    var targetY = 50;
    var currentX = 50;
    var currentY = 50;
    var isInitialized = false;

    function updatePointerLight() {
      if (!isInitialized) return;

      // Slight movement easing (lerp factor 0.22)
      currentX += (targetX - currentX) * 0.22;
      currentY += (targetY - currentY) * 0.22;

      root.style.setProperty('--mouse-x', currentX.toFixed(2) + '%');
      root.style.setProperty('--mouse-y', currentY.toFixed(2) + '%');

      requestAnimationFrame(updatePointerLight);
    }

    window.addEventListener('pointermove', function (e) {
      if (e.pointerType === 'touch') return;

      targetX = (e.clientX / window.innerWidth) * 100;
      targetY = (e.clientY / window.innerHeight) * 100;

      if (!isInitialized) {
        currentX = targetX;
        currentY = targetY;
        isInitialized = true;
        root.style.setProperty('--mouse-x', currentX.toFixed(2) + '%');
        root.style.setProperty('--mouse-y', currentY.toFixed(2) + '%');
        requestAnimationFrame(updatePointerLight);
      }
    }, { passive: true });
  }

  /* ---------- Upgraded Hero Smart-Home Control Card Engine ---------- */
  function initHeroSmartCard() {
    var lightSlider = document.getElementById('light-slider');
    var lightVal = document.getElementById('light-val');
    var lightSub = document.getElementById('light-sub');

    var blindSlider = document.getElementById('blind-slider');
    var blindVal = document.getElementById('blind-val');
    var blindSub = document.getElementById('blind-sub');

    var tempVal = document.getElementById('temp-val');
    var tempMinus = document.getElementById('temp-minus');
    var tempPlus = document.getElementById('temp-plus');

    var lockBtn = document.getElementById('lock-btn');
    var secBtn = document.getElementById('sec-btn');
    var playBtn = document.getElementById('play-btn');
    var audioSub = document.getElementById('audio-sub');

    if (!lightSlider && !blindSlider) return;

    // Current State Variables
    var currentLight = parseInt(lightSlider ? lightSlider.value : 75, 10);
    var currentBlind = parseInt(blindSlider ? blindSlider.value : 10, 10);
    var currentTemp = 22;
    var currentColorTemp = '2700K';
    var isPlaying = false;
    var activeAnimation = null;

    // Scene Presets according to requirements
    var SCENE_PRESETS = {
      morning: {
        light: 70,
        k: '3000K',
        blind: 80,
        temp: 24,
        lock: 'locked',
        sec: 'home',
        audio: 'standby',
        audioText: 'Standby • Morning Playlist Ready'
      },
      night: {
        light: 75,
        k: '2700K',
        blind: 10,
        temp: 22,
        lock: 'locked',
        sec: 'active',
        audio: 'standby',
        audioText: 'Standby • Soft Evening Ambience'
      },
      cinema: {
        light: 15,
        k: '2700K',
        blind: 0,
        temp: 21,
        lock: 'locked',
        sec: 'active',
        audio: 'playing',
        audioText: 'Playing: B&O Cinema Surround'
      },
      away: {
        light: 0,
        k: '2700K',
        blind: 0,
        temp: 26,
        lock: 'locked',
        sec: 'away',
        audio: 'off',
        audioText: 'Audio Off • System Secured'
      }
    };

    // Subsystem UI Updaters
    function updateLightUI() {
      if (lightVal) lightVal.textContent = Math.round(currentLight) + '%';
      if (lightSub) {
        if (currentLight === 0) lightSub.textContent = 'Lights Off • 0%';
        else if (currentLight <= 20) lightSub.textContent = 'Cinema Ambience • ' + currentColorTemp;
        else if (currentLight <= 50) lightSub.textContent = 'Relaxed Evening • ' + currentColorTemp;
        else if (currentLight <= 80) lightSub.textContent = 'Main Cove • ' + currentColorTemp;
        else lightSub.textContent = 'Full Illumination • ' + currentColorTemp;
      }
      if (lightSlider) lightSlider.value = Math.round(currentLight);
    }

    function updateBlindUI() {
      if (blindVal) blindVal.textContent = Math.round(currentBlind) + '%';
      if (blindSub) {
        if (currentBlind === 0) blindSub.textContent = 'Blackout Position (Closed)';
        else if (currentBlind >= 80) blindSub.textContent = 'Fully Open Daylight';
        else if (currentBlind >= 40) blindSub.textContent = 'Half Open Privacy';
        else blindSub.textContent = 'Filter Privacy Shades';
      }
      if (blindSlider) blindSlider.value = Math.round(currentBlind);
    }

    function updateTempUI() {
      if (tempVal) tempVal.textContent = Math.round(currentTemp) + '°C';
    }

    function updateKelvinButtons(k) {
      currentColorTemp = k;
      document.querySelectorAll('.k-btn').forEach(function (btn) {
        btn.classList.toggle('active', btn.getAttribute('data-k') === k);
      });
      updateLightUI();
    }

    function updateLockUI(state) {
      if (!lockBtn) return;
      var statusEl = lockBtn.querySelector('.dash-lock-status');
      if (state === 'locked') {
        lockBtn.className = 'dash-lock-btn locked';
        if (statusEl) statusEl.textContent = 'Locked';
      } else {
        lockBtn.className = 'dash-lock-btn unlocked';
        if (statusEl) statusEl.textContent = 'Unlocked';
      }
    }

    function updateSecUI(state) {
      if (!secBtn) return;
      var statusEl = secBtn.querySelector('.dash-sec-status');
      if (state === 'active' || state === 'away') {
        secBtn.className = 'dash-sec-btn active';
        if (statusEl) statusEl.textContent = state === 'away' ? 'Away/Active' : 'Active';
      } else if (state === 'home') {
        secBtn.className = 'dash-sec-btn active';
        if (statusEl) statusEl.textContent = 'Home';
      } else {
        secBtn.className = 'dash-sec-btn standby';
        if (statusEl) statusEl.textContent = 'Standby';
      }
    }

    function updateAudioUI(state, customText) {
      if (!playBtn) return;
      if (state === 'playing') {
        isPlaying = true;
        playBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';
      } else {
        isPlaying = false;
        playBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
      }
      if (audioSub) {
        audioSub.textContent = customText || (isPlaying ? 'Playing: Bang & Olufsen Spatial Lounge' : 'Standby • Tap to Play');
      }
    }

    // Smooth 600ms Transition Animator for Scene Selection
    function animateToScene(preset) {
      if (activeAnimation) cancelAnimationFrame(activeAnimation);

      var startLight = currentLight;
      var startBlind = currentBlind;
      var startTemp = currentTemp;

      var targetLight = preset.light;
      var targetBlind = preset.blind;
      var targetTemp = preset.temp;

      var startTime = null;
      var duration = 600; // 600ms transition duration

      // Update discrete Kelvin, lock, security, audio immediately
      updateKelvinButtons(preset.k);
      updateLockUI(preset.lock);
      updateSecUI(preset.sec);
      updateAudioUI(preset.audio, preset.audioText);

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var elapsed = timestamp - startTime;
        var progress = Math.min(elapsed / duration, 1);

        // Cubic easing out
        var ease = 1 - Math.pow(1 - progress, 3);

        currentLight = startLight + (targetLight - startLight) * ease;
        currentBlind = startBlind + (targetBlind - startBlind) * ease;
        currentTemp = startTemp + (targetTemp - startTemp) * ease;

        updateLightUI();
        updateBlindUI();
        updateTempUI();

        if (progress < 1) {
          activeAnimation = requestAnimationFrame(step);
        } else {
          activeAnimation = null;
        }
      }

      activeAnimation = requestAnimationFrame(step);
    }

    // Scene Buttons Event Listeners
    document.querySelectorAll('.dash-scenes .scene-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.dash-scenes .scene-btn').forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');
        var sceneName = this.getAttribute('data-scene');
        if (SCENE_PRESETS[sceneName]) {
          animateToScene(SCENE_PRESETS[sceneName]);
        }
      });
    });

    // Manual Override Listeners
    if (lightSlider) {
      lightSlider.addEventListener('input', function () {
        currentLight = parseInt(this.value, 10);
        updateLightUI();
      });
    }

    if (blindSlider) {
      blindSlider.addEventListener('input', function () {
        currentBlind = parseInt(this.value, 10);
        updateBlindUI();
      });
    }

    document.querySelectorAll('.k-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var k = this.getAttribute('data-k');
        updateKelvinButtons(k);
      });
    });

    if (tempMinus) {
      tempMinus.addEventListener('click', function () {
        if (currentTemp > 16) {
          currentTemp = Math.round(currentTemp) - 1;
          updateTempUI();
        }
      });
    }

    if (tempPlus) {
      tempPlus.addEventListener('click', function () {
        if (currentTemp < 30) {
          currentTemp = Math.round(currentTemp) + 1;
          updateTempUI();
        }
      });
    }

    if (lockBtn) {
      lockBtn.addEventListener('click', function () {
        var isCurrentlyLocked = this.classList.contains('locked');
        updateLockUI(isCurrentlyLocked ? 'unlocked' : 'locked');
      });
    }

    if (secBtn) {
      secBtn.addEventListener('click', function () {
        var isCurrentlyActive = this.classList.contains('active');
        updateSecUI(isCurrentlyActive ? 'standby' : 'active');
      });
    }

    if (playBtn) {
      playBtn.addEventListener('click', function () {
        updateAudioUI(isPlaying ? 'standby' : 'playing');
      });
    }
  }

  // Parallax Mouse Depth effect on Dashboard UI Card & Hero Background Image
  var heroStage = document.querySelector('.hero-stage');
  var smartDash = document.querySelector('.smart-dashboard');
  var heroBgImg = document.querySelector('.hero-bg-img');

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
        heroBgImg.style.transform = 'scale(1) translate(0px, 0px)';
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

  // Initialize Engines on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initAmbientBackgroundLight();
      initHeroSmartCard();
    });
  } else {
    initAmbientBackgroundLight();
    initHeroSmartCard();
  }

})();
