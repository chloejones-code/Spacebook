import React, { Component} from 'react';
import { Text, View, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class AccountScreen extends Component {
    constructor(props)
    {
        super(props)
        this.state =
        {
           // isLoading: true,
             myData:[]
        }


    }
     userdata = async() => {
    const j_value = await AsyncStorage.getItem('@spacebook_info');
    const logindata = JSON.parse(j_value);
         let id = logindata.id;
         console.log(id);
    let token = logindata.token;
    try {
        return fetch('http://localhost:3333/api/1.0.0/user/' + id, {
            method: 'GET',
            headers: {
              
                'X-Authorization': token
            }
        })
            .then((response) =>
            {
                return response.json();
            })
            .then((responsejson) =>
            {
                console.log(responsejson);
                this.setState({
                    //    isLoading: false,
                    myData: responsejson
                });

            })
    } catch (error)
    {
        console.error(error);
    }

    }
    componentDidMount()
    {
        this.userdata();

    }
    render() {
        return (
            
            <View>
                <FlatList
                    data={this.state.myData}
                    keyExtractor={(item) => item.user_id.toString()}
                    renderItem={({ item }) => (
                        <View>
                            <Text>{item.first_name} {item.last_name} {item.email} {item.friend_count}</Text>
                        </View>

                    )}
                   
                />
            </View> 
        );
    }
}

export default AccountScreen
