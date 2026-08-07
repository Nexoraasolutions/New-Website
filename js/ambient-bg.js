/* ============================================================
   NEXORAA — Ambient Architectural & Smart Topology Background
   High-Performance 60FPS Canvas Ambient Canvas Engine
   ============================================================ */

(function () {
  'use strict';

  // Create canvas element dynamically if not present
  var canvas = document.getElementById('ambient-canvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'ambient-canvas';
    document.body.prepend(canvas);
  }

  var ctx = canvas.getContext('2d');
  if (!ctx) return;

  var width = 0;
  var height = 0;
  var dpr = window.devicePixelRatio || 1;

  // Mouse interaction state for ultra-subtle parallax
  var mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

  window.addEventListener('mousemove', function (e) {
    mouse.targetX = (e.clientX - width / 2) * 0.012;
    mouse.targetY = (e.clientY - height / 2) * 0.012;
  }, { passive: true });

  // Handle Resize
  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(dpr, dpr);
    initNodes();
  }

  // Network Nodes & Drifting Particles
  var nodes = [];
  var particles = [];
  var MAX_NODES = 24; // 20-30 nodes visible at any time
  var MAX_PARTICLES = 28;

  function initNodes() {
    nodes = [];
    particles = [];

    // Initialize Network Topology Nodes
    for (var i = 0; i < MAX_NODES; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        radius: 1.5 + Math.random() * 1.2,
        pulseAngle: Math.random() * Math.PI * 2,
        pulseSpeed: 0.015 + Math.random() * 0.02,
        opacity: 0.04 + Math.random() * 0.03
      });
    }

    // Initialize Floating Particles (dust drifting in showroom lighting)
    for (var j = 0; j < MAX_PARTICLES; j++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -0.1 - Math.random() * 0.18, // Gentle slow upward drift
        radius: 0.8 + Math.random() * 1.2,
        opacity: 0.03 + Math.random() * 0.03
      });
    }
  }

  // Main Render Loop
  function render() {
    ctx.clearRect(0, 0, width, height);

    // Smooth mouse lerp
    mouse.x += (mouse.targetX - mouse.x) * 0.04;
    mouse.y += (mouse.targetY - mouse.y) * 0.04;

    ctx.save();
    ctx.translate(mouse.x, mouse.y);

    // 1. Draw Architectural Network Topology Connections
    for (var i = 0; i < nodes.length; i++) {
      var n1 = nodes[i];
      for (var j = i + 1; j < nodes.length; j++) {
        var n2 = nodes[j];
        var dx = n2.x - n1.x;
        var dy = n2.y - n1.y;
        var dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 190) {
          var lineOpacity = (1 - dist / 190) * 0.045; // 3-5% opacity
          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.strokeStyle = 'rgba(0, 224, 255, ' + lineOpacity + ')';
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    // 2. Draw Network Nodes with Slow Pulsing Effect
    for (var k = 0; k < nodes.length; k++) {
      var node = nodes[k];
      node.x += node.vx;
      node.y += node.vy;

      // Bounce at viewport edges
      if (node.x < 0 || node.x > width) node.vx *= -1;
      if (node.y < 0 || node.y > height) node.vy *= -1;

      node.pulseAngle += node.pulseSpeed;
      var pulse = Math.sin(node.pulseAngle) * 0.02 + node.opacity;

      // Soft outer glow for node
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius * 2.8, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 224, 255, ' + (pulse * 0.35) + ')';
      ctx.fill();

      // Node core
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 224, 255, ' + pulse + ')';
      ctx.fill();
    }

    // 3. Draw Floating Drift Particles
    for (var p = 0; p < particles.length; p++) {
      var pt = particles[p];
      pt.x += pt.vx;
      pt.y += pt.vy;

      if (pt.y < -10) pt.y = height + 10;
      if (pt.x < -10) pt.x = width + 10;
      if (pt.x > width + 10) pt.x = -10;

      ctx.beginPath();
      ctx.arc(pt.x, pt.y, pt.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, ' + pt.opacity + ')';
      ctx.fill();
    }

    ctx.restore();
    requestAnimationFrame(render);
  }

  window.addEventListener('resize', resize);
  resize();
  requestAnimationFrame(render);
})();
