import 'react-native-gesture-handler';
import React from 'react';

// Utils
import { COLORS } from '../utils/Constants'

// React Navigation
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

// Views

import Login from '../views/Login'
import Gallery from '../views/Gallery'
import Logout from '../views/Logout'

// Components
import IconButton from '../components/IconButton'


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
                    options={{
                        title: 'Gallery',
                        headerStyle: {
                            backgroundColor: COLORS.PRIMARY,
                        },
                        headerTintColor: COLORS.LIGHT,
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                        headerRight: () => <IconButton />
                    }}
                />
                <Stack.Screen
                    name='Logout'
                    component={Logout}
                    options={{
                        title: '',
                        headerStyle: {
                            backgroundColor: COLORS.PRIMARY,
                        },
                        headerTintColor: COLORS.LIGHT,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation