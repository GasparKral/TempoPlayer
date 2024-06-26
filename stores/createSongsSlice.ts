import type { Song } from 'types/Song';

import { StateCreator } from 'zustand';

export type SongsSliceState = {
    songs: Map<String, Song>;
};

export type SongsSliceAccion = {
    setSongs: (songs: Map<String, Song>) => void;
};

export const createSongsSlice: StateCreator<
    SongsSliceState & SongsSliceAccion
> = (set, get) => ({
    songs: new Map(),
    setSongs: (songs) => set({ songs }),
});
