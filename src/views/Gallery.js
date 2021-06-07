import React, {useState, useEffect} from 'react'
import { View, Text, FlatList, StyleSheet, Image } from 'react-native'
import { COLORS, API } from '../utils/Constants'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const Item = ({ title, description, image }) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <Image source={{uri:image}} style={styles.images} resizeMode='contain'/>
    </View>
);

const Gallery = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        existsToken()
        loadImages()
    }, [])

    const loadImages = async() => {
        try {
            const token = await AsyncStorage.getItem('token')
            if(token === null) return navigation.navigate('Login');

            const url = `${API.default_url}/images`
            const response = await axios.get(url, {
                headers: { Authorization: `Bearer ${token}`, 'Access-Control-Allow-Origin': '*' }
            })
            
            if(response.status !== 200){
                Alert.alert('Oops!', 'The response with the server has failed')
                return
            }

            setData(response.data)

        } catch (error) {
            console.log(error);
        }
    }

    const existsToken = async() => {
        const token = await AsyncStorage.getItem('token')
        if(token === null){
            navigation.reset({
                index: 1,
                routes: [
                    {
                        name: 'Login',
                    },
                ],
            });
        }
    }

    const renderItem = ({ item }) => (
        <Item title={item.title} description={item.description} image={item.image}/>
    );

    return (
        <View style={styles.container}>
            {
                data && data.length > 0 && (
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.BLUELIGHT
    },
    item: {
        backgroundColor: COLORS.LIGHT,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    title: {
        fontSize: 16,
        paddingBottom: 5
    },
    description: {
        fontSize: 12,
    }, 
    images: {
        width: '100%',
        height: 350
    }
});

export default Gallery
