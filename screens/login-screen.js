import React,{useState} from 'react'
import { StyleSheet, Text, ScrollView,View,StatusBar,Image,TextInput, TouchableOpacity, FlatList} from 'react-native';
import TaskCard from '../components/doctorComponents/taskCard';
import taskdata from '../data';
import { AntDesign, Ionicons } from "@expo/vector-icons"; 
import colors from '../Colors';
import Fire from '../Fire';




const Login = ({navigation}) => {

    const [email,setEmail] = useState({});
    const [password,setPassword] = useState({});
    const [user, setUser] = useState({});
    const [personnels, setPersonnels] = useState([]);

     const navigateNavigation = () => {
        // Here how you open the bottom sheet right


      
        firebase = new Fire((error, user)=>{
                if(error){
                    return alert("Uh no, there is something went wrong");
                }
                firebase.getPersonnels(personnels=>{
                                
                        setPersonnels(personnels);
                         var newPers = personnels;
                });

                setUser(user);
                console.log(user.uid);

                console.log(personnels);
                var newPers = personnels.filter( function(el) { return el.nom === email } );
                var pers = newPers[0];
                console.log(pers);
                if(pers.profession === "Aide-Soignant"){
                    navigation.navigate("Todo List",{pers: pers, view: true});
                }
    
                
            });
    
    
                
        


        console.log(email + " | " + password);
        if(email.toLowerCase() === "admin" && password.toLowerCase() === "admin"){
            navigation.navigate("Main");
        } else {

        }
     }

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
                         onChangeText = {text => setEmail(text)}
                         placeholder="Nom d'utilisateur" 
                         placeholderTextColor="#818181" 
                        />
                    </View>
                    
                    <View style={styles.passwordInput} >
                    <Ionicons name="lock-closed-outline" size={18} color={"#818181"} />
                        <TextInput 
                        style={styles.input} 
                        onChangeText = {text => setPassword(text)}
                        placeholder="Mot de passe "  
                        placeholderTextColor="#818181" 
                        secureTextEntry={true}
                        />
                    </View>
                     <View>
                    <TouchableOpacity  activeOpacity={0.5} style={styles.buttonView} onPress={() => navigateNavigation() } >
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