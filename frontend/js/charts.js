new Chart(document.getElementById("trendChart"), {
  type: "line",
  data: {
    labels: ["2022","2023","2024","2025","2026"],
    datasets: [{
      label: "Placement %",
      data: [65,72,78,85,92],
      borderColor: "#3b82f6",
      tension: 0.4
    }]
  }
});

new Chart(document.getElementById("deptChart"), {
  type: "bar",
  data: {
    labels: ["CSE","ECE","ME","EEE","IT"],
    datasets: [{
      label: "Placed Students",
      data: [430,320,250,210,280],
      backgroundColor: "#22c55e"
    }]
  }
});
function checkEligibility(cgpa, skills) {
  return cgpa >= 7.5 && skills.includes("DSA");
}
