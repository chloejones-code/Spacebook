import React, { Component, useState} from 'react';
import { Text, View, StyleSheet, Button, TextInput, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
class SearchScreen extends Component {
    constructor(props) {
        super(props);
        this.state =
        {
            search: '',
            add: '',
            myData: [],            
        }

    }
    searchdata = async () => {
        const j_value = await AsyncStorage.getItem('@spacebook_info');
        const logindata = JSON.parse(j_value);
        console.log(logindata)
          
        let token = logindata.token;
        //console.log("token", token);
        try {
            return fetch('http://localhost:3333/api/1.0.0/search?q=' + this.state.search, {
                method: 'GET',
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
                    this.setState({
                        //    isLoading: false,
                        myData: responsejson
                    });

                })
        } catch (error) {
            console.error("error", error);
        }
    }
    addfriend = async () => {
        const j_value = await AsyncStorage.getItem('@spacebook_info');
        const logindata = JSON.parse(j_value);
        let token = logindata.token;
        console.log("token", token)
        try {
            return fetch('http://localhost:3333/api/1.0.0/user/' + this.state.add + '/friends', {
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
    render() {
        return (
            <View style={styles.container}>

                <Text>Search:</Text>
                <TextInput
                    style={{ height: 40 }}
                    placeholder="Search"
                    onChangeText={(search) => this.setState({search})}

                />
                <Button
                    title="Search"
                    onPress={() => this.searchdata()}
                />
                <FlatList
                    data={this.state.myData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View key={item.user_id} >
                            <Text>user id: {item.user_id}</Text>
                            <Text>First name: {item.user_givenname}</Text>
                            <Text>Last _name: {item.familyname}</Text>
                            <Text>Email: {item.user_email}</Text>
                            
                            <Button
                                title="Add"

                                onPress={() => { this.setState({ add: item.user_id });  this.addfriend() }}
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

});
export default SearchScreen
