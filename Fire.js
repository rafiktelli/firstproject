import firebase from 'firebase';


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
            firebase.firestore().settings({ experimentalForceLongPolling: true }); //add this..

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
    // LISTS ---------------------------------------------
    getLists(callback){
        let ref = this.ref;

        this.unsubscribe = ref.onSnapshot(snapshot => {
            lists = [];
            
            

            snapshot.forEach(doc => {
                lists.push({ id: doc.id, ...doc.data() });
                
            });
            callback(lists);
        });
    }

    addList(list){
        let ref = this.ref;

        ref.add(list);
    }

    updateList(list){
        let ref = this.ref;
        ref.doc(list.id).update(list);
    }
    

    // PERSONNEL ---------------------------------
    getPersonnels(callback){
        let ref = this.refPers.orderBy("profession", 'desc');

        this.unsubscribe = ref.onSnapshot(snapshot => {
            personnels = [];

            snapshot.forEach(doc => {
                personnels.push({ id: doc.id, ...doc.data() });
                
            });
            callback(personnels);
        });
    }

    getConsultations(callback){
        let ref = this.refCons;
        this.unsubscribe = ref.onSnapshot(snapshot => {
            consultations = [];

            snapshot.forEach(doc => {
                consultations.push({ id: doc.id, ...doc.data() });
                
            });
            callback(consultations);
        });

    }

    


    addPersonnel(personnel){
        let refPers = this.refPers;
        refPers.add(personnel);
    }

    addConsultation(consultation){
        let refCons = this.refCons;
        refCons.add(consultation);
    }
    
    // {REQUESTS} ------------------------------

    get userId(){
        return firebase.auth().currentUser.uid;
    }

    get ref(){
        return firebase 
            .firestore()
            .collection("users")
            .doc(this.userId)
            .collection("tasks");
    }
    get refPers(){
        return firebase 
            .firestore()
            .collection("users")
            .doc(this.userId)
            .collection("personnels");
    }
    get refCons(){
        return firebase  
            .firestore()
            .collection("users")
            .doc(this.userId)
            .collection("consultations");
    }

    detach(){
        this.unsubscribe();
    }

}

export default Fire;