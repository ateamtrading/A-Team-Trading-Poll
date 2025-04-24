const backendURL = "https://script.google.com/macros/s/AKfycbxldZh66iaRY24aWUrWqL9kRwCXI8KDprv4uJf8Rv90n4llbhAVui11FSyLOXpJ4lb0hA/exec";

function getSignal() {
  fetch(backendURL)
    .then(response => response.json())
    .then(data => {
      document.getElementById("output").textContent = `Signal: ${data.signal}`;
    })
    .catch(error => {
      console.error("Error fetching signal:", error);
      document.getElementById("output").textContent = "Error fetching signal";
    });
}

// Example POST (not used on button, just for demo/test)
function sendPost() {
  fetch(backendURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ test: "data" })
  })
    .then(response => response.json())
    .then(data => console.log("POST response:", data))
    .catch(err => console.error("POST error:", err));
}

