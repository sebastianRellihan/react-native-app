import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { auth } from "../firebase/config";

import Home from '../screens/Home'
import Profile from '../screens/Profile'
import Login from '../screens/Login'
import Register from '../screens/Register'

const Drawer = createDrawerNavigator();

export default class MyDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            isLoading: true,
            loginError: '',
            registerError: '',
            user: {}
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged(user => {
            console.log(user);
            if(user){
                this.setState({
                    isLoggedIn: true, 
                    isLoading: false,
                    user
                })
            } else {
                this.setState({
                    isLoggedIn: false, 
                    isLoading: false,
                })
            }
        })
    }

    register(email, pass) {
        auth.createUserWithEmailAndPassword(email, pass)
            .then( res => {
                console.log("registrado!");
                // Agregar nombre de usuario al registrar 
            })
            .catch(err => {
                this.setState({registerError: err})
            })
    }

    login(email, pass) {
        auth.signInWithEmailAndPassword(email, pass)
            .then( res => {
                console.log("logueado!");
                this.setState({isLoggedIn: true})
            })
            .catch( err => {
                this.setState({loginError: err})
            })
    }

    logout() {
        auth.signOut();
    }

    render() {
        return (
            this.state.isLoading ? 
                <ActivityIndicator size="large" color="green" />
            :
            <Drawer.Navigator>
                {
                    this.state.isLoggedIn == false ? (
                        <>
                            <Drawer.Screen name="Login">
                                {(drawerProps) => <Login drawerProps={drawerProps} login={(email, pass) => this.login(email, pass)} error={this.state.loginError} />}
                            </Drawer.Screen> 

                            <Drawer.Screen name="Register">
                                {(drawerProps) => <Register drawerProps={drawerProps} register={(email, pass) => this.register(email, pass)} error={this.state.registerError} />}
                            </Drawer.Screen> 
                        </>
                    ) : (
                        <>
                            <Drawer.Screen name="Home" component={Home} />

                            <Drawer.Screen name="Profile">
                                {() => <Profile user={this.state.user} logout={this.logout} />}
                            </Drawer.Screen>
                        </>
                    )
                }
            </Drawer.Navigator>
        )
    }
}

const styles = StyleSheet.create({})
