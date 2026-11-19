import { render, screen, waitFor, fireEvent } from "@testing-library/react";
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

  test("shows a not-found message when the searched payment ID returns 404", async () => {
    renderPage();

    fireEvent.change(screen.getByPlaceholderText(I18N.SEARCH_PLACEHOLDER), { target: { value: "pay_404" } });
    fireEvent.click(screen.getByRole("button", { name: I18N.SEARCH_BUTTON }));

    await waitFor(() => {
      expect(screen.getByText(I18N.PAYMENT_NOT_FOUND)).toBeInTheDocument();
    });
  });

  test("shows a server error message when the search returns 500", async () => {
    renderPage();

    fireEvent.change(screen.getByPlaceholderText(I18N.SEARCH_PLACEHOLDER), { target: { value: "pay_500" } });
    fireEvent.click(screen.getByRole("button", { name: I18N.SEARCH_BUTTON }));

    await waitFor(() => {
      expect(screen.getByText(I18N.INTERNAL_SERVER_ERROR)).toBeInTheDocument();
    });
  });
});
