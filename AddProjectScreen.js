import React, { useState, useEffect } from 'react';
import { View, Text,Image, TextInput, Button, FlatList, StyleSheet, Alert, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DefaultTheme, NavigationContainer, useFocusEffect, useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import styles from './style';


const AddProjectScreen = ({ navigation, route }) => {
    const [projectId, setProjectId] = useState('');
    const [projectName, setProjectName] = useState('');
    const [projectStartDate, setProjectStartDate] = useState('');
    const [projectEndDate, setProjectEndDate] = useState('');
    const [createdBy, setCreatedBy] = useState('');
  
    useEffect(() => {
      setCreatedBy(route.params.createdBy);
    }, [route.params.createdBy]);
  
    const handleAddProject = async () => {
      if (
        projectId.trim() &&
        projectName.trim() &&
        projectStartDate.trim() &&
        projectEndDate.trim() &&
        createdBy.trim()
      ) {
        const project = {
          id: projectId,
          name: projectName,
          startDate: projectStartDate,
          endDate: projectEndDate,
          createdBy: createdBy,
        };
  
        try {
          const storedProjects = await AsyncStorage.getItem('projects');
          let projects = [];
          if (storedProjects) {
            projects = JSON.parse(storedProjects);
          }
          const updatedProjects = [...projects, project];
          await AsyncStorage.setItem(
            'projects',
            JSON.stringify(updatedProjects)
          );
          navigation.goBack();
          Alert.alert('Project added successfully');
        } catch (error) {
          console.error('Error occurred during project addition:', error);
        }
      } else {
        Alert.alert('Please fill in all the project details');
      }
    };
  
    return (
      // <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
       <KeyboardAvoidingView style={styles.container} behavior="padding"> 
      
        <Text style={styles.title}>Add Project</Text>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Project ID:</Text>
          <TextInput
            style={styles.input}
            value={projectId}
            onChangeText={setProjectId}
            placeholder="Enter project ID"
            placeholderTextColor="#888888" //swathi
          />
          <Text style={styles.label}>Project Name:</Text>
          <TextInput
            style={styles.input}
            value={projectName}
            onChangeText={setProjectName}
            placeholder="Enter project name"
            placeholderTextColor="#888888" //swathi
          />
          <Text style={styles.label}>Start Date:</Text>
          <TextInput
            style={styles.input}
            value={projectStartDate}
            onChangeText={setProjectStartDate}
            placeholder="DD-MM-YY"
            placeholderTextColor="#888888" //swathi
          />
          {/* <DatePicker
            style={styles.input}
            date={projectStartDate}
            locale="en"
            androidVariant="iosClone"
            onDateChange={setProjectStartDate}
            mode="date"
            placeholder="Select start date"
            format="YYYY-MM-DD"
            showIcon={false} */}
          {/* /> */}
          <Text style={styles.label}>End Date:</Text>
          <TextInput
            style={styles.input}
            value={projectEndDate}
            onChangeText={setProjectEndDate}
            placeholder="DD-MM-YY"
            placeholderTextColor="#888888" //swathi
          />
          {/* <DatePicker
            style={styles.input}
            date={projectEndDate}
            onDateChange={setProjectEndDate}
            mode="date"
            placeholder="Select end date"
            format="YYYY-MM-DD"
            showIcon={false}
          /> */}
  
          <Text style={styles.label}>Created By:</Text>
          <TextInput
            style={styles.input}
            value={createdBy}
            editable={false}
          />
          <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleAddProject}>
            <Text style={styles.buttonText}>Add Project</Text>
         </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
      // </TouchableWithoutFeedback>
    );
  };
  export default AddProjectScreen;