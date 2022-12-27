import React, {useState, useRef} from 'react';
import { View, Text, Button, Image, FlatList, useWindowDimensions, Animated, Pressable, TouchableOpacity, StatusBar } from 'react-native';
import slides from '../components/welcomeComponents/slides';
import WelcomeItem from '../components/welcomeComponents/welcome-item'; 
import Paginator from '../components/welcomeComponents/paginator';


const WelcomeScreen = ({ navigation }) => {

  const [currentIndex, setCurrentIndex] = useState(0); 


  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 10}).current; 
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  return (
    <View style={styles.container}>
    
    <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={{flex: 3}}>
        <FlatList 
            data={slides} 
            renderItem={({ item }) => <WelcomeItem item={item} /> }
            horizontal
            showsHorizontalScrollIndicator ={false}
            pagingEnabled
            bounces={false}
            keyExtractor ={(item) => item.id }
            onScroll={Animated.event([{nativeEvent:{contentOffset: {x: scrollX} }}], { useNativeDriver: false, 
            } )}
            scrollEventThrottle={32}
            viewabilityConfig={viewConfig}
            ref ={slidesRef}
             />
      </View>
      
      <Paginator data={slides} scrollX={scrollX} />
      <TouchableOpacity  activeOpacity={0.5} style={styles.buttonView} onPress={() => navigation.navigate("Login") } >
       <Text style={styles.buttonText}>Get Started </Text>
      </TouchableOpacity>


    </View>
  );
};
export default WelcomeScreen;

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  imageView:{
    
  },
  buttonView: {
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute', //Here is the trick
  bottom: 50, //Here is the trick
  backgroundColor: '#493d8a',
  borderRadius: 5,
  paddingVertical: 12, 
  paddingHorizontal: 32,
  },
  buttonText: {
    fontSize: 16, 
    fontWeight: 'bold', 
    color: 'white',
  },
};

