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
import DoctorAppointSlide from './screens/doctor-appoint-slide';
import AssignTaskScreen from './screens/assignTask-screen';
import ManageStaff from './screens/manage-staff';
import SurgeryScreen from './screens/surgery-screen';
import SurgeonAppointSlide from './screens/surgeon-appoint-slide';
import AddPersonnelSlide from './screens/addpersonnel-slide';
import ChooseSurgAssist from './screens/choose-surg-assist';
import PatientInfoSlide from './screens/patientInfo-slide';
import AssignSlide from './screens/assign-slide';
import { createStackNavigator } from '@react-navigation/stack'; //Insert screens into a stack
import { NavigationContainer } from '@react-navigation/native'; //contains navigator and screen
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Feather from 'react-native-vector-icons/Feather';
import colors from './Colors';



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
         options={{headerShown: true, 
          headerShadowVisible: false,
          headerTintColor:'#FFF',
         title: 'Consultations',
         headerTitleAlign: 'center',
          headerStyle: {
            elevation: 0,
            backgroundColor: colors.blue,
          },
          headerTitleStyle: { color: 'white', fontSize:18  },
         }}
         />
        <Stack.Screen
         name="Tasks"
         component={TodoListsScreen}
         options={{headerShown: false}}
         />
         <Stack.Screen
         name="Manage Staff"
         component={ManageStaff}
         options={{
          headerShown: true,
          headerTintColor:'#FFF',
          title: 'Gérer le personnel',
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerStyle: {
            elevation: 0,
            backgroundColor: colors.blue,
          },
          headerTitleStyle: { color: 'white', fontSize:18  },
         }}/
         >
         <Stack.Screen
         name="Take an Appointment"
         component={DoctorAppointSlide}
         options={{headerShown: true, 
          headerTintColor:'#FFF',
         title: 'Prendre un rendez-vous',
         headerTitleAlign: 'center',
          headerStyle: {
            elevation: 0,
            backgroundColor: colors.blue,
          },
          headerTitleStyle: { color: 'white', fontSize:18  },
         }}
         />
         <Stack.Screen
         name="Assign Task"
         component={AssignTaskScreen}
         options={{
          headerShown: true,
          headerShadowVisible: false,
          headerTintColor:'#FFF',
          title: 'Attribuer des tâches',
          headerTitleAlign: 'center',
          headerStyle: {
            elevation: 0,
            backgroundColor: colors.blue,
          },
          headerTitleStyle: { color: 'white', fontSize:18  },
         }}
         />

         <Stack.Screen
         name="Ajouter Personnel"
         component={AddPersonnelSlide}
         options={{
          headerShown: true,
          headerTintColor:'#FFF',
          title: 'Ajouter un Personnel',
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: colors.blue,
          },
          headerTitleStyle: { color: 'white', fontSize:18  },
         }}

         />
         <Stack.Screen
         name="Surgery"
         component={SurgeryScreen}
         options={{
          headerShown: true,
          headerTintColor:'#FFF',
          title: 'Chirurgies',
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerStyle: {
            elevation: 0,
            backgroundColor: colors.blue,
          },
          headerTitleStyle: { color: 'white', fontSize:18  },
         }}
         />
         <Stack.Screen
         name="SurgeonAppointSlide"
         component={SurgeonAppointSlide}
         options={{headerShown: true, 
          headerTintColor:'#FFF',
         title: 'Planifier une chirurgie',
         headerTitleAlign: 'center',
          headerStyle: {
            elevation: 0,
            backgroundColor: colors.blue,
          },
          headerTitleStyle: { color: 'white', fontSize:18  },
         }}
         />

        <Stack.Screen
         name="Choose Assistants"
         component={ChooseSurgAssist}
         options={{headerShown: true, 
          headerTintColor:'#FFF',
         title: 'Choisir les assistants',
         headerTitleAlign: 'center',
          headerStyle: {
            elevation: 0,
            backgroundColor: colors.blue,
          },
          headerTitleStyle: { color: 'white', fontSize:18  },
         }}
         />

        <Stack.Screen
         name="Add Surgery Information"
         component={PatientInfoSlide}
         options={{headerShown: true, 
          headerTintColor:'#FFF',
         title: 'Informations du patient',
         headerTitleAlign: 'center',
          headerStyle: {
            elevation: 0,
            backgroundColor: colors.blue,
          },
          headerTitleStyle: { color: 'white', fontSize:18  },
         }}
         />
         <Stack.Screen
         name="Todo List"
         component={AssignSlide}
         options={{headerShown: true,
          headerShadowVisible: false, 
          headerTintColor:'#FFF',
         title: 'Todo List',
         headerTitleAlign: 'center',
          headerStyle: {
            elevation: 0,
            backgroundColor: colors.blue,
          },
          headerTitleStyle: { color: 'white', fontSize:18  },
         }}
         />

      </Stack.Navigator>
    </NavigationContainer>
  


     
  );


}
