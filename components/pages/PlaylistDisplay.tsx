import { FlatList } from 'react-native';
import { PlayListItem } from '@components/PlayListItem';
import { useGlobalStore } from '@stores/useGlobalStore';

const PlaylistDisplay = () => {
    const { playlists } = useGlobalStore();

    return (
        <FlatList
            data={playlists}
            renderItem={({ item }) => <PlayListItem playlist={item} />}
            keyExtractor={(item) => item.id.toString()}
        />
    );
};

export default PlaylistDisplay;
