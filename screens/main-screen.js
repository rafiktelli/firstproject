import React,{useState} from 'react'
import { StyleSheet, Text, ScrollView,View,StatusBar,Image,TextInput, TouchableOpacity, Dimensions } from 'react-native'


    
    const windowWidth =  Dimensions.get('window').width;


const MainScreen = ({ navigation }) => {
    
    
    return (
        <View  style={styles.container}>
        
            <View style={{}}>
                <Text style={{fontWeight:'900', fontSize:30, width:250, marginBottom:10}}>Hello Again</Text>
            </View>
            <View>
            <View style={{flexDirection:'row' ,paddingVertical: 20}}>
                <TouchableOpacity onPress={() => navigation.navigate("Appointment") }>
                <View style={{ width:150, height:150, backgroundColor: colors.white , borderRadius:0,  marginHorizontal:10, alignItems:'center', justifyContent:'center' }}>
                        <Image source={require('../assets/appointment.png')} style={{height:50, width:50}} />
                        <Text style={{  paddingTop:20, fontSize:20, fontWeight: '600', color: colors.black, }} > Appointment Schedule </Text>
                    </View>
                </TouchableOpacity>   
                <TouchableOpacity onPress={() => navigation.navigate("Surgery") } >
                <View style={{ width:150, height:150, backgroundColor: colors.white , borderRadius:0,  marginHorizontal:10, alignItems:'center', justifyContent:'center' }}>
                        <Image source={require('../assets/appointment.png')} style={{height:50, width:50}} />
                        <Text style={{  paddingTop:20, fontSize:20, fontWeight: '600', color: colors.black, }} > Schedule Surgery </Text>
                    </View>
                </TouchableOpacity>    
            </View>  
            <View style={{flexDirection:'row',  }}>
            <TouchableOpacity onPress={() => navigation.navigate("Assign Task") }>
                    <View style={{ width:150, height:150, backgroundColor: colors.white , borderRadius:0,  marginHorizontal:10, alignItems:'center', justifyContent:'center' }}>
                        <Image source={require('../assets/todo-icon.png')} style={{height:50, width:50}} />
                        <Text style={{  paddingTop:20, fontSize:20, fontWeight: '600', color: colors.black, }} > Assign Tasks </Text>
                    </View> 
                </TouchableOpacity>         
                <TouchableOpacity onPress={() => navigation.navigate("Manage Staff") }>
                <View style={{ width:150, height:150, backgroundColor: colors.white , borderRadius:0,  marginHorizontal:10, alignItems:'center', justifyContent:'center' }}>
                        <Image source={require('../assets/manage-staff.png')} style={{height:50, width:50}} />
                        <Text style={{  paddingTop:20, fontSize:20, fontWeight: '600', color: colors.black, }} > Manage Staff </Text>
                    </View>
                </TouchableOpacity>    
            </View> 
        </View> 
        </View>
    )
}

export default MainScreen

const styles = StyleSheet.create({
    container: {
        
        flex: 1,
        width: windowWidth ,
        flexDirection:'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.lighterGray,
      },
      category:{
        height:120,
        marginHorizontal:5, 
        borderRadius: 15, 
        justifyContent:'space-between',
        alignItems:'center',
        width:100, 
        backgroundColor:colors.lightGray, 
    },


})