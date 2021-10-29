import React, { Component } from 'react'
import { Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { db } from "../firebase/config";

import Posts from '../components/Posts'
import Post from '../components/Post'
import Comments from '../components/Comments'

const Stack = createStackNavigator();

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            isLoading: true 
        }
    }

    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Posts" options={{ headerShown: false }}>
                    {(stackProps) => <Posts hideHomeHeader={this.props.hideHomeHeader} stackProps={stackProps}/>}
                </Stack.Screen>
                <Stack.Screen name="Comments" options={{ headerShown: true }}>
                    {(stackProps) => <Comments hideHomeHeader={this.props.hideHomeHeader} stackProps={stackProps}/>}
                </Stack.Screen>
            </Stack.Navigator>
        )
    }
}

const styles = StyleSheet.create({})
