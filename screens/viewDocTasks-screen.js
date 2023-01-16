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
import Fire from '../Fire';
import TaskCard from '../components/doctorComponents/taskCard';

import RBSheet from "react-native-raw-bottom-sheet";


export default class ViewDocTasksScreen extends React.Component {

     

    state={
        selectedDate: moment(new Date()).format('DD-MM-YYYY'),
        pressedSlot : '',
        showListVisible:false,
        consultations :[],
        filteredCons :[],
        user: {},
        loading: true,
        pressedSlots:[],
        SlotsData:[],
        availableSlots:[],
    }
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.setState({availableSlots: SlotsData});
      } 
      onDateSelected = date => {
        this.setState({availableSlots:SlotsData});
        var formatedDate = moment(date).format('DD-MM-YYYY').toString(); 
        var newCons = this.state.consultations.filter( function(el) { return el.date === formatedDate } );
        newCons.sort(this.GetSortOrder("slot"));     
        this.setState({selectedDate: moment(date).format('DD-MM-YYYY'), SlotsData:SlotsData});
        this.setState({ filteredCons : newCons });
        this.showContent(newCons);
        this.setState({pressedSlot:''});
        

    }   

    slotPressed= slot =>{
        
        this.setState({pressedSlot : slot, });
    }
    toggleListModal(){
        this.setState({showListVisible: !this.state.showListVisible})
    }
    toggleAddPersonnelModel(){
        this.setState({addPersonnelVisible: !this.state.addPersonnelVisible});
    }
    GetSortOrder(prop) {    
        return function(a, b) {  
            if (a[prop] > b[prop]) {    
                return 1;    
            } else if (a[prop] < b[prop]) {    
                return -1;    
            }    
            return 0;    
        }    
    } 
    showContent(newCons){
        var a = SlotsData.map(data => data.time);
        var b = newCons.map( data => data.slot);
        var c = a.filter(n => !b.includes(n));
        this.setState({availableSlots:b});
        this.setState({newCons:newCons});
    }
    datesBlacklistFunc = date => {
        return date.isoWeekday() === 7; // disable Saturdays
    }

    seDeconnecter(){
        this.props.closeModal();
        this.props.navigation.navigate("Login"); 
      }

    componentDidMount(){
        
        var test = this.props.pers.id.toString();
        firebase = new Fire((error, user)=>{
            if(error){
                return alert("Uh no, there is something went wrong");
            }
            firebase.getConsultations(consultations=>{
                            
                this.setState({consultations, user}, () => {
                    this.setState({loading:false});
                    var newCons = this.state.consultations.filter( function(el) { return el.doctorID === test } );
                    this.setState({ consultations : newCons });
                    //this.state.consultations = this.state.personnels.filter( function(el) { return el.profession === "Medecin"; } );
                });
            });
            this.setState({user});

            this.setState({user});
            console.log(user.uid);
        });


            
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
            <View style={styles.container} >  
                 <StatusBar barStyle="light-content" backgroundColor={"#f8f4f4"} />   
             
             
                  
                <Modal animationType="slide" visible={this.state.showListVisible} onRequestClose={()=>this.toggleListModal()}>
                    <PatientInfoSlide closePrevModal={()=>this.props.closeModal()} closeModal={() => this.toggleAddPersonnelModel()} pers={this.props.pers} slot={this.state.pressedSlot} date={this.state.selectedDate}  closeModal={()=>this.toggleListModal()} />
                </Modal>


                <RBSheet ref={ref => { this.RBSheet = ref;}} height={70} openDuration={150} >
                <TouchableOpacity style={{flexDirection:'row',  paddingHorizontal:10, paddingVertical:20,}} onPress={()=>this.seDeconnecter() }>
                    <Ionicons name="log-out-outline" size={24} color={colors.red} />
                    <Text style={{color:colors.red, fontSize:18, fontWeight:'400', }}>  Se déconnecter</Text>
                </TouchableOpacity>
                </RBSheet>
                
                <TouchableOpacity style={{position:'absolute', top:32, right:32, zIndex: 10 }} onPress={this.props.closeModal}>
                        <AntDesign  name="close" size={24} color={colors.black} style={{display: this.props.profile ? 'none' : 'flex'}} />
                </TouchableOpacity>
                <TouchableOpacity style={{position:'absolute', top:32, right: 32, zIndex: 10}} onPress={() => this.RBSheet.open()} >
                    <AntDesign name="user" color={colors.blue} size={26}  />
                </TouchableOpacity>

                
                <View style={{backgroundColor:'#f8f4f4',flex:1, paddingVertical:20 }}>
                    <View style={{marginHorizontal:20, marginVertical:10, marginTop: 40}}>
                        <Text style={{fontWeight:'500', fontSize:18}} >Calendrier</Text>
                    </View>
                    <View style={{ }}>
                    <CalendarStrip
                        scrollable = {true}
                        scrollerPaging = {true}
                        ref={this.myRef}
                        daySelectionAnimation={{
                            type:'background',
                            highlightColor:colors.blue,
                            borderWidth:1,
                            borderHighlightColor:colors.blue,
                            borderRadius:50, 
                            
                            
                        }}
                        style={{height:95, paddingVertical:0,  }}
                        innerStyle={{  }}
                        dayComponentHeight={60}
                        
                        dayContainerStyle={{borderRadius:10,  paddingVertical:10  }}
                        calendarHeaderContainerStyle={{}}
                        
                        calendarHeaderStyle={{color:'#000', paddingBottom:20, paddingTop:5, }}
                        calendarColor={'#FFF'}
                        dateNameStyle={{color:'#000', paddingBottom:10, fontSize:10, fontWeight:'600'}}
                        dateNumberStyle={{}}
                        highlightDateNameStyle={{color:'#FFF', paddingBottom:10, fontSize:10 , fontWeight:'600' }}
                        highlightDateNumberStyle={{color:'#FFF', }}
                        disabledDateNameStyle={{ paddingBottom:10, fontSize:10}}
                        datesBlacklist={this.datesBlacklistFunc}
                        onDateSelected={async date => this.onDateSelected(date)}
                        iconContainer={{flex:0.1}}
                        
                    />
                    </View>
                    <View style={{marginHorizontal:20, marginBottom:10, marginTop:20}}>
                        <Text style={{fontWeight:'500', fontSize:18}} > Planning de {this.props.pers.nom}</Text>
                        
                        
                    </View>
                    <ScrollView style={{}}>
                    <View style={{ flexDirection:'column', paddingHorizontal:6}} >
                        <FlatList 
                            data={this.state.newCons}
                            keyExtractor={(item) => item.id} 
                            renderItem={({ item })=>{
                                var date = item.date;
                                if(item.age === undefined) {var age =""; } else{
                                    var age = item.age +" ans";
                                }
                                if (item.date === moment().format('DD-MM-YYYY') ){date = "Aujourd'hui"} 
                                else {if(item.date === moment().add(1, 'day').format('DD-MM-YYYY')){ date = "Demain"}
                                else{if(item.date  === moment().subtract(1, 'day').format('DD-MM-YYYY')){ date = "Hier"}}}
                                 
                                return(
                                    <View>
                                        <TaskCard containerStyle={{backgroundColor: colors.lightBlue }} name={item.motif} date={date} doctor={item.patientID} duration={item.duration} age={age} time={item.slot} />
                                    </View>
                                    );
                            }}
                        />
                        <Text></Text>
                        
                       
                    </View>


                    </ScrollView>
                    
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