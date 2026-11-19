import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, expect, test, vi } from "vitest";
import { PaginationComponent } from "./PaginationComponent";
import { I18N } from "../constants/i18n";

describe("PaginationComponent", () => {
  test("disables Previous on page 1 and Next past the last page, enabling otherwise", () => {
    const onPageChange = vi.fn();
    render(<PaginationComponent page={1} total={10} pageSize={5} onPageChange={onPageChange} />);

    expect(screen.getByText(`${I18N.PAGE_LABEL} 1`)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: I18N.PREVIOUS_BUTTON })).toBeDisabled();
    expect(screen.getByRole("button", { name: I18N.NEXT_BUTTON })).toBeEnabled();

    fireEvent.click(screen.getByRole("button", { name: I18N.NEXT_BUTTON }));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  test("disables Next on the last page", () => {
    render(<PaginationComponent page={2} total={10} pageSize={5} onPageChange={vi.fn()} />);

    expect(screen.getByRole("button", { name: I18N.PREVIOUS_BUTTON })).toBeEnabled();
    expect(screen.getByRole("button", { name: I18N.NEXT_BUTTON })).toBeDisabled();
  });
});
