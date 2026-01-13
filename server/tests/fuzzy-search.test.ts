import request from "supertest";
import app from "../src/app";

describe("Fuzzy search", () => {
    it("finds Red Dead Redemption 2 using alias 'rdr'", async () => {
        const res = await request(app).get("/list?search=rdr");

        const titles = res.body.map((g: any) => g.title);
        expect(titles).toContain("Red Dead Redemption 2");
    });

    it("handles typos in search", async () => {
        const res = await request(app).get("/list?search=red ded");

        expect(
            res.body.some((g: any) =>
                g.title.toLowerCase().includes("red dead")
            )
        ).toBe(true);
    });

    it("returns full list when search is empty", async () => {
        const res = await request(app).get("/list?search=");

        expect(res.body.length).toBeGreaterThan(0);
    });

    it("handles malicious input safely", async () => {
        const res = await request(app).get("/list?search=' OR 1=1 --");

        expect(res.status).toBe(200);
    });
});
