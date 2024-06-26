import { Button, View, TouchableWithoutFeedback } from 'react-native';
import { useGlobalStore } from '@stores/useGlobalStore';

import Color from 'color';
import Constants from 'expo-constants';
import SettingsIcon from 'assets/settings.svg';

export const Header = () => {
    const { setCurrentPage, currentPage, config } = useGlobalStore();

    return (
        <View
            style={{
                backgroundColor: '#1c1c1c',

                paddingTop: Constants.statusBarHeight + 10,
                paddingBottom: 10,
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                borderBottomColor: config.mainColor,
                borderBottomWidth: 1,
                height: Constants.statusBarHeight + 57,
                top: 0,
                zIndex: 10,
            }}
        >
            <Button
                color={
                    currentPage === 'songs'
                        ? config.mainColor
                        : Color(config.mainColor).desaturate(0.5).toString()
                }
                onPress={() => setCurrentPage('songs')}
                title='Canciones'
            />

            <Button
                color={
                    currentPage === 'playlists'
                        ? config.mainColor
                        : Color(config.mainColor).desaturate(0.5).toString()
                }
                onPress={() => setCurrentPage('playlists')}
                title='Playlists'
            />
            <Button
                color={
                    currentPage === 'artists'
                        ? config.mainColor
                        : Color(config.mainColor).desaturate(0.5).toString()
                }
                onPress={() => setCurrentPage('artists')}
                title='Artistas'
            />
            <TouchableWithoutFeedback onPress={() => setCurrentPage('config')}>
                <SettingsIcon
                    width={24}
                    height={24}
                    color={
                        currentPage === 'config' ? config.mainColor : '#fafafa'
                    }
                />
            </TouchableWithoutFeedback>
        </View>
    );
};
