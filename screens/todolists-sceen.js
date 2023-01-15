import React from 'react';
import {StyleSheet, Text, View, FlatList, Modal,TouchableOpacity, ActivityIndicator} from "react-native";
import colors from "../Colors";
import {AntDesign} from "@expo/vector-icons";
import TodoListSummary from '../components/todolist/todoList-summary';
import AddListSlide from './addList-slide';
import Fire from '../Fire';


export default class TodoListsScreen extends React.Component{
    state = {
        addTodoVisible: false,
        lists: [],
        personnels: [],
        user: {},
        loading: true
    };

    componentDidMount(){
        firebase = new Fire((error, user)=>{
            if(error){
                return alert("Uh no, there is something went wrong");
            }
            firebase.getLists(lists=>{
                this.setState({lists, user}, () => {
                    this.setState({loading:false});
                });
            });
            
            firebase.getPersonnels(personnels=>{
                this.setState({personnels, user}, () => {
                    this.setState({loading:false});
                });
            });


            this.setState({user});
            console.log(user.uid);
        });
    }

    componentWillUnmount(){
        firebase.detach();
    }
    toggleAddTodoModal(){
        this.setState({addTodoVisible: !this.state.addTodoVisible});
    }

   

    renderList = list =>{
        return <TodoListSummary list={list} updateList={this.updateList} />;
    }
    addList = list => {
       // this.setState({lists: [...this.state.lists, {...list, id: this.state.lists.length + 1, todos: [] }] })
       firebase.addList({
           name: list.name,
           color: list.color,
           todos: []
       });
    }
    addPersonnel = personnel =>{
        firebase.addPersonnel({
            nom: personnel.nom,
            profession: personnel.profession,
            speciality: personnel.speciality,
            naissance: personnel.naissance
        });
    }; 
    updateList = list => {
        
        firebase.updateList(list);
    };

    render(){

        if(this.state.laoding){
            return(
                <View style={style.container}>
                    <ActivityIndicator size="large" color={colors.blue} />
                </View>
            );
        }



        return(
            <View style={styles.container}>
                <Modal animationType="slide" visible={this.state.addTodoVisible} onRequestClose ={()=>this.toggleAddTodoModal()}>
                    <AddListSlide closeModal={() => this.toggleAddTodoModal()} addList={this.addList} />
                </Modal>
                
                <View>
                    <Text>User:{this.state.user.uid}</Text>
                </View>

                <View style={{flexDirection:'row'}} >
                    <View style={styles.divider} />
                        <Text style={styles.title}>
                            Todo <Text style={{fontWeight: "300", color: colors.blue }}>Lists</Text>
                        </Text>
                        <View style={styles.divider} />
                </View>
                <View style={{marginVertical:48}}>
                    <TouchableOpacity style={styles.addList} onPress ={()=> this.toggleAddTodoModal()}>
                        <AntDesign name="plus" size={16} color={colors.blue} />
                    </TouchableOpacity>
                    <Text style={styles.add}> Add List </Text>

                    <TouchableOpacity style={styles.addList} onPress ={()=> this.toggleAddPersonnelModel()}>
                        <AntDesign name="plus" size={16} color={colors.blue} />
                    </TouchableOpacity>
                    <Text style={styles.add}> Add Personnel </Text>
                </View>
                
                <View style={{height:275, paddingLeft: 32}}>
                    <FlatList data={this.state.lists} 
                    keyExtractor={item => item.id.toString()} 
                    horizontal={true} 
                    showsHorizontalScrollIndicator={false} 
                    renderItem={ ({item})  => this.renderList(item)}
                    keyboardShouldPersistTaps= "always"
                     />
                </View>
            </View> 

        );
    }
}

const styles =StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#fff",
        alignItems:"center",
        justifyContent:"center",
    },
    divider:{
        backgroundColor: colors.lightBlue,
        height: 1,
        flex: 1,
        alignSelf:"center",
    },
    title:{
        fontSize:38,
        fontWeight: "800",
        color: colors.black,
        paddingHorizontal:64,
    },
    addList:{
        borderWidth:2,
        borderColor: colors.lightBlue,
        borderRadius:4,
        padding: 16,
        width:56,
        alignContent:'center',
        justifyContent:'center',
    },
    add:{
        color: colors.blue,
        fontWeight:"800",
        fontSize: 14,
        marginTop:8
    },



});