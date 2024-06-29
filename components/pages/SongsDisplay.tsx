import { FlatList } from 'react-native';
import { SongItem } from '@components/SongItems';
import { useGlobalStore } from '@stores/useGlobalStore';
import { useEffect } from 'react';

const SongDisplay = () => {
    const { songs, loadAndSaveSongs, isPlaying, config, currentSong } =
        useGlobalStore();

    useEffect(() => {
        loadAndSaveSongs();
    }, []);

    const songsArray = Array.from(songs.values())
        .map((song) => {
            return song;
        })
        .sort((a, b) => b.creationTime - a.creationTime);

    return (
        <FlatList
            contentContainerStyle={{
                gap: 10,
                padding: 10,
                backgroundColor: '#1c1c1c',
                paddingBottom: isPlaying ? 110 : 10,
            }}
            data={songsArray}
            renderItem={({ item }) => (
                <SongItem
                    song={item}
                    isPlaying={item.uri == currentSong?.uri}
                    color={config.mainColor}
                />
            )}
            keyExtractor={(item) => item.id.toString()}
        />
    );
};

export default SongDisplay;
