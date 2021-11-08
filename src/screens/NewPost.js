import React, { Component } from 'react'
import { TextInput, TouchableOpacity, Text, StyleSheet, View } from 'react-native'
import { db } from "../firebase/config";

import TakePicture from '../components/TakePicture'

export default class NewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            photoUrl: '',
            showCamera: true
        }
    }

    post() {
        db.collection('posts').add({
            title: this.state.title,
            description: this.state.description,
            user: {
                email: this.props.user.email,
                userName: this.props.user.displayName
            }, 
            likes: [],
            comments: [],
            created_at: Date.now(),
            photo: this.state.photoUrl
        })
            .then(() => {
                this.props.drawerProps.navigation.navigate('Home')
            })
            .catch(err => {
                console.log(err);
            })
    }

    onImageUpload(url) {
        this.setState({
            photoUrl: url,
            showCamera: false
        })
    }

    render() {
        return (
            this.state.showCamera ? 
                <TakePicture onImageUpload={ (url) => this.onImageUpload(url) }/>
            :
                <View style={styles.formContainer}>
                    <TextInput 
                        style={styles.input}
                        onChangeText={(text) => this.setState({title: text})}
                        placeholder='Title'
                        keyboardType='default'
                    />
                    <TextInput 
                        style={styles.input}
                        onChangeText={(text) => this.setState({description: text})}
                        placeholder='Description'
                        keyboardType='default'
                        multiline={true}
                    />
                    
                    <TouchableOpacity style={styles.button} onPress={()=> this.post()}>
                        <Text style={styles.textButton}>Post</Text>    
                    </TouchableOpacity>
                </View>
        )
    }
}

const styles = StyleSheet.create({
    formContainer:{
        paddingHorizontal:10,
        marginTop: 20,
    },
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
