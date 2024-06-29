import 'react-native-gesture-handler';
import type { Playlist } from 'types/Playlist';

import React, { useEffect, useMemo } from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useGlobalStore } from '@stores/useGlobalStore';
import { Header } from '@components/Header';
import { CurrentSongPlayer } from '@components/CurrentSongPlayer';
import { ShowPlayLists } from '@components/ShowPlayLists';

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
    const {
        loadAndSaveSongs,
        currentPage,
        currentSong,
        setCurrentPlaylist,
        songs,
        playListsUi,
    } = useGlobalStore();

    useEffect(() => {
        loadAndSaveSongs();
    }, [loadAndSaveSongs]);

    useMemo(() => {
        const songsArray = Array.from(songs.values())
            .map((song) => {
                return song;
            })
            .sort((a, b) => b.creationTime - a.creationTime);

        const initPlayList: Playlist = { songs: songsArray };

        setCurrentPlaylist(initPlayList);
    }, [songs]);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View
                style={{
                    height: '100%',
                }}
            >
                <Header />
                {loadPage({ currentPage })}
                {currentSong && <CurrentSongPlayer song={currentSong} />}
                {playListsUi && <ShowPlayLists />}
            </View>
        </GestureHandlerRootView>
    );
}
