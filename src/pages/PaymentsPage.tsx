import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../constants";
import { I18N } from "../constants/i18n";
import { PaymentSearchResponse } from "../types/payment";
import { Container, Title, Spinner, FlexRow, Box } from "../components/components";
import { TableComponent } from "../components/TableComponent";
import { SearchBarComponent } from "../components/SearchBarComponent";

const PAGE_SIZE = 5;

export const PaymentsPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["payments", search],
    queryFn: () =>
      axios
        .get<PaymentSearchResponse>(API_URL, { params: { search, page: 1, pageSize: PAGE_SIZE } })
        .then((res) => res.data),
  });

  return (
    <Container>
      <Title>{I18N.PAGE_TITLE}</Title>
      <SearchBarComponent searchInput={searchInput} setSearchInput={setSearchInput} setSearch={setSearch} />
      <Box>{isLoading && <Spinner />}</Box>
      {!isLoading && data && (
        <TableComponent headings={["TABLE_HEADER_PAYMENT_ID", "TABLE_HEADER_DATE", "TABLE_HEADER_AMOUNT", "TABLE_HEADER_CUSTOMER", "TABLE_HEADER_CURRENCY", "TABLE_HEADER_STATUS"]} data={data.payments} />
      )}
    </Container>
  );
};
