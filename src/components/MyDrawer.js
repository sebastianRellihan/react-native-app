import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'

import Home from '../screens/Home'
import Login from '../screens/Login'
import Register from '../screens/Register'

const Drawer = createDrawerNavigator();

export default class MyDrawer extends Component {
    constructor() {
        super();
        this.state = {
            isLoggedIn: false
        }
    }

    render() {
        return (
            <Drawer.Navigator>
                {
                    this.state.isLoggedIn == false ? (
                        <>
                            <Drawer.Screen name="Login" component={Login} />
                            <Drawer.Screen name="Register" component={Register} />
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
