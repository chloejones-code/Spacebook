import React, { Component, useState } from 'react';
import { Text, View } from 'react-native';

const BringData = async (Got) => {
    const j_value = await AsyncStorage.getItem('@spacebook_info')
    const logindata = JSON.parse(j_value);
    let id = logindata.id;
    let token = logindata.token;

}
const [data, setdata] = useState([]);
const data = () => {
    const resp = await fetch('http://localhost:3333/api/1.0.0/user/' + id, {
        method: 'Get',
        headers: {
            'Content-Type': 'application/JSON',
            'X-Authorization': token,
        }
    })
    const json = await resp.json();
    return json.


    }
class AccountScreen extends Component {
    render() {
        return (
            <text>data.f</text>
        );
    }
}

export default AccountScreen
