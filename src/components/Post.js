import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { auth, db } from '../firebase/config'
import firebase from 'firebase'

export default class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            likes: 0,
            liked: false,
        }
    }

    componentDidMount() {
        if (this.props.postData.data.likes) {            
            this.setState({
                likes: this.props.postData.data.likes.length,
            })
            if (this.props.postData.data.likes.includes(auth.currentUser.email)) {
                this.setState({
                    liked: true,
                })  
            }
        }
    }

    like() {
        db.collection('posts').doc(this.props.postData.id).update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
            .then(() => {
                this.setState({
                    liked: true,
                    likes: this.state.likes + 1,
                })
            })
            .catch(err => console.log(err)) 
    }

    unlike() {
        db.collection('posts').doc(this.props.postData.id).update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
            .then(() => {
                this.setState({
                    liked: false,
                    likes: this.state.likes - 1,
                })
            })
            .catch(err => console.log(err)) 
    }

    render() {
        return (
            <View style={styles.post}>
                <Text>Usuario: {this.props.postData.data.user.userName}</Text>
                <Text>Título: {this.props.postData.data.title}</Text>
                <Text>Descripción: {this.props.postData.data.description}</Text>
                <Text>likes: {this.state.likes}</Text>
                {
                    this.state.liked ? 
                        <TouchableOpacity onPress={() => this.unlike()}>
                            <FontAwesomeIcon icon={ faHeart } style={styles.likedIcon} />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={() => this.like()}>
                            <FontAwesomeIcon icon={ faHeart } />
                        </TouchableOpacity>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    post: {
        marginBottom: 10,
        marginTop: 10
    },
    likedIcon: {
        color: 'red'
    }
})
