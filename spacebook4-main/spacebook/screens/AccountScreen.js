import React, { Component } from 'react';
import { Text, View, FlatList, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class AccountScreen extends Component {
    constructor(props)
    {
        super(props);
        this.state =
        {
           // isLoading: true,
            myData: [],
            photo: null,
            friendsdata:[]
        }


    }
    profilepic = async () => {
        const j_value = await AsyncStorage.getItem('@spacebook_info');
        const logindata = JSON.parse(j_value);
        let id = logindata.id;
      //  console.log(id);
        let token = logindata.token;
        try {
            return fetch('http://localhost:3333/api/1.0.0/user/' + id + '/photo', {
                method: 'GET',
                headers: {

                    'X-Authorization': token
                }
            })
                .then((resp) => {
                    return resp.blob();
                })
                .then((responseBlob) => {
                   // console.log(responseBlob);
                    let data = URL.createObjectURL(responseBlob)
                    this.setState({ photo: data });
                })
        } catch (error) {
            console.error(error);
        }
    }

        
            userdata = async () => {
                const j_value = await AsyncStorage.getItem('@spacebook_info');
                const logindata = JSON.parse(j_value);
                let id = logindata.id;
             //   console.log(id);
                let token = logindata.token;
                try {
                    return fetch('http://localhost:3333/api/1.0.0/user/' + id, {
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
                           // console.log(responsejson);
                            this.setState({
                                //    isLoading: false,
                                myData: responsejson
                            });

                        })
                } catch (error) {
                    console.error("error",error);
                }

        
    }
    friends = async () => {
        const j_value = await AsyncStorage.getItem('@spacebook_info');
        const logindata = JSON.parse(j_value);
        let id = logindata.id;
        //  console.log(id);
        let token = logindata.token;
        try {
            return fetch('http://localhost:3333/api/1.0.0/user/' + id + '/friends', {
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
                    console.log("getfriends", resp);
                    console.log(resp.user_id);
                    this.setState({
                        friendsdata: resp
                    });

                })
        } catch (error) {
            console.error(error);
        }


    }

    
    componentDidMount()
    {
            this.userdata();
        this.profilepic();
        this.friends();
    }
  
    render() {

        return (

            <View style={styles.container}>
                <Image source={{ uri: this.state.photo }} style={{ width: 200, height: 200, border:5 }}/>
                <FlatList
                    data={[this.state.myData]}
                   
                    renderItem={({item}) => (
                        <View>
                            <Text>user id: {item.user_id}</Text>
                            <Text>First name: {item.first_name}</Text>
                            <Text>Last _name: {item.last_name}</Text>
                             <Text>Email: {item.email}</Text>
                             <Text>Friend Count: {item.friend_count}</Text>
                        </View>
                       
                    )}
                />
                <FlatList
                    data={this.state.friendsdata}
                    keyExtractor={(item, index) => index.toString()}

                    renderItem={({ item }) => (
                        <View key={item.user_id}>
                            <Text>user id: {item.user_id}</Text>
                            <Text>First name: {item.user_givenname}</Text>
                            <Text>Last name: {item.user_familyname}</Text>
                            <Text>Email: {item.user_email}</Text>
                            
                        </View>

                    )}

                />
            </View>
          

            );

    }
   
}
 const styles = StyleSheet.create({
     container:
     {
         justifyContent: "center",
         alignItems: "center"
     },



    })
export default AccountScreen
