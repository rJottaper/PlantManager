import React from 'react'
import { SafeAreaView, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'

import { Button } from '../components/Buttom'

import wateringImg from '../assets/watering.png'
import colors from '../styles/colors'
 
export function Welcome() {
    
    return (
        
        <SafeAreaView style={styles.container}>   
            
            <Text style={styles.title}>
                Manage {'\n'}
                your plants {'\n'} 
                easily
            </Text>

            <Image source={wateringImg} />

            <Text style={styles.subtitle}>
                Don't forget to water your plants anymore. We will take care of reminding you whenever you need it.
            </Text>

            <Button title='>' />
        
        </SafeAreaView>

    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        marginTop: 88,
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#52665A',

    },
    subtitle: {
        textAlign: 'center',
        fontSize: 18,
        paddingHorizontal: 20,
        color: '#52665A'
    },
    button: {
        backgroundColor: '#32B768',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 38,
        height: 56,
        width: 56
    },
    buttonTxt: {
        color: colors.white,
        fontSize: 24
    }

})