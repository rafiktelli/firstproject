import React,{useState, useRef} from 'react';
import { StyleSheet, Text, ScrollView,View,StatusBar,Image,TextInput, useWindowDimensions, TouchableOpacity, Dimensions, Button, FlatList, Modal } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../../Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, Ionicons } from "@expo/vector-icons"; 
import Fire from '../../Fire';
import DoctorAppointSlide from '../../screens/doctor-appoint-slide';
import RBSheet from "react-native-raw-bottom-sheet";

export default class BottomSheet extends React.Component {
  render() {
      const windowWidth =  Dimensions.get('window').width;
      const pers = this.props.pers;
    return (
      <View>
      <View style={{ }}>
        <View style={styles.top}>
            <View>
                <Image source={require('../../assets/doctor-female.jpg')} style={{width:65, height:65, borderRadius: 15, backgroundColor:'#C0C0C0', marginHorizontal:10, marginVertical: 10}} />
            </View>
            <View style={{flexDirection:'column', paddingVertical:15,  }}>
                <Text style={{fontSize:20, fontWeight:'700', color:'#000'}}>{pers.nom} </Text>
                <View style={{flexDirection:'row', }}>

                    <View style={styles.tag}>
                        <Text style={{color:'#FFF', fontWeight:'700'}}> {pers.profession} </Text>
                    </View>
                    <View style={styles.tag}>
                        <Text style={{color:'#FFF', fontWeight:'700',    }}> {pers.speciality} {console.log(windowWidth)}  </Text>
                    </View>
                    
                    
                </View>
                
                
            </View>
        </View>
        
        <View>
                
        </View>
      </View>
        <View style={styles.divider} />
        <View>
        {/* Check Schedule and Tasks */}
            <View style={{height:70, justifyContent:'center',  paddingHorizontal:30}}>
                <TouchableOpacity>
                <View style={{flexDirection:'row'}}>
                    <Ionicons name="checkbox-outline" size={24} color={'#5A5A5A'} />
                    <Text style={{fontSize:18, paddingHorizontal:10, fontWeight:'600',  color:'#5A5A5A'}}>Check Schedule and Tasks</Text>
                </View>
                </TouchableOpacity>
            </View>
        {/* Edit Profile */}
            <View style={{height:70, justifyContent:'center', paddingHorizontal:30}}>
                <TouchableOpacity>
                <View style={{flexDirection:'row'}}>
                    <Ionicons name="create" size={24} color={'#5A5A5A'} />
                    <Text style={{ fontSize:18, paddingHorizontal:10, fontWeight:'600',  color:'#5A5A5A' }} >Edit Profile</Text>
                </View>
                </TouchableOpacity>
            </View>
        {/* Delete Profile */}
            <View style={{height:70, justifyContent:'center',  paddingHorizontal:30}}>
                <TouchableOpacity>
                <View style={{flexDirection:'row'}}>
                    <Ionicons name="trash" size={24} color={colors.red} />
                    <Text style={{color:colors.red, fontSize:18, paddingHorizontal:10, fontWeight:'600', }}>Delete Profile</Text>
                </View>
                </TouchableOpacity>
            </View>
        </View>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
    top:{
        paddingHorizontal:20,
        paddingTop:5,
        paddingBottom:5,
        flexDirection:'row',
        
    },
    tag:{
        borderRadius:8,
        backgroundColor:'#127eff',
        paddingVertical:4,
        paddingHorizontal:8,
        marginRight: 5,
        flexGrow: 1,
        
    },
    divider:{
        backgroundColor: '#C0C0C0',
        height: 1,
    },


});
