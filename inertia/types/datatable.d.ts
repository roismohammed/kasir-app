import { ColumnDef } from '@tanstack/react-table';

export type DatatableProps<TData> = {
    data: PaginatedData<TData>;
    columns: ColumnDef[];
};

export type PaginatedData<TData> = {
    data: TData[];
    links: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
    };

    meta: {
        current_page: number;
        from: number;
        last_page: number;
        path: string;
        per_page: number;
        to: number;
        total: number;

        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
    };
};
