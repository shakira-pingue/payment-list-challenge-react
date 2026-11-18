import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, expect, test } from "vitest";
import { TableComponent } from "./TableComponent";
import { I18N } from "../constants/i18n";
import { mockPayments134 } from "../mocks/mockPaymentsData";

const payment = mockPayments134[0];

const headings = [
  "TABLE_HEADER_PAYMENT_ID",
  "TABLE_HEADER_DATE",
  "TABLE_HEADER_AMOUNT",
  "TABLE_HEADER_CUSTOMER",
  "TABLE_HEADER_CURRENCY",
  "TABLE_HEADER_STATUS",
] as const;

describe("TableComponent", () => {
  test("renders every heading and a full row per payment", () => {
    render(<TableComponent headings={headings} data={[payment]} />);

    headings.forEach((heading) => {
      expect(screen.getByText(I18N[heading])).toBeInTheDocument();
    });

    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(2);
    expect(rows[1].querySelectorAll("td")).toHaveLength(6);
    expect(screen.getByText("completed")).toBeInTheDocument();
  });
});
