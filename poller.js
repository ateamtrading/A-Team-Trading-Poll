const backendURL = "https://script.google.com/macros/s/AKfycbzmTzG_PzWHn39DYYLj7sCy7_Lmex2eLuRiKIjr5XEKYCRDwwQBTIyWmgbvglHcBfF8Gg/exec";

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
