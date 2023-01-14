import React from "react"; 
import { View, Text, StyleSheet, KeyboardAvoidingView, Image, TouchableOpacity, TextInput, FlatList, DatePickerIOS } from "react-native"; 
import { AntDesign } from "@expo/vector-icons"; 
import colors from "../Colors"; 
import SelectDropdown from 'react-native-select-dropdown';
import Dropdown from "../components/todolist/dropDown";
import Fire from "../Fire";




export default class AddPersonnelSlide extends React.Component {

    state = { 
                nom: "", 
                naissance:"",
                profession: "",  
                speciality: "",
            };
    

    createPersonnel = () => {
        const {nom, profession, speciality, naissance} = this.state;
        const personnel = {nom, profession, speciality, naissance}; 
        this.addPersonnel(personnel); 
        this.props.navigation.navigate("Manage Staff");


        this.setState({nom:""});
        }; 
        getProfession = (data) =>{
            console.log("Coming from Parent", data);
            this.setState({profession: data});
        };
        getSpeciality = (data) =>{
            console.log("Coming from Parent", data);
            this.setState({speciality: data});
        };
        addPersonnel = personnel =>{
            firebase.addPersonnel({
                nom: personnel.nom,
                profession: personnel.profession,
                speciality: personnel.speciality,
                naissance: personnel.naissance
            });
        };


        render() {

            console.log("this is input value:"+ this.state.nom);


            return (
               <KeyboardAvoidingView style={styles.container}> 
                    
                    <View style={{ alignSelf: "stretch", marginHorizontal: 32, }}> 
                    <Text> {this.props.route.params.name} </Text>
                        <TextInput style={styles.input} placeholderTextColor="#C0C0C0"  placeholder="Personnel Name" onChangeText={text => this.setState({ nom: text })}/> 
                        <TextInput style={styles.input} placeholderTextColor="#C0C0C0" placeholder="Birthday" onChangeText={text => this.setState({ naissance: text})} />     
                    </View>
                    <View  style={{ alignSelf: "stretch", marginHorizontal: 32}}>
                        <Dropdown onProfessionChange={this.getProfession} onSpecialityChange={this.getSpeciality} />
                    </View>
                    <View  style={{ flex: 1, alignItems:'center', alignSelf: "stretch", marginHorizontal: 32}}>
                    <TouchableOpacity activeOpacity={1} style={styles.buttonView} onPress={()=>this.createPersonnel() } >
                                <View style={{flexDirection:'row'}}>
                                    <View >
                                        <Image  source={require('../assets/add.png')} style={{width:30, height:30,marginLeft:30, marginRight:-30 }} />
                                    </View>
                                    <View style={{alignItems:'center', justifyContent:'center', flexDirection:'row', flex:1}}>
                                        <Text style={{color:'#FFF', fontSize:20, fontWeight:'600' }}>Add Worker</Text>
                                           
                                    </View>
                                </View>
                            </TouchableOpacity>

                        
                        


                    </View> 


                    
                
                    
                </KeyboardAvoidingView>
                
                
    ); 
} 
}

const styles = StyleSheet.create({
    container:{
    backgroundColor:'#FFF',
    flex :1,
    justifyContent: "center",
    alignItems: "center",
    
    paddingTop:50
    },
    title: { 
    fontSize: 28, 
    fontWeight: "800", 
    color: colors.black, 
    alignSelf: "center", 
    marginBottom: 16 
    }, 
    input: { 
    borderWidth: StyleSheet.hairlineWidth, 
    borderColor: colors.blue, 
    placeholderTextColor:"#000",
    borderRadius: 6, 
    height: 50, 
    marginTop: 4, 
    marginBottom : 4,
    paddingHorizontal: 16, 
    fontSize: 18 
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
        input:{
            paddingVertical: 18,
            paddingLeft:20,
            paddingRight: 5,
            backgroundColor: '#f8f4f4',
            borderRadius:15,
            borderColor: '#f8f4f4',
            borderWidth: 1,
            marginVertical:10,

        },

});




