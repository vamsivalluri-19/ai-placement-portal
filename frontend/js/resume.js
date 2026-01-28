async function uploadResume() {
  const file = document.getElementById("resumeFile").files[0];
  if (!file) return alert("Upload resume PDF");

  const formData = new FormData();
  formData.append("resume", file);

  const res = await fetch("/api/ai/parse-resume", {
    method: "POST",
    body: formData
  });

  const data = await res.json();

  document.getElementById("resumeResult").innerHTML = `
    <p>Resume Score: <b>${data.score}/100</b></p>
    <p>Detected Skills: ${data.skills.join(", ")}</p>
    <p>Suggested Roles: ${data.roles.join(", ")}</p>
  `;
}
