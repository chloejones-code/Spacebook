import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, Button} from 'react-native';

class SignupScreen extends Component {
    constructor(props) {
        super(props);
        this.state =
        {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
        }

    }
    Signup = () =>
    {
        fetch('http://localhost:3333/api/1.0.0/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/JSON'
            }, body: JSON.stringify({
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                email: this.state.email,
                password: this.state.password
            })
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json);

                this.props.navigation.navigate('Login');
            })

    }
    render() {
        return (
            <View style={styles.container}>
                <Text>First Name:</Text>
                <TextInput
                    style={{ height: 40 }}
                    placeholder="Enter Here"
                    onChangeText={(first_name) => this.setState({ first_name })}
                />
                <Text>Last_name:</Text>
                <TextInput
                    style={{ height: 40 }}
                    placeholder="Enter Here"
                    onChangeText={(last_name) => this.setState({ last_name })}
                    />
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
                    title="Signup"
                    onPress={() => this.Signup()}
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

export default SignupScreen
