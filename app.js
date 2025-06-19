const express = require('express');
require('dotenv').config();
const { sequelize } = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => res.send('BookWise API Running'));

sequelize.authenticate()
  .then(() => console.log('✅ DB Connected'))
  .catch(err => console.error('❌ DB Connection failed:', err));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
