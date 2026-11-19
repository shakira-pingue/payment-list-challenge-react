import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { httpClient } from "../api/httpClient";
import { API_URL } from "../constants";
import { I18N } from "../constants/i18n";
import { PaymentSearchResponse } from "../types/payment";
import { Container, Title, Spinner, Box, ErrorBox, TableWrapper } from "../components/components";
import { TableComponent } from "../components/TableComponent";
import { SearchBarComponent } from "../components/SearchBarComponent";
import { PaginationComponent } from "../components/PaginationComponent";

const PAGE_SIZE = 5;

export const PaymentsPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [currency, setCurrency] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useQuery({
    queryKey: ["payments", search, currency, page],
    queryFn: () =>
      httpClient
        .get<PaymentSearchResponse>(API_URL, { params: { search, currency, page, pageSize: PAGE_SIZE } })
        .then((res) => res.data),
  });

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleCurrencyChange = (value: string) => {
    setCurrency(value);
    setPage(1);
  };

  return (
    <Container>
      <Title>{I18N.PAGE_TITLE}</Title>
      <SearchBarComponent
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        setSearch={handleSearch}
        currency={currency}
        setCurrency={handleCurrencyChange}
      />
      <Box>{isLoading && <Spinner />}</Box>
      {error && <ErrorBox role="alert">{error.message}</ErrorBox>}
      {!isLoading && !error && data && (
        <TableWrapper>
          <TableComponent
            headings={["TABLE_HEADER_PAYMENT_ID", "TABLE_HEADER_DATE", "TABLE_HEADER_AMOUNT", "TABLE_HEADER_CUSTOMER", "TABLE_HEADER_CURRENCY", "TABLE_HEADER_STATUS"]}
            data={data.payments}
          />
          <PaginationComponent page={page} total={data.total} pageSize={PAGE_SIZE} onPageChange={setPage} />
        </TableWrapper>
      )}
    </Container>
  );
};
