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


export default class AssignSlide extends React.Component {

     

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
          console.log("zabi1");
        this.setState({availableSlots:SlotsData});
        var formatedDate = moment(date).format('DD-MM-YYYY').toString(); 
        console.log("zabi2");
        var newCons = this.state.consultations.filter( function(el) { return el.date === formatedDate } );
        this.setState({selectedDate: moment(date).format('DD-MM-YYYY'), SlotsData:SlotsData});
        console.log("khalina ntestiw wach t3tina hadi? " + moment(date).format('DD-MM-YYYY'));
        this.setState({ filteredCons : newCons });
        console.log("filtredCons:", newCons);
        this.showContent(newCons);
        console.log("zabi3");
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
        this.setState({availableSlots:c});

        
        console.log(a);
        console.log(b);
        console.log(c);
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
            <View style={styles.container}>
                <StatusBar barStyle="dark-content" backgroundColor="#fff" />   
                
                <Modal animationType="slide" visible={this.state.showListVisible} onRequestClose={()=>this.toggleListModal()}>
                    <PatientInfoSlide closePrevModal={()=>this.props.closeModal()} closeModal={() => this.toggleAddPersonnelModel()} pers={this.props.pers} slot={this.state.pressedSlot} date={this.state.selectedDate}  closeModal={()=>this.toggleListModal()} />
                </Modal>
                
                <TouchableOpacity style={{position:'absolute', top:32, right:32, zIndex: 10 }} onPress={this.props.closeModal}>
                        <AntDesign  name="close" size={24} color={colors.black} />
                </TouchableOpacity>

                <View style={{ paddingVertical:30, paddingHorizontal:10, backgroundColor:'#FFF', alignItems:'center', height:160,  paddingTop:50, flexDirection:'row',  borderBottomLeftRadius:40, borderBottomRightRadius:40 }}>
                    <View style={{alignItems:'flex-end', paddingRight:10}} >
                        <Image style={{width:80, height:80, borderRadius:25,  }} source={require('../assets/doctor-female.jpg')}  />
                    </View>
                    <View style={{flexDirection:'column'}}>
                        <Text style={styles.persName}>{this.props.pers.profession} </Text>
                        <Text style={styles.persSpec}>{this.props.pers.nom}</Text>
                    </View>
                </View>
                <View style={{backgroundColor:'#f8f4f4',flex:1,  paddingVertical:20 }}>
                    <View style={{marginHorizontal:20, marginBottom:10}}>
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
                    
                    <View style={{}}>

                    <View style={{ flexDirection:'column', paddingHorizontal:6}} >
                        <FlatList 
                            data={this.state.availableSlots}
                            keyExtractor={(item) => item.toString()} 
                            numColumns={4}
                            renderItem={({ item })=>{
                                return(
                                    <TouchableOpacity onPress={()=>this.slotPressed(item.toString())}>
                                        <Slot time={item.toString()} isPressed ={this.state.pressedSlot} />
                                    </TouchableOpacity>
                                    );
                            }}
                        />
                        <Text></Text>
                        
                       
                    </View>


                    </View>
                    
                </View>

                <View style={[styles.section, styles.footer]} >
                        <TextInput  style={styles.input} list placeholder={'Write a task'}  onChangeText = {text => this.setState({newTodo : text})} value={this.state.newTodo} />
                        <TouchableOpacity style={[styles.addTodo, {backgroundColor:colors.blue}]} onPress={()=>this.addTodo()} >
                            <AntDesign name="plus" size={16} color={colors.white} />
                        </TouchableOpacity>
                    </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f4f4',
      },
      persName:{
            
            fontSize: 18,
            fontWeight: '400',
      },
      persSpec:{
        fontSize: 18,
        fontWeight:'500',
      },
      section:{
        paddingTop:16,
        alignSelf: "stretch"

    },
    footer:{
            paddingHorizontal:16,
            flexDirection: "row",
            alignItems:"center",
            paddingVertical: 16

        },
    input:{
            height : 50,
            flex:1,
            borderRadius: 15,
            marginRight: 8,
            paddingHorizontal: 18,
            borderRadius:10, 
            borderWidth: 1,
            backgroundColor:'#FFF',
            borderColor:'#FFF',
        },
    addTodo:{ 
            height:50,
            width: 50,
            alignItems:"center",
            justifyContent: 'center',
            borderRadius: 10,
        },


})