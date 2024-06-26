import type { Config } from 'types/Config';

import { StateCreator } from 'zustand';

export type ConfigSliceState = {
    config: Config;
};

export type ConfigSliceAccion = {
    setConfig: (config: Config) => void;
};

export const createConfigSlice: StateCreator<
    ConfigSliceState & ConfigSliceAccion
> = (set, get) => ({
    config: {
        minDurationAudio: 45,
        maxDurationAudio: 600,
        blackListWords: ['AUD'],
    },
    setConfig: (config: Config) => set({ config }),
});
