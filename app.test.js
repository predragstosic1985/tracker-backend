/* eslint-disable no-undef */
const supertest = require("supertest");
const app = require("./routes");

jest.mock("firebase-admin", () => ({
  ...jest.requireActual("firebase-admin"),
  initializeApp: jest.fn(),
  firestore: jest.fn(),
}));

describe("Initial test", () => {
  const agent = supertest(app);

  it("should fetch main route - GET", async () => {
    await agent
      .get("/")
      .expect(200)
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual({ message: "Welcome to firebase." });
      });
  });
});
