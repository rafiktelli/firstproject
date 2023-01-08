import React,{useState, useRef} from 'react'
import { StyleSheet, Text, ScrollView,View,StatusBar,Image,TextInput, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import SlotsData from '../myData';
import SpeCompo from '../components/doctorComponents/speCompo';
import Slot from '../components/doctorComponents/slot';



export default class DoctorAppointSlide extends React.Component {

    state={
        selectedDate: new Date(),
        pressedSlot : '',
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
                    <View style={{ backgroundColor:'#000', }}>
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

                    <View style={{ flexDirection:'column', paddingHorizontal:6}} >
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