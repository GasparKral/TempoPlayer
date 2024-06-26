import { useEffect } from 'react';
import { useGlobalStore } from '@stores/useGlobalStore';
import { Header } from '@components/Header';
import { CurrentSongPlayer } from '@components/CurrentSongPlayer';
import { SongDisplay } from '@components/pages/SongsDisplay';
import { PlaylistDisplay } from '@components/pages/PlaylistDisplay';

const loadPage = ({ currentPage }: { currentPage: string }) => {
    switch (currentPage) {
        case 'songs':
            return <SongDisplay />;
        case 'playlists':
            return <PlaylistDisplay />;
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
        <>
            <Header />
            {loadPage({ currentPage })}
            {currentSong && <CurrentSongPlayer song={currentSong} />}
        </>
    );
}
