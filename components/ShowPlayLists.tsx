import type { Song } from 'types/Song';

import { useGlobalStore } from '@stores/useGlobalStore';
import { FlatList, View, Text, TouchableWithoutFeedback } from 'react-native';
import { useRef } from 'react';

import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

import PlusIcon from 'assets/plus.svg';

export const ShowPlayLists = () => {
    const {
        playlists,
        addSongToPlaylist,
        callingSong,
        config,
        showPlayListsUi,
    } = useGlobalStore();

    const bottomSheetRef = useRef<BottomSheet>(null);

    return (
        <BottomSheet
            ref={bottomSheetRef}
            snapPoints={['50%']}
            enablePanDownToClose
            onClose={() => showPlayListsUi(false)}
            handleStyle={{
                backgroundColor: '#1c1c1c',
                borderTopWidth: 2,
                borderColor: config.mainColor,
            }}
            handleIndicatorStyle={{
                backgroundColor: config.mainColor,
            }}
            backgroundStyle={{
                backgroundColor: '#1c1c1c',
            }}
        >
            <BottomSheetView
                style={{
                    backgroundColor: '#1c1c1c',
                    zIndex: 50,
                    height: '50%',
                    width: '100%',
                    padding: 10,

                    flex: 1,
                }}
            >
                <TouchableWithoutFeedback>
                    <View
                        style={{
                            flexDirection: 'row',
                            padding: 10,
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            borderColor: '#7c7c7c',
                            borderWidth: 1,
                            borderRadius: 5,
                        }}
                    >
                        <Text
                            style={{
                                color: '#fafafa',
                            }}
                        >
                            Crear nueva playlist
                        </Text>

                        <PlusIcon
                            width={20}
                            height={20}
                            color={'#fafafa'}
                        />
                    </View>
                </TouchableWithoutFeedback>
                <FlatList
                    data={playlists}
                    renderItem={({ item }) => (
                        <TouchableWithoutFeedback
                            onPress={() => {
                                addSongToPlaylist(
                                    item.id as number,
                                    callingSong as Song
                                );
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: 'row',
                                    padding: 10,
                                    alignItems: 'center',
                                }}
                            >
                                <Text
                                    style={{
                                        color: '#fafafa',
                                    }}
                                >
                                    {item.name}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    )}
                    keyExtractor={(item) => item.id?.toString() ?? ''}
                />
            </BottomSheetView>
        </BottomSheet>
    );
};
