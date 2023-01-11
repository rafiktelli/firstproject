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
        this.setState({selectedDate: moment(date).format('DD-MM-YYYY'), SlotsData:SlotsData});
        console.log("khalina ntestiw wach t3tina hadi? " + moment(date).format('DD-MM-YYYY'));
        this.setState({ filteredCons : newCons });
        console.log("filtredCons:", newCons);
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
    showContent(newCons){
        var a = SlotsData.map(data => data.time);
        var b = newCons.map( data => data.slot);
        var c = a.filter(n => !b.includes(n));
        this.setState({availableSlots:b});
        this.setState({newCons:newCons});

        
        console.log(a);
        console.log(b);
        console.log(c);
    }
    datesBlacklistFunc = date => {
        return date.isoWeekday() === 7; // disable Saturdays
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
                <StatusBar barStyle="dark-content" backgroundColor="#fff" />   
                
                <Modal animationType="slide" visible={this.state.showListVisible} onRequestClose={()=>this.toggleListModal()}>
                    <PatientInfoSlide closePrevModal={()=>this.props.closeModal()} closeModal={() => this.toggleAddPersonnelModel()} pers={this.props.pers} slot={this.state.pressedSlot} date={this.state.selectedDate}  closeModal={()=>this.toggleListModal()} />
                </Modal>
                
                <TouchableOpacity style={{position:'absolute', top:32, right:32, zIndex: 10 }} onPress={this.props.closeModal}>
                        <AntDesign  name="close" size={24} color={colors.black} />
                </TouchableOpacity>

                
                <ScrollView style={{backgroundColor:'#f8f4f4',flex:1,  borderTopLeftRadius: 40, borderTopRightRadius: 40, paddingVertical:20 }}>
                    <View style={{marginHorizontal:20, marginVertical:10}}>
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
                        }}
                        style={{height:80, paddingTop:10, paddingBottom:10 }}
                        calendarHeaderStyle={{color:'#000'}}
                        calendarColor={'#FFF'}
                        dateNameStyle={{color:'#000'}}
                        dateNumberStyle={{color:'#000'}}
                        highlightDateNameStyle={{color:'#FFF'}}
                        highlightDateNumberStyle={{color:'#FFF'}}
                        datesBlacklist={this.datesBlacklistFunc}
                        onDateSelected={async date => this.onDateSelected(date)}
                        iconContainer={{flex:0.1}}
                        
                    />
                    </View>
                    <View style={{marginHorizontal:20, marginVertical:10}}>
                        <Text style={{fontWeight:'500', fontSize:18}} >Available Slots</Text>
                        
                        
                    </View>
                    <View style={{}}>

                    <View style={{ flexDirection:'column', paddingHorizontal:6}} >
                        <FlatList 
                            data={this.state.newCons}
                            keyExtractor={(item) => item.id} 
                            renderItem={({ item })=>{
                                return(
                                    <View>
                                        <TaskCard containerStyle={{backgroundColor: colors.shadyBlue }} name={item.motif} date={item.date} doctor={item.patientID} duration={item.duration} time={item.slot} />
                                    </View>
                                    );
                            }}
                        />
                        <Text></Text>
                        
                       
                    </View>


                    </View>
                    
                </ScrollView>

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