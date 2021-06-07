import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../utils/Constants'


const IconButton = () => {
    const navigation = useNavigation();

    const logout = async () => {
        await AsyncStorage.removeItem('token')
        navigation.navigate('Login');
    }
    return (
        <Icon name='log-out-outline' size={25} style={{ right: 20 }} color={COLORS.LIGHT} onPress={() => navigation.navigate('Logout')} />
    )
}

export default IconButton
