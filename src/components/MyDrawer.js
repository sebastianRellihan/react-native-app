import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { auth } from "../firebase/config";

import Home from '../screens/Home'
import NewPost from '../screens/NewPost';
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
            homeHeaderShown: true
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged(user => {
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

    register(email, userName, pass) {
        auth.createUserWithEmailAndPassword(email, pass)
            .then( res => {
                res.user.updateProfile({
                    displayName: userName
                })
            })
            .then(() => console.log('Usuario registrado exitosamente!'))
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

    hideHomeHeader(hide) {
        this.setState({
            homeHeaderShown: hide
        })
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
                                {(drawerProps) => <Register drawerProps={drawerProps} register={(email, userName, pass) => this.register(email, userName, pass)} error={this.state.registerError} />}
                            </Drawer.Screen> 
                        </>
                    ) : (
                        <>
                            <Drawer.Screen name="Home" options={ this.state.homeHeaderShown ? { headerShown: true } : { headerShown: false }} >
                                {() => <Home hideHomeHeader={(hide) => this.hideHomeHeader(hide)}/>}
                            </Drawer.Screen>
                            
                            <Drawer.Screen name="NewPost">
                                {(drawerProps) => <NewPost drawerProps={drawerProps} user={this.state.user} />}
                            </Drawer.Screen>

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