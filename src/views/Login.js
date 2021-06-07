import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native'
import { COLORS, validateEmail, API } from '../utils/Constants'
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const Login = () => {
    const navigation = useNavigation();

    const [form, setForm] = useState({
        email: 'challenge@maniak.co',
        password: 'maniak2020',
    });
    const [showPassword, setShowPassword] = useState(false)
    const handleChange = (e, type) => {
        setForm({ ...form, [type]: e.nativeEvent.text });
    };

    useEffect(() => {
        existsToken()
    }, [])
    
    const existsToken = async() => {
        const token = await AsyncStorage.getItem('token')
        console.log('existsToken ', token);
        if(token !== null){
            navigation.reset({
                index: 1,
                routes: [
                    {
                        name: 'Gallery',
                    },
                ],
            });
        }
    }

    const login = async() => {
        const email = form.email.toLowerCase();

        if(email.length === 0) return Alert.alert('Oops!', 'The email is required'); 
        if(form.password.length === 0) return Alert.alert('Oops!', 'The password is required'); 
        if(form.password.length > 10) return Alert.alert('Oops!', 'The password must be less than 10 characters'); 
        if(form.password.length < 6) return Alert.alert('Oops!', 'The password must be at least 6 characters'); 

		if (!validateEmail(email)) return Alert.alert('Oops!', 'The email is invalid');

        try {
            const url = `${API.default_url}/login`
            const data = {
                username: email,
                password: form.password
            }
            const response = await axios.post(url, data)
            
            if(response.status !== 200){
                Alert.alert('Oops!', 'The response with the server has failed')
                return
            }

            await AsyncStorage.setItem('token', response.data.token)
            existsToken()

        } catch (error) {
            Alert.alert('Error', 'Something went wrong, try again')
            console.log(error);
        }

    }

    return (
        <View style={styles.loginContainer}>
            <Text style={styles.title}>Login</Text>
            <View style={{ width: '60%' }}>
                <Text style={styles.inputText}>Email:</Text>
                <TextInput style={styles.input} placeholder='Email'
                    onChange={e => handleChange(e, 'email')} />
                <Text style={styles.inputText}>Password:</Text>
                <View style={{ flexDirection: 'row' }}>
                    <TextInput style={[styles.input, { width: '100%' }]}
                        placeholder='***' password={true}
                        secureTextEntry={showPassword ? false : true}
                        onChange={e => handleChange(e, 'password')}
                    />
                    <Icon name={showPassword ? 'eye-off' : 'eye'} size={20} color={COLORS.PRIMARY} style={{ position: 'relative', right: 30 }} onPress={() => setShowPassword(!showPassword)} />
                </View>
                <Button
                    onPress={() => login()}
                    title="Login"
                    color={COLORS.SECONDARY}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.BLUELIGHT
    },
    title: {
        fontSize: 25,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: COLORS.PRIMARY,
        marginBottom: 30
    },
    input: {
        borderBottomWidth: 1,
        height: 35,
        fontSize: 14,
        marginBottom: 10,
        color: COLORS.PRIMARY
    },
    inputText: {
        fontSize: 12,
        color: COLORS.PRIMARY
    }, 
})

export default Login
