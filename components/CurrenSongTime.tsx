import { useState, useEffect, useRef } from 'react';
import { useGlobalStore } from '@stores/useGlobalStore';
import { timeFormat } from '@hooks/function/timeFormat';
import { Text, Animated, View, StyleSheet } from 'react-native';
import type { Song } from 'types/Song';

export const CurrentSongTime = ({ song }: { song: Song }) => {
    const { currentSongTime, passTime, isPlaying, currentSong, setTime } =
        useGlobalStore();
    const progressAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        let timer: NodeJS.Timeout | undefined;

        if (currentSong?.uri === song.uri && isPlaying) {
            timer = setInterval(() => {
                passTime();
            }, 1000);
        }

        return () => {
            if (timer) clearInterval(timer);
        };
    }, [currentSong, isPlaying]);

    useEffect(() => {
        Animated.timing(progressAnim, {
            toValue: currentSongTime / song.duration,
            duration: 500,
            useNativeDriver: false,
        }).start();
    }, [currentSongTime]);

    useEffect(() => {
        setTime(0);
        progressAnim.setValue(0);
    }, [song]);

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
        backgroundColor: '#005AFF',
        borderRadius: 5,
    },
});
