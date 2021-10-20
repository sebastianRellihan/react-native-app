import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { auth } from "../firebase/config";

import Home from '../screens/Home'
import Login from '../screens/Login'
import Register from '../screens/Register'

const Drawer = createDrawerNavigator();

export default class MyDrawer extends Component {
    constructor() {
        super();
        this.state = {
            isLoggedIn: false,
            registered: false,
            error: ''
        }
    }

    register(email, pass) {
        auth.createUserWithEmailAndPassword(email, pass)
            .then( res => {
                console.log("registrado!");
                this.setState({registered: true})
            })
            .catch(err => {
                console.log(err)
                this.setState({error: 'Fallo en el registro'})
            })
    }

    login(email, pass) {
        auth.signInWithEmailAndPassword(email, pass)
            .then( res => {
                console.log("logueado!");
                this.setState({isLoggedIn: true})
            })
            .catch( err => {
                console.log(err);
                this.setState({error: 'Credenciales invalidas'})   
            })
    }

    render() {
        return (
            <Drawer.Navigator>
                {
                    this.state.isLoggedIn == false ? (
                        <>
                            <Drawer.Screen name="Login">
                                {() => <Login login={(email, pass) => this.login(email, pass)} />}
                            </Drawer.Screen> 

                            <Drawer.Screen name="Register">
                                {() => <Register register={(email, pass) => this.register(email, pass)} />}
                            </Drawer.Screen> 
                        </>
                    ) : (
                        <>
                            <Drawer.Screen name="Home" component={Home} />
                        </>
                    )
                }
            </Drawer.Navigator>
        )
    }
}

const styles = StyleSheet.create({})
