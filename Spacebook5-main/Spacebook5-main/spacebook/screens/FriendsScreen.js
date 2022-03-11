import React, { Component } from 'react';
import { Text, View, FlatList, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
class FriendsScreen extends Component {
    constructor(props) {
        super(props);
        this.state =
        {
            requestdata: [],
            request: ''
        }

    }
    friend_request_list= async () => {
        const j_value = await AsyncStorage.getItem('@spacebook_info');
        const logindata = JSON.parse(j_value);
        let id = logindata.id;
        //   console.log(id);
        let token = logindata.token;
        try {
            return fetch('http://localhost:3333/api/1.0.0/friendrequests', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': token
                }
            })
                .then((response) => {
                    return response.json();
                })
                .then((resp) => {
                    console.log(resp);
                    this.setState({
                        requestdata: resp
                    });

                })
        } catch (error) {
            console.error("error", error);
        }
    }
    addfriendR = async () => {
        const j_value = await AsyncStorage.getItem('@spacebook_info');
        const logindata = JSON.parse(j_value);
        let token = logindata.token;
        console.log("token", token)
        try {
            return fetch('http://localhost:3333/api/1.0.0/friendrequests/' + this.state.request, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': token
                }
            })
                .then((response) => {
                    return response.json();
                })
                .then((responsejson) => {
                    console.log(responsejson);


                })
        } catch (error) {
            console.error("error", error);
        }
    }
    deletefriendR = async () => {
        const j_value = await AsyncStorage.getItem('@spacebook_info');
        const logindata = JSON.parse(j_value);
        let token = logindata.token;
        console.log("token", token)
        try {
            return fetch('http://localhost:3333/api/1.0.0/friendrequests/' + this.state.request , {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': token
                }
            })
                .then((response) => {
                    return response.json();
                })
                .then((responsejson) => {
                    console.log(responsejson);


                })
        } catch (error) {
            console.error("error", error);
        }
    }
    componentDidMount()
    {
        this.friend_request_list();
       
        
    }
    render() {
        return (
            <View>
                <Text>Friend Requests</Text>
                <FlatList
                    data={this.state.requestdata}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View key={item.user_id} >
                        <Text>user id: {item.user_id}</Text>
                        <Text>First name: {item.first_name}</Text>
                        <Text>Last _name: {item.last_name}</Text>
                        <Text>Email: {item.email}</Text>

                        <Button style={styles.button}
                            title="Accept"

                            onPress={() => { this.setState({ request: item.user_id }); this.addfriendR() }}
                        />
                        <Button style={styles.button}
                            title="Decline"

                            onPress={() => { this.setState({ request: item.user_id }); this.deletefriendR() }}
                        />
                        
                    </View>

                )}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    button:
    {
        flexWrap: "wrap",
    },
});

export default FriendsScreen
