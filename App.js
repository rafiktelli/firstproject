import { KeyboardAvoidingView, TextInput, TouchableOpacity, Keyboard, ScrollView, Animated, Text, View } from 'react-native';
import {useState, useCallback, useMemo, useRef} from "react";
import {StyleSheet} from 'react-native';
import ListTasks from './components/list-tasks';
import WelcomeScreen from './screens/welcome';
import Login from './screens/login';
import MainScreen from './screens/main-screen';
import { createStackNavigator } from '@react-navigation/stack'; //Insert screens into a stack
import { NavigationContainer } from '@react-navigation/native'; //contains navigator and screen
import {createNativeStackNavigator} from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();



export default function App() {



  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
        name = "Welcome"
        component={MainScreen}
        options={{headerShown: false}}
         />
        <Stack.Screen 
        name = "Login"
        component={Login}
        options={{headerShown: false}}
         />
         <Stack.Screen
         name="Tasks"
         component={ListTasks}
         options={{headerShown: true}}
         />
      </Stack.Navigator>
    </NavigationContainer>
  


     
  );


}
