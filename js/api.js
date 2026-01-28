const BASE_URL = "https://ai-placement-backend.onrender.com";

export async function analyzeResumeAPI(payload) {
  const res = await fetch(`${API}/ai/analyze-resume`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
  });
  return res.json();
}

export async function listInterviewsAPI() {
  const res = await fetch(`${API}/interview/list`);
  return res.json();
}
