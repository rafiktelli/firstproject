import { KeyboardAvoidingView, TextInput, TouchableOpacity, Keyboard, ScrollView, Animated, Text, View } from 'react-native';
import {useState, useCallback, useMemo, useRef} from "react";
import {StyleSheet} from 'react-native';
import ListTasks from './components/OLD-todolist/list-tasks';
import WelcomeScreen from './screens/welcome-screen';
import Login from './screens/login-screen';
import MainScreen from './screens/main-screen';
import DoctorTasksScreen from './screens/doctor-tasks-screen';
import TodoListsScreen from './screens/todolists-sceen';
import AppointmentScreen from './screens/appointment-screen';
import AddPersonnelSlide from './screens/addpersonnel-slide';
import ManageStaff from './screens/manage-staff';
import { createStackNavigator } from '@react-navigation/stack'; //Insert screens into a stack
import { NavigationContainer } from '@react-navigation/native'; //contains navigator and screen
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Feather from 'react-native-vector-icons/Feather';



const Stack = createNativeStackNavigator();



export default function App() {



  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
        name = "Welcome"
        component={WelcomeScreen}
        options={{headerShown: false}}

         />
        <Stack.Screen 
        name = "Login"
        component={Login}
        options={{headerShown: false}}
         />
         <Stack.Screen
         name="Main"
         component={MainScreen}
         options={{headerShown: false}}
         />
         <Stack.Screen
         name="Appointment"
         component={AppointmentScreen}
         options={{headerShown: false}}
         />
        <Stack.Screen
         name="Tasks"
         component={TodoListsScreen}
         options={{headerShown: false}}
         />
         <Stack.Screen
         name="Staff"
         component={AddPersonnelSlide}
         options={{headerShown: false}}
         />
         <Stack.Screen
         name="ManageStaff"
         component={ManageStaff}
         options={{headerShown: false}}
         />
      </Stack.Navigator>
    </NavigationContainer>
  


     
  );


}
