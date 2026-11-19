import { CURRENCIES } from "../constants";
import { I18N } from "../constants/i18n";
import { ClearButton, FilterRow, SearchButton, SearchInput, Select } from "./components";

export const SearchBarComponent = ({
    searchInput,
    setSearchInput,
    setSearch,
    currency,
    setCurrency,
}: {
    searchInput: string;
    setSearchInput: (value: string) => void;
    setSearch: (value: string) => void;
    currency: string;
    setCurrency: (value: string) => void;
}) => {

    const hasFilters = searchInput.length > 0 || currency.length > 0;

    const handleClear = () => {
        setSearchInput("");
        setSearch("");
        setCurrency("");
    };

    return (
        <FilterRow>
            <SearchInput
                type="text"
                placeholder={I18N.SEARCH_PLACEHOLDER}
                aria-label={I18N.SEARCH_LABEL}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
            />
            <Select aria-label={I18N.CURRENCY_FILTER_LABEL} value={currency} onChange={(e) => setCurrency(e.target.value)}>
                <option value="">{I18N.CURRENCIES_OPTION}</option>
                {CURRENCIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                ))}
            </Select>
            <SearchButton onClick={() => setSearch(searchInput)}>{I18N.SEARCH_BUTTON}</SearchButton>
            {hasFilters && <ClearButton onClick={handleClear}>{I18N.CLEAR_FILTERS}</ClearButton>}
        </FilterRow>
    );
}