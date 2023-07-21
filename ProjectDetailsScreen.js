import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import styles from './style';
import { MaterialIcons } from '@expo/vector-icons';

const ProjectDetailsScreen = ({ navigation, route }) => {
    const { project } = route.params;
  
    const handleViewTasks = () => {
      navigation.navigate('TaskList', { selectedProject: project });
    };
  
    const handleAddTask = () => {
      navigation.navigate('AddTask', { project });
    };
  
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.title}>Project Details</Text>
        <View style={styles.projectContainer}>
          <Text style={styles.projectId}>Project ID: {project.id}</Text>
          <Text style={styles.projectName}>Project Name: {project.name}</Text>
          
          <Text style={styles.projectDate}>
            Start Date: {project.startDate}
          </Text>
          <Text style={styles.projectDate}>End Date: {project.endDate}</Text>
        </View>
        {/* swathi */}
        <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleViewTasks}>
            <Text style={styles.buttonText}>View Tasks</Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.button} onPress={handleAddTask}>
            <Text style={styles.buttonText}>Add Task</Text>
         </TouchableOpacity>
  
        {/* <Button title="View Tasks" onPress={handleViewTasks} />
        <Button title="Add Task" onPress={handleAddTask} /> */}
        </View>
        {/* changes end here */}
      </View>
      </TouchableWithoutFeedback>
    );
  };
  export default ProjectDetailsScreen;