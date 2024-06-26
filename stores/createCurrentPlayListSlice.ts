import type { Playlist } from 'types/Playlist.ts';

import { StateCreator } from 'zustand';

export type CurrentPlayListSliceState = {
    currentPlaylist?: Playlist;
};

export type CurrentPlayListSliceAccion = {
    setCurrentPlaylist: (playlist: Playlist) => void;
};

export const createCurrentPlayListSlice: StateCreator<
    CurrentPlayListSliceState & CurrentPlayListSliceAccion
> = (set, get) => ({
    currentPlaylist: undefined,
    setCurrentPlaylist: (playlist) => set({ currentPlaylist: playlist }),
});
