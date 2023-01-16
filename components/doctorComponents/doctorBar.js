import React,{useState, useRef} from 'react';
import { StyleSheet, Text, ScrollView,View,StatusBar,Image,TextInput, useWindowDimensions, TouchableOpacity, Dimensions, Button, FlatList, Modal } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../../Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, Ionicons } from "@expo/vector-icons"; 
import Fire from '../../Fire';
import DoctorAppointSlide from '../../screens/doctor-appoint-slide';
import AssignSlide from '../../screens/assign-slide';
import AssignSlide2 from '../../screens/assign-slide';
import RBSheet from "react-native-raw-bottom-sheet";
import BottomSheet from "../../components/doctorComponents/bottomSheet";
import SurgeonAppointSlide from "../../screens/surgeon-appoint-slide";

import ViewDocTasksScreen from '../../screens/viewDocTasks-screen';


export default class DoctorBar extends React.Component {
   

    state ={
        showListVisible : false,
        showListVisible2: false,
        showListVisible1: false,
        pressedAnes: false,
       
        

    };


    toggleListModal(){
        if(this.props.surg){
            
            this.props.navigation.navigate("SurgeonAppointSlide",{pers: this.props.pers});
        } else {
            if(this.props.med){
                this.props.navigation.navigate("Take an Appointment",{pers: this.props.pers});
            } else {
                if(this.props.anes){
                    
                    
                } else{
                    this.props.navigation.navigate("Todo List",{pers: this.props.pers});
                }
            }
        } 
    
    }
    renderDelete(){
        alert('hii');
    }  

  render() {
    const pers = this.props.pers;
    const med = this.props.med;
    const surg = this.props.surg;
    const anes = this.props.anes;
    var pressed = false; 
    {/*console.log("start is pressed");
    console.log("pressed item " + this.props.isPressed);
    console.log("bar ID "+ this.props.pers.id);
    console.log("end is pressed"); */}
    if(this.props.isPressed === this.props.pers.id){
        pressed = true;
    } else {
        pressed = false;
    
    }

    return (
        <View>
            <Modal animationType="slide" visible={this.state.showListVisible} onRequestClose={(med)=>this.toggleListModal()}>
                    <DoctorAppointSlide pers={pers} closeModal={()=>this.toggleListModal(this.props.med)} />
            </Modal>
            <Modal animationType="slide" visible={this.state.showListVisible2} onRequestClose={(med)=>this.toggleListModal()}>
                <AssignSlide pers={pers} closeModal={()=>this.toggleListModal(med)} />
            </Modal>
            <Modal animationType="slide" visible={this.state.showListVisible1} onRequestClose={(med,pers)=>this.toggleListModal()}>
                <SurgeonAppointSlide pers={pers} closeModal={()=>this.toggleListModal(med)} />
            </Modal>
            
        <RBSheet ref={ref => { this.RBSheet = ref;}} height={230} openDuration={150} customStyles={sheetStyles}>
            <BottomSheet med={med} pers={pers} navigation={this.props.navigation} />
        </RBSheet>
           

            <View style={[styles.doctor, {backgroundColor: pressed ? colors.blue : colors.lighterGray }]}>
                    <TouchableOpacity disabled={this.props.isManage || this.props.anes} onPress={()=>this.toggleListModal()} style={{ marginBottom:15, flexDirection:'row', alignItems:'center',  }}>
                        <View>
                            <View>
                                <Image source={require('../../assets/default-doctor.png')} style={{ width:65, height:65, borderRadius: 15, backgroundColor:'#fff', marginHorizontal:10, marginVertical: 10, borderWidth:2,  }} />
                            </View>
                        </View>
                        <View  style={{width:220, flexDirection:'column', alignItems:'flex-start', }}>
                            <Text style={{  display: pers.speciality  > "" ? 'flex' : 'none', color: pressed ? '#FFF': colors.gray , fontWeight:'300'  }}>{ pers.speciality}</Text>
                            <Text style={{ fontSize:16,  color: pressed ? '#FFF':'#000', fontWeight:'600' }}>{(med || surg ) ? "Dr. ":""}{pers.nom}</Text>
                        </View>
                        <TouchableOpacity style={{ display: this.props.isManage ? 'flex' : 'none',  flex:1, alignItems: 'flex-end', justifyContent:'center',marginHorizontal:10, marginVertical: 10,width:40,}} onPress={() => this.RBSheet.open()}>
                            <Image source={require('../../assets/verticalDots.png')} style={{ height:30, width:30, }} />
                        </TouchableOpacity>
                    </TouchableOpacity>
                </View>
        </View>
    );
  }
};

const styles = StyleSheet.create({


    doctor:{
        flex:1,
        borderRadius: 20, 
        marginVertical: 3, 
        height:90,
        width:350

    },


});

const sheetStyles = StyleSheet.create({
    
        container: {
          borderTopLeftRadius : 20,
          borderTopRightRadius : 20,
        },
      
});
