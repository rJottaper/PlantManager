import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Image, FlatList, ScrollView, Alert } from 'react-native' 

import { Header } from '../components/Header'

import colors from '../styles/colors'
import waterdrop from '../assets/waterdrop.png'
import { PlantProps, loadPlant, removePlant } from '../libs/storage'
import { formatDistance } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import fonts from '../styles/fonts'
import { PlantCardPrimary } from '../components/PlantCardSecondary'
import { Load } from '../components/Load'
import AsyncStorage from '@react-native-async-storage/async-storage'

export function MyPlants() {

    const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [nextWaterd, setNextWatered] = useState<string>();

    function handleRemove(plant: PlantProps) {
        Alert.alert('Remove', `Are you sure you want to remove ${plant.name}? `, [
            {
                text: 'No 🙏',
                style: 'cancel'
            },
            {
                text: 'Yes 😥',
                onPress: async () => {
                    try {
                        await removePlant(plant.id);
                        setMyPlants((oldData) => (
                            oldData.filter((item) => item.id != plant.id)
                        ))

                    } catch (error) {
                        Alert.alert('Unable to remove')
                    }
                }
            }
        ])
    }

    useEffect(() => {
        async function loadStorageData() {
            const plantsStoraged = await loadPlant();

            const nextTime = formatDistance(
                new Date(plantsStoraged[0].dateTimeNotification).getTime(),
                new Date().getTime(),
                { locale: ptBR }
            );

            setNextWatered(
                `don't forget to water the ${plantsStoraged[0].name} in ${nextTime} hours.`
            );

            setMyPlants(plantsStoraged);
            setLoading(false)
        }

        loadStorageData();

    }, [])

    if(loading)
        return <Load />

    return(
        <View style={styles.container}>
            <Header />

            <View style={styles.spotlight}>
                <Image source={waterdrop} style={styles.spotlightImage} />
                <Text style={styles.spotlightText}>
                 {nextWaterd}
                </Text>
            </View>
            

            <View style={styles.plants}>
                <Text style={styles.plantsTitle}>
                    Proximas Regadas
                </Text>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <FlatList 
                        data={myPlants} 
                        keyExtractor={(item) => String(item.id)} 
                        renderItem={({ item }) => (
                            <PlantCardPrimary 
                                data={item} 
                                handleRemove={() => {handleRemove(item)}}
                            />
                        )}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ flex: 1}} 
                    />
                </ScrollView>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingTop: 50,
        backgroundColor: colors.background
    },
    spotlight: {
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        borderRadius: 20,
        height: 110,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    spotlightImage: {
        width: 60,
        height: 60,
    },
    spotlightText: {
        flex: 1,
        color: colors.blue,
        paddingHorizontal: 20,
    },
    plants: {
        flex: 1,
        width: '100%'
    },
    plantsTitle: {
        fontSize: 24,
        fontFamily: fonts.heading,
        color: colors.heading,
        marginVertical: 20
    }
})