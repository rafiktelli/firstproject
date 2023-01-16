import React,{useState, useRef} from 'react';
import { StyleSheet, Text, ScrollView,View,StatusBar,Image,TextInput, useWindowDimensions, TouchableOpacity, Dimensions, Button, FlatList, Modal } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../../Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, Ionicons } from "@expo/vector-icons"; 
import Fire from '../../Fire';
import DoctorAppointSlide from '../../screens/doctor-appoint-slide';
import ViewDocTasksScreen from '../../screens/viewDocTasks-screen';
import AssignSlide from '../../screens/assign-slide';
import ViewSurgTasksScreen from '../../screens/viewSurgTaks-screen';

export default class BottomSheet extends React.Component {

    state={
        showListVisible : false,
        showListVisible1 : false,
        showListVisible3: false, 
    }

    toggleListModal(){
        if (this.props.pers.profession==="Medecin" && this.props.pers.speciality !=="Anesthésie" ){
            this.setState({showListVisible: !this.state.showListVisible});
       
        }
        else{
            if(this.props.pers.profession === "Chirurgien" || this.props.pers.profession === "Infirmier" || this.props.pers.speciality === "Anesthésie" ){

                this.setState({showListVisible3: !this.state.showListVisible3});
                

            } else{
                this.props.navigation.navigate("Todo List",{pers: this.props.pers, view: true});
            }
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
        <Modal animationType="slide" visible={this.state.showListVisible} onRequestClose={()=>this.toggleListModal()}>
            <ViewDocTasksScreen pers={pers} closeModal={()=>this.toggleListModal()}  />
        </Modal>
        <Modal animationType="slide" visible={this.state.showListVisible1} onRequestClose={()=>this.toggleListModal()}>
            <AssignSlide pers={pers} closeModal={()=>this.toggleListModal()}  />
        </Modal>
        <Modal animationType="slide" visible={this.state.showListVisible3} onRequestClose={()=>this.toggleListModal()}>
            <ViewSurgTasksScreen pers={pers} closeModal={()=>this.toggleListModal()}  />
        </Modal>
      <View style={{ }}>
        <View style={styles.top}>
            <View >
                <Image source={  require('../../assets/doctor-female.jpg')} style={{width:65, height:65, borderRadius: 15, backgroundColor:'#C0C0C0', marginHorizontal:10, marginVertical: 10}} />
            </View>
            <View style={{flexDirection:'column', paddingVertical:15,   }}>
                <Text style={{fontSize:20, fontWeight:'600', color:'#000', }}>{pers.nom} </Text>
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
            <View style={{height:65, justifyContent:'center',  paddingHorizontal:30,  }}>
                <TouchableOpacity onPress={()=>this.toggleListModal()}>
                <View style={{flexDirection:'row'}}>
                    <Ionicons name="checkbox-outline" size={24} color={colors.black} />
                    <Text style={{fontSize:18, paddingHorizontal:10, fontWeight:'400',  color:colors.black}}>Voir les tâches</Text>
                </View>
                </TouchableOpacity>
            </View>
        {/* Edit Profile */}
            <View style={styles.divider1} />
        {/* Delete Profile */}
            <View style={{height:65, justifyContent:'center',  paddingHorizontal:30,  }}>
                <TouchableOpacity onPress={()=>this.DeleteDoctor()}>
                <View style={{flexDirection:'row'}}>
                    <Ionicons name="trash" size={24} color={colors.red} />
                    <Text style={{color:colors.red, fontSize:18, paddingHorizontal:10, fontWeight:'400', }}>Supprimer Profil</Text>
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
        width: windowWidth,
        paddingLeft:20,
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
        
        
    },
    divider:{
        backgroundColor: '#C0C0C0',
        height: 1,
        marginLeft:30,
    },
    divider1:{
        backgroundColor: '#C0C0C0',
        height: 1,
        width:windowWidth,
        marginLeft:30,
    },


});
