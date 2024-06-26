import type { Song } from 'types/Song';

import { StateCreator } from 'zustand';
import { Audio } from 'expo-av';
import { useEffect } from 'react';

export type CurrentSongSliceState = {
    currentSong?: Song;
    currentSongTime: number;
    sound?: Audio.Sound;
    isPlaying: boolean;
};

export type CurrentSongSliceAccion = {
    setCurrentSong: (currentSong: Song) => void;
    setSound: (sound: Audio.Sound) => void;
    setIsPlaying: (isPlaying: boolean) => void;
    setTime: (time: number) => void;
    passTime: () => void;
    action: (song: Song) => Promise<void>;
};

export const createCurrentSongSlice: StateCreator<
    CurrentSongSliceState & CurrentSongSliceAccion
> = (set, get) => ({
    currentSong: undefined,
    currentSongTime: 0,
    sound: undefined,
    isPlaying: false,

    setCurrentSong(currentSong) {
        set({ currentSong });
    },
    setIsPlaying: (isPlaying) => set({ isPlaying }),
    setSound: (sound) => set({ sound, isPlaying: true }),
    setTime: (time) => set({ currentSongTime: time }),

    passTime: () => {
        const { currentSongTime, setTime, isPlaying } = get();
        if (isPlaying) {
            setTime(currentSongTime + 1);
        }
    },

    action: async (song) => {
        const {
            isPlaying,
            currentSong,
            sound,
            setSound,
            setIsPlaying,
            setCurrentSong,
        } = get();

        if (isPlaying && currentSong?.uri === song.uri) {
            setIsPlaying(false);
            await sound?.pauseAsync();
            return;
        } else if (!isPlaying && currentSong?.uri === song.uri) {
            setIsPlaying(true);
            await sound?.playAsync();
            return;
        } else {
            if (isPlaying && sound) {
                set({ isPlaying: false });
                await sound?.unloadAsync();
            }

            const { sound: newSound } = await Audio.Sound.createAsync(
                { uri: song.uri },
                { shouldPlay: true }
            );

            setCurrentSong(song);
            setSound(newSound);
        }
    },
});
