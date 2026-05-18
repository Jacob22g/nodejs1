import 'dotenv/config';
import express from 'express';
import {
    helmetMiddleware,
    corsMiddleware,
    morganMiddleware,
    rateLimiterMiddleware,
    errorHandlerMiddleware,
} from './middleware';
import itemsRoutes from "./routes/items.routes";
import authRouter from "./routes/auth.routes";

const app = express();
const PORT = process.env['PORT'] || 3000;

// ── Middleware ─────────────────────────────────────────
app.use(helmetMiddleware);
app.use(corsMiddleware);
app.use(morganMiddleware);
app.use(rateLimiterMiddleware);
app.use(express.json());

// ── Routes ─────────────────────────────────────────────
app.get('/', (_req, res) => res.json({ status: 'ok' }));
app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/auth',  authRouter);   // public
app.use('/items', itemsRoutes);  // protected

// ── Global error handler ───────────────────────────────
app.use(errorHandlerMiddleware);

// ── Start ──────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
