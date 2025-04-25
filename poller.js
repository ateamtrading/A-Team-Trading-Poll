const BACKEND_URL = 'https://script.google.com/macros/s/AKfycbxldZh66iaRY24aWUrWqL9kRwCXI8KDprv4uJf8Rv90n4llbhAVui11FSyLOXpJ4lb0hA/exec';
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

async function fetchSignal() {
  const signalDisplay = document.getElementById('signal-display');

  try {
    // Show loading message while waiting
    signalDisplay.innerText = 'Loading...';

    const response = await fetch(MACRO_URL, {
      method: 'GET',
      mode: 'cors',
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const signalData = await response.json();

    signalDisplay.innerText = signalData.signal || 'No signal';
  } catch (error) {
    console.error('Error checking signal:', error);
    signalDisplay.innerText = 'Error checking signal.';
  }
}

