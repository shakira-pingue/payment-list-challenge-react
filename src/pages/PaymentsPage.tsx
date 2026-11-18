import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../constants";
import { I18N } from "../constants/i18n";
import { PaymentSearchResponse } from "../types/payment";
import {
  Container,
  Title,
  Spinner,
} from "../components/components";
import { TableComponent } from "../components/TableComponent";

const PAGE_SIZE = 5;

export const PaymentsPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["payments"],
    queryFn: () =>
      axios
        .get<PaymentSearchResponse>(API_URL, { params: { page: 1, pageSize: PAGE_SIZE } })
        .then((res) => res.data),
  });

  return (
    <Container>
      <Title>{I18N.PAGE_TITLE}</Title>
      {isLoading && <Spinner />}
      {/* should spinner be inside table */}
      {!isLoading && data && (
        <TableComponent headings={["TABLE_HEADER_PAYMENT_ID", "TABLE_HEADER_DATE", "TABLE_HEADER_AMOUNT", "TABLE_HEADER_CUSTOMER", "TABLE_HEADER_CURRENCY", "TABLE_HEADER_STATUS"]} data={data.payments} />
      )}
    </Container>
  );
};
