import request from "supertest";
import app from "../src/app";

describe("GET /list", () => {
    it("returns a list of games", async () => {
        const res = await request(app).get("/list");

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it("returns JSON", async () => {
        const res = await request(app).get("/list");

        expect(res.headers["content-type"]).toContain("application/json");
    });
});
