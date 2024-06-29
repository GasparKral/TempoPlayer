import type { Song } from 'types/Song';

import { StateCreator } from 'zustand';
export type UISliceState = {
    playListsUi: boolean;
    currentPlayListUi: boolean;
    currentSongUi: boolean;
    callingSong?: Song;
};

export type UISliceAccion = {
    showCurrentPlayListsUi: (currentPlayList: boolean) => void;
    showCurrentSongUi: (currentSong: boolean) => void;
    showPlayListsUi: (playLists: boolean) => void;
};

export const createUISlice: StateCreator<UISliceState & UISliceAccion> = (
    set
) => ({
    currentPlayListUi: false,
    currentSongUi: false,
    playListsUi: false,
    callingSong: undefined,

    showCurrentPlayListsUi: (currentPlayList) =>
        set({ currentPlayListUi: currentPlayList }),
    showCurrentSongUi: (currentSong) => set({ currentSongUi: currentSong }),
    showPlayListsUi: (playLists) => set({ playListsUi: playLists }),
});
