import React, {useState, Componenet} from 'react';

import {SafeAreaView,StyleSheet,TextInput,Button} from 'react-native';
class omg extends components{
const Todo = ()=>
{
	const[text,onChangeText] = React.useState('');
	constructor()
	
	this.state =
	{
		work:'',
	};
	
	return(
	   <SafeAreaView>
	   <TextInput
	       style={styles.input}
		   placeholder="input here"
		   onChangeText={onChangeText}
		   Value={text}
		 />
		 <Button 
		     onclick={() => this.setState(this.state.work)}
			 title ="add"
			 color="#aaaaaa"
		 />
		 <Text>Hello </Text>
		</SafeAreaView>
	   
	);
	
}
}
const styles = StyleSheet.create({
	input:{
		height:40,
		margin:12,
		borderWidth: 1,
		padding: 10,
	},
	
});
export default Todo;