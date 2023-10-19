import React, { useState } from 'react';
import { Button, Modal, Text, View } from 'react-native';

const TheModal = ({children,animationType,transparent,setModalVisible}) => {
      return (
          <Modal
            animationType={animationType?animationType:"fade"}
            transparent={transparent?transparent:true}
            visible={setModalVisible}
          > 
            {children}

          </Modal>
      );
};

export default TheModal;