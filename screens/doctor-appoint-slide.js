import React,{useState, useRef} from 'react'
import { StyleSheet, Text, ScrollView,View,StatusBar,Image,TextInput, TouchableOpacity, Dimensions, FlatList, Modal } from 'react-native';
import {AntDesign, Ionicons} from '@expo/vector-icons';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import SlotsData from '../myData';
import SpeCompo from '../components/doctorComponents/speCompo';
import Slot from '../components/doctorComponents/slot';
import PatientInfoSlide from '../screens/patientInfo-slide';
import colors from '../Colors';



export default class DoctorAppointSlide extends React.Component {

    state={
        selectedDate: moment(new Date()).format('DD-MM-YYYY'),
        pressedSlot : '',
        showListVisible:false,
    }
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
      } 
      onDateSelected = date => {
        this.setState({selectedDate: moment(date).format('DD-MM-YYYY'), pressedSlot:''});
        //console.log(this.state.selectedDate);
    }   

    slotPressed= slot =>{
        
        this.setState({pressedSlot : slot, });
    }
    toggleListModal(){
        this.setState({showListVisible: !this.state.showListVisible})
    }



    render(){
        var startDate = new Date("2023-01-01");
        
        var selectedDate = new Date();
        var endDate = new Date("2023-04-02");
        var datesWhitelist = [
            // single date (today)
            
        
            // date range
            {
              start: startDate,
              end: endDate
            }
          ];
          
        return (
            <View style={styles.container}>
                <StatusBar barStyle="dark-content" backgroundColor="#fff" />   
                
                <Modal animationType="slide" visible={this.state.showListVisible} onRequestClose={()=>this.toggleListModal()}>
                    <PatientInfoSlide pers={this.props.pers} slot={this.state.pressedSlot} date={this.state.selectedDate}  closeModal={()=>this.toggleListModal()} />
                </Modal>
                
                <TouchableOpacity style={{position:'absolute', top:32, right:32, zIndex: 10 }} onPress={this.props.closeModal}>
                        <AntDesign  name="close" size={24} color={colors.black} />
                </TouchableOpacity>

                <View style={{ backgroundColor:'',  height:260, marginBottom:10, paddingTop:50, flexDirection:'column', alignItems:'center', justifyContent:'center', }}>
                    <View>
                        <Image style={{width:130, height:130, borderRadius:25,  }} source={require('../assets/doctor-female.jpg')}  />
                    </View>
                    <Text style={styles.persName}>{this.props.pers.speciality} </Text>
                    <Text style={styles.persSpec}>Dr.{this.props.pers.nom}</Text>
                </View>
                <View style={{backgroundColor:'#f8f4f4',flex:1,  borderTopLeftRadius: 40, borderTopRightRadius: 20, paddingVertical:20 }}>
                    <View style={{marginHorizontal:20, marginVertical:10}}>
                        <Text style={{fontWeight:'500', fontSize:18}} >Appointment Calendar</Text>
                    </View>
                    <View style={{ }}>
                    <CalendarStrip
                        scrollable
                        ref={this.myRef}
                        daySelectionAnimation={{
                            type:'background',
                            highlightColor:colors.blue,
                            borderWidth:1,
                            borderHighlightColor:colors.blue,
                        }}
                        style={{height:80, paddingTop:10, paddingBottom:10 }}
                        calendarHeaderStyle={{color:'#000'}}
                        calendarColor={'#FFF'}
                        dateNameStyle={{color:'#000'}}
                        dateNumberStyle={{color:'#000'}}
                        highlightDateNameStyle={{color:'#FFF'}}
                        highlightDateNumberStyle={{color:'#FFF'}}
                        disabledDateNumberStyle={datesWhitelist}
                        disabledDateNameStyle={datesWhitelist}
                        onDateSelected={async date => this.onDateSelected(date)}
                        iconContainer={{flex:0.1}}
                        
                    />
                    </View>
                    <View style={{marginHorizontal:20, marginVertical:10}}>
                        <Text style={{fontWeight:'500', fontSize:18}} >Slots</Text>
                        
                        
                    </View>
                    <View>

                    <View style={{ flexDirection:'column', paddingHorizontal:6,}} >
                        <FlatList 
                            data={SlotsData}
                            keyExtractor={(item) => item.id} 
                            numColumns={4}
                            renderItem={({ item })=>{
                                return(
                                    <TouchableOpacity onPress={()=>this.slotPressed(item.time)}>
                                        <Slot time={item.time} isPressed ={this.state.pressedSlot} />
                                    </TouchableOpacity>
                                    );
                            }}
                        />
                        <Text></Text>
                        
                        <Text>{console.log(this.state.selectedDate)}{console.log(this.state.pressedSlot)}</Text>
                    </View>


                    </View>
                    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                        <View style={{backgroundColor:colors.blue, width:250, height:80, borderRadius:20, justifyContent:'center' }}>
                            <TouchableOpacity disabled={this.state.pressedSlot == '' } onPress={()=>this.toggleListModal()} >
                                <View style={{flexDirection:'row'}}>
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
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
      },
      persName:{
            paddingTop: 10,
            fontSize: 18,
            fontWeight: '400',
      },
      persSpec:{
        paddingTop: 5,
        fontSize: 18,
        fontWeight: '400',
        fontWeight:'500',
      },


})