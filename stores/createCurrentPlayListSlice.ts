import type { Playlist } from 'types/Playlist.ts';

import { StateCreator } from 'zustand';

export type CurrentPlayListSliceState = {
    currentPlaylist?: Playlist;
    replayType: 'random' | 'normal' | 'loop';
};

export type CurrentPlayListSliceAccion = {
    setCurrentPlaylist: (playlist: Playlist) => void;
    setReplayType: (replayType: 'random' | 'normal' | 'loop') => void;
};

export const createCurrentPlayListSlice: StateCreator<
    CurrentPlayListSliceState & CurrentPlayListSliceAccion
> = (set, get) => ({
    currentPlaylist: undefined,
    replayType: 'normal',

    setCurrentPlaylist: (playlist) => set({ currentPlaylist: playlist }),
    setReplayType: (replayType) => set({ replayType }),
});
