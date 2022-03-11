import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class UpdateAccountScreen extends Component {
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
    Update = async () => {
        const j_value = await AsyncStorage.getItem('@spacebook_info');
        const logindata = JSON.parse(j_value);
        let id = logindata.id;
        console.log(id);
        let token = logindata.token;
        fetch('http://localhost:3333/api/1.0.0/user/' + id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/JSON',
                'X-Authorization': token
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
                    title="Update"
                    onPress={() => this.Update()}
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

export default UpdateAccountScreen
