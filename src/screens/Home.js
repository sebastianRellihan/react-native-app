import React, { Component } from 'react'
import { Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import { db } from "../firebase/config";

import Post from '../components/Post'

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            isLoading: true 
        }
    }

    componentDidMount() {
        db.collection('posts').get() // En vez de get usar onSnapshot
            .then(response => {
                let posts = this.state.posts;

                response.forEach(post => {
                    posts.push(post.data());
                })

                this.setState({
                    posts,
                    isLoading: false
                })
            })
    }

    like() {
        // Falta implementar el update del doc de la colección al momento de likear
        console.log('Like')
    }

    render() {
        console.log(this.state.posts);
        return (
            this.state.isLoading ? 
                <ActivityIndicator size="large" color="green" />
            :
                <FlatList 
                    data={this.state.posts}
                    renderItem={({item}) => <Post postData={item} like={() => this.like()} />}
                    keyExtractor={(item) => item.user.email}
                />
        )
    }
}

const styles = StyleSheet.create({})
