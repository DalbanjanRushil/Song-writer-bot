// script.js

document.getElementById("songForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const topic = document.getElementById("topic").value.trim();
  const genre = document.getElementById("genre").value;
  const tone = document.getElementById("tone").value;

  const output = document.getElementById("output");
  const resultText = document.getElementById("resultText");
  output.style.display = "block";
  resultText.innerText = "⏳ Generating your song lyrics...";

  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topic, genre, tone }),
    });

    const data = await response.json();

    resultText.innerText = data.result || "❌ Failed to generate lyrics. Try again.";
  } catch (err) {
    resultText.innerText = "❌ Error connecting to backend.";
    console.error(err);
  }
});

document.getElementById("copyBtn").addEventListener("click", () => {
  const text = document.getElementById("resultText").innerText;
  navigator.clipboard.writeText(text);
  alert("Copied to clipboard ✅");
});
