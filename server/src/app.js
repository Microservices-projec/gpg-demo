import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Basic routes
app.get('/', (req, res) => res.json({ message: 'API Works' }));
app.get('/api/health', (req, res) => res.json({ ok: true }));

// Import and use simple test routes
import authRoutes from './routes/auth.routes.js';
import userDataRoutes from './routes/userData.routes.js';

app.use('/api/auth', authRoutes);
app.use('/api/user', userDataRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});