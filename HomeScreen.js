import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import styles from './style';
import { MaterialIcons } from '@expo/vector-icons';


const HomeScreen = ({ navigation, route }) => {
    const [projects, setProjects] = useState([]);
  
    useFocusEffect(
      React.useCallback(() => {
        const fetchProjects = async () => {
          try {
            const storedProjects = await AsyncStorage.getItem('projects');
            if (storedProjects) {
              setProjects(JSON.parse(storedProjects));
            }
          } catch (error) {
            console.error('Error occurred while fetching projects:', error);
          }
        };
  
        fetchProjects();
      }, [])
    );
  
    const handleSignOut = async () => {
      try {
        await AsyncStorage.multiRemove(['name', 'email', 'password']);
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
                const storedProjects = await AsyncStorage.getItem('projects');
                let projects = [];
                if (storedProjects) {
                  projects = JSON.parse(storedProjects);
                }
                const updatedProjects = projects.filter(
                  (project) => project.id !== id
                );
                await AsyncStorage.setItem(
                  'projects',
                  JSON.stringify(updatedProjects)
                );
                setProjects(updatedProjects);
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
        <Text style={styles.projectItemName}>{item.name}</Text>
        <Text style={styles.projectItemDate}>
          Start Date: {item.startDate} | End Date: {item.endDate}
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
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.projectItemContainer}
          onPress={() => handleSelectProject(item)}
        >
          <View style={styles.projectInfoContainer}>
            <Text style={styles.label}>{item.name}</Text>
            <Text style={styles.Datelabel}>
              {item.startDate} - {item.endDate}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.deleteButtonContainer}
            onPress={() => handleDeleteProject(item.id)}
          >
            <MaterialIcons name="delete" size={24} color="red" />
          </TouchableOpacity>
        </TouchableOpacity>
      )}
    />
    {/* swathi */}
      {/* swathi */}
    <View style={styles.buttonContainer}>
  
  <TouchableOpacity style={styles.button} onPress={handleAddProject} disabled={route.params.userType !== 'admin'}>
          <Text style={styles.buttonText}>Add Project</Text>
       </TouchableOpacity>
  
       <TouchableOpacity style={styles.button} onPress={handleSignOut}>
          <Text style={styles.buttonText}>Sign Out</Text>
       </TouchableOpacity>
  </View>
  {/* //changes end here */}
      </View>
      </TouchableWithoutFeedback>
    );
  };

  export default HomeScreen;