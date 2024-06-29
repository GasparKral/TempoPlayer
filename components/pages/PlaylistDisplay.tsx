import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { PlayListItem } from '@components/PlayListItem';
import { useGlobalStore } from '@stores/useGlobalStore';

import PlusIcon from 'assets/plus.svg';

const PlaylistDisplay = () => {
    const { playlists } = useGlobalStore();

    return (
        <ScrollView contentContainerStyle={{ padding: 20 }}>
            {playlists &&
                playlists.map((playlist) => (
                    <PlayListItem
                        key={playlist.id}
                        playlist={playlist}
                    />
                ))}

            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    borderWidth: 2,
                    borderColor: '#7c7c7c',
                    padding: 5,
                    borderRadius: 7,
                }}
            >
                <Text
                    style={{
                        color: '#fafafa',
                        fontSize: 20,
                    }}
                >
                    Crear una nueva playlist
                </Text>
                <TouchableOpacity>
                    <PlusIcon
                        width={30}
                        height={30}
                        color={'#fafafa'}
                    />
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default PlaylistDisplay;
