import React,{useState} from 'react'
import { StyleSheet, Text, ScrollView,View,StatusBar,Image,TextInput, TouchableOpacity } from 'react-native';
import {AntDesign} from '@expo/vector-icons';



export default class DoctorAppointSlide extends React.Component {

    render(){
        return (
            <View style={styles.container}>
                <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <Text>Hello</Text>
                
            <TouchableOpacity style={{position:'absolute', top:32, right:32, zIndex: 10 }} onPress={this.props.closeModal}>
                    <AntDesign  name="close" size={24} color={colors.black} />
            </TouchableOpacity>
            

                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF',
      },


})