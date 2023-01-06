import React,{useState} from 'react';
import { StyleSheet, Text, ScrollView,View,StatusBar,Image,TextInput, TouchableOpacity, Dimensions, FlatList, Modal } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../../Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, Ionicons } from "@expo/vector-icons"; 
import Fire from '../../Fire';
import DoctorAppointSlide from '../../screens/doctor-appoint-slide';

export default class DoctorBar extends React.Component {
    state ={
        showListVisible : false,
    };

    toggleListModal(){
        this.setState({showListVisible: !this.state.showListVisible})
    }

  render() {
    const pers = this.props.pers;
    return (
        <View>
            <Modal animationType="slide" visible={this.state.showListVisible} onRequestClose={()=>this.toggleListModal()}>
                    <DoctorAppointSlide closeModal={()=>this.toggleListModal()} />
            </Modal>



            <View style={styles.doctor}>
                    <TouchableOpacity onPress={()=>this.toggleListModal()} style={{ marginBottom:15, flexDirection:'row', alignItems:'center',  }}>
                        <View>
                            <Image source={require('../../assets/default-doctor.png')} style={{width:50, height:50, borderRadius: 5, backgroundColor:'#fff', marginHorizontal:10, marginVertical: 10}} />
                        </View>
                        <View>
                            <Text style={{}}>{pers.nom}</Text>
                            <Text style={{}}>{pers.speciality}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
        </View>
    );
  }
};

const styles = StyleSheet.create({


    doctor:{
        flex:1,
        borderRadius: 15, 
        marginVertical: 3, 
        width:350, 
        height:80,
        backgroundColor:colors.lightGray, 

    },


})
