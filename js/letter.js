/**
 * Envelope & Letter Interaction Controller (Page 2)
 * Handles realistic unsealing animation, paper reveal, and celebration.
 */

document.addEventListener('DOMContentLoaded', () => {
  const envelope = document.getElementById('envelope');
  const envelopeFlap = document.getElementById('envelope-flap');
  const waxSeal = document.getElementById('wax-seal');
  const letterContent = document.getElementById('letter-content');
  const hintWrapper = document.getElementById('letter-hint');
  const hintText = document.getElementById('hint-text');
  const replayBtn = document.getElementById('replay-btn');

  let isOpened = false;

  function openEnvelope() {
    if (isOpened) return;
    isOpened = true;

    // 1. Open flap and dissolve wax seal
    if (envelopeFlap) envelopeFlap.style.transform = 'rotateX(180deg)';
    if (waxSeal) {
      waxSeal.style.opacity = '0';
      waxSeal.style.transform = 'translate(-50%, -50%) scale(0.4)';
    }

    if (navigator.vibrate) {
      try { navigator.vibrate([30, 50, 30]); } catch (e) {}
    }

    // 2. Confetti sparkle burst
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 50,
        spread: 75,
        origin: { y: 0.55 },
        colors: ['#E9B86A', '#FF7597', '#FCE8CA', '#D4425A'],
        shapes: ['circle', 'star']
      });
    }

    // 3. Smoothly reveal the parchment letter paper
    setTimeout(() => {
      if (envelope) envelope.classList.add('opened');
      if (letterContent) {
        letterContent.classList.add('revealed');
        letterContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      if (hintWrapper) {
        hintText.textContent = "A personal wish, just for you ✨";
        hintText.style.color = "var(--gold-light)";
      }
    }, 450);
  }

  if (envelope) {
    envelope.addEventListener('click', openEnvelope);
    envelope.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openEnvelope();
      }
    });
  }

  if (waxSeal) {
    waxSeal.addEventListener('click', (e) => {
      e.stopPropagation();
      openEnvelope();
    });
  }

  if (replayBtn) {
    replayBtn.addEventListener('click', (e) => {
      e.preventDefault();
      sessionStorage.removeItem('candle_blown');
      document.body.classList.add('page-fading-out');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 380);
    });
  }
});
