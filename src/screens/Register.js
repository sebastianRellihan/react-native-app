import React, { Component } from 'react'
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
export default class Register extends Component {
    constructor(props){
        super(props)
        this.state={
            email:'',
            userName: '',
            pass:'',
        }
    }

    render() {
        return (
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({email: text})}
                    placeholder='Email'
                    keyboardType='email-address'
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({userName: text})}
                    placeholder='User Name'
                    keyboardType='default'
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({pass: text})}
                    placeholder='Password'
                    keyboardType='email-address'
                    secureTextEntry={true}
                />
                {
                    this.props.error ? <Text>{this.props.error.message}</Text> : null
                }
                <TouchableOpacity style={styles.button} onPress={() => this.props.register(this.state.email, this.state.userName, this.state.pass)}>
                    <Text style={styles.textButton}>Registrarse</Text>    
                </TouchableOpacity>
                
                <Text>
                    ¿Ya tenés una cuenta? 
                    <TouchableOpacity onPress={() => this.props.drawerProps.navigation.navigate("Login")}>
                        <Text> Inicia sesión</Text>
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
