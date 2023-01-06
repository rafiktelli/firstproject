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

export default class AppointmentScreen extends React.Component {
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
                    this.state.filtered = this.state.doctors;
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
        
        this.setState({pressedCategory : cat, });
        if( cat === this.state.oldPressedCategory ){
            this.setState({count: this.state.count +1})
            if(this.state.count%2 === 0){
                this.setState({pressedCategory:''});
                this.setState({
                    filtered: this.state.doctors,
                    });
            }
            else{
                this.setState({
                    filtered: this.state.doctors.filter(i=>
                            i.speciality.toLowerCase().includes(cat.toLowerCase()),
                        )    
                });
            }
        }else{
            this.setState({count: 0})
            this.setState({
            filtered: this.state.doctors.filter(i=>
                    i.speciality.toLowerCase().includes(cat.toLowerCase()),
                )    
        });
        }
        this.setState({oldPressedCategory : cat });
        

    }
    

    renderDoctors = pers =>{
        
        return( <DoctorBar pers={pers} /> );
    }
    searchDoc(textToSearch){
        this.setState({inputValue: textToSearch});
        this.setState({
            filtered: this.state.filtered.filter(i=>
                    i.nom.toLowerCase().includes(textToSearch.toLowerCase()),
                )    
        });
        this.setState({
            spec:  Array.from(new Set(this.state.doctors.filter(j=>
                j.nom.toLowerCase().includes(textToSearch.toLowerCase()),
            ).map(a => a.speciality)
        ))});
        if(textToSearch === '') {
            this.setState({
                filtered: this.state.doctors,
            });
        }
        console.log(this.state.inputValue);
    } 

    render(){
        //this.state.filtred = this.state.doctors;
        if(this.state.inputValue === ''){ console.log("tnaaaaaket"); }
        return (
            <View  style={styles.container}>
            <ScrollView keyboardShouldPersistTaps='always'>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
                <View style={{ marginLeft:20,  }}>
                    <View style={{height:75,  }} />
                    <View style={{}}>
                        <Text style={{fontWeight:'900', fontSize:30, width:250, marginBottom:10}}>Doctor Appointment</Text>
                    </View>
                    <View style={{flexDirection:'row', marginTop: 20, marginBottom: 25 }}>
                        <TextInput value={this.state.inputValue} clearButtonMode='always' onChangeText={text=>{this.searchDoc(text)}} style={styles.input} placeholder="Search, e.g: Dr. Jack Sparrow" />
                        <TouchableOpacity onPress={()=>this.clearInputText()} activeOpacity={1} style={{width:25, backgroundColor:'#f8f4f4', borderBottomRightRadius:15,borderTopRightRadius:15, alignContent:'center',justifyContent:'center'}} onPress={()=>this.clearInputText()} >
                            <Ionicons name="close" size={ this.state.inputValue ? 24 : 0} color={'#C0C0C0'}   />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.search} >
                            <Ionicons name="search" size={24} color={'#FFF'}  />
                        </TouchableOpacity>
                    </View>
                    <View style={{marginBottom:20}}>
                        <Text style={{fontWeight:'900', fontSize:20}}>Categories</Text>
                    </View>
                    <View >
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{backgroundColor:'#fff', height:120, flexDirection:'row'}}>
                        <FlatList 
                            data={this.state.spec}
                            keyExtractor={(item) => item.toString()} 
                            numColumns={12}
                            renderItem={({ item })=>{
                                return(
                                    <TouchableOpacity onPress={()=>this.catPressed(item.toString())}>
                                      <SpeCompo name={item.toString()} isPressed ={this.state.pressedCategory}  />  
                                    </TouchableOpacity>
                                    );
                            }}
                        />
                        </ScrollView>
                    </View>
                    <View style={{marginVertical:10,  }}>
                        <Text style={{fontWeight:'900', fontSize:20}}>Doctors</Text>
                    </View>
                    <View style={{  }}>
                        <ScrollView keyboardShouldPersistTaps='always' style={{backgroundColor:'#fff'}} 
                                showsVerticalScrollIndicator={false}>
                           
                            <FlatList 
                                data={this.state.filtered} 
                                extraData={this.state}
                                keyExtractor={(item) => item.id.toString()} 
                                renderItem={ ({item})  => this.renderDoctors(item)}
                            />
                            <Text> {console.log(this.state.pressedCategory)}</Text>
                        </ScrollView>
                    </View>

                </View>
                </ScrollView>
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