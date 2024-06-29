import type { Playlist } from 'types/Playlist';
import type { Song } from 'types/Song';

import { StateCreator } from 'zustand';

export type PlayListsSliceState = {
    playlists: Playlist[];
};
export type PlayListsSliceAccion = {
    setPlaylists: (playlists: Playlist[]) => void;
    addSongToPlaylist: (playlistId: number, song: Song) => void;
};
export const createPlayListsSlice: StateCreator<
    PlayListsSliceState & PlayListsSliceAccion
> = (set, get) => ({
    playlists: [],
    setPlaylists: (playlists) => set({ playlists }),
    addSongToPlaylist: (playlistId: number, song: Song) => {
        const playlists = get().playlists.map((playlist) => {
            if (playlist.id === playlistId) {
                return {
                    ...playlist,
                    songs: [...playlist.songs, song],
                };
            }
            return playlist;
        });
        set({ playlists });
    },
});
