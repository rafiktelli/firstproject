import React,{useState, useRef} from 'react'
import { StyleSheet, Text, ScrollView,View,StatusBar,Image,TextInput, TouchableOpacity, Dimensions, FlatList, Modal } from 'react-native';
import {AntDesign, Ionicons} from '@expo/vector-icons';
import Fire from '../Fire';

export default class PatientInfoSlide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        inputValue:"",
        inputValue1:"",
        inputValue2:"",
        inputValue3:"",
    };
  }
  
  createConsultation = () => {
    const doctorID = this.props.route.params.pers.id ;
    const date = this.props.route.params.date;
    const slot = this.props.route.params.slot;
    const nurse = this.props.route.params.pressedCategory2;
    const anes = this.props.route.params.pressedCategory;
    const patientID = this.state.inputValue;
    const motif = this.state.inputValue1;
    const age = this.state.inputValue2;
    const details = this.state.inputValue3;
    const consultation = {doctorID, date, slot, patientID, motif, age}; 
    this.addConsultation(consultation); 
    console.log(patientID);
    this.props.navigation.navigate("Appointment");
    }; 

    createSurgery = () => {
        const doctorID = this.props.route.params.pers.id;
        const date = this.props.route.params.date;
        const slot = this.props.route.params.slot;
        const nurse = this.props.route.params.nurse;
        const anes = this.props.route.params.anes;
        const patientID = this.state.inputValue;
        const motif = this.state.inputValue1;
        const age = this.state.inputValue2;
        const details = this.state.inputValue3;
        const surgery = {doctorID, date, slot, patientID, motif, age, details, nurse, anes}; 
        this.addSurgery(surgery); 
        this.props.navigation.navigate("Surgery");
        };

    addConsultation = consultation =>{
        firebase.addConsultation({
            doctorID: consultation.doctorID,
            date: consultation.date,
            slot: consultation.slot,
            patientID: consultation.patientID,
            motif: consultation.motif,
            age: consultation.age,
        });
    };

    addSurgery = surgery =>{
        firebase.addSurgery({
            doctorID: surgery.doctorID,
            date: surgery.date,
            slot: surgery.slot,
            patientID: surgery.patientID,
            motif: surgery.motif,
            age: surgery.age,
            details : surgery.details,
            nurse : surgery.nurse,
            anes : surgery.anes,
        });

    };
  


  render(){
      console.log("this is input1:"+this.state.inputValue3+"x");
    var surg = false;  
    surg = this.props.route.params.surg;
    return (
      <View style={styles.container}  >
        <View>
            
        </View>
        <View >
                    
                    <View style={{ marginTop: 20, justifyContent:'center', alignItems:'center', paddingVertical:20, marginTop:70 }}>
                        <View style={{marginVertical:10,  }}>
                            <Text style={{fontWeight:'600', fontSize:20}}>Patient Name </Text>
                        </View>
                        <TextInput onChangeText={text=>{this.setState({inputValue:text})}} style={styles.input} placeholder="Search, e.g: Dr. Jack Sparrow" />
                        
                       
                    </View>
                    <View style={{ marginBottom: 25, justifyContent:'center', alignItems:'center'}}>
                        <View style={{marginVertical:10,  }}>
                            <Text style={{fontWeight:'600', fontSize:20}}>Motif</Text>
                        </View>
                        <TextInput clearButtonMode='always' onChangeText={text=>{this.setState({inputValue1:text})}} style={styles.input} placeholder="Search, e.g: Dr. Jack Sparrow" />
                        
                    </View>
                    <View style={{ marginBottom: 25, justifyContent:'center', alignItems:'center'}}>
                        <View style={{marginVertical:10,  }}>
                            <Text style={{fontWeight:'600', fontSize:20}}>Patient's Age</Text>
                        </View>
                        <TextInput keyboardType='decimal-pad' maxLength={3} onChangeText={text => this.setState({ inputValue2: text })} clearButtonMode='always' style={styles.input} placeholder="Search, e.g: Dr. Jack Sparrow" />
                        
                    </View>
                    <View style={{ display: this.props.route.params.surg ? 'flex':'none' , marginBottom: 25, justifyContent:'center', alignItems:'center'}}>
                        <View style={{marginVertical:10,  }}>
                            <Text style={{fontWeight:'600', fontSize:20}}>Détails</Text>
                        </View>
                        <TextInput clearButtonMode='always' onChangeText={text=>{this.setState({inputValue3:text})}} style={styles.input} placeholder="Search, e.g: Dr. Jack Sparrow" />
                        
                    </View>
                    <View style={{ alignItems:'center', justifyContent:'center'}}>
                    
                    <View style={{ display: surg ? 'none':'flex' , backgroundColor:colors.blue, width:250, height:80, borderRadius:20, justifyContent:'center',  }}>
                            <TouchableOpacity disabled={((this.state.inputValue === '') && (this.state.inputValue1===''))} onPress={()=>this.createConsultation()} >
                                <View style={{flexDirection:'row',}}>
                                    <View >
                                        <Image source={require('../assets/clock.png')} style={{width:30, height:30,marginLeft:30, marginRight:-30 }} />
                                    </View>
                                    <View style={{alignItems:'center', justifyContent:'center', flexDirection:'row', flex:1}}>
                                        <Text style={{color:'#FFF', fontSize:20, fontWeight:'600' }}>Appointment</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            
                </View>
                <View style={{ display:  surg ? 'flex':'none' , backgroundColor:colors.blue, width:250, height:80, borderRadius:20, justifyContent:'center',  }}>
                        <TouchableOpacity disabled={((this.state.inputValue === '') && (this.state.inputValue1===''))   } onPress={()=>this.createSurgery()} >
                                <View style={{flexDirection:'row',}}>
                                    <View >
                                        <Image source={require('../assets/clock.png')} style={{width:30, height:30,marginLeft:30, marginRight:-30 }} />
                                    </View>
                                    <View style={{alignItems:'center', justifyContent:'center', flexDirection:'row', flex:1}}>
                                        <Text style={{color:'#FFF', fontSize:20, fontWeight:'600' }}>Schedule</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            
                </View>
                </View>
                        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
      }, 
      input:{
        paddingVertical: 15,
        paddingLeft:20,
        paddingRight: 5,
        width: 300,
        backgroundColor: '#f8f4f4',
        borderRadius:15,
        borderColor: '#f8f4f4',
        borderWidth: 1,
    },
});
