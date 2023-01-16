import React from 'react';
import {StyleSheet, Text, View, Image, FlatList, Modal,TouchableOpacity, ActivityIndicator, ScrollView, Dimensions, StatusBar} from "react-native";
import colors from "../Colors";
import {AntDesign} from "@expo/vector-icons";
import TodoListSummary from '../components/todolist/todoList-summary';
import AddListSlide from './addList-slide';
import AddPersonnelSlide from './addpersonnel-slide';
import Fire from '../Fire';
import DoctorBar from '../components/doctorComponents/doctorBar';


export default class ManageStaff extends React.Component{
    state = {
        personnels: [],
        user: {},
        loading: true,
        doctors : [],
        aides :[],
        chur: [],
        inf: [],
        medVisible: false,
        chirVisible : false,
        infVisible: false,
        aidVisible : false,

    };

    componentDidMount(){
        firebase = new Fire((error, user)=>{
            if(error){
                return alert("Uh no, there is something went wrong");
            }            
            firebase.getPersonnels(personnels=>{
                
                this.setState({personnels, user}, () => {
                    this.setState({loading:false});
                    //this.state.doctors = this.state.personnels;
                    //this.state.filtered = this.state.doctors;
                    var doc = this.state.personnels.filter(function(el) {return el.profession === "Medecin"});
                    var aides = this.state.personnels.filter(function(el) {return el.profession === "Aide-Soignant"});
                    var chir = this.state.personnels.filter(function(el) {return el.profession === "Chirurgien"});
                    var inf = this.state.personnels.filter(function(el) {return el.profession === "Infirmier"});
                    this.setState({doctors: doc});
                    this.setState({aides: aides});
                    this.setState({chir: chir});
                    this.setState({inf: inf});
                    
                    // this.state.spec = Array.from(new Set(this.state.filtered.map(a => a.speciality)));
                    
                });
            });
            this.setState({user});
            console.log(user.uid);
        });
    }

    togglePers(){
        this.setState({medVisible: !this.state.medVisible});
    }

    componentWillUnmount(){
        firebase.detach();
    }

    renderDoctors = pers =>{
        
        return( <DoctorBar navigation={this.props.navigation} isManage={true} pers={pers} /> );
    }

   


    
     


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
            

            
            
            <StatusBar barStyle="light-content" backgroundColor={colors.blue} /> 
                

                


                <ScrollView  showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='always'>
                
                

                <View>
                
                <View style={{   alignItems:'center' }}>
                        <View style={{flex: 1, paddingHorizontal:20}} >
                        <View style={{height:10}}/>
                        <View style={{}}>
                            <TouchableOpacity style={styles.specTitle}  onPress={()=>{return this.setState({medVisible: !this.state.medVisible})}} >
                                <Text style={styles.text}>Médecins</Text>
                                <View style={{flex:1,  alignItems:'flex-end', paddingRight:40  }}>
                                <Image style={{height:15, width:15,   }} source={this.state.medVisible ? require('../assets/uparrow.png') : require('../assets/arrowdown.png')} />
                                </View>
                            </TouchableOpacity>
                        </View>
                          <View style={{flex:1, display:this.state.medVisible?'flex':'none', }}>   
                            <FlatList 
                            style = {{ marginBottom:0, }}
                                data={this.state.doctors} 
                                keyExtractor={(item) => item.id.toString()} 
                                renderItem={ ({item})  => this.renderDoctors(item)}
                            />
                        
                        </View>
                        <TouchableOpacity style={styles.specTitle} onPress={()=>{return this.setState({chirVisible: !this.state.chirVisible})}}  >
                            <Text style={styles.text}>Chirurgiens</Text>
                            <View style={{flex:1,  alignItems:'flex-end', paddingRight:40  }}>
                                <Image style={{height:15, width:15,   }} source={this.state.chirVisible ? require('../assets/uparrow.png') : require('../assets/arrowdown.png')} />
                                </View>
                        </TouchableOpacity>
                        <View style={{flex:1, display:this.state.chirVisible?'flex':'none',}}>
                            <FlatList 
                                data={this.state.chir} 
                                keyExtractor={(item) => item.id.toString()} 
                                renderItem={ ({item})  => this.renderDoctors(item)}
                            />
                            </View>
                        <TouchableOpacity style={styles.specTitle} onPress={()=>{return this.setState({infVisible: !this.state.infVisible})}}  >
                            <Text style={styles.text}>Infirmiers</Text>
                            <View style={{flex:1,  alignItems:'flex-end', paddingRight:40  }}>
                                <Image style={{height:15, width:15,   }} source={this.state.infVisible ? require('../assets/uparrow.png') : require('../assets/arrowdown.png')} />
                                </View>
                        </TouchableOpacity>
                        <View style={{flex:1, display:this.state.infVisible?'flex':'none',}}>
                            <FlatList 
                                data={this.state.inf} 
                                keyExtractor={(item) => item.id.toString()} 
                                renderItem={ ({item})  => this.renderDoctors(item)}
                            />
                        </View>
                        <TouchableOpacity style={styles.specTitle} onPress={()=>{return this.setState({aidVisible: !this.state.aidVisible})}}  >
                            <Text style={styles.text}>Aides-Soignants</Text>
                            <View style={{flex:1,  alignItems:'flex-end', paddingRight:40  }}>
                                <Image style={{height:15, width:15,   }} source={this.state.aidVisible ? require('../assets/uparrow.png') : require('../assets/arrowdown.png')} />
                                </View>
                        </TouchableOpacity>
                        <View style={{flex:1, display:this.state.aidVisible?'flex':'none',}}>
                            <FlatList 
                                data={this.state.aides} 
                                keyExtractor={(item) => item.id.toString()} 
                                renderItem={ ({item})  => this.renderDoctors(item)}
                            />
                        </View>

<View style={{height:150}}/>    
                        </View>
                                                                
                </View>
                
                <View>
                
                
                </View>
                
                    
                                    
                                

                </View>





                
            </ScrollView>
            
            <TouchableOpacity activeOpacity={1} style={styles.buttonView} onPress={() => this.props.navigation.navigate("Ajouter Personnel")} >
                                <View style={{flexDirection:'row'}}>
                                    <View >
                                        <Image  source={require('../assets/add.png')} style={{width:30, height:30,marginLeft:20, marginRight:-30 }} />
                                    </View>
                                    <View style={{alignItems:'center', justifyContent:'center', flexDirection:'row', flex:1}}>
                                        <Text style={{color:'#FFF', fontSize:18, fontWeight:'600', paddingLeft:35 }}>Ajouter un personnel</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
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
        backgroundColor:colors.blue, 
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
        
    },
    
buttonView: {
    backgroundColor:colors.blue, 
    width:250, 
    height:80,
    borderRadius:20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', //Here is the trick
    bottom: 50, //Here is the trick
    backgroundColor: colors.blue,
    },
  buttonText: {
      fontSize: 16, 
      fontWeight: 'bold', 
      color: 'white',
    },
    text:{
        fontSize:20,
        paddingHorizontal:20,
        paddingVertical:15,
        fontWeight:'600'
    },
    specTitle:{
         width:windowWidth, 
         flexDirection:'row',
          justifyContent:'flex-start',
           alignItems:'center'
    }



});