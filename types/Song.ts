import { Asset } from 'expo-media-library';
export type Song = Pick<
    Asset,
    'filename' | 'duration' | 'uri' | 'id' | 'creationTime'
> & {
    title: string;
    artist: string;
};
