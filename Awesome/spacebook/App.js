import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
//import React, { Component } from 'react';
//import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoggedOn from './LoggedOn';





const stack = createStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <stack.Navigator>
                <stack.Screen name="Login" component={LoginScreen} />
                <stack.Screen name="Signup" component={SignupScreen} />
                <stack.Screen name="Hello user" component={LoggedOn}/>
            </stack.Navigator>
        </NavigationContainer>
    );
}
       

 
export default App


