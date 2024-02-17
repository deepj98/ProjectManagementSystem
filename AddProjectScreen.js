import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';

const AddProjectScreen = ({ route }) => {
  const navigation = useNavigation();
  const [projectId, setProjectId] = useState('');
  const [projectName, setProjectName] = useState('');
  const [projectStartDate, setProjectStartDate] = useState('');
  const [projectEndDate, setProjectEndDate] = useState('');
  const [createdBy, setCreatedBy] = useState('');

  // useState(() => {
  //   setCreatedBy(route.params.createdBy);
  // }, [route.params.createdBy]);

  const handleAddProject = async () => {
    if (
      projectId.trim() &&
      projectName.trim() &&
      projectStartDate.trim() &&
      projectEndDate.trim() &&
      createdBy.trim()
    ) {
      try {
        const response = await fetch('http://localhost:3000/api/addProject', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: projectId,
            name: projectName,
            startDate: projectStartDate,
            endDate: projectEndDate,
            createdBy: createdBy,
          }),
        });

        const data = await response.json();
        if (data.success) {
          navigation.goBack();
          Alert.alert('Project added successfully');
        } else {
          Alert.alert('Error adding project. Please try again later.');
        }
      } catch (error) {
        console.error('Error occurred during project addition:', error);
        Alert.alert('Error adding project. Please try again later.');
      }
    } else {
      Alert.alert('Please fill in all the project details');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.title}>Add Project</Text>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Project ID:</Text>
        <TextInput
          style={styles.input}
          value={projectId}
          onChangeText={setProjectId}
          placeholder="Enter project ID"
          placeholderTextColor="#888888"
        />
        <Text style={styles.label}>Project Name:</Text>
        <TextInput
          style={styles.input}
          value={projectName}
          onChangeText={setProjectName}
          placeholder="Enter project name"
          placeholderTextColor="#888888"
        />
        <Text style={styles.label}>Start Date:</Text>
        <TextInput
          style={styles.input}
          value={projectStartDate}
          onChangeText={setProjectStartDate}
          placeholder="DD-MM-YY"
          placeholderTextColor="#888888"
        />
        <Text style={styles.label}>End Date:</Text>
        <TextInput
          style={styles.input}
          value={projectEndDate}
          onChangeText={setProjectEndDate}
          placeholder="DD-MM-YY"
          placeholderTextColor="#888888"
        />
        <Text style={styles.label}>Created By:</Text>
        <TextInput
          style={styles.input}
          value={createdBy}
          onChangeText={setCreatedBy}
          
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleAddProject}>
            <Text style={styles.buttonText}>Add Project</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddProjectScreen;
