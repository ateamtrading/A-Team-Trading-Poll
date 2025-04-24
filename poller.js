const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyhZhzQ-GAnBr5taOi73mPWC63Xdr1Buqs9CZGZ4Fu3FbwzqdfGNawnfpocA7fspKmaXg/exec";

// 🕐 Get current EST time
function getESTDate() {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const estOffset = 300; // EST = UTC-5
  return new Date(utc - estOffset * 60000);
}

// 🔄 Refresh at every 5-minute mark (EST)
function syncToFiveMinuteInterval(callback) {
  const now = getESTDate();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const ms = now.getMilliseconds();
  const nextRefreshIn = ((5 - (minutes % 5)) * 60 - seconds) * 1000 - ms;

  setTimeout(() => {
    callback(); // Fetch now
    syncToFiveMinuteInterval(callback); // Schedule next
  }, nextRefreshIn);
}

// 📥 Fetch the current signal
async function fetchSignal() {
  try {
    const res = await fetch(`${WEB_APP_URL}?action=getSignal`);
    const { signal } = await res.json();
    const signalDisplay = document.getElementById('signal');
    signalDisplay.textContent = signal.toUpperCase();
    signalDisplay.style.color = signal === 'BUY' ? 'green' : signal === 'SELL' ? 'red' : 'black';
  } catch (e) {
    console.error(e);
    document.getElementById('signal').textContent = 'ERROR';
  }
}

// 📤 Send a vote (BUY or SELL)
async function sendVote(vote) {
  try {
    const res = await fetch(WEB_APP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'castVote', vote })
    });
    const data = await res.json();
    if (data.status === 'OK') {
      alert(`Your ${vote} vote was recorded!`);
    } else {
      alert('Vote failed: ' + (data.status || 'Unknown error'));
    }
  } catch (e) {
    console.error(e);
    alert('Network error.');
  }
}

// ⏯️ Hook up buttons
document.getElementById('buyBtn').onclick  = () => sendVote('BUY');
document.getElementById('sellBtn').onclick = () => sendVote('SELL');

// ⏱️ Initial fetch and 5-minute sync
fetchSignal();
syncToFiveMinuteInterval(fetchSignal);
