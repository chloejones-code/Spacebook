import HomeScreen from './screens/HomeScreen';
import FeedScreen from './screens/FeedScreen';
import AccountScreen from './screens/AccountScreen';
import UpdateAccount from './screens/UpdateAccount';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { Component } from 'react';


const BringData = async (Got) => {
    const j_value = await AsyncStorage.getItem('@spacebook_info')
    const logindata = JSON.parse(j_value);
    return Got(logindata);

}
const Tab = createMaterialBottomTabNavigator();

class LoggedOn extends Component {
    render() {
        return (
            <Tab.Navigator>
            { BringData ?(

                    <Tab.Group>
                        <Tab.Screen name="Feed" component={FeedScreen}
                            options={{tabBarLabel: 'Feed', tabBarIcon: ({ color }) =>
                            (<MaterialCommunityIcons name="message" color={color} size={26} />),
                            }} />
                        <Tab.Screen name="Home" component={HomeScreen} options={{
                            tabBarLabel: 'Home', tabBarIcon: ({ color }) =>
                                (<MaterialCommunityIcons name="home" color={color} size={26} />),
                        }}/>
                        <Tab.Screen name="Account" component={AccountScreen} options={{
                            tabBarLabel: 'Account', tabBarIcon: ({ color }) =>
                                (<MaterialCommunityIcons name="account" color={color} size={26} />),
                        }} />
                        <Tab.Screen name="UpdateAccount" component={UpdateAccount} options={{
                            tabBarLabel: 'Update', tabBarIcon: ({ color }) =>
                                (<MaterialCommunityIcons name="update" color={color} size={26} />),
                        }}/>
                    </Tab.Group>
                     ):(<Tab.Screen name="Home" component={HomeScreen} />) 
                    
                        }
                    


            </Tab.Navigator>
                
            
            
        );
    
}
}

export default LoggedOn