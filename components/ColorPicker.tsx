import { useGlobalStore } from '@stores/useGlobalStore';
import { View, StyleSheet, Text } from 'react-native';
import { ColorPicker } from 'react-native-color-picker';

const ColorPickerScreen = () => {
    const { config, setMainColor } = useGlobalStore();

    const onColorChange = (newColor: string) => {
        setMainColor(newColor);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Selecciona un color:</Text>
            <ColorPicker
                style={styles.colorPicker}
                onColorSelected={onColorChange}
                defaultColor={config.mainColor}
                hideSliders={true}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
        color: '#fafafa',
    },
    colorPicker: {
        width: 250,
        height: 250,
        marginBottom: 20,
    },
});

export default ColorPickerScreen;
