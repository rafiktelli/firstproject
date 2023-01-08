import React,{useState} from 'react'
import { StyleSheet, Text, ScrollView,View,StatusBar,Image,TextInput, TouchableOpacity, Dimensions } from 'react-native';
import {AntDesign} from '@expo/vector-icons';



export default class DoctorAppointSlide extends React.Component {
    const 
    render(){
        return (
            <View style={styles.container}>
                <StatusBar barStyle="dark-content" backgroundColor="#fff" />   
                <TouchableOpacity style={{position:'absolute', top:32, right:32, zIndex: 10 }} onPress={this.props.closeModal}>
                        <AntDesign  name="close" size={24} color={colors.black} />
                </TouchableOpacity>

                <View style={{ backgroundColor:'', height:260, marginBottom:10, paddingTop:50, flexDirection:'column', alignItems:'center', justifyContent:'center', }}>
                    <View>
                        <Image style={{width:130, height:130, borderRadius:25,  }} source={require('../assets/doctor-female.jpg')}  />
                    </View>
                    <Text style={styles.persName}>{this.props.pers.speciality} </Text>
                    <Text style={styles.persSpec}>Dr.{this.props.pers.nom}</Text>
                </View>
                <View style={{backgroundColor:'#f8f4f4',flex:1, borderTopLeftRadius: 35, borderTopRightRadius: 20, }}></View>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
      },
      persName:{
            paddingTop: 10,
            fontSize: 18,
            fontWeight: '400',
      },
      persSpec:{
        paddingTop: 5,
        fontSize: 18,
        fontWeight: '400',
        fontWeight:'500',
      },


})