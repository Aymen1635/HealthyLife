const request = require("supertest");
const app = require("../index"); // Update with your app's entry point
const db = require("../../db");

jest.mock("../../db");

describe("Foods API Routes", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test GET: All foods
  it("GET / - should return all foods", async () => {
    db.query.mockResolvedValueOnce([
      [
        {
          FoodID: 1,
          IsApproved: "1",
          Type: "Breakfast",
          Name: "Eggs",
          Calories: 150,
          Fat: 10,
          Protein: 12,
          Carbohydrate: 1,
        },
      ],
    ]);

    const res = await request(app).get("/foods");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([
      {
        FoodID: 1,
        IsApproved: "1",
        Type: "Breakfast",
        Name: "Eggs",
        Calories: 150,
        Fat: 10,
        Protein: 12,
        Carbohydrate: 1,
      },
    ]);
  });

  // Test GET: Food by ID
  it("GET /:FoodID - should return food by ID", async () => {
    db.query.mockResolvedValueOnce([
      [
        {
          FoodID: 1,
          IsApproved: "1",
          Type: "Breakfast",
          Name: "Eggs",
          Calories: 150,
          Fat: 10,
          Protein: 12,
          Carbohydrate: 1,
        },
      ],
    ]);

    const res = await request(app).get("/foods/1");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      FoodID: 1,
      IsApproved: "1",
      Type: "Breakfast",
      Name: "Eggs",
      Calories: 150,
      Fat: 10,
      Protein: 12,
      Carbohydrate: 1,
    });
  });

  // Test POST: Create a new food
  it("POST / - should create a new food", async () => {
    db.execute.mockResolvedValueOnce({});

    const newFood = {
      IsApproved: "0",
      Type: "Lunch",
      Name: "Salad",
      Calories: 50,
      Fat: 1,
      Protein: 2,
      Carbohydrate: 10,
    };

    const res = await request(app).post("/foods").send(newFood);
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Başarıyla oluşturuldu.");
  });

  // Test PATCH: Update food by ID
  it("PATCH /:FoodID - should update food by ID", async () => {
    db.execute.mockResolvedValueOnce({});

    const updates = {
      IsApproved: "1",
      Type: "Dinner",
      Name: "Steak",
      Calories: 300,
      Fat: 20,
      Protein: 25,
      Carbohydrate: 0,
    };

    const res = await request(app).patch("/foods/1").send(updates);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Başarıyla güncelledi.");
  });

  // Test DELETE: Delete food by ID
  it("DELETE /:FoodID - should delete food by ID", async () => {
    db.execute.mockResolvedValueOnce({});

    const res = await request(app).delete("/foods/1");
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Başarıyla Silindi.");
  });

  // Test GET: Foods by Type
  it("GET /:Type - should return foods by type", async () => {
    db.query.mockResolvedValueOnce([
      [
        {
          FoodID: 2,
          IsApproved: "1",
          Type: "Lunch",
          Name: "Sandwich",
          Calories: 200,
          Fat: 5,
          Protein: 10,
          Carbohydrate: 30,
        },
      ],
    ]);

    const res = await request(app).get("/foods/Lunch");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      FoodID: 2,
      IsApproved: "1",
      Type: "Lunch",
      Name: "Sandwich",
      Calories: 200,
      Fat: 5,
      Protein: 10,
      Carbohydrate: 30,
    });
  });

  // Test GET: Approved/Not Approved
  it("GET /:IsApproved - should return approved foods", async () => {
    db.query.mockResolvedValueOnce([
      [
        {
          FoodID: 3,
          IsApproved: "1",
          Type: "Snack",
          Name: "Apple",
          Calories: 50,
          Fat: 0,
          Protein: 1,
          Carbohydrate: 12,
        },
      ],
    ]);

    const res = await request(app).get("/foods/IsApproved");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      FoodID: 3,
      IsApproved: "1",
      Type: "Snack",
      Name: "Apple",
      Calories: 50,
      Fat: 0,
      Protein: 1,
      Carbohydrate: 12,
    });
  });
});
