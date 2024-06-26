import { useEffect } from 'react';
import { useGlobalStore } from '@stores/useGlobalStore';
import { Header } from '@components/Header';
import { CurrentSongPlayer } from '@components/CurrentSongPlayer';
import { View } from 'react-native';

import SongDisplay from '@components/pages/SongsDisplay';
import PlaylistDisplay from '@components/pages/PlaylistDisplay';
import ConfigDisplay from '@components/pages/ConfigDisplay';
import ArtistDisplay from '@components/pages/ArtisDisplay';

const loadPage = ({ currentPage }: { currentPage: string }) => {
    switch (currentPage) {
        case 'songs':
            return <SongDisplay />;
        case 'playlists':
            return <PlaylistDisplay />;
        case 'config':
            return <ConfigDisplay />;
        case 'artists':
            return <ArtistDisplay />;
        default:
            return <SongDisplay />;
    }
};

export default function App() {
    const { loadAndSaveSongs, currentPage, currentSong } = useGlobalStore();

    useEffect(() => {
        loadAndSaveSongs();
    }, [loadAndSaveSongs]);

    return (
        <View
            style={{
                height: '100%',
            }}
        >
            <Header />
            {loadPage({ currentPage })}
            {currentSong && <CurrentSongPlayer song={currentSong} />}
        </View>
    );
}
