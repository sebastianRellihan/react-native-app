import React, { Component } from 'react'
import { Text, StyleSheet, FlatList, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import {db, auth} from '../firebase/config'
import firebase from 'firebase'
export default class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: '',
            comments: [],
            isLoading: true
        }
    }

    componentDidMount() {
        this.getComments()
    }

    componentDidUpdate() {
        this.getComments()
    }

    getComments() {
        db.collection('posts').doc(this.props.stackProps.route.params.postData.id).get()
        .then(doc => {
            this.setState({
                comments: doc.data().comments,
                isLoading: false
            })
        })
        .catch(err => console.log(err))
    }

    componentWillUnmount() {
        this.props.hideHomeHeader(true);
    }

    comment() {
        db.collection('posts').doc(this.props.stackProps.route.params.postData.id).update({
            comments: firebase.firestore.FieldValue.arrayUnion({
                user: auth.currentUser.email,
                comment: this.state.comment,
                created_at: Date.now()
            })
        })
            .then(() => {
                this.setState({
                    comment: '',
                })
            })
            .catch(err => console.log(err)) 
    }

    render() {
        return (
            this.state.isLoading ? 
                <ActivityIndicator size="large" color="green" />
            :
                <>
                    <FlatList 
                        data={this.state.comments}
                        keyExtractor={(item) => item.created_at}
                        renderItem={({item}) => <Text>{`${item.user}: ${item.comment}`}</Text>}
                    />
                    <TextInput 
                        style={styles.input}
                        onChangeText={(text) => this.setState({comment: text})}
                        placeholder='Add a comment'
                        keyboardType='default'
                        value={this.state.comment}
                    />
                    <TouchableOpacity style={styles.button} onPress={()=> this.comment()}>
                        <Text style={styles.textButton}>Post</Text>    
                    </TouchableOpacity>
                </>
        )
    }
}

const styles = StyleSheet.create({
    input:{
        height:20,
        paddingVertical:15,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,
    },
    button:{
        backgroundColor:'#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#28a745'
    },
    textButton:{
        color: '#fff'
    }
})
