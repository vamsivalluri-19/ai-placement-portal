const user = JSON.parse(localStorage.getItem("authUser"));

if (!user || user.role !== "student") {
  window.location.href = "/";
}
async function loadWelcomeMessage() {
  const response = await fetch('/api/ai/welcome');
  const data = await response.json();
  document.getElementById('welcomeBox').innerText = data.candidates[0].content.parts[0].text;
}

loadWelcomeMessage();
