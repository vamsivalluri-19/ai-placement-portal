exports.scheduleInterview = (req, res) => {
  const { candidate, company, date } = req.body;
  res.json({ message: `Interview scheduled for ${candidate} at ${company} on ${date}` });
};
