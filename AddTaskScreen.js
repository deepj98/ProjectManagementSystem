import React, { useState, useEffect } from 'react';
import { View, Text,Image, TextInput, Button, FlatList, StyleSheet, Alert, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DefaultTheme, NavigationContainer, useFocusEffect, useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import styles from './style';

const AddTaskScreen = ({ navigation, route }) => {
    const { project } = route.params;
    const [taskId, setTaskId] = useState('');
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskStartDate, setTaskStartDate] = useState('');
    const [taskEndDate, setTaskEndDate] = useState('');
    const [assigneeEmail, setAssigneeEmail] = useState('');
    const [hourRate, setHourRate] = useState('');
  
    const handleAddTaskToDB = async () => {
      if (taskId.trim() && taskName.trim()) {
        const task = {
          id: taskId,
          name: taskName,
          description: taskDescription,
          startDate: taskStartDate,
          endDate: taskEndDate,
          projectId: project.id,
          assignees: [{ email: assigneeEmail, hourRate: hourRate }],
        };
  
        try {
          const storedTasks = await AsyncStorage.getItem('tasks');
          let tasks = [];
          if (storedTasks) {
            tasks = JSON.parse(storedTasks);
          }
  
          const existingTask = tasks.find(
            (t) => t.id === taskId && t.projectId === project.id
          );
  
          if (existingTask) {
            Alert.alert('Task with the same ID already exists in this project');
            return;
          }
  
          const updatedTasks = [...tasks, task];
          await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
          navigation.goBack();
          Alert.alert('Task added successfully');
        } catch (error) {
          console.error('Error occurred during task addition:', error);
        }
      } else {
        Alert.alert('Please fill in all the task details');
      }
    };
  
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView>
      <View style={styles.container}>
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
          {/* <DatePicker
            style={styles.input}
            date={taskStartDate}
            onDateChange={setTaskStartDate}
            mode="date"
            placeholder="Select start date"
            format="YYYY-MM-DD"
            showIcon={false}
          /> */}
          <Text style={styles.label}>End Date:</Text>
          <TextInput
            style={styles.input}
            value={taskEndDate}
            onChangeText={setTaskEndDate}
            placeholder="DD-MM-YY"
            placeholderTextColor="#888888" 
          />
          {/* <DatePicker
            style={styles.input}
            date={taskEndDate}
            onDateChange={setTaskEndDate}
            mode="date"
            placeholder="Select end date"
            format="YYYY-MM-DD"
            showIcon={false}
          /> */}
  
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
          <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleAddTaskToDB}>
            <Text style={styles.buttonText}>Add Task</Text>
         </TouchableOpacity>
          </View>
        </View>
      </View>
      </ScrollView>
      </TouchableWithoutFeedback>
    );
  };

  export default AddTaskScreen;