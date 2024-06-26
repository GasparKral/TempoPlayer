import type { Config } from 'types/Config';
import { Text, TouchableHighlight, View } from 'react-native';

import MinusIcon from 'assets/minus.svg';

export const ListItem = ({
    text,
    removeBlackListWord,
    config,
}: {
    text: string;
    config: Config;
    removeBlackListWord: (text: string) => void;
}) => {
    return (
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
            <Text
                style={{
                    color: '#fafafa',
                }}
            >
                {text}
            </Text>
            <TouchableHighlight onPress={() => removeBlackListWord(text)}>
                <MinusIcon
                    width={24}
                    height={24}
                    color={config.mainColor}
                />
            </TouchableHighlight>
        </View>
    );
};
