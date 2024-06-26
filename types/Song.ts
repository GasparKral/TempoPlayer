import { Asset } from 'expo-media-library';
export type Song = Pick<Asset, 'filename' | 'duration' | 'uri' | 'id'> & {
    title: string;
    artist: string;
};
