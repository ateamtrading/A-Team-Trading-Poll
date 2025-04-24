const backendUrl = "https://script.google.com/macros/s/AKfycbwzXpFWRt2nPtChSOTuirNms176nZfb7Hj9oj8FOJgqWmth2633BapVPrMJGIAAkyEPDg/exec";

// Display loading message initially
document.getElementById("signal").innerText = "Loading...";

// Fetch the signal on page load
fetch(backendUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
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

    if (!response.ok) {
      throw new Error("Vote request failed");
    }

    const result = await response.text();
    console.log("Vote response:", result);
    alert("Vote submitted: " + vote);
  } catch (err) {
    console.error("Failed to send vote:", err);
    alert("Error sending vote.");
  }
}

// Hook up buttons to voting function
document.getElementById("voteBuy").onclick = () => sendVote("BUY");
document.getElementById("voteSell").onclick = () => sendVote("SELL");
