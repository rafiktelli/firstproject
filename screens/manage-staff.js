import React from 'react';
import {StyleSheet, Text, View, FlatList, Modal,TouchableOpacity, ActivityIndicator, ScrollView, Dimensions} from "react-native";
import colors from "../Colors";
import {AntDesign} from "@expo/vector-icons";
import TodoListSummary from '../components/todolist/todoList-summary';
import AddListSlide from './addList-slide';
import AddPersonnelSlide from './addpersonnel-slide';
import Fire from '../Fire';
import DoctorBar from '../components/doctorComponents/doctorBar';


export default class ManageStaff extends React.Component{
    state = {
        addPersonnelVisible: false,
        personnels: [],
        user: {},
        loading: true,
        doctors : [],
    };

    componentDidMount(){
        firebase = new Fire((error, user)=>{
            if(error){
                return alert("Uh no, there is something went wrong");
            }            
            firebase.getPersonnels(personnels=>{
                
                this.setState({personnels, user}, () => {
                    this.setState({loading:false});
                    this.state.doctors = this.state.personnels;
                    //this.state.filtered = this.state.doctors;
                   // this.state.spec = Array.from(new Set(this.state.filtered.map(a => a.speciality)));
                    
                });
            });
            this.setState({user});
            console.log(user.uid);
        });
    }

    componentWillUnmount(){
        firebase.detach();
    }

    renderDoctors = pers =>{
        
        return( <DoctorBar isManage={true} pers={pers} /> );
    }

    toggleAddPersonnelModel(){
        this.setState({addPersonnelVisible: !this.state.addPersonnelVisible});
    }


    
    addPersonnel = personnel =>{
        firebase.addPersonnel({
            nom: personnel.nom,
            profession: personnel.profession,
            speciality: personnel.speciality,
            naissance: personnel.naissance
        });
    }; 


    render(){

        if(this.state.laoding){
            return(
                <View style={style.container}>
                    <ActivityIndicator size="large" color={colors.blue} />
                </View>
            );
        }



        return(
            <View style={styles.container}>
                <Modal animationType="slide" visible={this.state.addPersonnelVisible} onRequestClose ={()=>this.toggleAddPersonnelModel()}>
                    <AddPersonnelSlide closeModal={() => this.toggleAddPersonnelModel()} addPersonnel={this.addPersonnel} />
                </Modal>
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='always'>
                
                <View  style={styles.viewButton}>
                    <TouchableOpacity style={styles.search} onPress ={()=> this.toggleAddPersonnelModel()}>
                        <AntDesign name="plus" size={25} color={colors.white} />
                    </TouchableOpacity>
                    <Text style={styles.add}> Add Personnel </Text>
                </View>

                <View>

                <View style={{ width: windowWidth, alignItems:'center' }}>
                        <View>
                           
                            <FlatList 
                                data={this.state.doctors} 
                                extraData={this.state}
                                keyExtractor={(item) => item.id.toString()} 
                                renderItem={ ({item})  => this.renderDoctors(item)}
                            />
                        </View>
                    </View>

                </View>






                
            </ScrollView>
            </View> 

        );
    }
}

const windowWidth =  Dimensions.get('window').width;

const styles =StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#fff",
        alignItems:"center",
        justifyContent:"center",
    },
    divider:{
        backgroundColor: colors.lightBlue,
        height: 1,
        flex: 1,
        alignSelf:"center",
    },
    title:{
        fontSize:38,
        fontWeight: "800",
        color: colors.black,
    },
    
    search:{
        alignItems:'center', 
        justifyContent:'center', 
        width: 60, 
        height : 60, 
        backgroundColor:'#127eff', 
        borderRadius:15,
        shadowOffset: {
            width: 0,
            height: 3
          },
          shadowRadius: 5,
          shadowOpacity: 1.0
        
    },
    add:{
        color: colors.black,
        fontWeight:"800",
        fontSize: 14,
        
    },
    viewButton:{
        marginVertical:40,
        alignItems:'center',
        
    }



});