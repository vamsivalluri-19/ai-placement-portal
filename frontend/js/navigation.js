document.querySelectorAll(".nav-link").forEach(link => {
  link.onclick = () => {
    document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
    document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));

    link.classList.add("active");
    document.getElementById(link.dataset.section).classList.add("active");
  };
});
