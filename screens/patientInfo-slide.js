import React,{useState, useRef} from 'react'
import { StyleSheet, Text, ScrollView,View,StatusBar,Image,TextInput, TouchableOpacity, Dimensions, FlatList, Modal } from 'react-native';
import {AntDesign, Ionicons} from '@expo/vector-icons';
import Fire from '../Fire';

export default class PatientInfoSlide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  
  createConsultation = () => {
    const doctorID = this.props.pers.id ;
    const date = this.props.date;
    const slot = this.props.slot;
    const patientID = this.state.inputValue;
    const motif = this.state.inputValue1;
    const age = this.state.inputValue2;
    const consultation = {doctorID, date, slot, patientID, motif, age}; 
    this.addConsultation(consultation); 
    this.props.closeModal();
    console.log(patientID);
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
    this.props.closePrevModal();
}

  


  state={
    inputValue:'',
    inputValue1:'',
  };

  render(){
    return (
      <View style={styles.container}  >
        <View>
            <TouchableOpacity style={{position:'absolute', top:32, right:32, zIndex: 10 }} onPress={this.props.closeModal}>
                <AntDesign  name="close" size={24} color={colors.black} />
            </TouchableOpacity>
        </View>
        <View >
                    
                    <View style={{ marginTop: 20, justifyContent:'center', alignItems:'center', paddingVertical:20, marginTop:70 }}>
                        <View style={{marginVertical:10,  }}>
                            <Text style={{fontWeight:'600', fontSize:20}}>Patient Name </Text>
                        </View>
                        <TextInput value={this.state.inputValue} clearButtonMode='always' onChangeText={text=>{this.setState({inputValue:text})}} style={styles.input} placeholder="Search, e.g: Dr. Jack Sparrow" />
                        
                       
                    </View>
                    <View style={{ marginBottom: 25, justifyContent:'center', alignItems:'center'}}>
                        <View style={{marginVertical:10,  }}>
                            <Text style={{fontWeight:'600', fontSize:20}}>Motif</Text>
                        </View>
                        <TextInput value={this.state.inputValue1} clearButtonMode='always' onChangeText={text=>{this.setState({inputValue1:text})}} style={styles.input} placeholder="Search, e.g: Dr. Jack Sparrow" />
                        
                    </View>
                    <View style={{ marginBottom: 25, justifyContent:'center', alignItems:'center'}}>
                        <View style={{marginVertical:10,  }}>
                            <Text style={{fontWeight:'600', fontSize:20}}>Patient's Age</Text>
                        </View>
                        <TextInput keyboardType='decimal-pad' maxLength={3} value={this.state.inputValue2} clearButtonMode='always' onChangeText={text=>{this.setState({inputValue2:text})}} style={styles.input} placeholder="Search, e.g: Dr. Jack Sparrow" />
                        
                    </View>
                    <View style={{ alignItems:'center', justifyContent:'center'}}>
                    
                    <View style={{backgroundColor:colors.blue, width:250, height:80, borderRadius:20, justifyContent:'center',  }}>
                            <TouchableOpacity onPress={()=>this.createConsultation()} >
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
