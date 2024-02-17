import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';

const AddTaskScreen = ({ route }) => {
  const navigation = useNavigation();
  const { project } = route.params;
  const [taskId, setTaskId] = useState('');
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskStartDate, setTaskStartDate] = useState('');
  const [taskEndDate, setTaskEndDate] = useState('');
  const [assigneeEmail, setAssigneeEmail] = useState('');
  const [hourRate, setHourRate] = useState('');

  const handleAddTask = async () => {
    if (taskId.trim() && taskName.trim() && taskStartDate.trim() && taskEndDate.trim() && assigneeEmail.trim() && hourRate.trim()) {
      try {
        const response = await fetch('http://localhost:3000/api/addTask', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: taskId,
            name: taskName,
            description: taskDescription,
            startDate: taskStartDate,
            endDate: taskEndDate,
            projectId: project.id,
            assignees: [{ email: assigneeEmail, hourRate: parseFloat(hourRate) }],
          }),
        });

        const data = await response.json();
        if (data.success) {
          navigation.goBack();
          Alert.alert('Task added successfully');
        } else {
          Alert.alert('Error adding task. Please try again later.');
        }
      } catch (error) {
        console.error('Error occurred during task addition:', error);
        Alert.alert('Error adding task. Please try again later.');
      }
    } else {
      Alert.alert('Please fill in all the task details');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text style={styles.title}>Add Task</Text>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Task ID:</Text>
          <TextInput
            style={styles.input}
            value={taskId}
            onChangeText={setTaskId}
            placeholder="Enter task ID"
            placeholderTextColor="#888888"
          />
          <Text style={styles.label}>Task Name:</Text>
          <TextInput
            style={styles.input}
            value={taskName}
            onChangeText={setTaskName}
            placeholder="Enter task name"
            placeholderTextColor="#888888"
          />
          <Text style={styles.label}>Task Description:</Text>
          <TextInput
            style={styles.input}
            value={taskDescription}
            onChangeText={setTaskDescription}
            placeholder="Enter task description"
            placeholderTextColor="#888888"
          />
          <Text style={styles.label}>Start Date:</Text>
          <TextInput
            style={styles.input}
            value={taskStartDate}
            onChangeText={setTaskStartDate}
            placeholder="DD-MM-YY"
            placeholderTextColor="#888888"
          />
          <Text style={styles.label}>End Date:</Text>
          <TextInput
            style={styles.input}
            value={taskEndDate}
            onChangeText={setTaskEndDate}
            placeholder="DD-MM-YY"
            placeholderTextColor="#888888"
          />
          <Text style={styles.label}>Assignee Email:</Text>
          <TextInput
            style={styles.input}
            value={assigneeEmail}
            onChangeText={setAssigneeEmail}
            placeholder="Enter assignee email"
            placeholderTextColor="#888888"
          />
          <Text style={styles.label}>Hourly Rate:</Text>
          <TextInput
            style={styles.input}
            value={hourRate}
            onChangeText={setHourRate}
            placeholder="Enter hourly rate"
            placeholderTextColor="#888888"
            keyboardType="numeric"
          />
          <Button title="Add Task" onPress={handleAddTask} />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default AddTaskScreen;
