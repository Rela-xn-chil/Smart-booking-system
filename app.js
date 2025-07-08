import express from 'express';
import dotenv from 'dotenv';
import { sequelize } from './models/index.js';
import authRoutes from './routes/authRoutes.js';
import protectedRoutes from './routes/protectedRoutes.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);

app.get('/', (req, res) => res.send('BookWise API Running'));

// DB connection
sequelize.authenticate()
  .then(() => console.log('✅ DB Connected'))
  .catch(err => console.error('❌ DB Connection failed:', err));

// Start the server unless in test mode
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

export default app; // ✅ MUST be at the top level, not inside any block
