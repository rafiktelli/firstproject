import React from 'react';
import { View, Text, Button, Image } from 'react-native';

const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageView}>
        <Image source={require('../assets/welcome.jpg')} style={{ width: 350, height: 350 }} />
      </View>
      <View style={styles.buttonView}>
       <Button title="Get Started" />
      </View>
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