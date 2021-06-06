import 'react-native-gesture-handler';
import React from 'react';

// React Navigation
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

// Views

import Login from '../views/Login'
import Gallery from '../views/Gallery'

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Login'>
                <Stack.Screen
                    name='Login'
                    component={Login}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='Gallery'
                    component={Gallery}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation