/**
 * @jest-environment node
 */
import { refineCatchedErr } from "@/src/lib/http-client";
import { nextResponseFailed, nextResponseSuccess } from "./utils";

jest.mock("@/src/lib/http-client", () => ({
  refineCatchedErr: jest.fn(),
}));

const mockedRefineCatchedErr = refineCatchedErr as jest.MockedFunction<
  typeof refineCatchedErr
>;

describe("nextResponseSuccess", () => {
  it("returns success payload with default 200 status", async () => {
    const data = { id: 1, name: "test" };
    const response = nextResponseSuccess(data);

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      success: true,
      data,
    });
  });

  it("returns success payload with custom status", async () => {
    const data = { created: true };
    const response = nextResponseSuccess(data, 201);

    expect(response.status).toBe(201);
    await expect(response.json()).resolves.toEqual({
      success: true,
      data,
    });
  });
});

describe("nextResponseFailed", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns failed payload from refined error", async () => {
    const err = new Error("something broke");
    const id = "login-api";

    mockedRefineCatchedErr.mockReturnValue({
      message: "Request failed",
      status: 500,
    } as ReturnType<typeof refineCatchedErr>);

    const response = nextResponseFailed(err, id);

    expect(mockedRefineCatchedErr).toHaveBeenCalledWith(err, id);
    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      success: false,
      message: "Request failed",
    });
  });

  it("uses status and message from refined http error", async () => {
    const err = new Error("not found");
    const id = "user-api";

    mockedRefineCatchedErr.mockReturnValue({
      message: "Fetch failed: 404 Not Found",
      status: 404,
    } as ReturnType<typeof refineCatchedErr>);

    const response = nextResponseFailed(err, id);

    expect(response.status).toBe(404);
    await expect(response.json()).resolves.toEqual({
      success: false,
      message: "Fetch failed: 404 Not Found",
    });
  });
});
