document.addEventListener('DOMContentLoaded', () => {
  const frames = Array.from(document.querySelectorAll('.carousel-container iframe'));
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const toggleBtn = document.getElementById('toggleAuto');
  const pageIndicator = document.getElementById('pageIndicator');
  const timerDisplay = document.getElementById('timer');

  let current = 0;
  const total = frames.length;
  const intervalSeconds = 30;
  let remaining = intervalSeconds;
  let autoSwitchInterval = null;
  let countdownInterval = null;
  let isRunning = true;

  // Show a given frame index
  function showPage(idx) {
    frames.forEach((f, i) => {
      f.classList.toggle('active', i === idx);
    });
    pageIndicator.textContent = `${idx + 1} / ${total}`;
  }

  // Move to next page
  function nextPage() {
    current = (current + 1) % total;
    resetTimer();
    showPage(current);
  }

  // Move to previous page
  function prevPage() {
    current = (current - 1 + total) % total;
    resetTimer();
    showPage(current);
  }

  // Update countdown display every second
  function tick() {
    remaining -= 1;
    if (remaining <= 0) {
      nextPage();
    }
    timerDisplay.textContent = `${remaining}s`;
  }

  // Reset timer back to full interval
  function resetTimer() {
    remaining = intervalSeconds;
    timerDisplay.textContent = `${remaining}s`;
  }

  // Start auto-switch + countdown
  function startAuto() {
    if (autoSwitchInterval) return;
    isRunning = true;
    toggleBtn.textContent = 'Pause';
    resetTimer();
    autoSwitchInterval = setInterval(nextPage, intervalSeconds * 1000);
    countdownInterval = setInterval(tick, 1000);
  }

  // Stop auto-switch + countdown
  function stopAuto() {
    isRunning = false;
    toggleBtn.textContent = 'Start';
    clearInterval(autoSwitchInterval);
    clearInterval(countdownInterval);
    autoSwitchInterval = null;
    countdownInterval = null;
  }

  // Toggle auto mode
  toggleBtn.addEventListener('click', () => {
    isRunning ? stopAuto() : startAuto();
  });

  prevBtn.addEventListener('click', () => {
    prevPage();
  });

  nextBtn.addEventListener('click', () => {
    nextPage();
  });

  // Initialize
  showPage(current);
  startAuto();
});
