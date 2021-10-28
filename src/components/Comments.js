import React, { Component } from 'react'
import { Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native'

export default class Comments extends Component {

    componentWillUnmount() {
        this.props.hideHomeHeader(true);
    }

    render() {
        return (
            <Text>Comments</Text>
        )
    }
}

const styles = StyleSheet.create({})
