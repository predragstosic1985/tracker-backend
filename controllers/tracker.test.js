/* eslint-disable no-undef */
const supertest = require("supertest");
const app = require("../routes");

const mockGetFn = jest.fn();
const mockDocFn = jest.fn();
const mockAddFn = jest.fn();
const mockUpdateFn = jest.fn();
const mockDeleteFn = jest.fn();
jest.mock("firebase-admin", () => ({
  ...jest.requireActual("firebase-admin"),
  initializeApp: jest.fn(),
  firestore: () => ({
    collection: () => ({
      doc: mockDocFn,
      get: mockGetFn,
      add: mockAddFn,
      delete: mockDeleteFn,
    }),
  }),
}));

describe("Initial test", () => {
  const agent = supertest(app);
  const mocNewData = {
    id: "fakeId",
    firstName: "fakeFirstName",
    lastName: "fakeLastName",
    username: "fakeUsername",
    email: "fakeEmail",
    password: "fakePassword",
    role: "userRole",
    measurements: "fakeMeasurements",
  };

  afterEach(async () => {
    jest.clearAllMocks();
  });
  it("should get users - empty DB", async () => {
    mockGetFn.mockResolvedValue({ empty: true });

    await agent
      .get("/api/tracker/read")
      .expect(404)
      .then((response) => {
        expect(response.statusCode).toEqual(404);
        expect(response.text).toEqual("No record found");
      });
  });
  it("should get users ", async () => {
    const mockData = {
      docID: "sLtdwfGl8eLoB2VSXbJE",
      id: "b005f030-18fa-4223-9bdd-1dc8808b2a39",
      firstName: "John123",
      lastName: "Doe",
      username: "user",
      email: "user@auth.com",
      password: "user",
      measurements: [
        {
          weight: 85,
          date: "22.09.2021 10.00",
        },
        {
          date: "22.09.2021 11.00",
          weight: 84,
        },
      ],
      data: jest.fn().mockReturnValue("something"),
    };
    mockGetFn.mockResolvedValue([mockData]);

    await agent
      .get("/api/tracker/read")
      .expect(200)
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual([{ docID: mockData.id }]);
      });
  });
  it("should get users - error", async () => {
    mockGetFn.mockRejectedValue(new Error("some error"));

    await agent
      .get("/api/tracker/read")
      .expect(500)
      .then((response) => {
        expect(response.statusCode).toEqual(500);
        expect(response.text).toEqual("some error");
      });
  });

  it("should get user - empty DB", async () => {
    mockGetFn.mockResolvedValue({ exists: false });
    mockDocFn.mockResolvedValue({ get: mockGetFn });

    await agent
      .get("/api/tracker/read/1")
      .expect(404)
      .then((response) => {
        expect(response.statusCode).toEqual(404);
        expect(response.text).toEqual("User with the given ID was not found");
      });
  });
  it("should get user ", async () => {
    const mockData = {
      docID: "sLtdwfGl8eLoB2VSXbJE",
      id: "b005f030-18fa-4223-9bdd-1dc8808b2a39",
      firstName: "John123",
      lastName: "Doe",
      username: "user",
      email: "user@auth.com",
      password: "user",
      measurements: [
        {
          weight: 85,
          date: 1632194345111,
        },
        {
          date: 1632194345000,
          weight: 84,
        },
      ],
      exists: true,
      data: jest.fn().mockReturnValue("something"),
    };
    mockGetFn.mockResolvedValue(mockData);
    mockDocFn.mockResolvedValue({ get: mockGetFn });
    await agent
      .get("/api/tracker/read/1")
      .expect(200)
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual({ docID: mockData.id });
      });
  });
  it("should get users - error", async () => {
    mockDocFn.mockRejectedValue(new Error("some error"));

    await agent
      .get("/api/tracker/read/1")
      .expect(500)
      .then((response) => {
        expect(response.statusCode).toEqual(500);
        expect(response.text).toEqual("some error");
      });
  });

  it("should add user ", async () => {
    mockAddFn.mockResolvedValue();

    await agent
      .post("/api/tracker/create")
      .send(mocNewData)
      .expect(200)
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.text).toEqual(
          JSON.stringify({ message: "saved successfully" })
        );
      });
  });
  it("should add user - some Error", async () => {
    mockAddFn.mockRejectedValue(new Error("some error"));

    await agent
      .post("/api/tracker/create")
      .send(mocNewData)
      .expect(500)
      .then((response) => {
        expect(response.statusCode).toEqual(500);
        expect(response.text).toEqual("some error");
      });
  });

  it("should update user - no User with given id", async () => {
    mockGetFn.mockResolvedValue({ exists: false });
    mockDocFn.mockResolvedValue({ get: mockGetFn });

    await agent
      .put("/api/tracker/update/1")
      .send(mocNewData)
      .expect(404)
      .then((response) => {
        expect(response.statusCode).toEqual(404);
        expect(response.text).toEqual("User with the given ID was not found");
      });
  });
  it("should update user ", async () => {
    const mockDBData = {
      docID: "sLtdwfGl8eLoB2VSXbJE",
      id: "b005f030-18fa-4223-9bdd-1dc8808b2a39",
      firstName: "John123",
      lastName: "Doe",
      username: "user",
      email: "user@auth.com",
      password: "user",
      measurements: [
        {
          weight: 85,
          date: 1632194345111,
        },
        {
          date: 1632194345000,
          weight: 84,
        },
      ],
      exists: true,
      data: jest.fn().mockReturnValue("something"),
    };

    mockGetFn.mockResolvedValue(mockDBData);
    mockDocFn.mockResolvedValue({ get: mockGetFn, update: mockUpdateFn });
    mockUpdateFn.mockResolvedValue();
    await agent
      .put("/api/tracker/update/1")
      .send(mocNewData)
      .expect(200)
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.text).toEqual("Record updated successfuly");
      });
  });
  it("should update user - error", async () => {
    mockDocFn.mockRejectedValue(new Error("some error"));

    await agent
      .put("/api/tracker/update/1")
      .send(mocNewData)
      .expect(500)
      .then((response) => {
        expect(response.statusCode).toEqual(500);
        expect(response.text).toEqual("some error");
      });
  });

  it("should delete user - no User with given id", async () => {
    mockGetFn.mockResolvedValue({ exists: false });
    mockDocFn.mockResolvedValue(null);

    await agent
      .delete("/api/tracker/delete/1")
      .expect(404)
      .then((response) => {
        expect(response.statusCode).toEqual(404);
        expect(response.text).toEqual("User with the given ID was not found");
      });
  });
  it("should delete user ", async () => {
    mockDocFn.mockResolvedValue({ delete: mockDeleteFn }); //({exists: true, delete: mockDeleteFn });
    mockDeleteFn.mockResolvedValue();
    await agent
      .delete("/api/tracker/delete/1")
      .expect(200)
      .then((response) => {
        expect(response.statusCode).toEqual(200);
        expect(response.text).toEqual("Record deleted successfuly");
      });
  });
  it("should delete users - error", async () => {
    mockDocFn.mockRejectedValue(new Error("some error"));

    await agent
      .delete("/api/tracker/delete/1")
      .expect(500)
      .then((response) => {
        expect(response.statusCode).toEqual(500);
        expect(response.text).toEqual("some error");
      });
  });
});
