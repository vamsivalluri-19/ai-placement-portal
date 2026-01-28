const role = localStorage.getItem("userRole");

const page = location.pathname;

if (page.includes("admin") && role !== "admin") {
  location.href = "/dashboards/" + role + ".html";
}

if (page.includes("hr") && role !== "hr") {
  location.href = "/dashboards/" + role + ".html";
}

if (page.includes("staff") && role !== "staff") {
  location.href = "/dashboards/" + role + ".html";
}

if (page.includes("student") && role !== "student") {
  location.href = "/dashboards/" + role + ".html";
}
