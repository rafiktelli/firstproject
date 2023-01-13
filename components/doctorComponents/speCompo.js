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
    var source;
    switch (this.props.name){
        case("Cardiologie") : {   (source =  pressed ? require('../../assets/icons/white-icons/Cardio.png') : require('../../assets/icons/Cardio.png')); break;}
        case("Ophtalmologie") : {   (source =  pressed ? require('../../assets/icons/white-icons/Ophtalmo.png') : require('../../assets/icons/Ophtalmo.png')); break;}
        case("Infantile") : case("Pédiatrie") : {(source = pressed ? require('../../assets/icons/white-icons/Pédiatrie.png') : require('../../assets/icons/Pédiatrie.png')); break;}
        case("Maxillo-faciale") : case("ORL") : {   (source =  pressed ? require('../../assets/icons/white-icons/ORL.png') : require('../../assets/icons/ORL.png')); break;}
        case("Urologie") : {   (source =  pressed ? require('../../assets/icons/white-icons/kidney.png') : require('../../assets/icons/kidney.png')); break;}
        case("Générale") : {   (source =  pressed ? require('../../assets/icons/white-icons/generale.png') : require('../../assets/icons/generale.png')); break;}
        case("Gynécologie") : {   (source =  pressed ? require('../../assets/icons/white-icons/Gyneco.png') : require('../../assets/icons/Gyneco.png')); break;}
        case("Dermatologie") : {   (source =  pressed ? require('../../assets/icons/white-icons/Dermato.png') : require('../../assets/icons/Dermato.png')); break;}
        case "Neurochirurgie" : case "Neurologie" : {   (source =  pressed ? require('../../assets/icons/white-icons/neuro.png') : require('../../assets/icons/neuro.png')); break;}
        case ("Vasculaire") : {   (source =  pressed ? require('../../assets/icons/white-icons/vascular.png') : require('../../assets/icons/vascular.png')); break;}
        case ("Gastrologie") : {   (source =  pressed ? require('../../assets/icons/white-icons/gastro.png') : require('../../assets/icons/gastro.png')); break;}
    }
    
    
    
    return (
        
        <View style={[styles.category,{ backgroundColor: pressed ? colors.blue :colors.lighterGray}]}>
            <View style={{flex:1, justifyContent:'center', alignItems:'center', paddingTop:10}}>
                <Image source={source} style={{ height:45, width:45}} />
            </View>
            <View style={{flexDirection:'column', justifyContent:'flex-end', alignItems:'center', marginBottom:15  }} >
                <Text style={{color: pressed ? colors.white:'#000', fontWeight: '700', fontSize:14}}>{this.props.name}</Text>
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    category:{
        
        height:120,
        marginHorizontal:5, 
        
        borderRadius: 15, 
        justifyContent:'space-between',
        width:100, 
        backgroundColor:colors.lightGray, 
    },
});
