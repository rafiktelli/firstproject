import React, {useState} from 'react';
import { StyleSheet, Text, View, Animated, TouchableOpacity, Pressable } from 'react-native';
import {AntDesign, Ionicons} from '@expo/vector-icons';




const LeftSwipeActions = () => {
    return (
      <View
        style={{ flex: 1, backgroundColor: '#ccffbd', justifyContent: 'center' }}
      >
        <Text
          style={{
            color: '#40394a',
            paddingHorizontal: 10,
            fontWeight: '600',
            paddingHorizontal: 30,
            paddingVertical: 20,
          }}
        >
          Bookmark
        </Text>
      </View>
    );
  };


const Task = (props) => {
  
    return (
      <View style={styles.item}>
          <View style={styles.itemLeft}>
          <TouchableOpacity>
             <Ionicons name="ios-square-outline" size={24} color={'#55BCF6'} style={{width:32}} />
          </TouchableOpacity>
              <Text style={styles.itemText}>{props.text}</Text>
          </View>
          <View style={styles.circular}>

          </View>
      </View>
    )
} 




export default Task;



const styles = StyleSheet.create({
  item: {
      backgroundColor: '#FFF',
      padding: 15,
      borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom:20,
  },
  itemLeft:{
      flexDirection : 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
  },
  square:{
      width: 24,
      height: 24,
      backgroundColor: '#55BCF6',
      opacity: 0.4,
      borderRadius: 5,
      marginRight: 15,
  },
  itemText:{
      maxWidth: '80%',
      textDecorationLine: 'line-through',
  },
  circular:{
      width:12,
      height: 12,
      borderColor: '#55BCF6',
      borderWidth: 2, 
      borderRadius: 5,
  },
  
});