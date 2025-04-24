const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwIDNDQLHNvLpbay4RnKNnzbwPjlV00-lFwHnwl-8fZcUjgxi3uFC75XoB92k9tDoSHVQ/exec";

// Get current EST time
function getESTDate() {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const estOffset = 5 * 60 * 60000; // EST is UTC-5
  return new Date(utc - estOffset);
}

// Sync fetch to 5-minute intervals
function syncToFiveMinuteInterval(callback) {
  const now = getESTDate();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const ms = now.getMilliseconds();

  const msUntilNextRefresh = ((5 - (minutes % 5)) * 60 - seconds) * 1000 - ms;

  setTimeout(() => {
    callback();
    syncToFiveMinuteInterval(callback);
  }, msUntilNextRefresh);
}

// Fetch the current signal from backend
async function fetchSignal() {
  try {
    const res = await fetch(`${WEB_APP_URL}?action=getSignal`);
    const data = await res.json();
    const signalDisplay = document.getElementById("signal");

    if (data.signal) {
      signalDisplay.textContent = data.signal;
      signalDisplay.style.color = data.signal === "BUY" ? "green" :
                                  data.signal === "SELL" ? "red" : "black";
    } else {
      signalDisplay.textContent = "NO SIGNAL";
    }
  } catch (err) {
    console.error("Fetch error:", err);
    document.getElementById("signal").textContent = "ERROR";
  }
}

// Send a vote to the backend
async function sendVote(vote) {
  try {
    const res = await fetch(WEB_APP_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "castVote", vote })
    });

    const data = await res.json();
    if (data.status === "OK") {
      alert(`Your ${vote} vote was recorded!`);
    } else {
      alert("Vote failed: " + data.status);
    }
  } catch (err) {
    console.error("Vote error:", err);
    alert("Network error");
  }
}

// Hook up buttons after DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("buyBtn").onclick = () => sendVote("BUY");
  document.getElementById("sellBtn").onclick = () => sendVote("SELL");

  fetchSignal();
  syncToFiveMinuteInterval(fetchSignal);
});
