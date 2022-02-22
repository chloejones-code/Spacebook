import HomeScreen from './screens/HomeScreen';
import FeedScreen from './screens/FeedScreen';
import AccountScreen from './screens/AccountScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { Component } from 'react';


const BringData = async (Got) => {
    const j_value = await AsyncStorage.getItem('@spacebook_info')
    const logindata = JSON.parse(j_value);
    return Got(logindata);

}
const Tab = createBottomTabNavigator();
class LoggedOn extends Component {
    render() {
        return (
            <Tab.Navigator>
            { BringData ?(

                    <Tab.Group>
                      <Tab.Screen name="Feed" component={FeedScreen} />
                        <Tab.Screen name="Home" component={HomeScreen} />
                        <Tab.Screen name="Account" component={AccountScreen}/>
                    </Tab.Group>
                     ):(<Tab.Screen name="Home" component={HomeScreen} />) 
                    
                        }
                    


            </Tab.Navigator>
                
            
            
        );
}
}

export default LoggedOn