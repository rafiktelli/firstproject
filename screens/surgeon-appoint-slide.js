import React,{useState, useRef} from 'react'
import { StyleSheet, Text, ScrollView,View,StatusBar,Image,TextInput, TouchableOpacity, Dimensions, FlatList, Modal } from 'react-native';
import {AntDesign, Ionicons} from '@expo/vector-icons';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import SurgSlotsData from '../SurgSlotsData';
import SpeCompo from '../components/doctorComponents/speCompo';
import Slot from '../components/doctorComponents/slot';
import PatientInfoSlide from '../screens/patientInfo-slide';
import ChooseSurgAssist from '../screens/choose-surg-assist';
import colors from '../Colors';
import Fire from '../Fire';


export default class SurgeonAppointSlide extends React.Component {

     

    state={
        selectedDate: moment(new Date()).format('DD-MM-YYYY'),
        pressedSlot : '',
        showListVisible:false,
        consultations :[],
        surgeries: [],
        filteredCons :[],
        user: {},
        loading: true,
        pressedSlots:[],
        SlotsData:[],
        availableSlots:[],
        dateClicked : false,
        toggleApp : true,
    }
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.setState({availableSlots: SurgSlotsData});
      } 
      onDateSelected = date => {
        this.setState({dateClicked:true});
        console.log("shit");
        this.setState({availableSlots:SurgSlotsData});
        var formatedDate = moment(date).format('DD-MM-YYYY').toString(); 
        var newSurg = this.state.surgeries.filter( function(el) { return el.date === formatedDate } );
        this.setState({selectedDate: moment(date).format('DD-MM-YYYY'), SlotsData:SurgSlotsData});
        console.log(newSurg);
        console.log("khalina ntestiw wach t3tina hadi? " + moment(date).format('DD-MM-YYYY'));
        this.setState({ filteredCons : newSurg });
        this.showContent(newSurg);
        this.setState({pressedSlot:''});
        var allSurgOfDate = this.state.surg.filter( function(el) { return el.date === formatedDate } );
        this.setState({allSurgOfDate: allSurgOfDate});
        this.toggleApp(date);

    } 
    
    toggleApp = date=>{
        if(moment(date).format('DD-MM-YYYY') < moment().format('DD-MM-YYYY')){
            this.setState({toggleApp: false});
            console.log("maaaaaaaaa3");

        } else {
            this.setState({toggleApp: true});
            console.log("waaaaaaaaa3");
        }
    }

    slotPressed= slot =>{
        
        this.setState({pressedSlot : slot, });
    }
    toggleListModal(){
        this.props.navigation.navigate("Choose Assistants",{pers: this.props.route.params.pers, slot: this.state.pressedSlot, date: this.state.selectedDate, surgofday: this.state.allSurgOfDate} );
    }
    toggleAddPersonnelModel(){
        this.setState({addPersonnelVisible: !this.state.addPersonnelVisible});
    }
    showContent(newSurg){
        var a = SurgSlotsData.map(data => data.time);
        var b = newSurg.map( data => data.slot);
        var c = a.filter(n => !b.includes(n));
        this.setState({availableSlots:c});

        
        console.log(a);
        console.log(b);
        console.log(c);
    }
    datesBlacklistFunc = date => {
        return date.isoWeekday() === 7; // disable Saturdays
    }

    componentDidMount(){
        
        var test = this.props.route.params.pers.id.toString();
        firebase = new Fire((error, user)=>{
            if(error){
                return alert("Uh no, there is something went wrong");
            }
            
            firebase.getSurgeries(surgeries=>{
                this.setState({surgeries, user}, () => {
                    this.setState({loading:false});
                    var newSurg = this.state.surgeries.filter( function(el) { return el.doctorID === test } );
                    this.setState({surg: surgeries});
                    this.setState({ surgeries : newSurg });
                    //this.state.surgeries = this.state.personnels.filter( function(el) { return el.profession === "Medecin"; } );
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
        var dateClicked = this.state.dateClicked;
        var req =  (this.state.availableSlots.length<1 || ( this.state.availableSlots.length===1 && this.state.availableSlots[0]==="15:00"));
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
                <StatusBar backgroundColor={colors.blue} />   
                
               
                
                

                <View style={{ backgroundColor:'',  height:220, marginBottom:20, paddingTop:30, flexDirection:'column', alignItems:'center', justifyContent:'center', }}>
                    <View>
                        <Image style={{width:130, height:130, borderRadius:25,  }} source={require('../assets/doctor-female.jpg')}  />
                    </View>
                    <Text style={styles.persName}>Dr. {this.props.route.params.pers.nom} </Text>
                    <Text style={styles.persSpec}>Chirurgien en {this.props.route.params.pers.speciality}</Text>
                </View>
                <View style={{backgroundColor:'#f8f4f4',flex:1,  borderTopLeftRadius: 40, borderTopRightRadius: 40, paddingVertical:10 }}>
                    <View style={{marginHorizontal:20, marginTop:10, marginBottom:15, }}>
                        <Text style={{fontWeight:'500', fontSize:18}} >Appointment Calendar</Text>
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
                    
                    <View style={{ display:  this.state.toggleApp ? 'flex':'none' }}>
                    <View style={{ display : req ? 'none': 'flex', marginHorizontal:20, marginVertical:10}}>
                        <Text style={{fontWeight:'500', fontSize:18}} >Minor Surgery</Text>
                        
                        
                    </View>
                    <View style={{display: (this.state.availableSlots.length===0 && dateClicked) ? 'flex':'none', alignItems:'center', justifyContent:'center', paddingTop:80 }}>
                        <Image source={require("../assets/no-schedule.png")} style={{ height:100, width:100}} />
                    </View>
                    <View style={{ flexDirection:'column', paddingHorizontal:6, }} >
                        <FlatList 
                            data={this.state.availableSlots}
                            keyExtractor={(item) => item.toString()} 
                            numColumns={3}
                            renderItem={({ item })=>{
                            if(item.toString()!=="15:00"){
                                return( 
                                    <TouchableOpacity onPress={()=>this.slotPressed(item.toString())} style={{marginLeft: 5}}>
                                        <Slot time={item.toString()} isPressed ={this.state.pressedSlot} />
                                    </TouchableOpacity>
                                    )
                             }}}
                        />

                        <FlatList 
                            data={this.state.availableSlots}
                            keyExtractor={(item) => item.toString()} 
                            numColumns={1}
                            renderItem={({ item })=>{
                            if(item.toString()==="15:00"){
                            
                                return( 
                                    
                                    <View style={{}}>
                                        <Text style={{ marginHorizontal:15, marginVertical:10, fontWeight:'500', fontSize:18}} >Major Surgery</Text>
                                    <TouchableOpacity onPress={()=>this.slotPressed(item.toString())}>
                                        <Slot time={item.toString()} isPressed ={this.state.pressedSlot} />
                                    </TouchableOpacity>
                                    </View>
                                    );

                            }}}
                        />  
                        
                       
                    </View>


                    </View>
                    <View style={{flex:1,flex:1, display: (this.state.availableSlots.length === 0 || !this.state.toggleApp) ? 'none':'flex', alignItems:'center', justifyContent:'flex-end', paddingBottom:30}}>
                        <View style={{backgroundColor:colors.blue, width:250, height:80, borderRadius:20, justifyContent:'center' }}>
                            <TouchableOpacity disabled={this.state.pressedSlot == '' } onPress={()=>this.toggleListModal()} >
                                <View style={{flexDirection:'row'}}>
                                    <View >
                                        <Image source={require('../assets/clock.png')} style={{width:30, height:30,marginLeft:30, marginRight:-30 }} />
                                    </View>
                                    <View style={{alignItems:'center', justifyContent:'center', flexDirection:'row', flex:1}}>
                                        <Text style={{color:'#FFF', fontSize:20, fontWeight:'600' }}>Appointment</Text>
                                        <Text> {console.log("start")} </Text>
                                        <Text> {console.log("end")} </Text>
                                        
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
        fontWeight: '500',
  },
  persSpec:{
    color:colors.gray,
    paddingTop: 5,
    fontSize: 18,
    fontWeight: '300',
    
  },


})