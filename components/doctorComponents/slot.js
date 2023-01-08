import React,{useState, useRef} from 'react';
import { StyleSheet, Text, ScrollView,View,StatusBar,Image,TextInput, useWindowDimensions, TouchableOpacity, Dimensions, Button, FlatList, Modal } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../../Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, Ionicons } from "@expo/vector-icons"; 
import Fire from '../../Fire';


export default class Slot extends React.Component {

  render() {
      
    var pressed = this.props.isPressed;
    if(this.props.isPressed === this.props.time){
        pressed = true;
    } else {
        pressed = false;
    
    }
    return (
      <View>
            <View style={{height:45, width:90, backgroundColor: pressed ? colors.blue:'#C0C0C0' ,marginRight:5, marginBottom: 5, borderRadius:15, alignItems:'center',justifyContent:'center'}} >
                <Text style={{fontWeight:'700', fontSize:15, color: pressed ? colors.white:'#000',}}>{this.props.time}</Text>
            </View>
      </View>
    );
  }
}

const styles =StyleSheet.create({

});
