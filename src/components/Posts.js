import React, { Component } from 'react'
import { Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import { db } from "../firebase/config";

import Post from '../components/Post'

export default class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            isLoading: true 
        }
    }

    componentDidMount() {
        db.collection('posts').orderBy('created_at', 'desc').onSnapshot( docs => {
            console.log(docs);
            let posts = [];
            docs.forEach(doc => {
                console.log('test');
                posts.push({
                    id: doc.id,
                    data: doc.data(),
                })
            })

            this.setState({
                posts: posts,
                isLoading: false
            })
        })
    }

    render() {
        return (
            this.state.isLoading ? 
                <ActivityIndicator size="large" color="green" />
            :
                <FlatList 
                    data={this.state.posts}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => <Post postData={item} navigation={this.props.drawerProps} hideHomeHeader={this.props.hideHomeHeader}/>}
                />
        )
    }
}

const styles = StyleSheet.create({})
