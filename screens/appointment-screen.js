import React,{useState} from 'react';
import { StyleSheet, Text, ScrollView,View,StatusBar,Image,TextInput, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../Colors';
import TaskCard from '../components/doctorComponents/taskCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import taskdata from '../data';
import { AntDesign, Ionicons } from "@expo/vector-icons"; 



export default class AppointmentScreen extends React.Component {

    render(){
        return (
            <View  style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
                <View style={{flex:1, marginHorizontal:20}}>
                    <View style={{height:90}} />
                    <View>
                        <Text style={{fontWeight:'700', fontSize:30, width:250}}>Doctor Appointment</Text>
                    </View>
                    <View style={{flexDirection:'row', marginTop: 20, marginBottom: 25 }}>
                        <TextInput style={styles.input} placeholder="Search, e.g: Dr. Jack Sparrow" />
                        <TouchableOpacity style={styles.search}>
                            <Ionicons name="search" size={24} color={'#FFF'}  />
                        </TouchableOpacity>
                    </View>
                    <View style={{marginBottom:20}}>
                        <Text style={{fontWeight:'700', fontSize:18}}>Categories</Text>
                    </View>
                    <View >
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{backgroundColor:'#fff', height:120, flexDirection:'row'}}>
                        <FlatList 
                            data={taskdata}
                            numColumns={taskdata.length}
                            keyExtractor={(item)=>item.id.toString()}
                            renderItem={({ item })=>{
                                return(
                                     <View style={styles.category}>
                                        <TouchableOpacity style={{flex:1, flexDirection:'column', justifyContent:'flex-end', alignItems:'center', marginBottom:15  }}>
                                            <Text style={{}}>{item.category}</Text>
                                        </TouchableOpacity>
                                     </View>
                                )
                            }}
                        />
                        </ScrollView>
                    </View>
                    <View style={{marginVertical:20}}>
                        <Text style={{fontWeight:'700', fontSize:18}}>Categories</Text>
                    </View>
                    <View style={{ height: 300}}>
                        <ScrollView style={{backgroundColor:'#fff'}} 
                                showsVerticalScrollIndicator={false}>
                            <FlatList 
                                data={taskdata}
                                keyExtractor={(item)=>item.id.toString()}
                                renderItem={({ item })=>{
                                    return(
                                        <View style={styles.doctor}>
                                            <TouchableOpacity style={{ marginBottom:15, flexDirection:'row', alignItems:'center',  }}>
                                                <View>
                                                    <Image style={{width:50, height:50, backgroundColor:'#fff', marginHorizontal:10, marginVertical: 10}} />
                                                </View>
                                                <View>
                                                    <Text style={{}}>{item.doctor}</Text>
                                                    <Text style={{}}>{item.category}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                }}
                            />
                        </ScrollView>
                    </View>

                </View>
            </View>
            
                
            

        
        )
}
}


const styles = StyleSheet.create({
    container:{
    backgroundColor:'#fff', 
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
        paddingHorizontal: 20,
        width: 290,
        backgroundColor: '#f8f4f4',
        borderRadius: 15,
        borderColor: '#f8f4f4',
        borderWidth: 1,
    },  
    search:{
        alignItems:'center', 
        justifyContent:'center', 
        width: 60, 
        paddingVertical:15, 
        backgroundColor:'#0073CF', 
        borderRadius:15
    },
    category:{
        height:110,
        marginHorizontal:3, 
        flexDirection:'row', 
        borderRadius: 15, 
        marginVertical: 10, 
        justifyContent:'space-between',
        width:90, 
        backgroundColor:colors.lightGray, 
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