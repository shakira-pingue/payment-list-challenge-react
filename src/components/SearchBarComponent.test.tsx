import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, expect, test, vi } from "vitest";
import { SearchBarComponent } from "./SearchBarComponent";
import { I18N } from "../constants/i18n";

describe("SearchBarComponent", () => {
  test("stores input changes and triggers search when the input changes", () => {
    const setSearchInput = vi.fn();
    const setSearch = vi.fn();

    render(<SearchBarComponent searchInput="pay_134_1" setSearchInput={setSearchInput} setSearch={setSearch} />);

    const input = screen.getByPlaceholderText(I18N.SEARCH_PLACEHOLDER);
    expect(input).toHaveValue("pay_134_1");

    fireEvent.change(input, { target: { value: "pay_205_1" } });
    expect(setSearchInput).toHaveBeenCalledWith("pay_205_1");

    fireEvent.click(screen.getByRole("button", { name: I18N.SEARCH_BUTTON }));
    expect(setSearch).toHaveBeenCalledWith("pay_134_1");
  });
});
