import { I18N, type I18nKey } from "../constants/i18n";
import { Payment } from "../types/payment";
import { format } from "date-fns";
import { Table, TableHeaderWrapper, TableHeaderRow, TableWrapper, TableHeader, TableBodyWrapper, TableRow, TableCell, StatusBadge } from "./components";

export const TableComponent = ({ headings, data }: { headings: readonly I18nKey[]; data: Payment[] }) => {
    return (
        <TableWrapper>
            <Table>
                <TableHeaderWrapper>
                    <TableHeaderRow>
                        {headings.map((heading) => (
                            <TableHeader key={heading}>{I18N[heading]}</TableHeader>
                        ))}
                    </TableHeaderRow>
                </TableHeaderWrapper>
                <TableBodyWrapper>
                    {data.map((payment) => (
                        <TableRow key={payment.id}>
                            <TableCell>{payment.id}</TableCell>
                            <TableCell>{format(new Date(payment.date), "dd/MM/yyyy, HH:mm:ss")}</TableCell>
                            <TableCell>{payment.amount.toFixed(2)}</TableCell>
                            <TableCell>{payment.customerName || I18N.EMPTY_CUSTOMER}</TableCell>
                            <TableCell>{payment.currency || I18N.EMPTY_CURRENCY}</TableCell>
                            <TableCell>
                                <StatusBadge status={payment.status}>{payment.status}</StatusBadge>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBodyWrapper>
            </Table>
        </TableWrapper>
    );
};