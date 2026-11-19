import { I18N } from "../constants/i18n";
import { PaginationRow, PaginationButton } from "./components";

export const PaginationComponent = ({
    page,
    total,
    pageSize,
    onPageChange,
}: {
    page: number;
    total: number;
    pageSize: number;
    onPageChange: (page: number) => void;
}) => {
    return (
        <PaginationRow>
            <PaginationButton disabled={page === 1} onClick={() => onPageChange(page - 1)}>
                {I18N.PREVIOUS_BUTTON}
            </PaginationButton>
            <span>{I18N.PAGE_LABEL} {page}</span>
            <PaginationButton disabled={page * pageSize >= total} onClick={() => onPageChange(page + 1)}>
                {I18N.NEXT_BUTTON}
            </PaginationButton>
        </PaginationRow>
    );
};
