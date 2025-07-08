export const adminDashboard = (req, res) => {
  res.json({ message: `Welcome, Admin ${req.user.name}` });
};
