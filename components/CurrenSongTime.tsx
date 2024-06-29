import { useState, useEffect, useRef } from 'react';
import { useGlobalStore } from '@stores/useGlobalStore';
import { timeFormat } from '@hooks/function/timeFormat';
import { Text, Animated, View, StyleSheet } from 'react-native';
import type { Song } from 'types/Song';

export const CurrentSongTime = ({ song }: { song: Song }) => {
    const { isPlaying, currentSong, config, nextSong, sound } =
        useGlobalStore();

    const progressAnim = useRef(new Animated.Value(0)).current;
    const [currentSongTime, setTime] = useState(0);

    const styles = StyleSheet.create({
        container: {
            alignItems: 'center',
            flexDirection: 'row',
            gap: 10,
            maxWidth: '90%',
        },
        progressBar: {
            height: 10,
            width: '80%',
            backgroundColor: '#3c3c3c',
            borderRadius: 5,
            overflow: 'hidden',
            marginVertical: 10,
        },
        progress: {
            height: '100%',
            backgroundColor: config.mainColor,
            borderRadius: 5,
        },
    });

    useEffect(() => {
        let timer: NodeJS.Timeout | undefined;

        if (currentSong?.uri === song.uri && isPlaying) {
            timer = setInterval(() => {
                setTime((prev) => prev + 1);
            }, 1000);
        }

        if (isPlaying) {
            setTime(currentSongTime);
        }

        return () => {
            if (timer) clearInterval(timer);
        };
    }, [currentSong, isPlaying]);

    useEffect(() => {
        if (currentSongTime === Math.floor(song.duration)) {
            nextSong();
        }

        Animated.timing(progressAnim, {
            toValue: currentSongTime / song.duration,
            duration: 1000,
            useNativeDriver: false,
        }).start();
    }, [currentSongTime]);

    useEffect(() => {
        setTime(0);
        progressAnim.setValue(0);
    }, [currentSong]);

    return (
        <View style={styles.container}>
            <Text style={{ color: '#fafafa' }}>
                {timeFormat(currentSongTime)}
            </Text>
            <View style={styles.progressBar}>
                <Animated.View
                    style={[
                        styles.progress,
                        {
                            width: progressAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: ['0%', '100%'],
                            }),
                        },
                    ]}
                />
            </View>
            <Text style={{ color: '#fafafa' }}>
                {timeFormat(song.duration)}
            </Text>
        </View>
    );
};
