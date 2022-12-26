import React from 'react';
import { View, Text, Button, Image, FlatList, StyleSheet, useWindowDimensions } from 'react-native';


export default WelcomeItem =({ item }) => {
    
    const {width} = useWindowDimensions();
    return (
        
        <View style={[StyleSheet.container,{width}]}>
            <Image source={item.image} style={[styles.image, {width, resizeMode:'contain'}]} />
            <View styles={{flex: 0.3}}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>
        </View>
    );
};

const styles= StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image:{
        marginTop: 100,
        flex: 0.7, 
        justifyContent: 'center',

    },
    title:{
        fontWeight:'800',
        fontSize: 28,
        marginBottom: 10,
        color: '#493d8a',
        textAlign: 'center',
    },
    description:{
        fontWeight:'800',
        color: '#493d8a',
        textAlign: 'center',
        paddingHorizontal: 64, 
    },
});