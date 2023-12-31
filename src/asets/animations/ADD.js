import LottieView from 'lottie-react-native';
import React, { useContext} from 'react';
import {View, StyleSheet} from 'react-native';

const ADD =props=>{

    return (
        <View style={{height: props.size*1.5,width: props.size*1.5,padding:0,margin:0,}}>
            <LottieView 
            speed={0.5}
            source={require('./ADD.json')}
            autoPlay
            loop={true}
            resizeMode={'cover'}
            
            //onAnimationLoop={restorData()}
            //onLayout={restorData}
            //onAnimationFinish={()=>props.setModalVisible(false)}
            //()=>props.navigation.navigate('x')
            />
        </View>
    )
}

export default ADD