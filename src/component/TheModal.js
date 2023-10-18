import React, { useState } from 'react';
import { Button, Modal, Text, View } from 'react-native';

const TheModal = (props) => {
      return (
          <Modal
            animationType={props.animationType?props.animationType:"fade"}
            transparent={props.transparent?props.transparent:true}
            visible={props.setModalVisible}
          > 
            {props.children}

          </Modal>
      );
};

export default TheModal;