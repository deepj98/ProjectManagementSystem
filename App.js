import React, { useState, useEffect } from 'react';
import { DefaultTheme, NavigationContainer, useFocusEffect, useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
import HomeScreen from './HomeScreen';
import UserTaskListScreen from './UserTaskListScreen';
import AddProjectScreen from './AddProjectScreen';
import TaskListScreen from './TaskListScreen';
import AddTaskScreen from './AddTaskScreen';
import ProjectDetailsScreen from './ProjectDetailsScreen';



const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#000000', // Set the background color of the header
    primary: '#000000',
    text: '#444444', // Set the color of the header text and buttons
    headerTint: '#FF0000', // Set the color of the back button
  },
}

const Stack = createStackNavigator();

const App = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <NavigationContainer>
      <Stack.Navigator 
       screenOptions={{
        headerStyle: {
          backgroundColor: '#444444', // Set the background color of the header
        },
      }}
      >
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Home">
          {(props) => (
            <HomeScreen {...props} setSelectedProject={setSelectedProject} />
          )}
        </Stack.Screen>
        <Stack.Screen name="UserTaskList" component={UserTaskListScreen} />
        <Stack.Screen name="AddProject" component={AddProjectScreen} />
        <Stack.Screen name="ProjectDetails" component={ProjectDetailsScreen} />
        <Stack.Screen name="TaskList" component={TaskListScreen}  options={{ title: 'Tasks' }} />
        <Stack.Screen name="AddTask" component={AddTaskScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;