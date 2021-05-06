import React, { useState } from 'react'
import { SafeAreaView, 
    StyleSheet, 
    Text, 
    TextInput, 
    View, 
    KeyboardAvoidingView, 
    Platform, 
    TouchableWithoutFeedback, 
    Keyboard, 
    Alert 
} from 'react-native'

import {Button} from '../components/Button'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

import { useNavigation } from '@react-navigation/core'
import AsyncStorage  from '@react-native-async-storage/async-storage'

export function UserIdentification() {

    const [isFocused, setIsFocused] = useState(false)
    const [isFilled, setIsFilled] = useState(false)
    const [name, setName] = useState<string>()

    function handleInputBlur() {
        setIsFocused(false)
        setIsFilled(!!name)
    }

    function handleInputFocus() {
        setIsFocused(true)
    }
    
    function handleInputChange(value : string) {
        setIsFilled(!!value)
        setName(value)
    }

    const navigation = useNavigation()

    async function handleSubmit() {

        if(!name) return Alert.alert('How can I call you?')

        await AsyncStorage.setItem('@plantmanager:user', name)

        navigation.navigate('Confirmation', {
            title: 'OK',
            subtitle: "Now let's take care of your little plant very carefully.",
            buttonTitle: "Let's Go",
            icon: 'smile',
            nextScreen: 'PlantSelect'
        })

    }
    
    return (

        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView // Usado caso o usario tiver um IOS
                style={styles.container}
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}  
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.content}>
                        <View style={styles.form}>
                            <View style={styles.header}>
                                <Text style={styles.emoji}>
                                    { isFilled ? '😀' : '😅' }
                                </Text>
                                <Text style={styles.title}>
                                    What can we {'\n'}
                                    call you?
                                </Text>
                            </View>
                            <TextInput style={[styles.input, (isFocused || isFilled) && { borderColor: colors.green } ]} 
                                placeholder="Your Name" 
                                onBlur={handleInputBlur} 
                                onFocus={handleInputFocus} 
                                onChangeText={handleInputChange}
                            />
                            <View style={styles.footer}>
                                <Button title="Confirm" onPress={handleSubmit} />
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>

    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    content: {
        flex: 1,
        width: '100%',
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 54,
        alignItems: 'center',
        
    },
    header: {
        alignItems: 'center'
    },
    emoji: {
        fontSize: 44
    },
    input: {
        borderBottomWidth: 3,
        borderColor: colors.gray,
        color: colors.heading,
        width: '100%',
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign: 'center'
    },
    title: {
        fontSize: 30,
        lineHeight: 32,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.heading,
        marginTop: 35
    },
    footer: {
        marginTop: 40,
        width: '100%',
        paddingHorizontal: 10
    }
})