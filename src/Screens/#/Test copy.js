import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';

const App = () => {
  const [dateTimeList, setDateTimeList] = useState([]);

  const addDateTimeToList = () => {
    const currentDateTime = new Date();
    console.log(currentDateTime.getFullYear());
    //currentDateTime.getDate() get the day [day]/maoth/year
    //currentDateTime.getMonth() + 1 get the month day/[month]/year
    //currentDateTime.getFullYear() get the year day/month/[year]
    //currentDateTime.getHours()
    //currentDateTime.getMinutes()
    const formattedDateTime = `${currentDateTime.getDate()}-${
      currentDateTime.getMonth() + 1
    }-${currentDateTime.getFullYear()}  ${currentDateTime.getHours()}:${currentDateTime.getMinutes()}`;

    // Update the state with the new date and time
    setDateTimeList((prevDateTimeList) => [...prevDateTimeList, formattedDateTime]);
  };

  return (
    <View style={styles.container}>
      <Button title="Add Date and Time" onPress={addDateTimeToList} />
      <FlatList
        data={dateTimeList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.dateTimeItem}>
            <Text>{item}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  dateTimeItem: {
    marginTop: 10,
  },
});

export default App;
