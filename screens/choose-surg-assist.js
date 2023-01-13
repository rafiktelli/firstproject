import React,{useState} from 'react';
import { StyleSheet, Text, ScrollView,View,StatusBar,Image,TextInput, Pressable, TouchableOpacity, Dimensions, FlatList, Modal, KeyboardAvoidingView } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../Colors';
import TaskCard from '../components/doctorComponents/taskCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import taskdata from '../data';
import { AntDesign, Ionicons } from "@expo/vector-icons"; 
import TodoListSummary from '../components/todolist/todoList-summary';
import TodoList from '../components/todolist/todoList';
import Fire from '../Fire';
import DoctorBar from '../components/doctorComponents/doctorBar';
import SpeCompo from '../components/doctorComponents/speCompo';
import PatientInfoSlide from './patientInfo-slide';

export default class ChooseSurgAssist extends React.Component {
    state={
        personnels : [],
        doctors : [],
        filtered : [],
        spec : {},
        inputValue :'', 
        specPressed : false, 
        pressedCategory : '',
        oldPressedCategory :'',
        count : -1,
        pressedCategory2: '',
        showListVisible : false,

        
    };
    
    componentDidMount(){
        firebase = new Fire((error, user)=>{
            if(error){
                return alert("Uh no, there is something went wrong");
            }            
            firebase.getPersonnels(personnels=>{
                
                this.setState({personnels, user}, () => {
                    this.setState({loading:false});
                    this.state.doctors = this.state.personnels.filter( function(el) { return el.profession === "Medecin"; } );
                    this.state.nurses = this.state.personnels.filter( function(el) { return el.profession === "Infirmier"; } );
                    this.state.filtered = this.state.nurses;
                    this.state.anes = this.state.personnels.filter( function(el) { return (el.profession === "Medecin" && el.speciality=="Anesthésie"  ) } );
                    this.state.spec = Array.from(new Set(this.state.filtered.map(a => a.speciality)));
                    
                });
            });
            this.setState({user});
            console.log(user.uid);
        });
    }

    componentWillUnmount(){
        firebase.detach();
    }
    
    clearInputText(){
        this.setState({inputValue:''});
        this.componentDidMount();

    }

    

    catPressed= cat =>{
        console.log("HOlllaaa");
        this.setState({pressedCategory : cat });
    }

    catPressed2= cat =>{
        console.log("HOlllaaa");
        this.setState({pressedCategory2 : cat });

    }
    toggleModal(){
        this.setState({showListVisible: !this.state.showListVisible})
    }
   
    

    searchDoc(textToSearch){
        this.setState({spec: ''});
        this.setState({inputValue: textToSearch});
        this.setState({
            filtered: this.state.filtered.filter(i=>
                    i.nom.toLowerCase().includes(textToSearch.toLowerCase()),
                )    
        });
        this.setState({
            spec:  Array.from(new Set(this.state.nurses.filter(j=>
                j.nom.toLowerCase().includes(textToSearch.toLowerCase()),
            ).map(a => a.speciality)
        ))});
        if(textToSearch === '') {
            this.setState({
                filtered: this.state.nurses,
            });
        }
        console.log(this.state.inputValue);
    } 

    render(){
        //this.state.filtred = this.state.doctors;
        if(this.state.inputValue === ''){ console.log(""); }
        return (
            <View  style={styles.container}>
            <Modal animationType="slide" visible={this.state.showListVisible} onRequestClose={()=>this.toggleModal()}>
                <PatientInfoSlide surg={true} anes={this.state.pressedCategory2} nurse={this.state.pressedCategory} closePrevModal={()=>this.props.closeModal()} pers={this.props.pers} slot={this.props.slot} date={this.props.date}  closeModal={()=>this.toggleListModal()} />

            </Modal>
            <ScrollView keyboardShouldPersistTaps='always'>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
                <View style={{ marginLeft:20,  }}>
                    <View style={{height:75,  }} />
                    <View style={{}}>
                        <Text style={{ fontWeight:'900', fontSize:30, width:250, marginBottom:10}}>Choose Surgery Assistants</Text>
                    </View>

                    
                    <View style={{marginVertical:10,  }}>
                        <Text style={{fontWeight:'900', fontSize:20}}>Available Nurses</Text>
                    </View>
                    <View style={{  }}>
                        <ScrollView keyboardShouldPersistTaps='always' style={{backgroundColor:'#fff'}} 
                                showsVerticalScrollIndicator={false}>
                           
                            <FlatList 
                                data={this.state.filtered} 
                                extraData={this.state}
                                keyExtractor={(item) => item.id.toString()} 
                                renderItem={ ({item})  => 

                                    {
                                        return(
                                            <TouchableOpacity onPress={()=>this.catPressed(item.id.toString())}>
                                                <DoctorBar isPressed={this.state.pressedCategory} anes={true} pers={item} /> 
                                            </TouchableOpacity>
                                            );
                                    }}
                            />
                            <Text> {console.log(this.state.pressedCategory)}</Text>
                        </ScrollView>
                    </View>
                    <View style={{ display: (this.props.slot ==="15:00") ? 'flex' : 'none' }}>
                        <View style={{marginVertical:10, display: (this.props.slot ==="15:00") ? 'flex' : 'none' }}>
                            <Text style={{fontWeight:'900', fontSize:20}}>Available Anesthesiologist</Text>
                        </View>
                        <View style={{  }}>
                            <ScrollView keyboardShouldPersistTaps='always' style={{backgroundColor:'#fff'}} 
                                    showsVerticalScrollIndicator={false}>
                            
                                <FlatList 
                                    data={this.state.anes} 
                                    extraData={this.state}
                                    keyExtractor={(item) => item.id.toString()} 
                                    renderItem={ ({item})  => 

                                    {
                                        return(
                                            <TouchableOpacity onPress={()=>this.catPressed2(item.id.toString())}>
                                                <DoctorBar isPressed={this.state.pressedCategory2} anes={true} pers={item} /> 
                                            </TouchableOpacity>
                                            );
                                    }}
                                    
                                    
                                    
                                />
                                <Text> {console.log(this.state.pressedCategory)}</Text>
                            </ScrollView>
                        </View>
                    </View>

                </View>
                <View style={{height:100}} />
                </ScrollView>
                <View style={{flex:1, alignItems:'center', justifyContent:'flex-end', }}>
                        <View style={{backgroundColor:colors.blue, width:250, height:80, borderRadius:20, justifyContent:'center', marginBottom:30 }}>
                            <TouchableOpacity disabled={this.state.pressedSlot == '' } onPress={()=>this.toggleModal()} >
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
            
                
            

        
        )
}
}


const styles = StyleSheet.create({
    container:{
    backgroundColor:'#FFF', 
    flex: 1,
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        flexDirection:'row',
        justifyContent: 'space-between',
        backgroundColor: '#FFF',
      },
    input:{
        paddingVertical: 15,
        paddingLeft:20,
        paddingRight: 5,
        width: 270,
        backgroundColor: '#f8f4f4',
        borderBottomLeftRadius:15,
        borderTopLeftRadius:15,
        borderColor: '#f8f4f4',
        borderWidth: 1,
    },  
    search:{
        alignItems:'center', 
        justifyContent:'center', 
        width: 60, 
        paddingVertical:15, 
        backgroundColor:'#127eff', 
        borderRadius:15,
    },
    
    doctor:{
        flex:1,
        borderRadius: 15, 
        marginVertical: 3, 
        width:350, 
        height:80,
        backgroundColor:colors.lightGray, 

    },
    bold: {
        color: colors.black,
        fontSize: 20,
    },
    regular:{
        color: colors.gray,
        fontSize: 16,
    },




})