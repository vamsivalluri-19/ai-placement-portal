function filterPlacements() {
  const searchText = document
    .getElementById("placementSearch")
    .value.toLowerCase();

  const status = document
    .getElementById("statusFilter")
    .value;

  const rows = document.querySelectorAll("tbody tr");

  rows.forEach(row => {
    const rowText = row.innerText.toLowerCase();
    const badge = row.querySelector(".badge");
    const badgeText = badge ? badge.innerText.toLowerCase() : "";

    const matchesSearch = rowText.includes(searchText);
    const matchesStatus =
      status === "all" || badgeText.includes(status);

    row.style.display =
      matchesSearch && matchesStatus ? "" : "none";
  });
}
countEl.classList.add("updated");
setTimeout(() => countEl.classList.remove("updated"), 400);
navigator.mediaDevices.getUserMedia({ video:true, audio:true })
.then(stream => {
  document.getElementById("localVideo").srcObject = stream;
});
