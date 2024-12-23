const request = require("supertest");
const express = require("express");
const sportsRoute = require("../api/routes/sportsRoute");

const app = express();
app.use(express.json());
app.use("/sports", sportsRoute);

// Mock database
const mockDb = {
  query: jest.fn(),
};

jest.mock("../db", () => ({
  query: (...args) => mockDb.query(...args),
}));

describe("Sports Routes", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /sports", () => {
    it("should fetch all sports", async () => {
      const mockSports = [
        { SportsID: 1, name: "Football", Type: "Outdoor" },
        { SportsID: 2, name: "Basketball", Type: "Indoor" },
      ];
      mockDb.query.mockResolvedValueOnce([mockSports]);

      const response = await request(app).get("/sports");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        count: 2,
        sports: mockSports,
      });
    });

    it("should return 404 if no sports are found", async () => {
      mockDb.query.mockResolvedValueOnce([[]]);

      const response = await request(app).get("/sports");
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "No sports found." });
    });

    it("should handle database errors", async () => {
      mockDb.query.mockRejectedValueOnce(new Error("Database error"));

      const response = await request(app).get("/sports");
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: "An error occurred while fetching sports." });
    });
  });

  describe("GET /sports/SportsID/:SportsID", () => {
    it("should fetch a sport by SportsID", async () => {
      const mockSport = { SportsID: 1, name: "Football", Type: "Outdoor" };
      mockDb.query.mockResolvedValueOnce([[mockSport]]);

      const response = await request(app).get("/sports/SportsID/1");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockSport);
    });

    it("should return 404 if no sport is found", async () => {
      mockDb.query.mockResolvedValueOnce([[]]);

      const response = await request(app).get("/sports/SportsID/999");
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "No sport found with ID 999." });
    });

    it("should handle database errors", async () => {
      mockDb.query.mockRejectedValueOnce(new Error("Database error"));

      const response = await request(app).get("/sports/SportsID/1");
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: "An error occurred while fetching the sport." });
    });
  });

  describe("GET /sports/type/:Type", () => {
    it("should fetch sports by Type", async () => {
      const mockSports = [
        { SportsID: 1, name: "Football", Type: "Outdoor" },
        { SportsID: 2, name: "Basketball", Type: "Outdoor" },
      ];
      mockDb.query.mockResolvedValueOnce([mockSports]);

      const response = await request(app).get("/sports/type/Outdoor");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        count: 2,
        sports: mockSports,
      });
    });

    it("should return 404 if no sports are found for the given type", async () => {
      mockDb.query.mockResolvedValueOnce([[]]);

      const response = await request(app).get("/sports/type/UnknownType");
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "No sports found for type UnknownType." });
    });

    it("should handle database errors", async () => {
      mockDb.query.mockRejectedValueOnce(new Error("Database error"));

      const response = await request(app).get("/sports/type/Outdoor");
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: "An error occurred while fetching sports by type." });
    });
  });
});
