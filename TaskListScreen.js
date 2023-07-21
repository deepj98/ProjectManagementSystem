import React, { useState, useEffect } from 'react';
import { View, Text,Image, TextInput, Button, FlatList, StyleSheet, Alert, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DefaultTheme, NavigationContainer, useFocusEffect, useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';

import styles from './style';

const TaskListScreen = ({ route }) => {
    const { selectedProject } = route.params;
    const [tasks, setTasks] = useState([]);
  
    useEffect(() => {
      const fetchTasks = async () => {
        try {
          const storedTasks = await AsyncStorage.getItem('tasks');
          if (storedTasks) {
            const allTasks = JSON.parse(storedTasks);
            const filteredTasks = allTasks.filter((task) => task.projectId === selectedProject.id);
            setTasks(filteredTasks);
          }
        } catch (error) {
          console.error('Error occurred while fetching tasks:', error);
        }
      };
  
      fetchTasks();
    }, [selectedProject]);
  
    const calculateTotalCost = (task) => {
      if (task.status === 'Task Completed') {
        const totalHours = task.assignees.reduce((total, assignee) => {
          return total + (assignee.hoursWorked || 0);
        }, 0);
        const hourlyRate = task.assignees[0].hourRate || 0;
        return totalHours * hourlyRate;
      } else {
        return 0;
      }
    };
  
    const renderItem = ({ item }) => {
      const totalCost = calculateTotalCost(item);
      const totalHours = item.assignees.reduce((total, assignee) => {
        return total + (assignee.hoursWorked || 0);
      }, 0);
      const hourlyRate = item.assignees[0].hourRate || 0;
    
      return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.taskItem} key={item.id}>
          <Text style={styles.taskItemText}>Task ID: {item.id}</Text>
          <Text style={styles.taskItemText}>Task Name: {item.name}</Text>
          <Text style={styles.taskItemText}>Description: {item.description}</Text>
          <Text style={styles.taskItemText}>Start Date: {item.startDate}</Text>
          <Text style={styles.taskItemText}>End Date: {item.endDate}</Text>
          <Text style={styles.taskItemText}>Status: {item.status}</Text>
          {item.assignees.map((assignee) => (
            <Text style={styles.taskItemText} key={assignee.email}>
              Assigned User Email: {assignee.email}
            </Text>
          ))}
          <Text style={styles.taskItemText}>Total Hours: {totalHours}</Text>
          <Text style={styles.taskItemText}>Hourly Rate: {hourlyRate}</Text>
          <Text style={styles.taskItemText}>Total Cost: {totalCost}</Text>
        </View>
        </TouchableWithoutFeedback>
      );
    };
    
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Tasks</Text>
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </View>
      
    );
  };
  export default TaskListScreen;