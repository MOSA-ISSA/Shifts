import {
  Appbar,
  DarkTheme,
  DefaultTheme,
  Provider,
  Surface,
  TextInput,
  ThemeProvider,
} from "react-native-paper";
import React, { useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import DropDown from "react-native-paper-dropdown";

function DropDownComponent() {
  const [text, setText] = useState('');
  const [showDropDown, setShowDropDown] = useState(false);
  const [gender, setGender] = useState("");
  
  const DateList = [
    {
      label: "Male",
      value: "male",
    },
    {
      label: "Female",
      value: "female",
    },
    {
      label: "Others",
      value: "others",
    },
  ];

  const handleInputChange = (text) => {
    // Additional logic for input change if needed
    setGender(text);
  };


  return (
      <SafeAreaView style={styles.safeContainerStyle}>
        <DropDown
      // label={'date'}
      mode={'outlined'}
      visible={showDropDown}
      showDropDown={() => setShowDropDown(true)}
      onDismiss={() => setShowDropDown(false)}
      value={gender}
      setValue={setGender}
      list={DateList}
      inputProps={{
        render: (props) => (
          <TextInput
            // {...props}
            onChangeText={setText}
            value={text}
          />
        ),
      }}
    />
        <View style={styles.spacerStyle} />
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  spacerStyle: {
    marginBottom: 15,
  },
  safeContainerStyle: {
    // flex: 1,
    margin: 20,
    justifyContent: "center",
  },
});

export default DropDownComponent;