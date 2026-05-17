import cors from 'cors';

const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173'];

export const corsMiddleware = cors({
    origin: (origin, callback) => {
        // allow requests with no origin (curl, Postman, mobile apps)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);
        callback(new Error(`CORS policy: origin ${origin} not allowed`));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
});
