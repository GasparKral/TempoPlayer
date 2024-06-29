import type { Config } from 'types/Config';
import type { Song } from 'types/Song';

import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';

/**
 * Checks if the given songName is in the blackListWords array.
 *
 * @param {string} songName - The name of the song to check.
 * @param {string[]} blackListWords - Array of words to check against.
 * @return {boolean} Returns true if the songName is in the blackListWords array, false otherwise.
 */
const is_in_black_list = (
    songName: string,
    blackListWords: string[]
): boolean => {
    return blackListWords.some((word) => songName.includes(word));
};

const requestPermission = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    return status === 'granted';
};

const readFiles = async (config: Config) => {
    const hasPermission = await requestPermission();
    if (hasPermission) {
        const musicFiles = await MediaLibrary.getAssetsAsync({
            mediaType: 'audio',
            first: 1000,
        });

        const { minDurationAudio, maxDurationAudio, blackListWords } = config;

        // Filter files
        const mp3Files = musicFiles.assets.filter((song) => {
            return (
                song.duration >= minDurationAudio &&
                song.duration <= maxDurationAudio &&
                !is_in_black_list(song.filename, blackListWords)
            );
        });

        const mappedSongs = await readMappedSongs();
        mp3Files.forEach((file) => {
            if (!mappedSongs.has(file.id)) {
                mappedSongs.set(file.id, {
                    filename: file.filename,
                    duration: file.duration,
                    uri: file.uri,
                    id: file.id,
                    title: file.filename
                        .replace(/\..*$/, '')
                        .replaceAll('_', ' ')
                        .trim(), // Elimina la extensión del archivo para obtener el título
                    artist: '<unknown>',
                    creationTime: file.creationTime,
                });
            }
        });

        return mappedSongs;
    }
};

const readMappedSongs = async (): Promise<Map<string, Song>> => {
    const songsMap = new Map<string, Song>();
    try {
        const songCachedFile = await FileSystem.readAsStringAsync(
            `${FileSystem.documentDirectory}cachedSongFile.csv`
        );

        if (!songCachedFile) {
            return songsMap;
        }

        songCachedFile
            .split('\n')
            .map((song) => {
                const [
                    filename,
                    duration,
                    uri,
                    id,
                    title,
                    artist,
                    creationTime,
                ] = song.split(',');
                return {
                    filename,
                    duration: Number(duration),
                    uri,
                    id,
                    title,
                    artist,
                    creationTime: Number(creationTime),
                } as Song;
            })
            .forEach((song) => {
                songsMap.set(song.id, song);
            });
    } catch (error) {
        console.warn('Error reading cached songs file:', error);

        // Crear el archivo de caché si no existe
        try {
            await FileSystem.writeAsStringAsync(
                `${FileSystem.documentDirectory}cachedSongFile.csv`,
                ''
            );
            console.log('Cached songs file created.');
        } catch (writeError) {
            console.error('Error creating cached songs file:', writeError);
        }
    }

    return songsMap;
};

export const loadSongs = async (config: Config): Promise<Map<string, Song>> => {
    const songsMap = await readFiles(config);
    return songsMap == undefined ? new Map<string, Song>() : songsMap;
};
