import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'

export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <View>
                <Text>Email registrado: {this.props.user.email}</Text>
                <Text>Email registrado: {this.props.user.metadata.lastSignInTime}</Text>
                <TouchableOpacity style={styles.button} onPress={this.props.logout}>
                    <Text style={styles.textButton}>Cerrar sesión</Text>    
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button:{
        backgroundColor:'#c62828',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#c62828'
    },
    textButton:{
        color: '#fff'
    }
})