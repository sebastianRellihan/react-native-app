import React, { Component } from 'react'
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';

export default class Login extends Component {
    constructor(props){
        super(props)
        this.state={
            email:'',
            pass:'',
        }
    }

    render() {
        return (
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({email: text})}
                    placeholder='email'
                    keyboardType='email-address'
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({pass: text})}
                    placeholder='password'
                    keyboardType='email-address'
                    secureTextEntry={true}
                />
                {
                    this.props.error ? <Text>{this.props.error.message}</Text> : null
                }
                <TouchableOpacity style={styles.button} onPress={()=> this.props.login(this.state.email, this.state.pass)}>
                    <Text style={styles.textButton}>Ingresar</Text>    
                </TouchableOpacity>

                <Text>
                    ¿No tenés una cuenta? 
                    <TouchableOpacity onPress={() => this.props.drawerProps.navigation.navigate("Register")}>
                        <Text> Registrate</Text>
                    </TouchableOpacity>
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    formContainer:{
        paddingHorizontal:10,
        marginTop: 20,
    },
    input:{
        height:20,
        paddingVertical:15,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,
    },
    button:{
        backgroundColor:'#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#28a745'
    },
    textButton:{
        color: '#fff'
    }

})
