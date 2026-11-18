import { I18N } from "../constants/i18n";
import { ClearButton, FilterRow, SearchButton, SearchInput } from "./components";

export const SearchBarComponent = ({ searchInput, setSearchInput, setSearch }: { searchInput: string; setSearchInput: (value: string) => void; setSearch: (value: string) => void }) => {

    const handleClear = () => {
        setSearchInput("");
        setSearch("");
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
            <SearchButton onClick={() => setSearch(searchInput)}>{I18N.SEARCH_BUTTON}</SearchButton>
            {searchInput.length > 0 && <ClearButton onClick={handleClear}>{I18N.CLEAR_FILTERS}</ClearButton>}
        </FilterRow>
    );
}