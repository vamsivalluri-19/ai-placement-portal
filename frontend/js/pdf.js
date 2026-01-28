function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();

  pdf.text("AI Placement Report", 20, 20);
  pdf.text("Total Students: 2450", 20, 40);
  pdf.text("Placed Students: 1950", 20, 50);
  pdf.text("Placement Rate: 79.6%", 20, 60);
  pdf.text("Average Package: ₹8.5 LPA", 20, 70);

  pdf.save("placement-report.pdf");
}
