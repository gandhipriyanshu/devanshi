/**
 * Interactive Cake & Candle Controller (Page 1) - Phase 3 Complete
 * Realistic candle blowing physics, mic blow detection, multi-tier confetti, and smooth navigation.
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeadlineAnimation();

  const candle = document.getElementById('candle');
  const cakeWrapper = document.getElementById('cake-wrapper');
  const blowControls = document.getElementById('blow-controls');
  const quickBlowBtn = document.getElementById('quick-blow-btn');
  const hintText = document.getElementById('hint-text');
  const reflection = document.getElementById('cake-reflection');
  const letterBtn = document.getElementById('letter-btn');
  const ambientGlow = document.getElementById('ambient-glow');

  let isBlownOut = false;

  // Check if candle was already blown out in this session
  if (sessionStorage.getItem('candle_blown') === 'true') {
    markBlownOut(false);
  }

  function blowOutCandle() {
    if (isBlownOut) return;
    isBlownOut = true;
    sessionStorage.setItem('candle_blown', 'true');

    // Trigger haptic if available on mobile
    if (navigator.vibrate) {
      try { navigator.vibrate([40, 60, 40]); } catch (e) {}
    }

    markBlownOut(true);
  }

  function markBlownOut(withCelebration = true) {
    if (candle) candle.classList.add('blown-out');
    if (reflection) reflection.style.opacity = '0';
    if (blowControls) blowControls.style.display = 'none';

    if (ambientGlow) {
      ambientGlow.style.opacity = '0.35';
    }

    if (hintText) {
      hintText.textContent = "Your wish is on its way ✨";
      hintText.style.color = "var(--gold-light)";
    }

    if (withCelebration) {
      // Fire luxurious celebratory confetti bursts
      fireCelebrationConfetti();

      // Soft audio start on blow interaction
      const audio = document.getElementById('bg-audio');
      if (audio && audio.paused) {
        audio.play().then(() => {
          sessionStorage.setItem('music_playing', 'true');
          const toggle = document.getElementById('audio-toggle');
          if (toggle) toggle.classList.add('playing');
        }).catch(() => {});
      }

      // Smooth reveal of letter button
      setTimeout(() => {
        if (letterBtn) {
          letterBtn.classList.add('visible');
        }
        if (hintText) {
          hintText.textContent = "Your wish is on its way ✨ A letter awaits you 💌";
        }
      }, 1000);
    } else {
      if (letterBtn) letterBtn.classList.add('visible');
      if (hintText) hintText.textContent = "Your wish is on its way ✨ A letter awaits you 💌";
    }
  }

  // Multi-tier confetti celebration
  function fireCelebrationConfetti() {
    if (typeof confetti !== 'function') return;

    const colors = ['#E9B86A', '#FDF0D5', '#FF7597', '#FFD166', '#FFFFFF', '#C8923E'];

    // Initial burst from candle center
    confetti({
      particleCount: 75,
      spread: 75,
      origin: { y: 0.55 },
      colors: colors,
      scalar: 1.1,
      ticks: 200
    });

    // Side cannons after 320ms
    setTimeout(() => {
      confetti({
        particleCount: 55,
        angle: 60,
        spread: 60,
        origin: { x: 0.1, y: 0.65 },
        colors: colors
      });
      confetti({
        particleCount: 55,
        angle: 120,
        spread: 60,
        origin: { x: 0.9, y: 0.65 },
        colors: colors
      });
    }, 320);

    // Gentle star rain
    setTimeout(() => {
      confetti({
        particleCount: 35,
        spread: 100,
        startVelocity: 25,
        origin: { y: 0.4 },
        colors: colors,
        shapes: ['star', 'circle']
      });
    }, 800);
  }

  // Smooth Page Fade Navigation to letter.html
  if (letterBtn) {
    letterBtn.addEventListener('click', (e) => {
      e.preventDefault();
      document.body.classList.add('page-fading-out');
      setTimeout(() => {
        window.location.href = 'letter.html';
      }, 380);
    });
  }

  // Tap Event Listeners
  if (candle) {
    candle.addEventListener('click', (e) => {
      e.stopPropagation();
      blowOutCandle();
    });

    candle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        blowOutCandle();
      }
    });
  }

  if (quickBlowBtn) {
    quickBlowBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      blowOutCandle();
    });
  }

  if (cakeWrapper) {
    cakeWrapper.addEventListener('click', () => {
      if (!isBlownOut) blowOutCandle();
    });
  }
});

/**
 * Staggered Letter-by-Letter Entrance Animation for the Headline
 */
function initHeadlineAnimation() {
  const lines = document.querySelectorAll('.hero-title .title-line');
  if (!lines || !lines.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  let globalCharIndex = 0;
  lines.forEach((line) => {
    const rawText = line.textContent.trim();
    line.innerHTML = '';
    Array.from(rawText).forEach((char) => {
      const span = document.createElement('span');
      span.textContent = char;
      if (char === ' ') {
        span.className = 'char-space';
      } else {
        span.className = 'char-span';
        span.style.setProperty('--char-index', globalCharIndex++);
      }
      line.appendChild(span);
    });
  });
}
