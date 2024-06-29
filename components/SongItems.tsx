import type { Song } from 'types/Song';

import { TouchableOpacity, Text, View } from 'react-native';
import { timeFormat } from '@hooks/function/timeFormat';
import { useGlobalStore } from '@stores/useGlobalStore';

import MusicIcon from 'assets/music.svg';
import Color from 'color';

export const SongItem = ({
    song,
    isPlaying,
    color,
}: {
    song: Song;
    isPlaying: boolean;
    color: string;
}) => {
    const { action, config } = useGlobalStore();

    return (
        <TouchableOpacity
            onPress={() => action(song)}
            style={{
                padding: 10,
                backgroundColor: isPlaying
                    ? Color(color).isLight()
                        ? Color('#4c4c4c').darken(0.3).toString()
                        : Color('#4c4c4c').darken(0.45).toString()
                    : '#4c4c4c',
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
                    borderRadius: 7.5,
                    width: 60,
                    backgroundColor: '#1c1c1c',
                    justifyContent: 'center',
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                }}
            >
                <MusicIcon
                    width={50}
                    height={50}
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
                        color: isPlaying
                            ? Color(color).isLight()
                                ? Color(color).lighten(0.27).toString()
                                : Color(color).lighten(0.1).toString()
                            : '#fafafa',
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
                        color: '#cacaca',
                    }}
                >
                    {timeFormat(song.duration)}
                </Text>
            </View>
        </TouchableOpacity>
    );
};
