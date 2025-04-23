const WEB_APP_URL = 'https://script.google.com/macros/s/…/exec?action=getSignal';

async function fetchSignal() {
  try {
    const res = await fetch(WEB_APP_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const { signal } = await res.json();
    document.getElementById('signal').textContent = signal;
  } catch (err) {
    console.error('Failed to fetch signal:', err);
    document.getElementById('signal').textContent = 'ERROR';
  }
}

// Refresh every 5 seconds in-browser
setInterval(fetchSignal, 5000);
// Initial load
fetchSignal();
