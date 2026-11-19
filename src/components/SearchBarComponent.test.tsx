import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, expect, test, vi } from "vitest";
import { SearchBarComponent } from "./SearchBarComponent";
import { I18N } from "../constants/i18n";

describe("SearchBarComponent", () => {
  test("stores input changes and triggers search when the input changes", () => {
    const setSearchInput = vi.fn();
    const setSearch = vi.fn();

    render(
      <SearchBarComponent
        searchInput="pay_134_1"
        setSearchInput={setSearchInput}
        setSearch={setSearch}
        currency=""
        setCurrency={vi.fn()}
      />
    );

    const input = screen.getByPlaceholderText(I18N.SEARCH_PLACEHOLDER);
    expect(input).toHaveValue("pay_134_1");

    fireEvent.change(input, { target: { value: "pay_205_1" } });
    expect(setSearchInput).toHaveBeenCalledWith("pay_205_1");

    fireEvent.click(screen.getByRole("button", { name: I18N.SEARCH_BUTTON }));
    expect(setSearch).toHaveBeenCalledWith("pay_134_1");
  });

  test("stores currency selection", () => {
    const setCurrency = vi.fn();

    render(
      <SearchBarComponent searchInput="" setSearchInput={vi.fn()} setSearch={vi.fn()} currency="" setCurrency={setCurrency} />
    );

    fireEvent.change(screen.getByRole("combobox", { name: I18N.CURRENCY_FILTER_LABEL }), { target: { value: "USD" } });
    expect(setCurrency).toHaveBeenCalledWith("USD");
  });

  test("hides the clear button when there are no filters", () => {
    render(<SearchBarComponent searchInput="" setSearchInput={vi.fn()} setSearch={vi.fn()} currency="" setCurrency={vi.fn()} />);

    expect(screen.queryByRole("button", { name: I18N.CLEAR_FILTERS })).not.toBeInTheDocument();
  });

  test("shows the clear button when only the currency filter is active", () => {
    render(<SearchBarComponent searchInput="" setSearchInput={vi.fn()} setSearch={vi.fn()} currency="USD" setCurrency={vi.fn()} />);

    expect(screen.getByRole("button", { name: I18N.CLEAR_FILTERS })).toBeInTheDocument();
  });

  test("clears the search input, applied search, and currency when clicked", () => {
    const setSearchInput = vi.fn();
    const setSearch = vi.fn();
    const setCurrency = vi.fn();

    render(
      <SearchBarComponent
        searchInput="pay_134_1"
        setSearchInput={setSearchInput}
        setSearch={setSearch}
        currency="USD"
        setCurrency={setCurrency}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: I18N.CLEAR_FILTERS }));
    expect(setSearchInput).toHaveBeenCalledWith("");
    expect(setSearch).toHaveBeenCalledWith("");
    expect(setCurrency).toHaveBeenCalledWith("");
  });
});
