/**
 * Shared Utilities: Background Sparkles & Persistent Audio Controller
 * Ensures consistent theme and audio continuity across index.html & letter.html.
 */

document.addEventListener('DOMContentLoaded', () => {
  initSparkles();
  initAudioController();
});

/**
 * Spawns 18 floating ambient hearts and stars in the background
 */
function initSparkles() {
  const container = document.getElementById('sparkle-container');
  if (!container) return;

  const symbols = ['✨', '💖', '⭐', '🌸', '💫'];
  const count = 18;

  for (let i = 0; i < count; i++) {
    const span = document.createElement('span');
    span.className = 'floating-item';
    span.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    span.style.left = `${Math.random() * 96}%`;
    span.style.animationDuration = `${9 + Math.random() * 8}s`;
    span.style.animationDelay = `${Math.random() * 10}s`;
    span.style.fontSize = `${14 + Math.random() * 16}px`;
    container.appendChild(span);
  }
}

/**
 * Manages background music playback and preserves playback state across page transitions
 */
function initAudioController() {
  const audio = document.getElementById('bg-audio');
  const toggleBtn = document.getElementById('audio-toggle');
  if (!audio || !toggleBtn) return;

  const icon = toggleBtn.querySelector('.music-icon');

  // Check saved state from sessionStorage
  const isPlayingSaved = sessionStorage.getItem('music_playing') === 'true';
  const savedTime = parseFloat(sessionStorage.getItem('music_time') || '0');

  if (savedTime && !isNaN(savedTime)) {
    audio.currentTime = savedTime;
  }

  // Periodic time recorder to maintain position across navigation
  setInterval(() => {
    if (!audio.paused) {
      sessionStorage.setItem('music_time', audio.currentTime.toString());
    }
  }, 500);

  function updateUI(playing) {
    if (playing) {
      toggleBtn.classList.add('playing');
      if (icon) icon.textContent = '🎵';
      toggleBtn.setAttribute('aria-label', 'Pause background music');
    } else {
      toggleBtn.classList.remove('playing');
      if (icon) icon.textContent = '🔇';
      toggleBtn.setAttribute('aria-label', 'Play background music');
    }
  }

  // Auto-resume if user previously activated music
  if (isPlayingSaved) {
    audio.play().then(() => {
      updateUI(true);
    }).catch(() => {
      // Browser autoplay policy might require user interaction first
      updateUI(false);
    });
  } else {
    updateUI(false);
  }

  // Toggle button click listener
  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (audio.paused) {
      audio.play().then(() => {
        sessionStorage.setItem('music_playing', 'true');
        updateUI(true);
      }).catch(err => console.log('Audio play error:', err));
    } else {
      audio.pause();
      sessionStorage.setItem('music_playing', 'false');
      updateUI(false);
    }
  });

  // Preserve state before navigating
  window.addEventListener('beforeunload', () => {
    sessionStorage.setItem('music_time', audio.currentTime.toString());
  });
}
