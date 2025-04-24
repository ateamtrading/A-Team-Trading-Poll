const backendURL = "https://script.google.com/macros/s/AKfycbxldZh66iaRY24aWUrWqL9kRwCXI8KDprv4uJf8Rv90n4llbhAVui11FSyLOXpJ4lb0hA/exec";

function getSignal() {
  fetch(backendURL)
    .then(response => response.json())
    .then(data => {
      document.getElementById("signal").textContent = `Signal: ${data.signal}`;
    })
    .catch(err => {
      document.getElementById("signal").textContent = "Error fetching signal";
      console.error("Error:", err);
    });
}
