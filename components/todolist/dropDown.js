/* eslint-disable no-undef */
import React, {useState, useEffect, useRef} from 'react';
import {View, Text, SafeAreaView, StatusBar, Dimensions, StyleSheet, ScrollView} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const {width} = Dimensions.get('window');
import SelectDropdown from 'react-native-select-dropdown';
import Colors from "../../Colors";
import Fire from "../../Fire";

export default Dropdown = (props) => {
  const [prof, setprof] = useState([]);
  const [spec, setspec] = useState([]);
  const [medSpec, setMedSpec] = useState([]);
  const specDropdownRef = useRef();
  var rafik ="";
  var rafika ="";
  var dis = true;
  
  useEffect(() => {
    setTimeout(() => {
      setprof([
        {title: 'Chirurgien', spec: [{title: 'Neurochirurgie'}, {title: 'Ophtalmologie'}, {title: 'Gynécologie'}, {title: 'Infantile'}, {title: 'Maxillo-faciale'}, {title: 'Vasculaire'}]},
        {title: 'Medecin', spec: [{title: 'Générale'}, {title: 'Cardiologue'}, {title: 'Dermatologie'}, , {title: 'Anesthésie'}, {title: 'Neurologie'}, {title: 'Ophtalmologie'}, {title: 'Gastrologie'}, {title: 'Gynécologie'}, {title: 'Psychiatrie'}, {title: 'ORL'}, {title: 'Pédiatrie'}, {title: 'Urologie'}]},
        {title: 'Infirmier', spec: [{title: 'Soins infirmiers généralistes'}, {title: 'Infirmier Anesthésiste'}, {title: 'Infirmière de Bloc Opératoire'}, {title: 'Infirmier Puéricultrice'}]},
        {title: 'Aide-Soignant',spec:[{}]}
    ]);
    }, 1000);
  }, []);

const handleProfession = () => {
    var prof = rafik;
    props.onProfessionChange(prof);            
};

const handleSpeciality =()=> {
    var spec = rafika;
    props.onSpecialityChange(spec);

};








  return (

    <SafeAreaView>
      <View >
        <ScrollView
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}
          contentContainerStyle={styles.scrollViewContainer}>
          <View style={styles.container}>
            <View style={{marginTop: 4, marginBottom : 4, }} >
            <SelectDropdown
              style={{marginTop: 8, }}
              data={prof}
              onSelect={(selectedItem, index) => {
                rafik = selectedItem.title;
                dis = false;
               handleProfession();
                specDropdownRef.current.reset();
                setspec([]);
                setspec(selectedItem.spec);
              }}
              defaultButtonText={"Select a profession"}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.title;
              }}
              rowTextForSelection={(item, index) => {
                return item.title;
              }}
              buttonStyle={styles.input}
              buttonTextStyle={styles.dropdown1BtnTxtStyle}
              renderDropdownIcon={isOpened => {
                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#C0C0C0'} size={18} />;
              }}
              dropdownIconPosition={'right'}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={styles.dropdown1RowTxtStyle}
            />
            </View>
            <View style={{marginTop: 4, marginBottom : 4, }} >
            <SelectDropdown
              ref={specDropdownRef}
              data={spec}
              disabled ={!dis}
                 onSelect={(selectedItem, index) => {
                rafika = selectedItem.title;
                //console.log(selectedItem.title);
                handleSpeciality();
                
              }}
              defaultButtonText={'Select a medical specialty'}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.title;
              }}
              rowTextForSelection={(item, index) => {
                return item.title;
              }}
              buttonStyle={styles.input}
              buttonTextStyle={styles.dropdown2BtnTxtStyle}
              renderDropdownIcon={isOpened => {
                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#C0C0C0'} size={18} />;
              }}
              dropdownIconPosition={'right'}
              dropdownStyle={styles.dropdown2DropdownStyle}
              rowStyle={styles.dropdown2RowStyle}
              rowTextStyle={styles.dropdown2RowTxtStyle}
            />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  
  scrollViewContainer: {
    backgroundColor:"#FFF",
    justifyContent: 'space-between',
    alignItems: 'center',
    
  },
  input:{
    paddingVertical: 0,
    paddingLeft:20,
    paddingRight: 5,
    backgroundColor: '#f8f4f4',
    borderRadius:15,
    borderColor: '#f8f4f4',
    borderWidth: 1,
    marginVertical:10,
    height:65, 
    width: 330,

},

  dropdown1BtnStyle: {
    width: 329,
    backgroundColor: '#FFF',
    borderRadius: 6,
    
  },
  dropdown1BtnTxtStyle: {color: Colors.black, textAlign: 'left', fontSize: 14},
  dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: Colors.gray, borderRaduis: 8,},
  dropdown1RowTxtStyle: {color: Colors.black, textAlign: 'left'},
  divider: {width: 12},
  dropdown2BtnStyle: {
    width: 329,
    backgroundColor: '#FFF',
    borderRadius: 6,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.blue,
    
  },
  dropdown2BtnTxtStyle: {color: Colors.black, textAlign: 'left', fontSize: 14},
  dropdown2DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown2RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown2RowTxtStyle: {color: '#444', textAlign: 'left'},

});