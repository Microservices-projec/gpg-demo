import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';


import authRoutes from './routes/auth.routes.js';
import userDataRoutes from './routes/userData.routes.js';


dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }));
app.use(express.json());
app.use(cookieParser());


app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.use('/api/auth', authRoutes);
app.use('/api', userDataRoutes);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 API on http://localhost:${PORT}`));