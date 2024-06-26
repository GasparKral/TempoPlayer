import type { Song } from 'types/Song';
export type Playlist = {
    id: number;
    name: string;
    songs: Song[];
};
