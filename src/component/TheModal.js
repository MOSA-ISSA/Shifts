import React, { useState } from 'react';
import { Button, Modal, Text, View } from 'react-native';

const TheModal = ({children,animationType,transparent,setModalVisible}) => {
      return (
          <Modal
            animationType={animationType?animationType:"fade"}
            transparent={transparent?transparent:true}
            visible={setModalVisible}
          > 
          <View style={{flex:1,justifyContent:'center',alignItems:'center',}}>
            {children}
          </View>
          </Modal>
      );
};

export default TheModal;