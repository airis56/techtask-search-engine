import express from "express";
import cors from "cors";
import { getGames } from "./controllers/gameController";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
    res.json({status: "ok"});
});

app.get("/list", getGames);

export default app;