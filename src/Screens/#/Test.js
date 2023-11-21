import React, { useState } from 'react';
import { StyleSheet, Text, View, Switch, Button } from 'react-native';

export default function AttendanceScreen() {
  const [students, setStudents] = useState([
    { name: 'John Doe', present: true },
    { name: 'Jane Doe', present: false },
    { name: 'Bob Smith', present: true },
    { name: 'Alice Smith', present: false },
  ]);

  const handleToggle = (index) => {
    const newStudents = [...students];
    newStudents[index].present = !newStudents[index].present;
    setStudents(newStudents);
  };

  const handleSave = () => {
    // save attendance data to database or cloud storage
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Attendance</Text>
      {students.map((student, index) => (
        <View style={styles.studentContainer} key={index}>
          <Text style={styles.studentName}>{student.name}</Text>
          <Switch
            value={student.present}
            onValueChange={() => handleToggle(index)}
          />
        </View>
      ))}
      <Button title="Save" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  studentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  studentName: {
    marginRight: 10,
  },
});
