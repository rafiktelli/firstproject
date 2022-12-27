import React,{useState} from 'react'
import { StyleSheet, Text, ScrollView,View,StatusBar,Image,TextInput, TouchableOpacity } from 'react-native'




const Login = ({navigation}) => {

    const [formData,setformData] = useState({
        email:'',
        password:''
    })

    return (
        <ScrollView style={{flex:1, backgroundColor:'#fff',flexDirection:'column'}}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            {/* login form section */}
            
            <View style={{height:150, alignItems:'center', justifyContent:'center'}}>
                <Text style={{fontSize:30,color:'#000', fontWeight: 'bold' }} >Login </Text>
            </View>

            <View style={{flex:1,flexDirection:'column',backgroundColor:'#fff',paddingTop:30, paddingBottom:20, paddingHorizontal:'3%'}} >
            
                  
                    <View style={styles.emailInput} >
                        <TextInput 
                         style={styles.input} 
                         placeholder="Enter Email" 
                         placeholderTextColor="#818181" 
                        />
                    </View>
                    
                    <View style={styles.passwordInput} >
                        <TextInput 
                        style={styles.input} 
                        placeholder="Enter Password"  
                        placeholderTextColor="#818181" 
                        secureTextEntry={true}
                        />
                    </View>
                     
                    
                    </View>
                    <View style={{justifyContent:'center', alignItems:'center'}}>
                        <TouchableOpacity  activeOpacity={0.5} style={styles.buttonView} onPress={() => navigation.navigate("Tasks") } >
                            <Text style={styles.buttonText}>Login </Text>
                        </TouchableOpacity>
                    </View>  
           
        

            
        </ScrollView>
    )
}

export default Login

const styles = StyleSheet.create({
    input:{
        position:'relative',
        height:'100%',
        width:'90%',
        paddingLeft:20,
    },
    passwordInput:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#ededed',
        width:'95%',
        borderRadius:10,
        height:60,
        paddingLeft:20,
        marginTop:20,
    },
    emailInput:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#ededed',
        width:'95%',
        borderRadius:10,
        height:60,
        paddingLeft:20,
    },
    buttonView: {
        width:150,
        justifyContent: 'center',
        alignItems: 'center',
       backgroundColor: 'navy',
        borderRadius: 5,
        paddingVertical: 12, 
        paddingHorizontal: 32,
        borderRadius: 5,
        
        },
        buttonText: {
            fontSize: 16, 
            fontWeight: 'bold', 
            color: 'white',
          },

})