import { KeyboardAvoidingView, TextInput, TouchableOpacity, Keyboard, ScrollView, Animated, Text, View } from 'react-native';
import ListTasks from './components/list-tasks';
import {useState, useCallback, useMemo, useRef} from "react";
import {StyleSheet} from 'react-native';
import WelcomeScreen from './screens/welcome';





export default function App() {



  return (
    
    <View style={styles.global}>
    <WelcomeScreen />
    <Text> HIIIIIIIIIi</Text>
    </View>
     
  );


}

const styles = StyleSheet.create({
  global: {
    flex: 1,
    backgroundColor: '#FFF',
  },

});