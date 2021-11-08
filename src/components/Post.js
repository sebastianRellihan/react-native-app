import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons'
import { auth, db } from '../firebase/config'
import { createStackNavigator } from '@react-navigation/stack';
import firebase from 'firebase'
const Stack = createStackNavigator();

export default class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            likes: 0,
            comments: 0,
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
        if (this.props.postData.data.comments) {
            this.setState({
                comments: this.props.postData.data.comments.length
            })
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
                <Image 
                    style={styles.image}
                    source={{uri: this.props.postData.data.photo}}
                />
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
                <Text>Comentarios: {this.state.comments}</Text>
                <TouchableOpacity onPress={() => {
                    this.props.navigation.navigation.navigate('Comments', {postData: this.props.postData})
                    this.props.hideHomeHeader(false);
                }}>
                    <FontAwesomeIcon icon={ faComment } />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        width: '90%',
        height: 200
    },  
    post: {
        flex: 1,
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 10
    },
    likedIcon: {
        color: 'red'
    }
})
