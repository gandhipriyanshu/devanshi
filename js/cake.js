/**
 * Interactive Cake & Candle Controller (Page 1)
 * Handles realistic candle blowing physics, confetti bursts, and letter reveal.
 */

document.addEventListener('DOMContentLoaded', () => {
  const candle = document.getElementById('candle');
  const cakeWrapper = document.getElementById('cake-wrapper');
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
    if (quickBlowBtn) quickBlowBtn.style.display = 'none';

    if (ambientGlow) {
      ambientGlow.style.opacity = '0.35';
    }

    if (hintText) {
      hintText.textContent = "Your wish is heading to the stars... ✨";
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
          hintText.textContent = "Your wish is made! A letter awaits you 💌";
        }
      }, 1000);
    } else {
      // If already blown previously, show letter button immediately
      if (letterBtn) letterBtn.classList.add('visible');
      if (hintText) hintText.textContent = "Your wish is made! A letter awaits you 💌";
    }
  }

  // Multi-tier confetti celebration
  function fireCelebrationConfetti() {
    if (typeof confetti !== 'function') return;

    const colors = ['#E9B86A', '#FDF0D5', '#FF7597', '#FFD166', '#FFFFFF', '#C8923E'];

    // Initial burst from candle center
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.55 },
      colors: colors,
      scalar: 1.1,
      ticks: 200
    });

    // Side cannons after 300ms
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 60,
        origin: { x: 0.1, y: 0.65 },
        colors: colors
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 60,
        origin: { x: 0.9, y: 0.65 },
        colors: colors
      });
    }, 350);

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

  // Event Listeners
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
