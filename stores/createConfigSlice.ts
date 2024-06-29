import type { Config } from 'types/Config';

import { StateCreator } from 'zustand';

export type ConfigSliceState = {
    config: Config;
};

export type ConfigSliceAccion = {
    setConfig: (config: Config) => void;
    setMinDurationAudio: (minDurationAudio: number) => void;
    setMaxDurationAudio: (maxDurationAudio: number) => void;
    setMainColor: (mainColor: string) => void;
    addBlackListWord: (blackListWord: string) => void;
    removeBlackListWord: (blackListWord: string) => void;
    setBlackListWords: (blackListWords: string[]) => void;
};

export const createConfigSlice: StateCreator<
    ConfigSliceState & ConfigSliceAccion
> = (set, get) => ({
    config: {
        minDurationAudio: 45,
        maxDurationAudio: 3600,
        blackListWords: ['AUD', '%'],
        mainColor: '#005AFF',
    },
    setConfig: (config: Config) => set({ config }),
    setMinDurationAudio: (minDurationAudio: number) =>
        set({ config: { ...get().config, minDurationAudio } }),
    setMaxDurationAudio: (maxDurationAudio: number) =>
        set({ config: { ...get().config, maxDurationAudio } }),
    setMainColor: (mainColor: string) =>
        set({ config: { ...get().config, mainColor } }),
    addBlackListWord: (blackListWord: string) =>
        set({
            config: {
                ...get().config,
                blackListWords: [...get().config.blackListWords, blackListWord],
            },
        }),
    removeBlackListWord: (blackListWord: string) =>
        set({
            config: {
                ...get().config,
                blackListWords: get().config.blackListWords.filter(
                    (word) => word != blackListWord
                ),
            },
        }),
    setBlackListWords: (blackListWords: string[]) =>
        set({ config: { ...get().config, blackListWords } }),
});
