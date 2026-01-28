function filterPlacements() {
  const q = placementSearch.value.toLowerCase();
  const status = statusFilter.value;

  document.querySelectorAll("tbody tr").forEach(row => {
    const text = row.innerText.toLowerCase();
    const badge = row.querySelector(".badge").innerText.toLowerCase();
    row.style.display =
      text.includes(q) && (status === "all" || badge.includes(status))
      ? "" : "none";
  });
}
