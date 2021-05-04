import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, Image, View } from 'react-native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import AsyncStorage from '@react-native-async-storage/async-storage'

import userImg from '../assets/unknown.png'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

export function Header(){

    const [userName, setUserName] = useState<string>()

    useEffect(() => {
        async function loadStorageUsername() {
            const user = await AsyncStorage.getItem('@plantmanager:user')
            setUserName(user || '')
        }

        loadStorageUsername();

    }, [userName])

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Hello,</Text>
                <Text style={styles.username}>{userName}</Text>
            </View>
            
            <Image source={userImg} style={styles.image} />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        marginTop: getStatusBarHeight(),
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 40
    },
    greeting: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text
    },
    username: {
        fontSize: 32,
        fontFamily: fonts.heading,
        color: colors.heading,
        lineHeight: 40
    }
})
