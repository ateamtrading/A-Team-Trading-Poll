const backendUrl = "https://script.google.com/macros/s/AKfycbwrdTLbLODoqd27O3tPIfkNwec3jl4eGzYC-WQxU31WI1p2YGpLPVPutSWqrttYE_zQ1g/exec";

// Fetch the signal on page load
fetch(backendUrl)
  .then(response => response.json())
  .then(data => {
    console.log("Fetched signal:", data);
    document.getElementById("signal").innerText = data.signal;
  })
  .catch(error => {
    console.error("Error fetching signal:", error);
    document.getElementById("signal").innerText = "Error fetching signal";
  });

// Send a vote to the backend
async function sendVote(vote) {
  try {
    const response = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        action: "castVote",
        vote: vote
      })
    });

    const result = await response.text();
    console.log("Vote response:", result);
    alert("Vote submitted: " + vote);
  } catch (err) {
    console.error("Failed to send vote:", err);
    alert("Error sending vote.");
  }
}

document.getElementById("voteBuy").onclick = () => sendVote("BUY");
document.getElementById("voteSell").onclick = () => sendVote("SELL");
