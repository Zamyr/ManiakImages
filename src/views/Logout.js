import React, {useEffect} from 'react'
import { View, Text, Button } from 'react-native'
import { COLORS } from '../utils/Constants'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Logout = () => {
    useEffect(() => {
        existsToken()
    }, [])

    const navigation = useNavigation();

    const logout = async () => {
        await AsyncStorage.removeItem('token')
        navigation.replace('Login');
    }

    const existsToken = async() => {
        const token = await AsyncStorage.getItem('token')
        if(token == null){
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

    return (
        <View style={{backgroundColor: COLORS.BLUELIGHT, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{paddingBottom: 20, fontSize: 20}}>Do you want to go out?</Text>
            <Button 
                onPress={() => logout()}  
                title="Log Out"
                color={COLORS.SECONDARY}
            />
        </View>
    )
}

export default Logout
