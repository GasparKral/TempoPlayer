import { FlatList } from 'react-native';
import { SongItem } from '@components/SongItems';
import { useGlobalStore } from '@stores/useGlobalStore';
import { useEffect } from 'react';

export const SongDisplay = () => {
    const { songs, loadAndSaveSongs } = useGlobalStore();

    useEffect(() => {
        loadAndSaveSongs();
    }, []);

    const songsArray = Array.from(songs.values()).map((song) => {
        return song;
    });

    return (
        <FlatList
            contentContainerStyle={{
                gap: 10,
                padding: 10,
                backgroundColor: '#1c1c1c',
                paddingBottom: 100,
            }}
            data={songsArray}
            renderItem={({ item }) => <SongItem song={item} />}
            keyExtractor={(item) => item.id.toString()}
        />
    );
};
