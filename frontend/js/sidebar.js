function openSection(id) {
  document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
  document.querySelectorAll(".sidebar a").forEach(a => a.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  event.target.classList.add("active");
}

function logout() {
  localStorage.clear();
  window.location.href = "../index.html";
}
