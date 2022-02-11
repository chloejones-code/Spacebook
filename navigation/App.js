import React, { Component } from 'react';
import { Text, TextInput, View, Button, StyleSheet, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/home'

class login extends Component {
    constructor(props) {
        super(props);
        this.state =
        {
            email: "",
            password:"",
        }
    }
    login = () => {
        fetch('http://localhost:3333/api/1.0.0/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/JSON'
            }, body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json);

                Alert.alert("successfully Logged in")
            })
            .catch((error) => {
                console.error(error);
            });
    
    }
    render() {
        return (

            <View style={styles.container}>
              <Text>Email:</Text>
               <TextInput
                    style={{ height: 40 }}
                    placeholder="input here"
                    onChangeText={(email) => this.setState({ email })}
                    
                />
                <Text>Password: </Text>
                  <TextInput
                    style={{ height: 40 }}
                    placeholder="input here"
                    onChangeText={(password) => this.setState({ password })}
                    secureTextEntry={true}
                />
                <Button
                    title="log in"
                    onPress={() => this.login()}
                />
            </View>
        
    );
    }

}

const styles = StyleSheet.create({
    container: {
        alignitems: "center",
        flex: 1,
        justifyContent: "center",
    }
});

export default login
