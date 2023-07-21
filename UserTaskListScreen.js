import React, { useState, useEffect } from 'react';
import { View, Text,Image, TextInput, Button, FlatList, StyleSheet, Alert, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DefaultTheme, NavigationContainer, useFocusEffect, useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import styles from './style';


const UserTaskListScreen = ({ route }) => {
    const [tasks, setTasks] = useState([]);
    const [hoursWorked, setHoursWorked] = useState('');
    const userEmail = route.params.userEmail;
  
    useEffect(() => {
      const fetchTasks = async () => {
        try {
          const storedTasks = await AsyncStorage.getItem('tasks');
          if (storedTasks) {
            const allTasks = JSON.parse(storedTasks);
            const filteredTasks = allTasks.filter(
              (task) => task.assignees.some((assignee) => assignee.email === userEmail)
            );
            setTasks(filteredTasks);
          }
        } catch (error) {
          console.error('Error occurred while fetching tasks:', error);
        }
      };
  
      fetchTasks();
    }, [userEmail]);
  
    const handleAddHours = async (taskId) => {
      if (hoursWorked === '') {
        Alert.alert('Enter number of hours worked');
        return;
      }
  
      try {
        const storedTasks = await AsyncStorage.getItem('tasks');
        let tasks = [];
        if (storedTasks) {
          tasks = JSON.parse(storedTasks);
        }
  
        const updatedTasks = tasks.map((task) => {
          if (task.id === taskId) {
            const updatedAssignees = task.assignees.map((assignee) => {
              if (assignee.email === userEmail) {
                return {
                  ...assignee,
                  hoursWorked: assignee.hoursWorked ? assignee.hoursWorked + parseFloat(hoursWorked) : parseFloat(hoursWorked),
                };
              }
              return assignee;
            });
  
            return { ...task, assignees: updatedAssignees };
          }
          return task;
        });
  
        await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
        setTasks(updatedTasks);
        setHoursWorked('');
        Alert.alert('Hours added successfully');
      } catch (error) {
        console.error('Error occurred while adding hours:', error);
      }
    };
  
    const handleCompleteTask = async (taskId) => {
      try {
        const storedTasks = await AsyncStorage.getItem('tasks');
        let tasks = [];
        if (storedTasks) {
          tasks = JSON.parse(storedTasks);
        }
    
        const updatedTasks = tasks.map((task) => {
          if (task.id === taskId && task.assignees.some((assignee) => assignee.email === userEmail)) {
            const updatedAssignees = task.assignees.map((assignee) => {
              if (assignee.email === userEmail) {
                return {
                  ...assignee,
                  hoursWorked: assignee.hoursWorked ? assignee.hoursWorked : 0,
                };
              }
              return assignee;
            });
    
            return { ...task, assignees: updatedAssignees, status: 'Task Completed' };
          }
          return task;
        });
    
        await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
        setTasks(updatedTasks);
        Alert.alert('Task completed successfully');
      } catch (error) {
        console.error('Error occurred while completing task:', error);
      }
    };
    
    const renderItem = ({ item }) => {
      const isTaskCompleted = item.status === 'Task Completed';
      const statusText = isTaskCompleted ? 'Task Completed' : 'In Progress';
    
      return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.taskItem} key={item.id}>
          <Text style={styles.taskItemText}>Task Name: {item.name}</Text>
          <Text style={styles.taskItemText}>Start Date: {item.startDate}</Text>
          <Text style={styles.taskItemText}>End Date: {item.endDate}</Text>
          <Text style={styles.taskItemText}>Project ID: {item.projectId}</Text>
          <Text style={styles.taskItemText}>Status: {statusText}</Text>
          <View style={styles.hoursContainer}>
            <Text style={styles.taskItemText}>Hours Worked:</Text>
            {item.assignees.map((assignee) => (
              <Text style={styles.taskItemText} key={assignee.email}>
                - {assignee.email}: {assignee.hoursWorked || 0} hours
              </Text>
            ))}
          </View>
          <View style={styles.userTaskListButtonCon}>
            <TextInput
              style={[styles.UserListInput, isTaskCompleted && styles.disabledInput]}
              value={hoursWorked}
              onChangeText={setHoursWorked}
              placeholder="Enter hours worked"
              // placeholderTextColor="#888888" //swathi
              keyboardType="numeric"
              editable={!isTaskCompleted}
              
            />
            <TouchableOpacity
              style={[styles.UserListbutton, isTaskCompleted && styles.disabledButton]}
              onPress={() => handleAddHours(item.id)}
              disabled={isTaskCompleted}
            >
              <Text style={styles.buttonText}>Add Hours</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.UserListbutton, isTaskCompleted && styles.disabledButton]}
              onPress={() => handleCompleteTask(item.id)}
              disabled={isTaskCompleted}
            >
              <Text style={styles.buttonText}>Complete Task</Text>
            </TouchableOpacity>
          </View>
        </View>
        </TouchableWithoutFeedback>
      );
    };
    
    
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Your Tasks!</Text>
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </View>
    );
  };

  export default UserTaskListScreen;