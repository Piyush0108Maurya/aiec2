// ==========================================
// AIEC IITM - Advanced AI Animations
// Using GSAP, Three.js, and Custom Effects
// ==========================================

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// ==========================================
// 1. LOADER WITH PROGRESS ANIMATION
// ==========================================
let progress = 0;
const loader = document.getElementById("loader");
const progressBar = document.querySelector(".progress");
const progressGlow = document.querySelector(".progress-glow");
const percentageText = document.querySelector(".percentage");
const nn = document.getElementById("nn");
const ml = document.getElementById("ml");
const ai = document.getElementById("ai");

const progressInterval = setInterval(() => {
  progress += 2;
  progressBar.style.width = progress + "%";
  if (progressGlow) progressGlow.style.width = progress + "%";
  percentageText.textContent = progress + "%";

  if (progress > 20) nn.textContent = "Active";
  if (progress > 50) ml.textContent = "Initializing";
  if (progress > 80) ai.textContent = "Online";

  if (progress >= 100) {
    clearInterval(progressInterval);
    setTimeout(() => {
      gsap.to(loader, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          loader.style.display = "none";
          document.body.style.overflow = "auto";
          initAnimations();
        }
      });
    }, 500);
  }
}, 80);

// ==========================================
// 2. NAVBAR SCROLL EFFECTS
// ==========================================
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Mobile menu toggle
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}

// Close menu when link clicked
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
  });
});

// ==========================================
// 3. TYPING EFFECT
// ==========================================
const typingText = document.querySelector(".typing-text");
const words = ["Artificial Intelligence", "Machine Learning", "Deep Learning", "Neural Networks", "Future Technology"];
let wordIndex = 0, charIndex = 0;

function type() {
  if (charIndex < words[wordIndex].length) {
    typingText.textContent += words[wordIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, 80);
  } else {
    setTimeout(erase, 2000);
  }
}

function erase() {
  if (charIndex > 0) {
    typingText.textContent = words[wordIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, 40);
  } else {
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(type, 300);
  }
}

setTimeout(type, 1000);

// ==========================================
// 4. ENHANCED 3D GLOBE WITH NEURAL NETWORKS
// ==========================================
const canvas = document.getElementById("globeCanvas");
if (canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    canvas.offsetWidth / canvas.offsetHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  // Main Globe
  const geometry = new THREE.SphereGeometry(2.5, 64, 64);
  const material = new THREE.MeshBasicMaterial({
    color: 0x7b2ff7,
    wireframe: true,
    transparent: true,
    opacity: 1
  });
  const globe = new THREE.Mesh(geometry, material);
  scene.add(globe);

  // Inner Glow Sphere
  const glowGeometry = new THREE.SphereGeometry(2.4, 32, 32);
  const glowMaterial = new THREE.MeshBasicMaterial({
    color: 0x00f6ff,
    transparent: true,
    opacity: 0.1,
    side: THREE.BackSide
  });
  const glowSphere = new THREE.Mesh(glowGeometry, glowMaterial);
  scene.add(glowSphere);

  // Orbiting Particles (Data Nodes)
  const orbitParticles = [];
  const orbitCount = 50;
  const orbitGeometry = new THREE.SphereGeometry(0.08, 16, 16);
  
  for (let i = 0; i < orbitCount; i++) {
    const particleMaterial = new THREE.MeshBasicMaterial({
      color: Math.random() > 0.5 ? 0x00f6ff : 0x7b2ff7
    });
    const particle = new THREE.Mesh(orbitGeometry, particleMaterial);

    const radius = 3 + Math.random() * 1.5;
    const angle = Math.random() * Math.PI * 2;
    const yAngle = Math.random() * Math.PI;

    particle.userData = {
      radius,
      angle,
      yAngle,
      speed: 0.003 + Math.random() * 0.01
    };

    scene.add(particle);
    orbitParticles.push(particle);
  }

  // Neural Network Connections
  const connectionLines = [];
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x00f6ff,
    transparent: true,
    opacity: 0.3
  });

  function createConnection(p1, p2) {
    const points = [p1.position.clone(), p2.position.clone()];
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(lineGeometry, lineMaterial);
    scene.add(line);
    return { line, p1, p2 };
  }

  // Create connections between nearby particles
  for (let i = 0; i < orbitParticles.length; i++) {
    for (let j = i + 1; j < orbitParticles.length; j++) {
      if (Math.random() > 0.95) {
        connectionLines.push(createConnection(orbitParticles[i], orbitParticles[j]));
      }
    }
  }

  // Data Streams (Flowing Lines)
  const streamCount = 8;
  const streams = [];
  
  for (let i = 0; i < streamCount; i++) {
    const streamPoints = [];
    const streamLength = 20;
    
    for (let j = 0; j < streamLength; j++) {
      streamPoints.push(new THREE.Vector3(0, 0, 0));
    }
    
    const streamGeometry = new THREE.BufferGeometry().setFromPoints(streamPoints);
    const streamMaterial = new THREE.LineBasicMaterial({
      color: 0x00f6ff,
      transparent: true,
      opacity: 0.6
    });
    const stream = new THREE.Line(streamGeometry, streamMaterial);
    scene.add(stream);
    
    streams.push({
      line: stream,
      angle: Math.random() * Math.PI * 2,
      yAngle: Math.random() * Math.PI,
      speed: 0.02 + Math.random() * 0.03,
      radius: 2.8
    });
  }

  // Animation Loop
  let time = 0;
  function animate() {
    requestAnimationFrame(animate);
    time += 0.01;

    // Rotate globe
    globe.rotation.y += 0.001;
    globe.rotation.x = Math.sin(time * 0.3) * 0.1;

    // Pulse glow
    glowSphere.scale.set(
      1 + Math.sin(time * 2) * 0.05,
      1 + Math.sin(time * 2) * 0.05,
      1 + Math.sin(time * 2) * 0.05
    );

    // Move orbiting particles
    orbitParticles.forEach(p => {
      p.userData.angle += p.userData.speed;

      const x = p.userData.radius * Math.cos(p.userData.angle) * Math.sin(p.userData.yAngle);
      const y = p.userData.radius * Math.cos(p.userData.yAngle);
      const z = p.userData.radius * Math.sin(p.userData.angle) * Math.sin(p.userData.yAngle);

      p.position.set(x, y, z);

      // Pulse particle size
      const scale = 1 + Math.sin(time * 3 + p.userData.angle) * 0.3;
      p.scale.set(scale, scale, scale);
    });

    // Update neural connections
    connectionLines.forEach(conn => {
      const positions = conn.line.geometry.attributes.position.array;
      positions[0] = conn.p1.position.x;
      positions[1] = conn.p1.position.y;
      positions[2] = conn.p1.position.z;
      positions[3] = conn.p2.position.x;
      positions[4] = conn.p2.position.y;
      positions[5] = conn.p2.position.z;
      conn.line.geometry.attributes.position.needsUpdate = true;

      // Pulse connection opacity
      conn.line.material.opacity = 0.2 + Math.sin(time * 2) * 0.1;
    });

    // Animate data streams
    streams.forEach(stream => {
      stream.angle += stream.speed;
      const positions = stream.line.geometry.attributes.position.array;

      for (let i = positions.length - 3; i >= 3; i -= 3) {
        positions[i] = positions[i - 3];
        positions[i + 1] = positions[i - 2];
        positions[i + 2] = positions[i - 1];
      }

      const x = stream.radius * Math.cos(stream.angle) * Math.sin(stream.yAngle);
      const y = stream.radius * Math.cos(stream.yAngle);
      const z = stream.radius * Math.sin(stream.angle) * Math.sin(stream.yAngle);

      positions[0] = x;
      positions[1] = y;
      positions[2] = z;

      stream.line.geometry.attributes.position.needsUpdate = true;
    });

    renderer.render(scene, camera);
  }
  animate();

  // Handle resize
  window.addEventListener('resize', () => {
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });
}

// ==========================================
// 5. NEURAL NETWORK BACKGROUND
// ==========================================
const neuralCanvas = document.getElementById("neural-bg");
if (neuralCanvas) {
  const ctx = neuralCanvas.getContext("2d");
  neuralCanvas.width = window.innerWidth;
  neuralCanvas.height = window.innerHeight;

  const neurons = [];
  const neuronCount = 80;

  for (let i = 0; i < neuronCount; i++) {
    neurons.push({
      x: Math.random() * neuralCanvas.width,
      y: Math.random() * neuralCanvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 1
    });
  }

  function drawNeuralNetwork() {
    ctx.clearRect(0, 0, neuralCanvas.width, neuralCanvas.height);

    // Draw connections
    ctx.strokeStyle = "rgba(0, 246, 255, 0.15)";
    ctx.lineWidth = 1;

    for (let i = 0; i < neurons.length; i++) {
      for (let j = i + 1; j < neurons.length; j++) {
        const dx = neurons[i].x - neurons[j].x;
        const dy = neurons[i].y - neurons[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          ctx.beginPath();
          ctx.moveTo(neurons[i].x, neurons[i].y);
          ctx.lineTo(neurons[j].x, neurons[j].y);
          ctx.globalAlpha = 1 - distance / 150;
          ctx.stroke();
        }
      }
    }

    // Draw neurons
    ctx.globalAlpha = 1;
    neurons.forEach(neuron => {
      ctx.beginPath();
      ctx.arc(neuron.x, neuron.y, neuron.radius, 0, Math.PI * 2);
      ctx.fillStyle = "#00f6ff";
      ctx.shadowBlur = 10;
      ctx.shadowColor = "#00f6ff";
      ctx.fill();
      ctx.shadowBlur = 0;

      // Move neurons
      neuron.x += neuron.vx;
      neuron.y += neuron.vy;

      if (neuron.x < 0 || neuron.x > neuralCanvas.width) neuron.vx *= -1;
      if (neuron.y < 0 || neuron.y > neuralCanvas.height) neuron.vy *= -1;
    });

    requestAnimationFrame(drawNeuralNetwork);
  }
  drawNeuralNetwork();

  window.addEventListener("resize", () => {
    neuralCanvas.width = window.innerWidth;
    neuralCanvas.height = window.innerHeight;
  });
}

// ==========================================
// 6. MATRIX RAIN EFFECT
// ==========================================
const matrixCanvas = document.getElementById("matrix-rain");
if (matrixCanvas) {
  const mCtx = matrixCanvas.getContext("2d");
  matrixCanvas.width = window.innerWidth;
  matrixCanvas.height = window.innerHeight;

  const characters = "01アイウエオカキクケコサシスセソタチツテトナニヌネノ";
  const fontSize = 15;
  const columns = matrixCanvas.width / fontSize;
  const drops = Array(Math.floor(columns)).fill(1);

  function drawMatrix() {
    mCtx.fillStyle = "rgba(0, 0, 0, 0.05)";
    mCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

    mCtx.fillStyle = "#00f6ff";
    mCtx.font = fontSize + "px monospace";

    drops.forEach((y, i) => {
      const text = characters[Math.floor(Math.random() * characters.length)];
      const x = i * fontSize;

      mCtx.fillText(text, x, y * fontSize);

      if (y * fontSize > matrixCanvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    });
  }

  setInterval(drawMatrix, 50);

  window.addEventListener("resize", () => {
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;
  });
}

// ==========================================
// 7. HERO PARTICLES
// ==========================================
const heroParticles = document.getElementById("hero-particles");
if (heroParticles) {
  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.style.position = "absolute";
    particle.style.width = Math.random() * 3 + 1 + "px";
    particle.style.height = particle.style.width;
    particle.style.background = Math.random() > 0.5 ? "#00f6ff" : "#7b2ff7";
    particle.style.borderRadius = "50%";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.opacity = Math.random() * 0.5 + 0.3;
    particle.style.boxShadow = `0 0 ${Math.random() * 20 + 10}px currentColor`;
    
    heroParticles.appendChild(particle);

    gsap.to(particle, {
      y: Math.random() * 200 - 100,
      x: Math.random() * 200 - 100,
      duration: Math.random() * 10 + 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }
}

// ==========================================
// 8. GSAP SCROLL ANIMATIONS
// ==========================================
function initAnimations() {
  // Hero entrance
  gsap.from(".hero-text", {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power3.out"
  });

  gsap.from(".hero-globe", {
    opacity: 0,
    scale: 0.8,
    duration: 1.2,
    delay: 0.3,
    ease: "back.out(1.7)"
  });

  // About cards stagger
  gsap.from(".about-card", {
    scrollTrigger: {
      trigger: ".about-cards",
      start: "top 80%"
    },
    opacity: 0,
    y: 50,
    stagger: 0.15,
    duration: 0.8,
    ease: "power2.out"
  });

  // About features
  gsap.from(".about-feature", {
    scrollTrigger: {
      trigger: ".about-right",
      start: "top 80%"
    },
    opacity: 0,
    x: 50,
    stagger: 0.2,
    duration: 0.8,
    ease: "power2.out"
  });

  // Events cards
  gsap.from(".event-card", {
    scrollTrigger: {
      trigger: ".events-grid",
      start: "top 80%"
    },
    opacity: 0,
    y: 80,
    stagger: 0.2,
    duration: 1,
    ease: "power3.out"
  });

  // Projects cards with 3D rotation
  gsap.from(".project-card", {
    scrollTrigger: {
      trigger: ".projects-grid",
      start: "top 80%"
    },
    opacity: 0,
    rotateY: 90,
    stagger: 0.2,
    duration: 1,
    ease: "power2.out"
  });

  // Section titles
  gsap.utils.toArray(".cyber-title").forEach(title => {
    gsap.from(title, {
      scrollTrigger: {
        trigger: title,
        start: "top 85%"
      },
      opacity: 0,
      scale: 0.8,
      duration: 0.8,
      ease: "back.out(1.7)"
    });
  });

  // Parallax effect for sections
  gsap.utils.toArray(".blur-section").forEach(section => {
    gsap.to(section, {
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      },
      y: -50
    });
  });
}

// ==========================================
// 9. EVENT BUTTONS
// ==========================================
document.querySelectorAll(".event-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    gsap.to(btn, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1
    });
    
    // Create ripple effect
    const ripple = document.createElement("span");
    ripple.style.position = "absolute";
    ripple.style.width = "20px";
    ripple.style.height = "20px";
    ripple.style.background = "rgba(255, 255, 255, 0.5)";
    ripple.style.borderRadius = "50%";
    ripple.style.left = "50%";
    ripple.style.top = "50%";
    ripple.style.transform = "translate(-50%, -50%)";
    ripple.style.pointerEvents = "none";
    
    btn.appendChild(ripple);
    
    gsap.to(ripple, {
      scale: 20,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
      onComplete: () => ripple.remove()
    });
  });
});

// ==========================================
// 10. FOOTER TYPING EFFECT
// ==========================================
const footerTyping = document.getElementById("footer-typing");
if (footerTyping) {
  const footerWords = [
    "© 2025 AIEC IITM — Powering the Future with AI",
    "Innovate • Build • Inspire • Lead",
    "Join the AI Revolution"
  ];
  let fWordIndex = 0, fCharIndex = 0;

  function typeFooter() {
    if (fCharIndex < footerWords[fWordIndex].length) {
      footerTyping.textContent += footerWords[fWordIndex].charAt(fCharIndex);
      fCharIndex++;
      setTimeout(typeFooter, 60);
    } else {
      setTimeout(eraseFooter, 3000);
    }
  }

  function eraseFooter() {
    if (fCharIndex > 0) {
      footerTyping.textContent = footerWords[fWordIndex].substring(0, fCharIndex - 1);
      fCharIndex--;
      setTimeout(eraseFooter, 30);
    } else {
      fWordIndex = (fWordIndex + 1) % footerWords.length;
      setTimeout(typeFooter, 500);
    }
  }

  setTimeout(typeFooter, 2000);
}

// ==========================================
// 11. FOOTER PARTICLES
// ==========================================
const fCanvas = document.getElementById("footer-particles");
if (fCanvas) {
  const fCtx = fCanvas.getContext("2d");
  const footer = document.querySelector(".footer");
  fCanvas.width = window.innerWidth;
  fCanvas.height = footer.offsetHeight;

  const fParticles = [];
  for (let i = 0; i < 60; i++) {
    fParticles.push({
      x: Math.random() * fCanvas.width,
      y: Math.random() * fCanvas.height,
      radius: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.3,
      dy: -Math.random() * 0.5 - 0.2,
      color: Math.random() > 0.5 ? "#00f6ff" : "#7b2ff7"
    });
  }

  function drawFooterParticles() {
    fCtx.clearRect(0, 0, fCanvas.width, fCanvas.height);

    fParticles.forEach(p => {
      fCtx.beginPath();
      fCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      fCtx.fillStyle = p.color;
      fCtx.shadowBlur = 10;
      fCtx.shadowColor = p.color;
      fCtx.fill();
      fCtx.shadowBlur = 0;

      p.x += p.dx;
      p.y += p.dy;

      if (p.y < 0 || p.x < 0 || p.x > fCanvas.width) {
        p.y = fCanvas.height;
        p.x = Math.random() * fCanvas.width;
      }
    });

    requestAnimationFrame(drawFooterParticles);
  }
  drawFooterParticles();

  window.addEventListener("resize", () => {
    fCanvas.width = window.innerWidth;
    fCanvas.height = footer.offsetHeight;
  });
}

// ==========================================
// 12. INTERACTIVE CARD TILT EFFECT
// ==========================================
document.querySelectorAll(".event-card, .project-card, .about-card").forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.3,
      transformPerspective: 1000,
      ease: "power2.out"
    });
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power2.out"
    });
  });
});

// ==========================================
// 13. NEWSLETTER FORM
// ==========================================
const newsletterForm = document.querySelector(".newsletter-form");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = newsletterForm.querySelector("input");
    const button = newsletterForm.querySelector("button");
    
    gsap.to(button, {
      scale: 0.9,
      duration: 0.1,
      yoyo: true,
      repeat: 1
    });
    
    // Show success message
    const originalText = button.innerHTML;
    button.innerHTML = '<span>Subscribed! ✓</span>';
    button.style.background = "linear-gradient(135deg, #00c9a7, #92fe9d)";
    
    setTimeout(() => {
      button.innerHTML = originalText;
      button.style.background = "";
      input.value = "";
    }, 3000);
  });
}

// ==========================================
// 14. SMOOTH SCROLL FOR ANCHOR LINKS
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: target, offsetY: 100 },
        ease: "power3.inOut"
      });
    }
  });
});

// ==========================================
// 15. CURSOR TRAIL EFFECT (Optional)
// ==========================================
let cursorTrail = [];
const maxTrailLength = 20;

document.addEventListener("mousemove", (e) => {
  cursorTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
  
  if (cursorTrail.length > maxTrailLength) {
    cursorTrail.shift();
  }
});

// ==========================================
// Console Welcome Message
// ==========================================
console.log("%c🤖 Welcome to AIEC IITM!", "color: #00f6ff; font-size: 24px; font-weight: bold;");
console.log("%cPowered by AI | Built with ❤️", "color: #7b2ff7; font-size: 14px;");
console.log("%cExplore the future of technology with us!", "color: #00f6ff; font-size: 12px;");
