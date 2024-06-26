import type { Playlist } from 'types/Playlist';

import { Text, View, Image, TouchableWithoutFeedback } from 'react-native';

export const PlayListItem = ({ playlist }: { playlist: Playlist }) => {
    return (
        <TouchableWithoutFeedback>
            <View>
                <Text>{playlist.name}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
};
