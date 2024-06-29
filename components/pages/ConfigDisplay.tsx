import { useGlobalStore } from '@stores/useGlobalStore';
import {
    ScrollView,
    View,
    TextInput,
    TouchableHighlight,
    Text,
} from 'react-native';
import { ListItem } from '@components/ConfigListItem';
import { useState, useRef } from 'react';

import ColorPicker from '@components/ColorPicker';
import PlusIcon from 'assets/plus.svg';

const ConfigDisplay = () => {
    const {
        config,
        addBlackListWord,
        removeBlackListWord,
        setMinDurationAudio,
        setMaxDurationAudio,
        isPlaying,
    } = useGlobalStore();

    const [blackListWord, setBlackListWord] = useState('');
    const inputRef = useRef<TextInput>(null);

    return (
        <ScrollView
            contentContainerStyle={{
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: 40,
                paddingTop: 20,
                paddingHorizontal: 20,
                paddingBottom: isPlaying ? 120 : 20,
            }}
        >
            <ColorPicker />

            <View
                style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#3c3c3c',
                    padding: 10,
                    gap: 10,
                    borderRadius: 5,
                }}
            >
                <Text
                    style={{
                        color: '#fafafa',
                        fontWeight: 'bold',
                        fontSize: 13,
                    }}
                >
                    Palabras y signos para filtrar el nombre de las canciones
                </Text>
                {config.blackListWords.map((word) => (
                    <ListItem
                        key={word}
                        config={config}
                        text={word}
                        removeBlackListWord={removeBlackListWord}
                    />
                ))}
                <View
                    style={{
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        borderColor: '#7c7c7c',
                        borderWidth: 1,
                        borderRadius: 5,
                    }}
                >
                    <TextInput
                        ref={inputRef}
                        style={{ color: '#fafafa' }}
                        onChange={(e) => setBlackListWord(e.nativeEvent.text)}
                        placeholder='Añadir palabra'
                        placeholderTextColor={'#fafafa'}
                    ></TextInput>
                    <TouchableHighlight
                        onPress={() => {
                            addBlackListWord(blackListWord);
                            inputRef.current?.clear();
                        }}
                    >
                        <PlusIcon
                            width={24}
                            height={24}
                            color={'#fafafa'}
                        />
                    </TouchableHighlight>
                </View>
            </View>
        </ScrollView>
    );
};

export default ConfigDisplay;
