import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig ={
    apiKey: "AIzaSyA1qtBgLpLt_IVqUY8eH8kFCoNyPv6Fcvk",
    authDomain: "mymobileapplication-4fe1b.firebaseapp.com",
    projectId: "mymobileapplication-4fe1b",
    storageBucket: "mymobileapplication-4fe1b.appspot.com",
    messagingSenderId: "47625760454",
    appId: "1:47625760454:web:0569e4a261ca9b1be731c7"
};

class Fire{
    constructor(callback){
        this.init(callback);  
    }

    init(callback){
        if(!firebase.apps.length){
            firebase.initializeApp(firebaseConfig);
        }
        
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                callback(null, user);
            } else {
                firebase
                    .auth()
                    .signInAnonymously()
                    .catch(error=>{
                        callback(error)
                    });
            }
        
        });
    }

    getLists(callback){
        let ref = firebase 
            .firestore()
            .collection("users")
            .doc(this.userId)
            .collection("lists");
        this.unsubscribe = ref.onSnapshot(snapshot => {
            lists = [];
            
            

            snapshot.forEach(doc => {
                console.log("here we GOOOOOOO");
                lists.push({ id: doc.id, ...doc.data() });
                
            });
            callback(lists);
        });
    }
    
    get userId(){
        return firebase.auth().currentUser.uid;
    }

}

export default Fire;