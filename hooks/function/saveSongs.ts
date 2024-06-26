import type { Song } from 'types/Song';

import * as FileSystem from 'expo-file-system';

export const saveSongs = async (songs: Map<string, Song>): Promise<void> => {
    if (songs.size === 0) {
        return;
    }

    try {
        const filePath = `${FileSystem.documentDirectory}cachedSongFile.csv`;

        const stringifiedMap = [...songs.entries()]
            .map(([filename, song]) => {
                const { duration, uri, id, title, artist } = song;
                return `${filename},${duration},${uri},${id},${title},${artist}`;
            })
            .join('\n');

        FileSystem.writeAsStringAsync(filePath, stringifiedMap, {
            encoding: FileSystem.EncodingType.UTF8,
        });
    } catch (error) {}
};
