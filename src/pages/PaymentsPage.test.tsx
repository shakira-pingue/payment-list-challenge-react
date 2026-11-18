import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { afterAll, afterEach, beforeAll, describe, expect, test } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PaymentsPage } from "./PaymentsPage";
import { I18N } from "../constants/i18n";
import { server } from "../mocks/node";

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

const renderPage = () =>
  render(
    <QueryClientProvider client={queryClient}>
      <PaymentsPage />
    </QueryClientProvider>
  );

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("PaymentsPage", () => {
  test("renders the title and search bar immediately, then the fetched payments", async () => {
    renderPage();

    expect(screen.getByText(I18N.PAGE_TITLE)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(I18N.SEARCH_PLACEHOLDER)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("pay_134_1")).toBeInTheDocument();
    });
  });
});
