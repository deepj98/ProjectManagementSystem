// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const storedEmail = await AsyncStorage.getItem('email');
    const storedPassword = await AsyncStorage.getItem('password');

    if (storedEmail === email && storedPassword === password) {
      navigation.navigate('Home');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <Text>Password:</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Sign Up" onPress={() => navigation.navigate('SignUp')} />
    </View>
  );
};

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      await AsyncStorage.setItem('name', name);
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('password', password);
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error occurred during sign up:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <Text>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <Text>Password:</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
};

const HomeScreen = ({ navigation }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch projects from local storage
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
  }, []);

  const handleSignOut = () => {
    AsyncStorage.removeItem('name');
    AsyncStorage.removeItem('email');
    AsyncStorage.removeItem('password');
    navigation.navigate('Login');
  };

  const handleAddProject = () => {
    navigation.navigate('AddProject');
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
              // Retrieve existing projects from local storage
              const storedProjects = await AsyncStorage.getItem('projects');
              let projects = [];
              if (storedProjects) {
                projects = JSON.parse(storedProjects);
              }
              // Filter out the project to be deleted
              const updatedProjects = projects.filter((project) => project.id !== id);
              // Save the updated projects array to local storage
              await AsyncStorage.setItem('projects', JSON.stringify(updatedProjects));
              // Update the projects state
              setProjects(updatedProjects);
              // Show success message or navigate to another screen
              alert('Project deleted successfully');
            } catch (error) {
              console.error('Error occurred while deleting project:', error);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>Ongoing Projects:</Text>
        <TouchableOpacity onPress={handleAddProject}>
          <MaterialIcons name="add" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={projects}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.projectContainer}>
            <Text>Project ID: {item.id}</Text>
            <Text>Project Name: {item.name}</Text>
            {/* <Text>Project Description: {item.description}</Text> */}
            <Text>Project Start Date: {item.startDate}</Text>
            {/* <Text>Project End Date: {item.endDate}</Text> */}
            {/* <Text>Hourly Rate: {item.hourlyRate}</Text> */}
            <Text>Assign To:</Text>
            {item.assignTo.map((user, index) => (
              <Text key={index}>
                Email: {user.email}
              </Text>
            ))}
            <TouchableOpacity onPress={() => handleDeleteProject(item.id)}>
              <Text style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
};

const AddProjectScreen = ({ navigation }) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [assignTo, setAssignTo] = useState([]);

  const handleAddAssignee = () => {
    setAssignTo([...assignTo, { email: '', hourlyRate: '' }]);
  };

  const handleRemoveAssignee = (index) => {
    const newAssignTo = [...assignTo];
    newAssignTo.splice(index, 1);
    setAssignTo(newAssignTo);
  };

  const handleAssigneeEmailChange = (email, index) => {
    const newAssignTo = [...assignTo];
    newAssignTo[index].email = email;
    setAssignTo(newAssignTo);
  };

  const handleAssigneeHourlyRateChange = (hourlyRate, index) => {
    const newAssignTo = [...assignTo];
    newAssignTo[index].hourlyRate = hourlyRate;
    setAssignTo(newAssignTo);
  };

  const handleAddProject = async () => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to add this project?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: async () => {
            const project = {
              id,
              name,
              description,
              startDate,
              endDate,
              hourlyRate,
              assignTo,
            };

            try {
              // Retrieve existing projects from local storage
              const storedProjects = await AsyncStorage.getItem('projects');
              let projects = [];
              if (storedProjects) {
                projects = JSON.parse(storedProjects);
              }
              // Add the new project to the existing projects
              projects.push(project);
              // Save the updated projects array to local storage
              await AsyncStorage.setItem('projects', JSON.stringify(projects));
              // Reset the form fields
              setId('');
              setName('');
              setDescription('');
              setStartDate('');
              setEndDate('');
              setHourlyRate('');
              setAssignTo([]);
              // Show success message or navigate to another screen
              alert('Project added successfully');
              // Navigate back to the Home screen
              navigation.navigate('Home');
            } catch (error) {
              console.error('Error occurred during project addition:', error);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text>ID:</Text>
      <TextInput
        style={styles.input}
        value={id}
        onChangeText={setId}
      />
      <Text>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <Text>Description:</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />
      <Text>Start Date:</Text>
      <TextInput
        style={styles.input}
        value={startDate}
        onChangeText={setStartDate}
      />
      <Text>End Date:</Text>
      <TextInput
        style={styles.input}
        value={endDate}
        onChangeText={setEndDate}
      />
      <Text>Hourly Rate:</Text>
      <TextInput
        style={styles.input}
        value={hourlyRate}
        onChangeText={setHourlyRate}
        keyboardType="numeric"
      />
      <Text>Assign To:</Text>
      {assignTo.map((assignee, index) => (
        <View key={index} style={styles.assigneeContainer}>
          <TextInput
            style={styles.input}
            value={assignee.email}
            onChangeText={(email) => handleAssigneeEmailChange(email, index)}
            placeholder="Email"
          />
          <TextInput
            style={styles.input}
            value={assignee.hourlyRate}
            onChangeText={(rate) => handleAssigneeHourlyRateChange(rate, index)}
            placeholder="Hourly Rate"
            keyboardType="numeric"
          />
          <TouchableOpacity onPress={() => handleRemoveAssignee(index)}>
            <Text>Remove</Text>
          </TouchableOpacity>
        </View>
      ))}
      <Button title="Add Assignee" onPress={handleAddAssignee} />
      <Button title="Add Project" onPress={handleAddProject} />
    </View>
  );
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddProject" component={AddProjectScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    padding: 5,
  },
  projectContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  assigneeContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    padding: 5,
  },
});

export default App;
