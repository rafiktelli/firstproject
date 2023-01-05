import React,{useState} from 'react';
import { StyleSheet, Text, ScrollView,View,StatusBar,Image,TextInput, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../Colors';
import TaskCard from '../components/doctorComponents/taskCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import taskdata from '../data';



export default class DoctorTasksScreen extends React.Component {

    render(){
        return (
            <ScrollView  style={{backgroundColor:'#fff'}} contentContainerStyle={{flexGrow:1}} >
                <StatusBar barStyle="dark-content" backgroundColor="#fff" />
                <View style={styles.header}>
                    <View>
                        <Text style={styles.regular}>Good Morning</Text>
                        <Text style={styles.bold}>Your Appointements!</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Feather name='bell' size={24} color={colors.black} />
                        <Feather style={{marginLeft:8}} name='user' size={24} color={colors.black} />
                    </View>
                </View>
                <View>
                    <FlatList 
                        data={taskdata}
                        style={{marginHorizontal: 12 }}
                        keyExtractor={(item)=>item.id.toString()}
                        renderItem={({ item })=>{
                            return(
                                <TaskCard containerStyle={{backgroundColor: item.color }} name={item.name} date={item.date} doctor={item.doctor} duration={item.duration} time={item.time} />

                            )
                        }}
                    />
                </View>
                
            </ScrollView>
            
                
            

        
        )
}
}


const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        flexDirection:'row',
        justifyContent: 'space-between',
        backgroundColor: '#FFF',
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