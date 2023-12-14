import React, { useState } from 'react';
import {View, StyleSheet, TextInput, Text} from 'react-native';

const InputComponent = ({value,inputs,shiftValue,i}) => {
    const [text, setText] = useState(inputs[value]);

    const handleEndEditing = () => {
        inputs[value] = text;  
    };

    const handleReturnKey = (event) => {
        event.preventDefault();///////////////////

        if (i < shiftValue.length - 1) {
          const nextInput = shiftValue[i + 1];
          this[nextInput].focus();
        }

        handleEndEditing();
    };
      

      return (
        <View style={{ flex: 1 }}>
          <Text>{value}</Text>
          <TextInput
            style={styles.input}
            placeholder={"Enter " + value}
            value={text}
            onChangeText={setText}
            keyboardType={value === "title" ? "default" : "numeric"}
            onEndEditing={handleEndEditing}
            onSubmitEditing={(event) => handleReturnKey(event)}
            returnKeyType={i<shiftValue.length- 1 ? "next" : "done"}
            ref={(input) => (this[value] = input)}
            />
        </View>
      );
    };

const styles = StyleSheet.create({
    input: {
        padding:10,
        backgroundColor:'#959595',
        borderRadius:10,
    },
})

export default InputComponent;
