import queryString from 'query-string'; // Untuk membuat query string
import { create } from 'zustand';

type FilterProps = {
    filter: Record<string, any>; // 'string' sebagai key agar bisa fleksibel
    setFilter: (filterKey: string, type: string, value: any) => void;
    removeFilter: (filterKey: string) => void;
    clearFilters: () => void;
    toQueryString: () => string;
};

export const useFilterStore = create<FilterProps>((set, get) => ({
    // Inisialisasi state filter kosong
    filter: {},

    // Fungsi untuk mengupdate nested filter
    setFilter: (filterKey, type, value) =>
        set((state) => ({
            filter: {
                ...state.filter,
                [filterKey]: {
                    ...state.filter[filterKey], // Memastikan data yang sudah ada tidak hilang
                    [type]: value, // Meng-update hanya field yang spesifik
                },
            },
        })),

    // Fungsi untuk menghapus filter spesifik
    removeFilter: (filterKey) =>
        set((state) => {
            const newFilter = { ...state.filter };
            delete newFilter[filterKey];
            return { filter: newFilter };
        }),

    // Fungsi untuk membersihkan semua filter
    clearFilters: () => set({ filter: {} }),

    // Helper untuk mengonversi filter menjadi query string
    toQueryString: () => {
        const filters = get().filter;
        return queryString.stringify(filters, {
            skipEmptyString: true,
            skipNull: true,
        });
    },
}));
