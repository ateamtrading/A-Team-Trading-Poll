const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxMLtU1aUNngVwZl9YkcLeiTYl7szZy-DVqC0bB3MJoFcP7N585L4y19sa1TJNX0QbA_w/exec";

function getESTDate() {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const estOffset = 300; // EST = UTC-5
  return new Date(utc - estOffset * 60000);
}

function syncToFiveMinuteInterval(callback) {
  const now = getESTDate();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const ms = now.getMilliseconds();

  const nextRefreshIn = ((5 - (minutes % 5)) * 60 - seconds) * 1000 - ms;

  setTimeout(() => {
    callback(); // Fetch new data
    syncToFiveMinuteInterval(callback); // Set up next refresh
  }, nextRefreshIn);
}

async function fetchSignal() {
  try {
    const res = await fetch(`${WEB_APP_URL}?action=getSignal`);
    const { signal } = await res.json();
    const signalDisplay = document.getElementById('signal');
    signalDisplay.textContent = signal;
    signalDisplay.style.color = signal === 'BUY' ? 'green' : signal === 'SELL' ? 'red' : 'black';
  } catch (err) {
    document.getElementById('signal').textContent = 'ERROR';
  }
}

async function sendVote(vote) {
  try {
    const res = await fetch(WEB_APP_URL, {
      method: 'POST',
      body: JSON.stringify({ action: 'castVote', vote }),
      headers: { 'Content-Type': 'application/json' }
    });
    const { status } = await res.json();
    if (status === 'OK') {
      alert(`Your ${vote} vote was recorded!`);
    } else {
      alert('Vote failed.');
    }
  } catch {
    alert('Network error.');
  }
}

document.getElementById('buyBtn').onclick = () => sendVote('BUY');
document.getElementById('sellBtn').onclick = () => sendVote('SELL');

// Initial fetch + timed updates synced to 5-minute intervals (EST)
fetchSignal();
syncToFiveMinuteInterval(fetchSignal);
