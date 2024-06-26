import type { Song } from 'types/Song';

import { TouchableOpacity, Text, View, Image } from 'react-native';
import { timeFormat } from '@hooks/function/timeFormat';
import { useGlobalStore } from '@stores/useGlobalStore';


export const SongItem = ({ song }: { song: Song }) => {
    const { action } = useGlobalStore();

    return (
        <TouchableOpacity
            onPress={() => action(song)}
            style={{
                padding: 10,
                backgroundColor: '#4c4c4c',
                borderRadius: 10,
                borderWidth: 1,
                borderColor: 'transparent',
                height: 100,
                flexDirection: 'row',
                gap: 10,
                overflow: 'hidden',
            }}
        >
            <Image
                source={require('assets/noImageLogo.webp')}
                style={{
                    aspectRatio: 1,
                    borderRadius: 7,
                    width: 80,
                    backgroundColor: '#1c1c1c',
                }}
            />
            <View>
                <Text
                    style={{
                        color: '#fafafa',
                        maxWidth: '85%',
                        maxHeight: 35,
                    }}
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
