import React,{useState} from 'react'
import { StyleSheet, Text, ScrollView,View,StatusBar,Image,TextInput, TouchableOpacity, FlatList} from 'react-native';
import TaskCard from '../components/doctorComponents/taskCard';
import taskdata from '../data';
import { AntDesign, Ionicons } from "@expo/vector-icons"; 
import colors from '../Colors';




const Login = ({navigation}) => {

    const [formData,setformData] = useState({
        email:'',
        password:''
    })

    return (
        <View style={{backgroundColor:'#fff', flex:1,flexDirection:'column',alignItems:'center',justifyContent:'center', paddingHorizontal:10 }}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            {/* login form section */}

           
            
            <View style={{ }}>
                <Text style={{fontSize:30,color:'#000', fontWeight: 'bold', alignItems:'flex-start', marginBottom:10,   marginLeft:-90 }} > Bienvenue </Text>
                <Text style={{fontSize:18, fontWeight:'300',color:colors.lightGray,  marginBottom:20,  marginLeft:-90  }} > Connectez-vous à votre compte </Text>
            </View>

            <View style={{backgroundColor:'#fff'}} >
            
                  
                    <View style={styles.emailInput} >
                    <Ionicons name="person-outline" size={18} color={"#818181"} />
                        <TextInput 
                         style={styles.input} 
                         placeholder="Nom d'utilisateur" 
                         placeholderTextColor="#818181" 
                        />
                    </View>
                    
                    <View style={styles.passwordInput} >
                    <Ionicons name="lock-closed-outline" size={18} color={"#818181"} />
                        <TextInput 
                        style={styles.input} 
                        placeholder="Mot de passe "  
                        placeholderTextColor="#818181" 
                        secureTextEntry={true}
                        />
                    </View>
                     <View>
                    <TouchableOpacity  activeOpacity={0.5} style={styles.buttonView} onPress={() => navigation.navigate("Main") } >
                            <Text style={styles.buttonText}>Se connecter </Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                    
                    
           
        
            
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    input:{
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
        width:'100%',
        marginTop:20,

        justifyContent: 'center',
        alignItems: 'center',
       backgroundColor: colors.newBlue,
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