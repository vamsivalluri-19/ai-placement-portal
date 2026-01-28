const express = require('express');
const router = express.Router();

// Resume analyzer (demo)
router.post('/analyze-resume', (req, res) => {
  const { name, resume_content } = req.body || {};
  res.json({
    score: 82,
    skills: ['Java', 'React', 'SQL', 'DSA'],
    strengths: ['Strong projects', 'Good problem-solving'],
    gaps: ['Add internship experience'],
    eligible: true
  });
});

// Job matches (demo)
router.post('/match-jobs', (req, res) => {
  const { skills = [], cgpa = 0 } = req.body || {};
  res.json({
    matches: [
      { title: 'Software Engineer - Google', score: 0.92 },
      { title: 'Backend Engineer - Infosys', score: 0.88 },
      { title: 'Frontend Developer - Amazon', score: 0.85 }
    ]
  });
});

// Interview questions (demo)
router.post('/generate-interview', (req, res) => {
  const { position, company } = req.body || {};
  res.json({
    questions: [
      { question: 'Explain React hooks.' },
      { question: 'What is REST API?' },
      { question: 'Difference between SQL and NoSQL?' }
    ]
  });
});

module.exports = router;
