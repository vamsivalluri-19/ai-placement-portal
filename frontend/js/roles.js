const role = localStorage.getItem("role") || "student";
document.body.classList.add(role);
