import express from "express";
import cors from "cors";
import { rateLimit } from 'express-rate-limit';
import { getGames } from "./controllers/gameController";
import dotenv from 'dotenv/config';

const app = express();

const limiter = rateLimit({
	windowMs: 60 * 1000, // 1 minute
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 1 minute).
	standardHeaders: 'draft-7', // bpr: draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    message: { error: "Too many requests, please try again later." }
});

// Apply the rate limiting middleware to all requests.
app.use(limiter);

const allowedOrigins = [
    "http://localhost:5173",       // Vite dev
    process.env.PRODUCTION_ORIGIN // production
];

app.use(cors({
    origin: (origin, callback) => {
        // allow non-browser tools (curl, Postman, server-to-server)
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET"],
    allowedHeaders: ["Content-Type"],
}));

app.use(express.json());

app.get("/api/health", (req, res) => {
    res.json({status: "ok"});
});

app.get("/list", getGames);

// Centralized error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(`[Error] ${req.method} ${req.path}:`, err.message || err);

    // Handle JSON parsing errors specifically
    if (err instanceof SyntaxError && 'status' in err && err.status === 400 && 'body' in err) {
        return res.status(400).json({ error: "Invalid JSON payload" });
    }

    // Don't leak technical details in production
    const message = process.env.NODE_ENV === 'production' 
        ? "An internal server error occurred" 
        : err.message || "Internal server error";

    res.status(err.status || 500).json({ error: message });
});

export default app;