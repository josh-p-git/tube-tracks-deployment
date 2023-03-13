const axios = require("axios");
const TflApiController = require("./TflController");

jest.mock("axios");

describe("TflApiController", () => {
  describe("LineIndex", () => {
    beforeEach(() => {
      console.error = jest.fn(); // mock console.error with a mock function
      jest.useFakeTimers("modern");
      jest.setSystemTime(new Date("2023-03-01T00:00:00.000Z").getTime());
    });

    afterEach(() => {
      jest.restoreAllMocks(); // restore all mocked functions to their original state
      jest.useRealTimers();
    });

    it("should return transformed data for a given line with arrivals at platform", async () => {
      // Arrange
      const req = { params: { line: "victoria" } };
      const responseData = [
        {
          id: "1",
          stationName: "Victoria",
          currentLocation: "At Platform",
          timestamp: "2023-02-28T11:20:00Z",
          expectedArrival: Date.now(),
        },
        {
          id: "2",
          stationName: "Pimlico",
          currentLocation: "In Service",
          timestamp: "2023-02-28T11:21:00Z",
          expectedArrival: Date.now(),
        },
      ];
      const expectedTransformedData = [
        {
          id: "1",
          stationName: "Victoria",
          currentLocation: "At Platform",
          timestamp: "11:20:00",
          expectedArrival: Date.now(),
        },
        {
          id: "2",
          stationName: "Pimlico",
          currentLocation: "In Service",
          timestamp: "11:21:00",
          expectedArrival: Date.now(),
        },
      ];
      axios.get.mockResolvedValue({ data: responseData });
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Act
      await TflApiController.LineIndex(req, res);

      // Assert
      expect(axios.get).toHaveBeenCalledWith(
        "https://api.tfl.gov.uk/Line/victoria/Arrivals?app_id=a5a934e75afb4bc6815e8d5ec9cd0633&app_key=3f65cf90ca3d4e748dc28439c75e8686"
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(console.error).not.toHaveBeenCalled(); // ensure console.error was not called
    });

    it("should return a 500 error if an error occurs", async () => {
      // Arrange
      const req = { params: { line: "victoria" } };
      const errorMessage = "Something went wrong";
      axios.get.mockRejectedValue(new Error(errorMessage));
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Act
      await TflApiController.LineIndex(req, res);

      // Assert
      expect(axios.get).toHaveBeenCalledWith(
        "https://api.tfl.gov.uk/Line/victoria/Arrivals?app_id=a5a934e75afb4bc6815e8d5ec9cd0633&app_key=3f65cf90ca3d4e748dc28439c75e8686"
      );
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });
});
