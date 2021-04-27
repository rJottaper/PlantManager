import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'


import { Button } from '../components/Button'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

export function Confirmation() {

    const navigation = useNavigation()

    function handleMoveOn(){
        navigation.navigate('PlantSelect')
    }

    return (

        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.emoji}>
                    😊
                </Text>
                <Text style={styles.title}>
                    OK
                </Text>
                <Text style={styles.subtitle}>
                    Now let's take care of your little plant very carefully.
                </Text>
                <View style={styles.footer}>
                    <Button title="Lets Go" onPress={handleMoveOn} />
                </View>
            </View>
        </SafeAreaView>

    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 30
    },
    emoji: {
        fontSize: 78
    },
    title: {
        fontSize: 28,
        fontFamily: fonts.heading,
        textAlign: 'center',
        color: colors.heading,
        lineHeight: 38,
        marginTop: 15
    },
    subtitle: {
        fontFamily: fonts.text,
        textAlign: 'center',
        fontSize: 22,
        paddingVertical: 20,
        color: colors.heading
    },
    footer: {
        width: '100%',
        paddingHorizontal: 28,
        marginTop: 8
    },
})