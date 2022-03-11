import React, { Component } from 'react';
import { Text, TextInput, View, Button, StyleSheet, Alert, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Data = async (value) => {
    const j_value = JSON.stringify(value)
    await AsyncStorage.setItem('@spacebook_info', j_value)


}


class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state =
        {
            email: "",
            password: "",
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
               Data(json);
                this.props.navigation.navigate('Hello user');
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
                    placeholder="Email"
                    onChangeText={(email) => this.setState({ email })}

                />
                <Text>Password: </Text>
                <TextInput
                    style={{ height: 40 }}
                    placeholder="Password"
                    onChangeText={(password) => this.setState({ password })}
                    secureTextEntry={true}
                />
                <Button
                    title="log in"
                    onPress={() => this.login()}
                />
                
                <View style={styles.signup}>
                    <Button
                        title="Sign up"
                        onPress={() => this.props.navigation.navigate('Signup')}
                    />
                </View>
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
        signup: {
            alignItems: "flex-start",
            justifyContent: "flex-end",
            alignSelf: "flex-end",
            flexDirection: "column-reverse",
            
            
    }
});

export default LoginScreen
