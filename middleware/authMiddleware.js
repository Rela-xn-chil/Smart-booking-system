import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  const header = req.headers['authorization'];
  const token = header?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access token missing' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(403).json({ error: 'Invalid token' });
  }
};

export const authorizeRole = (role) => (req, res, next) => {
  if (req.user.role !== role)
    return res.status(403).json({ error: 'Forbidden: insufficient role' });
  next();
};
