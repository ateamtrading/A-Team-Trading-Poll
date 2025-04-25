const BACKEND_URL = https://script.google.com/macros/s/AKfycbxldZh66iaRY24aWUrWqL9kRwCXI8KDprv4uJf8Rv90n4llbhAVui11FSyLOXpJ4lb0hA/exec; // <--- paste your real URL here

function sendVote(vote) {
  fetch(BACKEND_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ vote: vote })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not OK');
    }
    return response.json();
  })
  .then(data => {
    console.log('Vote sent successfully:', data);
    document.getElementById('message').textContent = 'Vote sent successfully!';
    document.getElementById('message').style.color = 'green';
  })
  .catch(error => {
    console.error('Error sending vote:', error);
    document.getElementById('message').textContent = 'Error sending vote.';
    document.getElementById('message').style.color = 'red';
  });
}

document.getElementById('buyButton').addEventListener('click', function() {
  sendVote('buy');
});

document.getElementById('sellButton').addEventListener('click', function() {
  sendVote('sell');
});
