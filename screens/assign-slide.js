import React,{useState} from 'react'
import { StyleSheet, Text, ScrollView,View,StatusBar,Image,TextInput, TouchableOpacity, Dimensions, FlatList, Modal, Animated, Keyboard } from 'react-native';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';
import {AntDesign, Ionicons} from '@expo/vector-icons';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import colors from '../Colors';
import Fire from '../Fire';
import PatientInfoSlide from './patientInfo-slide';
import parseErrorStack from 'react-native/Libraries/Core/Devtools/parseErrorStack';
import RBSheet from "react-native-raw-bottom-sheet";



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
        persLists:[],
        toggleAddTodo: true,
        dateClicked : false,
    }

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
      } 
    
    seDeconnecter(){
        this.props.navigation.navigate("Login"); 
    }

    componentWillUnmount(){
        firebase.detach();
    }
    componentDidMount(){
        firebase = new Fire((error, user)=>{
            if(error){
                return alert("Uh no, there is something went wrong");
            }            
            firebase.getLists(lists=>{
                
                this.setState({lists, user}, () => {
                    this.setState({loading:false});
                    //this.state.filtered = this.state.doctors;
                   // this.state.spec = Array.from(new Set(this.state.filtered.map(a => a.speciality)));

                   var idx = this.props.route.params.pers.id;
            var persLists = lists.filter( function(el){ return (el.persID === idx ) });
            this.setState({ persLists: persLists }, () => {
            

                });
                
            this.setState({user});
            
            });
            
              });
            
        });
    }


            



      onDateSelected = date => {
        this.setState({'dateClicked': true})
        var formatedDate = moment(date).format('DD-MM-YYYY').toString(); 
        var list = [];
        var list1 ={};
        list = this.state.persLists.filter( function(el){ return (el.date === formatedDate) });
        list1 = list[0];
        if(list.length === 0 ){
            this.addList(formatedDate);
        }
        else{
            this.setState({ persDateList: list1 }, () => {
              });

        }

        this.toggleAdd(date);

    }

    toggleAdd = date=>{
        if(moment(date).format('DD-MM-YYYY') < moment().format('DD-MM-YYYY')){
            this.setState({toggleAddTodo: false})
        } else {
            this.setState({toggleAddTodo: true})
        }
    }

    datesBlacklistFunc = date => {
        return date.isoWeekday() === 7; // disable Saturdays
    }

    addList = date =>{
        this.setState({persDateList:[]});
        var id = this.props.route.params.pers.id;
        firebase = new Fire((error, user)=>{
            // if(error){ return alert("Uh no, there is something went wrong"); }
          
            firebase.addList({ persID: id, date : date, todos: []});    
        });
        var list = this.state.persLists.filter( function(el){ return (el.date === date) });
        var list1 = list[0];
        this.setState({ persDateList: list }, () => {
          });
        


          var idx = this.props.route.params.pers.id;
          var persLists = lists.filter( function(el){ return (el.persID === idx ) });
          this.setState({ persLists: persLists }, () => {
            });
        

            firebase = new Fire((error, user)=>{
                if(error){
                    return alert("Uh no, there is something went wrong");
                }       

            firebase.getLists(lists=>{
                this.setState({lists, user}, () => {
                    this.setState({loading:false});
                    //this.state.filtered = this.state.doctors;
                   // this.state.spec = Array.from(new Set(this.state.filtered.map(a => a.speciality)));
                    this.componentWillUnmount();
            
              });

     
              var idx = this.props.route.params.pers.id;
              var list = lists.filter( function(el){ return (el.persID === idx && el.date === date ) });
  
              this.setState({ persDateList: list[0] }, () => {
                  console.log('we are inside the addList');
                  console.log(list[0]);
              });
     
     
     
     
     
     
        }
        )})
    }
     updateList = list => {
        
        firebase.updateList(list);
    };
     
    toggleTodoCompleted = index =>{
        let list = this.state.persDateList;
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
            
            <GestureHandlerRootView style={{marginVertical:3,}}>
            <Swipeable  renderRightActions={(_, dragX) => this.rightActions(dragX, index)} >
            <View style={styles.todoContainer}>
                <TouchableOpacity style={{display: this.props.route.params.view ? 'flex':'none' }} onPress={()=>this.toggleTodoCompleted(index)}>
                    <Ionicons name= {todo.completed? "checkbox-outline":"ios-square-outline"}  size={24} color={todo.completed? colors.gray:colors.gray} style={{width:32}} />
                </TouchableOpacity>
                <Text style={[styles.todo, { textDecorationLine: todo.completed? 'line-through': 'none', color: todo.completed ? colors.gray:colors.black} ]}>{todo.title}</Text>
            </View>
            </Swipeable>
            </GestureHandlerRootView>
        
        )
    };


    rightActions = (dragX, index) => {
        if (this.props.route.params.view){
        return <View />;
        }
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
        //this.getLists();
        //this.getLists();
        let list = this.state.persDateList;

        if(!list.todos.some(todo => todo.title.toLowerCase() === this.state.newTodo.toLowerCase()) && this.state.newTodo!==''  ) {
            
            list.todos.push({title: this.state.newTodo, completed: false});
            this.updateList(list);
            
        }

        this.setState({newTodo:""});

        Keyboard.dismiss();
    };

    



    render(){ 
        
        


        var completedCount = 0;
        var taskCount = 0;
        var persDateList = this.state.persDateList;
        if(persDateList.todos !== undefined){
            var alist = persDateList;
            taskCount = alist.todos.length;
            completedCount = alist.todos.filter(todo => todo.completed).length;
        }
        
       return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor={colors.blue} />   
                <Modal animationType="slide" visible={this.state.showListVisible} onRequestClose={()=>this.toggleListModal()}>
                    <PatientInfoSlide closePrevModal={()=>this.props.closeModal()} closeModal={() => this.toggleAddPersonnelModel()} pers={this.props.route.params.pers} slot={this.state.pressedSlot} date={this.state.selectedDate}  closeModal={()=>this.toggleListModal()} />
                </Modal>



                <RBSheet ref={ref => { this.RBSheet = ref;}} height={70} openDuration={150} >
                <TouchableOpacity style={{flexDirection:'row',  paddingHorizontal:10, paddingVertical:20,}} onPress={()=>this.seDeconnecter() }>
                    <Ionicons name="log-out-outline" size={24} color={colors.red} />
                    <Text style={{color:colors.red, fontSize:18, fontWeight:'400', }}>  Se déconnecter</Text>
                </TouchableOpacity>
                </RBSheet>




                <View style={{ paddingVertical:30, paddingHorizontal:10, backgroundColor: colors.blue, alignItems:'center', height:130,   flexDirection:'row',  borderBottomLeftRadius:30, borderBottomRightRadius:30 }}>
                    <View style={{alignItems:'flex-end', paddingLeft:10, paddingRight:20}} >
                    <TouchableOpacity onPress={() => this.RBSheet.open()}>
                        <Image style={{width:80, height:80, borderRadius:25,  }} source={require('../assets/doctor-male.jpg')}  />
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection:'column'}}>
                        <Text style={styles.persName}>{this.props.route.params.pers.nom} </Text>
                        <Text style={styles.persSpec}>{this.props.route.params.pers.profession}</Text>
                    </View>
                </View>
                <View style={{backgroundColor:'#f8f4f4',flex:1,  paddingVertical:20 }}>
                    <View style={{marginHorizontal:20, marginBottom:10}}>
                        <Text style={{fontWeight:'500', fontSize:18}} >Calendrier</Text>
                    </View>
                    <View style={{ }}>
                    <CalendarStrip
                        scrollable = {true}
                        scrollerPaging = {true}
                        ref={this.myRef}
                        daySelectionAnimation={{
                            type:'background',
                            highlightColor:colors.blue,
                            borderWidth:1,
                            borderHighlightColor:colors.blue,
                            borderRadius:50, 
                            
                            
                        }}
                        style={{height:95, paddingVertical:0,  }}
                        innerStyle={{  }}
                        dayComponentHeight={60}
                        
                        dayContainerStyle={{borderRadius:10,  paddingVertical:10  }}
                        calendarHeaderContainerStyle={{}}
                        
                        calendarHeaderStyle={{color:'#000', paddingBottom:20, paddingTop:5, }}
                        calendarColor={'#FFF'}
                        dateNameStyle={{color:'#000', paddingBottom:10, fontSize:10, fontWeight:'600'}}
                        dateNumberStyle={{}}
                        highlightDateNameStyle={{color:'#FFF', paddingBottom:10, fontSize:10 , fontWeight:'600' }}
                        highlightDateNumberStyle={{color:'#FFF', }}
                        disabledDateNameStyle={{ paddingBottom:10, fontSize:10}}
                        datesBlacklist={this.datesBlacklistFunc}
                        onDateSelected={async date => this.onDateSelected(date)}
                        iconContainer={{flex:0.1}}
                        
                    />
                    </View>


                    <View style={{flex:1, }}>
                    <View style={{marginHorizontal:20, flexDirection:'row' }}>
                        <Text style={{fontWeight:'500', fontSize:18, paddingVertical:10, }} >Liste des tâches</Text>
                        <Text style={{ display: taskCount === undefined || taskCount===0  ? 'none':'flex' , fontWeight:'500', fontSize:18, paddingVertical:10, }} >( {completedCount}/{taskCount} ) </Text>
                        
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
                
               
                <View style={[styles.section, styles.footer, {display: this.props.route.params.view ? 'none':'flex'}  ]}  >
                        <TextInput  style={[styles.input, { display: (this.state.toggleAddTodo && this.state.dateClicked) ? 'flex':'none' }]} list placeholder={'Ajouter une tâche'}  onChangeText = {text => this.setState({newTodo : text})} value={this.state.newTodo} />
                        <TouchableOpacity style={[styles.addTodo, {backgroundColor:colors.blue, display: (this.state.toggleAddTodo && this.state.dateClicked) ? 'flex':'none' }]} onPress={()=>this.addTodo()} >
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
        paddingTop: 10,
        fontSize: 18,
        fontWeight: '500',
        color: colors.white,
  },
  persSpec:{
    color:colors.lightGray,
    paddingTop: 5,
    fontSize: 18,
    fontWeight: '400',
    
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
            paddingRight:40,
            marginLeft:16,
            marginRight:16,
            borderColor:colors.white,
            borderWidth: 0,
            paddingLeft:16,
        },
        todo:{
            
            color:colors.black,
            fontWeight: "400",
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