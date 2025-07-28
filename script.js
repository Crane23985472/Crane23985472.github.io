// carousel.js

document.addEventListener('DOMContentLoaded', () => {
  const frames         = Array.from(document.querySelectorAll('.carousel-container iframe'));
  const prevBtn        = document.getElementById('prevBtn');
  const nextBtn        = document.getElementById('nextBtn');
  const toggleBtn      = document.getElementById('toggleAuto');
  const pageIndicator  = document.getElementById('pageIndicator');
  const timerDisplay   = document.getElementById('timer');

  let current         = 0;
  const total         = frames.length;
  const intervalSec   = 30;

  let remaining       = intervalSec;
  let autoTimeout     = null;
  let countdownInterval = null;
  let isRunning       = false;

  // Show the frame at index idx and update the page indicator
  const showPage = (idx) => {
    frames.forEach((f, i) => f.classList.toggle('active', i === idx));
    pageIndicator.textContent = `${idx + 1} / ${total}`;
  };

  // Update the countdown display
  const updateTimerDisplay = () => {
    timerDisplay.textContent = `${remaining}s`;
  };

  // Reset the remaining seconds to the full interval
  const resetTimer = () => {
    remaining = intervalSec;
    updateTimerDisplay();
  };

  // Schedule the next auto-advance after intervalSec seconds
  const scheduleAutoAdvance = () => {
    autoTimeout = setTimeout(() => {
      current = (current + 1) % total;
      showPage(current);

      if (isRunning) {
        resetTimer();
        scheduleAutoAdvance();
      }
    }, intervalSec * 1000);
  };

  // Start auto-rotation + countdown
  const startAuto = () => {
    if (isRunning) return;
    isRunning = true;
    toggleBtn.textContent = 'Pause';

    resetTimer();
    scheduleAutoAdvance();

    countdownInterval = setInterval(() => {
      remaining--;
      if (remaining < 0) remaining = 0;
      updateTimerDisplay();
    }, 1000);
  };

  // Stop auto-rotation + countdown
  const stopAuto = () => {
    isRunning = false;
    toggleBtn.textContent = 'Start';

    clearTimeout(autoTimeout);
    clearInterval(countdownInterval);
  };

  // Manual “next” navigation
  const nextPage = () => {
    current = (current + 1) % total;
    showPage(current);

    if (isRunning) {
      clearTimeout(autoTimeout);
      resetTimer();
      scheduleAutoAdvance();
    }
  };

  // Manual “prev” navigation
  const prevPage = () => {
    current = (current - 1 + total) % total;
    showPage(current);

    if (isRunning) {
      clearTimeout(autoTimeout);
      resetTimer();
      scheduleAutoAdvance();
    }
  };

  // Wire up controls
  toggleBtn.addEventListener('click', () =>
    isRunning ? stopAuto() : startAuto()
  );
  prevBtn.addEventListener('click', prevPage);
  nextBtn.addEventListener('click', nextPage);

  // Initialize
  showPage(current);
  startAuto();
});
