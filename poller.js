const BACKEND_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
const PASSWORD = 'ateamtrading778'; // Set your password

function checkPassword() {
  const input = document.getElementById('password').value;
  const errorBox = document.getElementById('login-error');
  if (input === PASSWORD) {
    document.getElementById('login-box').style.display = 'none';
    document.getElementById('app').style.display = 'block';
    fetchSignal(); // Initial fetch
    setInterval(fetchSignal, 5 * 60 * 1000); // Refresh every 5 minutes
  } else {
    errorBox.textContent = 'Incorrect password.';
  }
}

function sendVote(vote) {
  fetch(BACKEND_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ vote })
  })
  .then(response => {
    if (!response.ok) throw new Error('Network error');
    return response.json();
  })
  .then(data => {
    console.log('Vote success:', data);
  })
  .catch(error => {
    console.error('Error sending vote:', error);
  });
}

function fetchSignal() {
  fetch(BACKEND_URL)
    .then(response => {
      if (!response.ok) throw new Error('Network error');
      return response.json();
    })
    .then(data => {
      document.getElementById('signal-status').textContent = `Current Signal: ${data.signal}`;
    })
    .catch(error => {
      console.error('Error fetching signal:', error);
      document.getElementById('signal-status').textContent = 'Error checking signal.';
    });
}
