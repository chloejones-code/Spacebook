import React, {useState, Componenet} from 'react';

import {SafeAreaView,StyleSheet,TextInput,Button} from 'react-native';

const textBox = ()=>
{
	const[text,onChangeText] = React.useState('');
	
	return(
	   <SafeAreaView>
	   <TextInput
	       style={styles.input}
		   placeholder="input here"
		   onChangeText={onChangeText}
		   Value={text}
		 />
		 <Button 
		     onclick={() => this.setState()}
			 title ="add"
			 color="#aaaaaa"
		 />
		</SafeAreaView>
	  
	);
}
const styles = StyleSheet.create({
	input:{
		height:40,
		margin:12,
		borderWidth: 1,
		padding: 10,
	},
	
});
export default textBox;