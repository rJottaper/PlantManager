import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import colors from '../styles/colors'

interface ButtonProps {
    title: string
}

export function Button({ title } : ButtonProps) {

    return (

        <TouchableOpacity style={styles.button} activeOpacity={0.7} >
                <Text style={styles.buttonTxt}>
                    {title}
                </Text>
        </TouchableOpacity>

    )

}

const styles = StyleSheet.create({
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