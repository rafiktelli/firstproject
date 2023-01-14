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

export default class AssignTaskScreen extends React.Component {
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
                    this.state.doctors = this.state.personnels.filter( function(el) { return el.profession === "Aide-Soignant"; } );
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
        
        return( <DoctorBar navigation={this.props.navigation} med={false} pers={pers} /> );
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
        if(this.state.inputValue === ''){ console.log(""); }
        return (
            <View  style={styles.container}>
            <ScrollView keyboardShouldPersistTaps='always'>
            <StatusBar barStyle="light-content" backgroundColor={colors.blue} />
                <View style={{ backgroundColor:colors.blue   }}>
                
                <View style={{ }}>
                <View style={{height:75}}>
                    <Text style={{fontWeight:'500', fontSize:22, color: colors.white, paddingHorizontal: 20, paddingTop:20}}> Specialist Doctors </Text>
                    
                    <Text style={{ fontWeight:'200', fontSize:16, color: colors.white, paddingHorizontal: 20, }}> In every domain </Text>
                
                </View>
                <View style={{ marginLeft:20, flexDirection:'row', marginRight:20, marginTop: 20, marginBottom: 25, justifyContent:'center' }}>
                    <TouchableOpacity onPress={()=>this.clearInputText()} activeOpacity={1} style={{ paddingLeft:10, backgroundColor:'#f8f4f4', borderBottomLeftRadius:15,borderTopLeftRadius:15, alignContent:'center',justifyContent:'center'}} onPress={()=>this.clearInputText()} >
                            <Ionicons name="search" size={ 24 } color={'#C0C0C0'}   />
                        </TouchableOpacity>
                        <TextInput value={this.state.inputValue} clearButtonMode='always' onChangeText={text=>{this.searchDoc(text)}} style={styles.input} placeholder="Search, e.g: Alexandre Gaillard" />
                        <TouchableOpacity onPress={()=>this.clearInputText()} activeOpacity={1} style={{ width:30, backgroundColor:'#f8f4f4', borderBottomRightRadius:15,borderTopRightRadius:15, alignContent:'center',justifyContent:'center'}} onPress={()=>this.clearInputText()} >
                            <Ionicons name="close" size={ this.state.inputValue ? 24 : 0} color={'#C0C0C0'}   />
                        </TouchableOpacity>
                        
                    </View>
                </View>
                <View style={{paddingVertical:20, borderTopRightRadius:20, borderTopLeftRadius:20, backgroundColor:'#FFF'}}>
                 <View style={{marginLeft:20}}>
                    <View style={{marginBottom:20}}>
                        <Text style={{fontWeight:'900', fontSize:20}}>Aides-Soignants</Text>
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
        width: 300,
        backgroundColor: '#f8f4f4',
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