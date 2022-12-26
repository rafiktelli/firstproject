import React, {useState, useRef} from 'react';
import { View, Text, Button, Image, FlatList, useWindowDimensions, Animated } from 'react-native';
import slides from './slides';
import Itm from './itm'; 
import Paginator from './paginator';

const WelcomeScreen = () => {

  const [currentIndex, setCurrentIndex] = useState(0); 


  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 100}).current; 
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  return (
    <View style={styles.container}>
      <View style={{flex: 3}}>
        <FlatList 
            data={slides} 
            renderItem={({ item }) => <Itm item={item} /> }
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
      


    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageView:{
    
  },
  buttonView: {
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute', //Here is the trick
  bottom: 50, //Here is the trick
  },
};

export default WelcomeScreen;