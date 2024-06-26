import type { Song } from 'types/Song';

import { useGlobalStore } from '@stores/useGlobalStore';
import { View, TouchableOpacity, Text } from 'react-native';
import { CurrentSongTime } from './CurrenSongTime';

import PlayIcon from 'assets/play.svg';
import StopIcon from 'assets/pause.svg';

export const CurrentSongPlayer = ({ song }: { song: Song }) => {
    const { action, isPlaying } = useGlobalStore();

    return (
        <View
            style={{
                position: 'absolute',
                bottom: 0,
                padding: 20,
                paddingTop: 10,
                backgroundColor: '#1c1c1c',
                flexDirection: 'row',
                borderTopWidth: 2,
                borderTopColor: '#005AFF',
                gap: 15,
                height: 100,
                alignItems: 'center',
            }}
        >
            <TouchableOpacity
                onPress={() => action(song)}
                style={{
                    backgroundColor: '#3c3c3c',
                    padding: 5,
                    borderRadius: 100,
                    maxHeight: 60,
                    zIndex: 10,
                }}
            >
                <PlayIcon
                    width={50}
                    height={50}
                    color={isPlaying ? 'transparent' : '#fafafa'}
                    style={{
                        position: 'relative',
                    }}
                />

                <StopIcon
                    width={50}
                    height={50}
                    color={isPlaying ? '#fafafa' : 'transparent'}
                    style={{
                        position: 'relative',
                        bottom: 50,
                    }}
                />
            </TouchableOpacity>
            <View
                style={{
                    height: '100%',
                    width: '80%',
                }}
            >
                <Text
                    style={{
                        color: '#fafafa',
                        overflow: song.title.length > 20 ? 'hidden' : 'visible',
                        fontSize: song.title.length > 20 ? 15 : 20,
                        fontWeight: 'bold',
                        maxHeight: 35,
                    }}
                >
                    {song.title}
                </Text>
                <View
                    style={{
                        flexDirection: 'row',
                        gap: 10,
                        position: 'absolute',
                        bottom: 0,
                    }}
                >
                    <CurrentSongTime song={song} />
                </View>
            </View>
        </View>
    );
};
