exports.analyzeResume = (req, res) => {
  // Dummy resume analysis
  res.json({
    matched: ["Java", "Python", "SQL"],
    missing: ["Cloud Computing", "Machine Learning"]
  });
};
