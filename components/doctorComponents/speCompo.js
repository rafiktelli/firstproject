import React,{useState} from 'react';
import { StyleSheet, Text, ScrollView,View,StatusBar,Image,TextInput, TouchableOpacity, Dimensions, FlatList, Modal } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../../Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, Ionicons } from "@expo/vector-icons"; 
import Fire from '../../Fire';
import DoctorAppointSlide from '../../screens/doctor-appoint-slide';

export default class speCompo extends React.Component {
    


  render() {

    var pressed = true;

        if(this.props.isPressed === this.props.name){
            pressed = true;
        } else {
            pressed = false;
        
        }
    
    return (
        <View style={[styles.category,{ backgroundColor: pressed ? '#0073CF':colors.lightGray}]}>
            <View style={{flex:1, flexDirection:'column', justifyContent:'flex-end', alignItems:'center', marginBottom:15  }} >
                <Text style={{color: pressed ? colors.white:'#000', fontWeight: '700'}}>{this.props.name}</Text>
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    category:{
        height:110,
        marginHorizontal:3, 
        flexDirection:'row', 
        borderRadius: 15, 
        justifyContent:'space-between',
        width:90, 
        backgroundColor:colors.lightGray, 
    },
});
