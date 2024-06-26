import type { Song } from 'types/Song';

import { TouchableOpacity, Text, View } from 'react-native';
import { timeFormat } from '@hooks/function/timeFormat';
import { useGlobalStore } from '@stores/useGlobalStore';

import MusicIcon from 'assets/music.svg';

export const SongItem = ({ song }: { song: Song }) => {
    const { action, config } = useGlobalStore();

    return (
        <TouchableOpacity
            onPress={() => action(song)}
            style={{
                padding: 10,
                backgroundColor: '#4c4c4c',
                borderRadius: 10,
                borderWidth: 1,
                borderColor: 'transparent',
                height: 80,
                flexDirection: 'row',
                gap: 10,
                overflow: 'hidden',
            }}
        >
            <View
                style={{
                    aspectRatio: 1,
                    borderRadius: 7,
                    width: 60,
                    backgroundColor: '#1c1c1c',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <MusicIcon
                    width={60}
                    height={60}
                    color={config.mainColor}
                    style={{ transform: [{ rotate: '15deg' }] }}
                />
            </View>
            <View
                style={{
                    width: '75%',
                }}
            >
                <Text
                    style={{
                        color: '#fafafa',
                        fontWeight: 'bold',
                        maxHeight: 35,
                    }}
                    numberOfLines={2}
                >
                    {song.title}
                </Text>
                {song.artist && song.artist != '<unknown>' && (
                    <Text
                        style={{
                            color: '#fafafa',
                        }}
                    >
                        {song.artist}
                    </Text>
                )}
                <Text
                    style={{
                        color: '#fafafa',
                    }}
                >
                    {timeFormat(song.duration)}
                </Text>
            </View>
        </TouchableOpacity>
    );
};
