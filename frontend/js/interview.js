import { analyzeResumeAPI, listInterviewsAPI } from './api.js';

async function analyzeResume() {
  const resultDiv = document.getElementById('resumeResult');
  resultDiv.textContent = 'Analyzing...';
  const data = await analyzeResumeAPI({ name: localStorage.getItem('name'), resume_content: '...' });
  resultDiv.innerHTML = `
    <p>✅ Score: ${data.score}</p>
    <p>Skills: ${data.skills.join(', ')}</p>
    <p>Strengths: ${data.strengths.join(', ')}</p>
    <p>Gaps: ${data.gaps.join(', ')}</p>
  `;
  addNotification('Resume analyzed successfully!');
}

function addNotification(msg) {
  const list = document.getElementById('notifications');
  const li = document.createElement('li');
  li.textContent = '📢 ' + msg;
  list.appendChild(li);
}

function saveProfile() {
  const profile = {
    name: document.getElementById('profileName').value,
    email: document.getElementById('profileEmail').value,
    branch: document.getElementById('profileBranch').value,
    year: document.getElementById('profileYear').value,
    skills: document.getElementById('profileSkills').value
  };
  localStorage.setItem('studentProfile', JSON.stringify(profile));
  addNotification('Profile updated.');
}

async function loadInterviews() {
  const rows = await listInterviewsAPI();
  const table = document.getElementById('interviewTable');
  rows.forEach(r => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${r.company}</td>
      <td>${r.date}</td>
      <td><span class="badge ${r.status === 'Live' ? 'success' : 'pending'}">${r.status}</span></td>
      <td>${r.roomId}</td>
      <td><button onclick="document.getElementById('roomId').value='${r.roomId}'">Use Room</button></td>
    `;
    table.appendChild(tr);
  });
}

document.addEventListener('DOMContentLoaded', loadInterviews);

// expose for inline HTML
window.analyzeResume = analyzeResume;
window.saveProfile = saveProfile;
