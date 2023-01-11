/* eslint-disable no-undef */
import React, {useState, useEffect, useRef} from 'react';
import {View, Text, SafeAreaView, StatusBar, Dimensions, StyleSheet, ScrollView} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const {width} = Dimensions.get('window');
import SelectDropdown from 'react-native-select-dropdown';
import Colors from "../../Colors";
import Fire from "../../Fire";

export default Dropdown = (props) => {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [medSpec, setMedSpec] = useState([]);
  const citiesDropdownRef = useRef();
  var rafik ="";
  var rafika ="";
  useEffect(() => {
    setTimeout(() => {
      setCountries([
        {title: 'Chirurgien', cities: [{title: 'Chirurgien général'}, {title: 'Chirurgien cardio-vasculaire'}, {title: 'Chirurgien urologue'}, {title: 'Chirurgien  infantile'}, {title: 'Neurochirurgien'}]},
        {title: 'Medecin', cities: [{title: 'Générale'}, {title: 'Dermatologie'}, , {title: 'Anesthésie'}, {title: 'Neurologie'}, {title: 'Ophtalmologie'}, {title: 'Gastro-entérologie'}, {title: 'Gynécologie'}, {title: 'Psychiatrie'}, {title: 'Oto-rhino-laryngologie'}, {title: 'Pédiatrie'}]},
        {title: 'Infirmier', cities: [{title: 'Soins infirmiers généralistes'}, {title: 'Infirmier Anesthésiste'}, {title: 'Infirmière de Bloc Opératoire'}, {title: 'Infirmier Puéricultrice'}]},
        {title: 'Aide-Soignant',cities:[{}]}
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
      <StatusBar backgroundColor="#FFF" barStyle="dark-content" />
      <View >
        <ScrollView
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}
          contentContainerStyle={styles.scrollViewContainer}>
          <View style={styles.container}>
            <View style={{marginTop: 4, marginBottom : 4, }} >
            <SelectDropdown
              style={{marginTop: 8, }}
              data={countries}
              onSelect={(selectedItem, index) => {
                rafik = selectedItem.title;
                handleProfession();
                citiesDropdownRef.current.reset();
                setCities([]);
                setCities(selectedItem.cities);
              }}
              defaultButtonText={"Select a profession"}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.title;
              }}
              rowTextForSelection={(item, index) => {
                return item.title;
              }}
              buttonStyle={styles.dropdown1BtnStyle}
              buttonTextStyle={styles.dropdown1BtnTxtStyle}
              renderDropdownIcon={isOpened => {
                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={Colors.lightBlue} size={18} />;
              }}
              dropdownIconPosition={'right'}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={styles.dropdown1RowTxtStyle}
            />
            </View>
            <View style={{marginTop: 4, marginBottom : 4, }} >
            <SelectDropdown
              ref={citiesDropdownRef}
              data={cities}
              onSelect={(selectedItem, index) => {
                rafika = selectedItem.title;
                console.log(selectedItem.title);
                handleSpeciality();
                
              }}
              defaultButtonText={'Select a medical specialty'}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.title;
              }}
              rowTextForSelection={(item, index) => {
                return item.title;
              }}
              buttonStyle={styles.dropdown2BtnStyle}
              buttonTextStyle={styles.dropdown2BtnTxtStyle}
              renderDropdownIcon={isOpened => {
                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={Colors.lightBlue} size={18} />;
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

  dropdown1BtnStyle: {
    width: 329,
    backgroundColor: '#FFF',
    borderRadius: 6,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.blue,
    
  },
  dropdown1BtnTxtStyle: {color: Colors.black, textAlign: 'left'},
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
  dropdown2BtnTxtStyle: {color: Colors.black, textAlign: 'left'},
  dropdown2DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown2RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown2RowTxtStyle: {color: '#444', textAlign: 'left'},
});