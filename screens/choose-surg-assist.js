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
import SurgSlotsData from '../SurgSlotsData';

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
        anes :[],

        
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
                    this.state.anest = this.state.anes;
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
        this.setState({pressedCategory : cat });
    }

    catPressed2= cat =>{
        this.setState({pressedCategory2 : cat });

    }
    toggleModal(){
        this.props.navigation.navigate("Add Surgery Information",{surg : true, anes : this.state.pressedCategory2, nurse : this.state.pressedCategory, pers : this.props.route.params.pers, slot : this.props.route.params.slot, date : this.props.route.params.date});
    }
   
    

 

    render(){
        var surgofday = this.props.route.params.surgofday;
        var slot = this.props.route.params.slot;
        var surgofdayslot = surgofday.filter( function(el) { return el.slot ===  slot} );
        var occupNurse = surgofdayslot.map(c => c.nurse);
        var occupAnes = surgofdayslot.map(c => c.anes);
        var availableNurse = this.state.filtered.map(c => c.id).filter(n => !occupNurse.includes(n));
        var availableAnes = this.state.anes.map(k => k.id).filter(n => !occupAnes.includes(n));
        var avNurses = this.state.filtered.filter( function(el) { return availableNurse.includes(el.id)  } );
        var avAnes = this.state.anes.filter( function(el) { return availableAnes.includes(el.id)  } )
        
        //this.state.filtred = this.state.doctors;
        if(this.state.inputValue === ''){ console.log(""); }
        return (
            <View  style={styles.container}>
            <Modal animationType="slide" visible={this.state.showListVisible} onRequestClose={()=>this.toggleModal()}>
                <PatientInfoSlide surg={true} anes={this.state.pressedCategory2} nurse={this.state.pressedCategory} closePrevModal={()=>this.props.closeModal()} pers={this.props.route.params.pers} slot={this.props.route.params.slot} date={this.props.route.params.date}  closeModal={()=>this.toggleListModal()} />

            </Modal>
            <ScrollView keyboardShouldPersistTaps='always'>
            <StatusBar barStyle="light-content" backgroundColor={colors.blue} />
                <View style={{ marginLeft:20,  }}>
                    
                    
                    <View style={{marginVertical:10,  }}>
                        <Text style={{fontWeight:'900', fontSize:20}}>Infirmiers Disponibles</Text>
                    </View>
                    <View style={{  }}>
                        <ScrollView keyboardShouldPersistTaps='always' style={{backgroundColor:'#fff'}} 
                                showsVerticalScrollIndicator={false}>
                           
                            <FlatList 
                                data={avNurses} 
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
                        </ScrollView>
                    </View>
                    <View style={{ display: (this.props.route.params.slot ==="15:00") ? 'flex' : 'none' }}>
                        <View style={{marginVertical:10, display: (this.props.route.params.slot ==="15:00") ? 'flex' : 'none' }}>
                            <Text style={{fontWeight:'900', fontSize:20}}>Anesthésiste disponible</Text>
                        </View>
                        <View style={{  }}>
                            <ScrollView keyboardShouldPersistTaps='always' style={{backgroundColor:'#fff'}} 
                                    showsVerticalScrollIndicator={false}>
                            
                                <FlatList 
                                    data={avAnes} 
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
                            </ScrollView>
                        </View>
                    </View>

                </View>
                <View style={{height:100}} />
                </ScrollView>
                <View style={{flex:1, alignItems:'center', justifyContent:'flex-end', }}>
                        <View style={{backgroundColor:colors.blue, width:250, height:80, borderRadius:20, justifyContent:'center', marginBottom:30 }}>
                            <TouchableOpacity disabled={this.state.pressedCategory === '' || ((this.props.route.params.slot ==="15:00") && this.state.pressedCategory2 === '')  } onPress={()=>this.toggleModal()} >
                                <View style={{flexDirection:'row'}}>
                                    <View >
                                        <Image source={require('../assets/clock.png')} style={{width:30, height:30,marginLeft:30, marginRight:-30 }} />
                                    </View>
                                    <View style={{alignItems:'center', justifyContent:'center', flexDirection:'row', flex:1}}>
                                        <Text style={{color:'#FFF', fontSize:20, fontWeight:'600' }}>Planifier</Text>
                                        
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
        backgroundColor:colors.blue, 
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