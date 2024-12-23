const request = require("supertest");
const express = require("express");
const db = require("../db");
const newsRoute = require("../api/routes/newsRoute");

jest.mock("../db");

const app = express();
app.use(express.json());
app.use("/news", newsRoute);

describe("News Routes", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await db.end(); // Ensure any open connections are closed
  });

  describe("GET /news", () => {
    it("should fetch all news items", async () => {
      const mockNews = [{ id: 1, title: "News 1" }, { id: 2, title: "News 2" }];
      db.query.mockResolvedValue([mockNews]);

      const response = await request(app).get("/news");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockNews);
    });

    it("should handle database errors", async () => {
      db.query.mockRejectedValue(new Error("Database error"));

      const response = await request(app).get("/news");
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: "Bir hata meydana geldi." });
    });
  });

  describe("GET /news/:NewsID", () => {
    it("should fetch news by ID", async () => {
      const mockNews = { id: 1, title: "News 1" };
      db.query.mockResolvedValue([[mockNews]]);

      const response = await request(app).get("/news/1");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockNews); // Expect single object
    });

    it("should return 404 if news is not found", async () => {
      db.query.mockResolvedValue([[]]);

      const response = await request(app).get("/news/999");
      expect(response.status).toBe(404);
      expect(response.body).toEqual({});
    });

    it("should handle database errors", async () => {
      db.query.mockRejectedValue(new Error("Database error"));

      const response = await request(app).get("/news/1");
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: "Bir hata meydana geldi." });
    });
  });

  describe("GET /news/sort/:SortBy", () => {
    it("should fetch news sorted by date", async () => {
      const mockNews = [{ id: 1, title: "News 1" }, { id: 2, title: "News 2" }];
      db.query.mockResolvedValue([mockNews]);

      const response = await request(app).get("/news/sort/date");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockNews);
    });

    it("should return 404 for invalid sort parameters", async () => {
      const response = await request(app).get("/news/sort/invalidSort");
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "Böyle bir sıralama yok" });
    });

    it("should handle database errors", async () => {
      db.query.mockRejectedValue(new Error("Database error"));

      const response = await request(app).get("/news/sort/date");
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: "Bir hata meydana geldi." });
    });
  });
});
