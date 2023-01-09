import React,{useState} from 'react'
import { StyleSheet, Text, ScrollView,View,StatusBar,Image,TextInput, TouchableOpacity, Dimensions, FlatList, Modal, Animated, Keyboard } from 'react-native';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';
import {AntDesign, Ionicons} from '@expo/vector-icons';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import PatientInfoSlide from '../screens/patientInfo-slide';
import colors from '../Colors';
import Fire from '../Fire';



export default class AssignSlide extends React.Component {
        
     

    state={
        selectedDate: moment(new Date()).format('DD-MM-YYYY'),
        showListVisible:false,
        consultations :[],
        filteredCons :[],
        user: {},
        loading: true,
        lists:[],
        persDateList:[],
        newTodo:'',
    }

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
      } 


      componentDidMount(){
        
        this.getLists();
        var test = this.props.pers.id.toString();
        firebase = new Fire((error, user)=>{
            if(error){
                return alert("Uh no, there is something went wrong");
            }
            firebase.getConsultations(consultations=>{
                            
                this.setState({consultations, user}, () => {
                    this.setState({loading:false});
                    var newCons = this.state.consultations.filter( function(el) { return el.doctorID === test } );
                    this.setState({ consultations : newCons });
                });
            });

            

            this.setState({user});

            this.setState({user});
            console.log(user.uid);
        });


            
      }


      onDateSelected = date => {
        
        var formatedDate = moment(date).format('DD-MM-YYYY').toString(); 
        var id = this.props.pers.id;
        //console.log(this.state.lists);
        var list = this.state.lists.filter( function(el){ return (el.persID === id && el.date === formatedDate) })[0];
       
        if(list === undefined){
            this.addList(formatedDate);
            this.setState({persDateList:{persID: this.props.pers.id, date : formatedDate, todos: [] }}) ;
        }
        else{
           
            
        this.setState({persDateList:list});
        }



    }
    addList = date =>{
        this.setState({persDateList:{ persID: this.props.pers.id, date : date, todos: [] }});
        firebase = new Fire((error, user)=>{
            if(error){
                return alert("Uh no, there is something went wrong");
            }

            firebase.addList({
                persID: this.props.pers.id,
                date : date,
                todos: []
            });
            firebase.getLists(lists=>{
                this.setState({lists, user}, () => {
                    this.setState({loading:false});
                    var id = this.props.pers.id;
                    //var myLists = lists.filter( function(el) { return el.date === "19-01-2023"  } );
                    //console.log(myLists);
                    this.setState({ lists : lists });
                    var ok = lists.filter( function(el){ return (el.persID === id && el.date === date) })[0];
                    console.log("la mo2akhda");
                    console.log(ok);
                    this.setState({persDateList:ok});
                    console.log("end la mo2akhda");
                    this.setState({ lists : lists });
                    
                });
            });

            this.componentDidMount();
        });
        
     }
     updateList = list => {
        
        firebase.updateList(list);
    };
     getLists(){
        firebase = new Fire((error, user)=>{
            if(error){
                return alert("Uh no, there is something went wrong");
            }
            firebase.getLists(lists=>{
                this.setState({lists, user}, () => {
                    this.setState({loading:false});
                    var id = this.props.pers.id;
                    //var myLists = lists.filter( function(el) { return el.date === "19-01-2023"  } );
                    //console.log(myLists);
                    this.setState({ lists : lists });

                    
                    
                });
            });
        });
        


            
    }
    toggleTodoCompleted = index =>{
        let list = this.state.persDateList;
        //console.log(list);
        list.todos[index].completed = !list.todos[index].completed;
        this.updateList(list);
    };
 
        


    toggleListModal(){
        this.setState({showListVisible: !this.state.showListVisible})
    }
    toggleAddPersonnelModel(){
        this.setState({addPersonnelVisible: !this.state.addPersonnelVisible});
    }

    renderTodo = (todo, index) =>{
        
        return(
            
            <GestureHandlerRootView style={{marginVertical:3}}>
            <Swipeable renderRightActions={(_, dragX) => this.rightActions(dragX, index)}>
            <View style={styles.todoContainer}>
                <TouchableOpacity onPress={()=>this.toggleTodoCompleted(index)}>
                    <Ionicons name= {todo.completed? "checkbox-outline":"ios-square-outline"}  size={24} color={todo.completed? colors.gray:colors.gray} style={{width:32}} />
                </TouchableOpacity>
                <Text style={[styles.todo, { textDecorationLine: todo.completed? 'line-through': 'none', color: todo.completed ? colors.gray:colors.black} ]}>{todo.title}</Text>
            </View>
            </Swipeable>
            </GestureHandlerRootView>
        
        )
    };


    rightActions = (dragX, index) => {
        const scale =  dragX.interpolate({
            inputRange:[-100,0],
            outputRange:[1, 0.9],
            extrapolate: "clamp"
        });
        const opacity = dragX.interpolate({
            inputRange:[-100, -20, 0],
            outputRange:[1, 0.8,0],
            extrapolate:"clamp"
        });
        return(

            <TouchableOpacity onPress={()=>this.deleteTodo(index)}>
                <Animated.View style={[styles.deleteButton, {opacity: opacity}]} >
                    <Animated.Text style={{color:colors.white, fontWeight:"800", transform:[{scale}]}}>
                        <Ionicons name="ios-trash" size={35} color={colors.red} />
                    </Animated.Text>
                </Animated.View>
            </TouchableOpacity>
        )
    }
    deleteTodo= index =>{
        let list = this.state.persDateList;
        list.todos.splice(index,1);
        this.updateList(list);
    }

    addTodo=()=>{
        this.getLists();
        this.getLists();
        let list = this.state.persDateList;
        if(!list.todos.some(todo => todo.title.toLowerCase() === this.state.newTodo.toLowerCase()) && this.state.newTodo!==''  ) {
            
            list.todos.push({title: this.state.newTodo, completed: false});
            this.updateList(list);
            
        }

        this.setState({newTodo:""});

        Keyboard.dismiss();
    };

    



    render(){ 
        const persDateList = this.state.persDateList;
        //console.log(persDateList.todos);
          
        return (
            <View style={styles.container}>
                <StatusBar barStyle="dark-content" backgroundColor="#fff" />   
                <Modal animationType="slide" visible={this.state.showListVisible} onRequestClose={()=>this.toggleListModal()}>
                    <PatientInfoSlide closePrevModal={()=>this.props.closeModal()} closeModal={() => this.toggleAddPersonnelModel()} pers={this.props.pers} slot={this.state.pressedSlot} date={this.state.selectedDate}  closeModal={()=>this.toggleListModal()} />
                </Modal>
                <TouchableOpacity style={{position:'absolute', top:32, right:32, zIndex: 10 }} onPress={this.props.closeModal}>
                        <AntDesign  name="close" size={24} color={colors.black} />
                </TouchableOpacity>

                <View style={{ paddingVertical:30, paddingHorizontal:10, backgroundColor:'#FFF', alignItems:'center', height:160,  paddingTop:50, flexDirection:'row',  borderBottomLeftRadius:40, borderBottomRightRadius:40 }}>
                    <View style={{alignItems:'flex-end', paddingRight:10}} >
                        <Image style={{width:80, height:80, borderRadius:25,  }} source={require('../assets/doctor-female.jpg')}  />
                    </View>
                    <View style={{flexDirection:'column'}}>
                        <Text style={styles.persName}>{this.props.pers.profession} </Text>
                        <Text style={styles.persSpec}>{this.props.pers.nom}</Text>
                    </View>
                </View>
                <View style={{backgroundColor:'#f8f4f4',flex:1,  paddingVertical:20 }}>
                    <View style={{marginHorizontal:20, marginBottom:10}}>
                        <Text style={{fontWeight:'500', fontSize:18}} >Appointment Calendar</Text>
                    </View>
                    <View style={{ }}>
                    <CalendarStrip
                        scrollable
                        ref={this.myRef}
                        daySelectionAnimation={{
                            type:'background',
                            highlightColor:colors.blue,
                            borderWidth:1,
                            borderHighlightColor:colors.blue,
                        }}
                        style={{height:80, paddingTop:10, paddingBottom:10, }}
                        calendarHeaderStyle={{color:'#000'}}
                        calendarColor={'#FFF'}
                        dateNameStyle={{color:'#000'}}
                        dateNumberStyle={{color:'#000'}}
                        highlightDateNameStyle={{color:'#FFF'}}
                        highlightDateNumberStyle={{color:'#FFF'}}
                        onDateSelected={async date => this.onDateSelected(date)}
                        iconContainer={{flex:0.1}}
                        />
                    </View>


                    <View style={{flex:1, }}>
                    <View style={{marginHorizontal:20, }}>
                        <Text style={{fontWeight:'500', fontSize:18, paddingVertical:10, }} >Tasks</Text>
                    </View>
                    <View style={{flex:1, }}>
                        <View style={{}}>    
                            <FlatList data={persDateList.todos} 
                            renderItem={({item, index})=> this.renderTodo(item, index) } 
                            keyExtractor={(_, index) => index.toString()}
                            showsVerticalScrollIndicator={false}
                            />
                        </View>
                        </View>
                        
                    </View>
                    
                    
                </View>
                
                

                <View style={[styles.section, styles.footer]} >
                        <TextInput  style={styles.input} list placeholder={'Write a task'}  onChangeText = {text => this.setState({newTodo : text})} value={this.state.newTodo} />
                        <TouchableOpacity style={[styles.addTodo, {backgroundColor:colors.blue}]} onPress={()=>this.addTodo()} >
                            <AntDesign name="plus" size={16} color={colors.white} />
                        </TouchableOpacity>
                        <Text></Text>
                    </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f4f4',
      },
      persName:{
            
            fontSize: 18,
            fontWeight: '400',
      },
      persSpec:{
        fontSize: 18,
        fontWeight:'500',
      },
      section:{
        paddingTop:16,
        alignSelf: "stretch"

    },
    footer:{
            paddingHorizontal:16,
            flexDirection: "row",
            alignItems:"center",
            paddingVertical: 16

        },
    input:{
            height : 50,
            flex:1,
            borderRadius: 15,
            marginRight: 8,
            paddingHorizontal: 18,
            borderRadius:10, 
            borderWidth: 1,
            backgroundColor:'#FFF',
            borderColor:'#FFF',
        },
    addTodo:{ 
            height:50,
            width: 50,
            alignItems:"center",
            justifyContent: 'center',
            borderRadius: 10,
        },

        todoContainer:{
            backgroundColor: '#FFF',
            padding: 15,
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical:16,
            marginLeft:16,
            marginRight:16,
            borderColor:colors.white,
            borderWidth: 0,
            paddingLeft:16,
        },
        todo:{
            
            color:colors.black,
            fontWeight: "500",
            fontSize: 16,
        },
        deleteButton:{
            flex:1,
            justifyContent:"center",
            alignItems:"center",
            width: 50,
            borderRadius: 10,
            marginLeft : -8,
            
        }


})