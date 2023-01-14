import React,{useState, useRef} from 'react';
import { StyleSheet, Text, ScrollView,View,StatusBar,Image,TextInput, useWindowDimensions, TouchableOpacity, Dimensions, Button, FlatList, Modal } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../../Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, Ionicons } from "@expo/vector-icons"; 
import Fire from '../../Fire';
import DoctorAppointSlide from '../../screens/doctor-appoint-slide';
import RBSheet from "react-native-raw-bottom-sheet";
import ViewDocTasksScreen from '../../screens/viewDocTasks-screen';
import AssignSlide from '../../screens/assign-slide';

export default class BottomSheet extends React.Component {

    state={
        showListVisible : false,
        showListVisible1 : false,
    }

    toggleListModal(){
        if (this.props.pers.profession=="Medecin"){
            this.setState({showListVisible: !this.state.showListVisible});
       
        }
        else{
            this.setState({showListVisible1: !this.state.showListVisible1});
        }
        
    
    }
    DeleteDoctor(){ 
        if(this.props.pers.profession==="Medecin"){
            firebase.deleteDoctor(this.props.pers);
        } else {
            if(this.props.pers.profession==="Chirurgien"){
                firebase.deleteSurg(this.props.pers);
                   
            } else{
                firebase.deleteAide(this.props.pers);
            }
        }
    }
    
  render() {
      const pers = this.props.pers;
    return (
      <View>
      <Text>{console.log(this.props.med)}</Text>
        <Modal animationType="slide" visible={this.state.showListVisible} onRequestClose={()=>this.toggleListModal()}>
            <ViewDocTasksScreen pers={pers} closeModal={()=>this.toggleListModal()}  />
        </Modal>
        <Modal animationType="slide" visible={this.state.showListVisible1} onRequestClose={()=>this.toggleListModal()}>
            <AssignSlide pers={pers} closeModal={()=>this.toggleListModal()}  />
        </Modal>
      <View style={{ }}>
        <View style={styles.top}>
            <View>
                <Image source={  require('../../assets/doctor-female.jpg')} style={{width:65, height:65, borderRadius: 15, backgroundColor:'#C0C0C0', marginHorizontal:10, marginVertical: 10}} />
            </View>
            <View style={{flexDirection:'column', paddingVertical:15,  }}>
                <Text style={{fontSize:20, fontWeight:'600', color:'#000'}}>{pers.nom} </Text>
                <View style={{flexDirection:'row',  }}>

                    <View style={[styles.tag,{height:30}]}>
                        <Text style={{color:'#FFF', fontWeight:'700'}}>{pers.profession}</Text>
                    </View>
                    <View>
                    <View style={[styles.tag,{display : pers.speciality<=""? 'none':'flex' }]}>
                        <Text style={{color:'#FFF', fontWeight:'700',     }}>{pers.speciality}</Text>
                    </View>
                    </View>
                    
                </View>
                
                
            </View>
        </View>
        
        <View>
                
        </View>
      </View>
        <View style={styles.divider} />
        <View>
        {/* Check Schedule and Tasks */}
            <View style={{height:70, justifyContent:'center',  paddingHorizontal:30}}>
                <TouchableOpacity onPress={()=>this.toggleListModal()}>
                <View style={{flexDirection:'row'}}>
                    <Ionicons name="checkbox-outline" size={24} color={'#5A5A5A'} />
                    <Text style={{fontSize:18, paddingHorizontal:10, fontWeight:'500',  color:'#5A5A5A'}}>Check Schedule and Tasks</Text>
                </View>
                </TouchableOpacity>
            </View>
        {/* Edit Profile */}
            <View style={{height:70, justifyContent:'center', paddingHorizontal:30}}>
                <TouchableOpacity>
                <View style={{flexDirection:'row'}}>
                    <Ionicons name="create" size={24} color={'#5A5A5A'} />
                    <Text style={{ fontSize:18, paddingHorizontal:10, fontWeight:'500',  color:'#5A5A5A' }} >Edit Profile</Text>
                </View>
                </TouchableOpacity>
            </View>
        {/* Delete Profile */}
            <View style={{height:70, justifyContent:'center',  paddingHorizontal:30}}>
                <TouchableOpacity onPress={()=>this.DeleteDoctor()}>
                <View style={{flexDirection:'row'}}>
                    <Ionicons name="trash" size={24} color={colors.red} />
                    <Text style={{color:colors.red, fontSize:18, paddingHorizontal:10, fontWeight:'500', }}>Delete Profile</Text>
                </View>
                </TouchableOpacity>
            </View>
        </View>
      </View>
      
    );
  }

}


const windowWidth =  Dimensions.get('window').width;

const styles = StyleSheet.create({
    top:{
        width: 180,
        paddingHorizontal:20,
        paddingTop:5,
        paddingBottom:5,
        flexDirection:'row',
        
    },
    tag:{
        
        alignItems:'center',
        borderRadius:8,
        backgroundColor:colors.blue,
        paddingVertical:4,
        paddingHorizontal:8,
        marginRight: 5,
        flexGrow: 1,
        
        
    },
    divider:{
        backgroundColor: '#C0C0C0',
        height: 1,
    },


});
