import React,{useState, useRef} from 'react';
import { StyleSheet, Text, ScrollView,View,StatusBar,Image,TextInput, useWindowDimensions, TouchableOpacity, Dimensions, Button, FlatList, Modal } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../../Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, Ionicons } from "@expo/vector-icons"; 
import Fire from '../../Fire';
import DoctorAppointSlide from '../../screens/doctor-appoint-slide';
import RBSheet from "react-native-raw-bottom-sheet";
import BottomSheet from "../../components/doctorComponents/bottomSheet";


export default class DoctorBar extends React.Component {
   

    state ={
        showListVisible : false,
       
        

    };


    toggleListModal(){
        this.setState({showListVisible: !this.state.showListVisible})
    }
    renderDelete(){
        alert('hii');
    }  

  render() {
    const pers = this.props.pers;
    return (
        <View>
            <Modal animationType="slide" visible={this.state.showListVisible} onRequestClose={()=>this.toggleListModal()}>
                    <DoctorAppointSlide pers={pers} closeModal={()=>this.toggleListModal()} />
            </Modal>
            
        <RBSheet ref={ref => { this.RBSheet = ref;}} height={300} openDuration={150} customStyles={sheetStyles}>
            <BottomSheet pers={pers} />
        </RBSheet>
           

            <View style={styles.doctor}>
                    <TouchableOpacity disabled={this.props.isManage} onPress={()=>this.toggleListModal()} style={{ marginBottom:15, flexDirection:'row', alignItems:'center',  }}>
                        <View>
                            <Image source={require('../../assets/default-doctor.png')} style={{width:65, height:65, borderRadius: 15, backgroundColor:'#fff', marginHorizontal:10, marginVertical: 10}} />
                        </View>
                        <View  style={{width:220, }}>
                            <Text style={{ }}>{pers.profession}</Text>
                            <Text style={{ fontSize:15, fontWeight:'700' }}>Dr. {pers.nom}</Text>
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
        width:350, 
        height:90,
        backgroundColor:colors.lighterGray, 

    },


});

const sheetStyles = StyleSheet.create({
    
        container: {
          borderTopLeftRadius : 20,
          borderTopRightRadius : 20,
        },
      
});
