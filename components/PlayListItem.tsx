import type { Playlist } from 'types/Playlist';

import { Text, View, Image, TouchableWithoutFeedback } from 'react-native';

export const PlayListItem = ({ playlist }: { playlist: Playlist }) => {
    return (
        <TouchableWithoutFeedback>
            <View
                style={{
                    aspectRatio: 1,
                    width: 100,
                    backgroundColor: '#3c3c3c',
                    borderRadius: 10,
                    padding: 7.5,
                    overflow: 'hidden',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Text>{playlist.name}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
};
