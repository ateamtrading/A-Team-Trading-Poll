const WEB_APP_URL = https://script.google.com/macros/s/AKfycbxHvXXSovhCxrgS6YDSWpukWRH5bjp4xM3fHBU8uK1nIwcIVY2odcDxr2NT15mBH8TPTw/exec;

async function fetchSignal() {
  try {
    const res = await fetch(`${WEB_APP_URL}?action=getSignal`);
    const { signal } = await res.json();
    document.getElementById('signal').textContent = signal;
  } catch {
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

document.getElementById('buyBtn').onclick  = () => sendVote('BUY');
document.getElementById('sellBtn').onclick = () => sendVote('SELL');

setInterval(fetchSignal, 5000);
fetchSignal();
