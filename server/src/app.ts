import express from "express";
import cors from "cors";
import { getGames } from "./controllers/gameController";

const app = express();

const allowedOrigins = [
    "http://localhost:5173",         // Vite dev
    "https://enebatask.skalskis.me" // production
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

export default app;