/**
 * Shared Utilities: Starlight Ambience & Persistent Audio Controller
 * Ensures luxury aesthetics and audio continuity across index.html & letter.html.
 */

document.addEventListener('DOMContentLoaded', () => {
  initStarlight();
  initAudioController();
});

/**
 * Spawns subtle starlight twinkling particles in the background
 */
function initStarlight() {
  const container = document.getElementById('starlight-container');
  if (!container) return;

  const starCount = 35;
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'star-particle';
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 5}s`;
    star.style.animationDuration = `${3 + Math.random() * 4}s`;
    if (Math.random() > 0.6) {
      star.style.width = '3px';
      star.style.height = '3px';
      star.style.background = '#FCE8CA';
      star.style.boxShadow = '0 0 8px rgba(233, 184, 106, 0.8)';
    }
    container.appendChild(star);
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

  if (isPlayingSaved) {
    audio.play().then(() => {
      updateUI(true);
    }).catch(() => {
      updateUI(false);
    });
  } else {
    updateUI(false);
  }

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

  window.addEventListener('beforeunload', () => {
    sessionStorage.setItem('music_time', audio.currentTime.toString());
  });
}
