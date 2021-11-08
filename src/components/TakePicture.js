import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import { Camera } from 'expo-camera';
import { storage } from '../firebase/config'

export default class TakePicture extends Component {
    constructor() {
        super();
        this.state = {
            hasPermission: false,
            photo: '',
        }
        this.camera;
    }

    componentDidMount() {
        Camera.requestCameraPermissionsAsync()
            .then(() => {
                this.setState({
                    hasPermission: true
                })
            })
            .catch(() => {
                this.setState({
                    hasPermission: true
                })
            })
    }

    takePicture() {
        if (this.camera != null) {
            this.camera.takePictureAsync()
                .then(photo => {
                    this.setState({
                        photo: photo.uri
                    })
                })
        }
    }

    uploadImage() {
        fetch(this.state.photo) 
            .then(res => res.blob())
            .then(image => {
                const ref = storage.ref(`posts/${Date.now()}.jpg`)
                ref.put(image)
                    .then(() => {
                        ref.getDownloadURL()
                        .then(url => {
                            this.props.onImageUpload(url)
                            this.setState({
                                photo: ''
                            })
                        })
                    })
                    .catch(err => console.log(err))
            })
    }

    rejectImage() {

    }

    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.photo ? 
                        <View style={styles.container}>
                            <Image style={styles.preview} source={{uri: this.state.photo}}/>
                            <View style={styles.btnContainer}>
                                <TouchableOpacity
                                    style={styles.reject}
                                    onPress={() => this.rejectImage()}
                                >
                                    <Text style={styles.text}>Cancelar</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.accept}
                                    onPress={() => this.uploadImage()}
                                >
                                    <Text style={styles.text}>Subir</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    :
                        this.state.hasPermission ? 
                            <Camera
                                style={styles.camera}
                                type={Camera.Constants.Type.front}
                                ref={ref => this.camera = ref}
                            >
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={() => this.takePicture()}>
                                    </TouchableOpacity>
                                </View>
                            </Camera>
                        :
                            <Text>No tenés permiso para acceder a la cámara</Text>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    camera: {
        flex: 1,
        width: '100%',
    },
    buttonContainer: {
        width: '100%',
        height: 124,
        position: 'absolute',
        bottom: 40,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        width: 124,
        height: '100%',
        borderWidth: 5,
        borderColor: 'white',
        borderRadius: 100,
        backgroundColor: 'rgba(0,0,0,0.1)'
    },
    text: {
        width: '100%',
        textAlign: 'center',
        color: 'white',
        paddingTop: 15
    },
    imageContainer: {
        height: '90%',
    },
    preview: {
        width: '100%',
        flex: 6
    },
    btnContainer: {
        flex: 1,
        backgroundColor: '#000020',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
    },
    accept: {
        width: 100,
        height: 50,
        backgroundColor: '#7F6DF3',
        borderRadius: 50
    },
    reject: {
        width: 100,
        height: 50,
        backgroundColor: '#FF392B',
        borderRadius: 50
    }
})
