import React from "react"; 
import { View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, TextInput, FlatList, DatePickerIOS } from "react-native"; 
import { AntDesign } from "@expo/vector-icons"; 
import colors from "../Colors"; 
import SelectDropdown from 'react-native-select-dropdown';
import Dropdown from "../components/todolist/dropDown";



const countries = ["Egypt", "Canada", "Australia", "Ireland"]


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
        this.props.addPersonnel(personnel); 


        this.setState({nom:""});
        this.props.closeModal();
        }; 
        getProfession = (data) =>{
            console.log("Coming from Parent", data);
            this.setState({profession: data});
        };
        getSpeciality = (data) =>{
            console.log("Coming from Parent", data);
            this.setState({speciality: data});
        };


        render() {
            return (
               <KeyboardAvoidingView style={styles.container}> 
                    <TouchableOpacity style={{ position: "absolute", top: 33, right: 32, }} onPress={this.props.closeModal}> 
                        <AntDesign name="close" size={24} color={colors.gray} /> 
                    </TouchableOpacity>
                    <View style={{ alignSelf: "stretch", marginHorizontal: 32 }}> 
                        <Text style={styles.title}>Create Personnel</Text> 
                        <TextInput style={styles.input} placeholderTextColor="#000"  placeholder="Personnel Name" onChangeText={text => this.setState({ nom: text })}/> 
                        <TextInput style={styles.input} placeholderTextColor="#000" placeholder="Birthday" onChangeText={text => this.setState({ naissance: text})} />     
                    </View>
                    <View  style={{ alignSelf: "stretch", marginHorizontal: 32}}>
                        <Dropdown onProfessionChange={this.getProfession} onSpecialityChange={this.getSpeciality} />
                    </View>
                    <View  style={{ alignSelf: "stretch", marginHorizontal: 32}}>
                        <TouchableOpacity style={[styles.create, { backgroundColor: colors.blue }]} onPress={this.createPersonnel}> 
                            <Text style={{ color: colors.white, fontWeight: "600" }}>Create!</Text> 
                        </TouchableOpacity> 
                    </View> 
                
                    
                </KeyboardAvoidingView>
                
                
    ); 
} 
}

const styles = StyleSheet.create({
container:{
flex :1,
justifyContent: "center",
alignItems: "center"
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
create: { 
marginTop: 24, 
height: 50, 
borderRadius: 6, 
alignItems: "center", 
justifyContent: "center" 
},
colorSelect:{ 
width: 30, 
height: 30, 
borderRadius: 4

}, 

});




