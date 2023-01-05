import { KeyboardAvoidingView, TextInput, TouchableOpacity, Keyboard, ScrollView, Animated, Text, View, StatusBar } from 'react-native';
import Task from "./task"; 
import {useState, useCallback, useMemo, useRef} from "react";
import {StyleSheet} from 'react-native';



const ListTaks = () => {
    const [task, setTask] = useState();
    const [taskItems, setTaskItems] = useState([]);
  
   
    {/* function to add the written string to the component list */}
    const handleAddTask = () =>{
      Keyboard.dismiss();
      setTaskItems([...taskItems, task]);
      setTask(null);
    }
  
    {/* this is a function to delete a component */}
    const completeTask = (index) =>{
      let itemsCopy=[...taskItems];
      itemsCopy.splice(index,1);
      setTaskItems(itemsCopy);
    }
    

   
    return (
        <View style={styles.container}>
        
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <View style={styles.taskWrapper}>
      
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
      
        <ScrollView style={styles.items}>
        { taskItems.map((item, index) =>{
            return(
                <TouchableOpacity  >
                  <Task text ={item} key={index}  />
                </TouchableOpacity>
                ); 
          } )
        }
        </ScrollView>
        </View>
    
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.writeTaskWrapper}>
    
      <TextInput style={styles.input} value={task} placeholder={'Write a task'} onChangeText={text => setTask(text)} />
      
      <TouchableOpacity onPress= {() => handleAddTask()} >
        <View style={styles.addWrapper}> 
          <Text style={styles.addText}>+</Text>
        </View>
    </TouchableOpacity>
    
    </KeyboardAvoidingView>
    </View>




    )
} 




export default ListTaks;



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8EAED',
    },

    taskWrapper: {
      paddingTop: 80,
      paddingHorizontal:20,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: 'bold',
  
    },
    items: {
      marginTop: 30,
      maxHeight: 510,
    },
  
    writeTaskWrapper:{
      position: 'absolute',
      bottom: 60,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    input:{
      paddingVertical: 15,
      paddingHorizontal: 20,
      width: 280,
      backgroundColor: '#FFF',
      borderRadius: 60,
      borderColor: '#C0C0C0',
      borderWidth: 1,
    },
    addWrapper:{
      width: 60,
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 60, 
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: '#C0C0C0',
      borderWidth: 1,
    },
    addText:{},
  });