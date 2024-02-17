import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import styles from './style';
import { MaterialIcons } from '@expo/vector-icons';

const HomeScreen = ({ navigation, route }) => {
  const [projects, setProjects] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      fetchProjects();
    }, [])
  );

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/projects');
      const data = await response.json();

      if (data.success) {
        setProjects(data.projects);
      } else {
        Alert.alert('Error fetching project data.');
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      Alert.alert('Error fetching project data. Please try again later.');
    }
  };

  const handleSignOut = async () => {
    try {
      // Your sign-out logic here
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error occurred during sign out:', error);
    }
  };

  const handleAddProject = () => {
    navigation.navigate('AddProject', { createdBy: route.params.createdBy });
  };

  const handleDeleteProject = async (id) => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to delete this project?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: async () => {
            try {
              // Implement your delete project logic here
              // For this example, we'll just show an alert
              Alert.alert('Project deleted successfully');
            } catch (error) {
              console.error(
                'Error occurred while deleting project:',
                error
              );
            }
          },
        },
      ]
    );
  };

  const handleSelectProject = (project) => {
    navigation.navigate('ProjectDetails', { project: project });
  };

  const renderProjectItem = ({ item }) => (
    <TouchableOpacity
      style={styles.projectItemContainer}
      onPress={() => handleSelectProject(item)}
    >
      <Text style={styles.HomeprojectName}>{item.name}</Text>
      <Text style={styles.projectDate}>
      {'Start Date: '}{item.startDate}{' | End Date: '}{item.endDate}
      </Text>
      <TouchableOpacity onPress={() => handleDeleteProject(item.id)}>
        <MaterialIcons name="delete" size={24} color="red" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.title}>Projects</Text>
        <FlatList
          data={projects}
          keyExtractor={(item) => item.id}
          renderItem={renderProjectItem}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleAddProject}
            disabled={route.params.userType !== 'Admin'}
          >
            <Text style={styles.buttonText}>Add Project</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleSignOut}>
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default HomeScreen;
