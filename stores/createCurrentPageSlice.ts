import { StateCreator } from 'zustand';

export type CurrentPageSliceState = {
    currentPage: string;
};

export type CurrentPageSliceAccion = {
    setCurrentPage: (currentPage: string) => void;
};

export const createCurrentPageSlice: StateCreator<
    CurrentPageSliceState & CurrentPageSliceAccion
> = (set, get) => ({
    currentPage: 'songs',
    setCurrentPage: (currentPage) => set({ currentPage }),
});
