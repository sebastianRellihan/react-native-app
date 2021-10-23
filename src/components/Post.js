import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

export default class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <View style={styles.post}>
                <Text>Usuario: {this.props.postData.user.userName}</Text>
                <Text>Título: {this.props.postData.title}</Text>
                <Text>Descripción: {this.props.postData.description}</Text>
                <TouchableOpacity onPress={() => this.props.like()}>
                    <FontAwesomeIcon icon={ faHeart } />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    post: {
        marginBottom: 10,
        marginTop: 10
    }
})
