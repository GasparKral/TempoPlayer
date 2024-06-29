import type { Song } from 'types/Song';
import {
    createConfigSlice,
    ConfigSliceAccion,
    ConfigSliceState,
} from '@stores/createConfigSlice';
import {
    createCurrentPlayListSlice,
    CurrentPlayListSliceAccion,
    CurrentPlayListSliceState,
} from '@stores/createCurrentPlayListSlice';
import {
    createCurrentSongSlice,
    CurrentSongSliceAccion,
    CurrentSongSliceState,
} from '@stores/createCurrentSongSlice';
import {
    createPlayListsSlice,
    PlayListsSliceAccion,
    PlayListsSliceState,
} from '@stores/createPlayListsSlice';
import {
    createSongsSlice,
    SongsSliceAccion,
    SongsSliceState,
} from '@stores/createSongsSlice';

import {
    createCurrentPageSlice,
    CurrentPageSliceAccion,
    CurrentPageSliceState,
} from '@stores/createCurrentPageSlice';

import { create, StateCreator } from 'zustand';
import { saveSongs } from '@hooks/function/saveSongs';
import { loadSongs } from '@hooks/function/loadSongs';

type GlobalStore = SongsSliceState &
    SongsSliceAccion &
    ConfigSliceState &
    ConfigSliceAccion &
    CurrentPlayListSliceState &
    CurrentPlayListSliceAccion &
    CurrentSongSliceState &
    CurrentSongSliceAccion &
    CurrentPageSliceState &
    CurrentPageSliceAccion &
    PlayListsSliceState &
    PlayListsSliceAccion & {
        loadAndSaveSongs: () => Promise<void>;
        nextSong: () => Promise<void>;
    };

const createRootSlice: StateCreator<GlobalStore> = (set, get, api) => ({
    ...createSongsSlice(set, get, api),
    ...createConfigSlice(set, get, api),
    ...createCurrentPlayListSlice(set, get, api),
    ...createCurrentSongSlice(set, get, api),
    ...createPlayListsSlice(set, get, api),
    ...createCurrentPageSlice(set, get, api),

    loadAndSaveSongs: async () => {
        const { config, setSongs } = get();
        const songs = await loadSongs(config);
        setSongs(songs);
        // await saveSongs(songs);
    },

    nextSong: async () => {
        const { currentSong, currentPlaylist, replayType } = get();

        if (currentPlaylist) {
            let nextSongIndex: number | undefined;

            if (replayType === 'random') {
                nextSongIndex = Math.floor(
                    Math.random() * currentPlaylist.songs.length
                );
            }
            if (replayType === 'normal') {
                nextSongIndex =
                    currentPlaylist.songs.indexOf(currentSong as Song) + 1;
            }
            if (replayType === 'loop') {
                nextSongIndex = currentPlaylist.songs.indexOf(
                    currentSong as Song
                );
            }

            if (nextSongIndex) {
                const { action } = get();
                const nextSong = currentPlaylist.songs[nextSongIndex];
                await action(nextSong);
            }
        }
    },
});

export const useGlobalStore = create<GlobalStore>(createRootSlice);
