import type { Playlist } from 'types/Playlist.ts';

import { StateCreator } from 'zustand';

export type PlayListsSliceState = {
    playlists: Playlist[];
};
export type PlayListsSliceAccion = {
    setPlaylists: (playlists: Playlist[]) => void;
};
export const createPlayListsSlice: StateCreator<
    PlayListsSliceState & PlayListsSliceAccion
> = (set, get) => ({
    playlists: [],
    setPlaylists: (playlists) => set({ playlists }),
});
