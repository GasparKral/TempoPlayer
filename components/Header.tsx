import { Button, ScrollView } from 'react-native';
import { useGlobalStore } from '@stores/useGlobalStore';

import Constants from 'expo-constants';

export const Header = () => {
    const { setCurrentPage, currentPage } = useGlobalStore();

    return (
        <ScrollView
            scrollEnabled={true}
            horizontal={true}
            contentContainerStyle={{
                backgroundColor: '#1c1c1c',
                padding: 10,
                marginBottom: 10,
                paddingTop: Constants.statusBarHeight + 10,
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                columnGap: 20,
                height: Constants.statusBarHeight + 56,
            }}
        >
            <Button
                color={currentPage === 'songs' ? '#005AFF' : '#3e6dc2'}
                onPress={() => setCurrentPage('songs')}
                title='Canciones'
            />

            <Button
                color={currentPage === 'playlists' ? '#005AFF' : '#3e6dc2'}
                onPress={() => setCurrentPage('playlists')}
                title='Playlists'
            />
            <Button
                color={currentPage === 'artists' ? '#005AFF' : '#3e6dc2'}
                onPress={() => setCurrentPage('artists')}
                title='Artistas'
            />
            <Button
                color={currentPage === 'config' ? '#005AFF' : '#3e6dc2'}
                onPress={() => setCurrentPage('config')}
                title='Configuración'
            />
        </ScrollView>
    );
};
