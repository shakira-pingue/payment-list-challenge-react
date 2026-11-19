import { describe, test, expect, beforeAll, afterEach, afterAll } from "vitest";
import { http, HttpResponse } from "msw";
import { httpClient } from "./httpClient";
import { I18N } from "../constants/i18n";
import { server } from "../mocks/node";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("httpClient", () => {
  test("maps a 404 response to PAYMENT_NOT_FOUND", async () => {
    server.use(http.get("*/test-404", () => HttpResponse.json({}, { status: 404 })));
    await expect(httpClient.get("/test-404")).rejects.toThrow(I18N.PAYMENT_NOT_FOUND);
  });

  test("maps a 500 response to INTERNAL_SERVER_ERROR", async () => {
    server.use(http.get("*/test-500", () => HttpResponse.json({}, { status: 500 })));
    await expect(httpClient.get("/test-500")).rejects.toThrow(I18N.INTERNAL_SERVER_ERROR);
  });

  test("maps any other failure (e.g. 401) to SOMETHING_WENT_WRONG", async () => {
    server.use(http.get("*/test-401", () => HttpResponse.json({}, { status: 401 })));
    await expect(httpClient.get("/test-401")).rejects.toThrow(I18N.SOMETHING_WENT_WRONG);
  });
});
