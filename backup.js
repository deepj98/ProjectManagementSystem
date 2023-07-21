// import React, { useState, useEffect } from 'react';
// import { LogBox } from 'react-native'; //swathi



// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   FlatList,
//   StyleSheet,
//   Image,
//   Alert,
//   KeyboardAvoidingView,
//   ScrollView,
//   ImageBackground,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {
//   NavigationContainer,
//   useFocusEffect,
//   useRoute,
//   DefaultTheme,
// } from '@react-navigation/native';
// // import { createStackNavigator } from '@react-navigation/stack';
// //swathi
// import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';

// //end here

// import { TouchableOpacity } from 'react-native';
// import { MaterialIcons } from '@expo/vector-icons';

//  import DatePicker from 'react-native-datepicker';

//  import styles from './style';
//  LogBox.ignoreAllLogs(); // Ignore all log notifications swathi

//  //swathi
//  const MyTheme = {
//   ...DefaultTheme,
//   colors: {
//     ...DefaultTheme.colors,
//     background: '#000000', // Set the background color of the header
//     primary: '#000000',
//     text: '#444444', // Set the color of the header text and buttons
//     headerTint: '#FF0000', // Set the color of the back button
//   },
// }
// //changes end here


// const LoginScreen = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = () => {
//     if (email === 'Admin1' && password === 'Admin1') {
//       navigation.navigate('Home', { userType: 'admin', createdBy: email });
//     } else if (email === 'Admin2' && password === 'Admin2') {
//       navigation.navigate('Home', { userType: 'admin', createdBy: email });
//     } else if (email === 'User1' && password === 'User1') {
//       navigation.navigate('UserTaskList', { userType: 'user' });
//     } else if (email === 'User2' && password === 'User2') {
//       navigation.navigate('UserTaskList', { userType: 'user' });
//     } else {
//       Alert.alert('Invalid credentials');
//     }
//   };

//   return (
//     // <SafeAreaView style={styles.container}>
//     //   <ImageBackground
//     //     style={{flex: 1}}
//     //     source={{
//     //       uri:
//     //         'https://www.ninty.com/designers/subtlepatterns/patterns/moroccan-flower-dark.png',
//     //     }}>
//     <View style={styles.LoginContainer}>
//          {/* <Image
//         source={require('./assets/tick.png')}
//         tyle={{ width: 200, height: 200, resizeMode: 'contain' }}
//       /> */}
//       <Text style={styles.title}>ProjectPro</Text>
//       <View style={styles.formContainer}>
//         <Text style={styles.label}>Email:</Text>
//         <TextInput
//           style={styles.input}
//           value={email}
//           onChangeText={setEmail}
//           placeholder="Enter your email"
//           placeholderTextColor="#888888" //swathi
//         />
//         <Text style={styles.label}>Password:</Text>
//         <TextInput
//           style={styles.input}
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry
//           placeholder="Enter your password"
//           placeholderTextColor="#888888" //swathi
//         />
//         {/* swathi */}
//        <View style={styles.buttonContainer}>
//         <TouchableOpacity style={styles.button} onPress={handleLogin}>
//           <Text style={styles.buttonText}>Login</Text>
//        </TouchableOpacity>
//       <TouchableOpacity
//           style={[styles.button]}
//           onPress={() => navigation.navigate('SignUp')}
//        >
//       <Text style={styles.buttonText}>Sign Up</Text>
//             </TouchableOpacity>
//       </View>
// {/* changes end here */}
//       </View>
//     </View>
//     // </ImageBackground>
//     // </SafeAreaView>
//   );
// };

// const SignUpScreen = ({ navigation }) => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSignUp = async () => {
//     try {
//       await AsyncStorage.setItem('name', name);
//       await AsyncStorage.setItem('email', email);
//       await AsyncStorage.setItem('password', password);
//       navigation.navigate('Login');
//     } catch (error) {
//       console.error('Error occurred during sign up:', error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Sign Up</Text>
//       <View style={styles.formContainer}>
//         <Text style={styles.label}>Name:</Text>
//         <TextInput
//           style={styles.input}
//           value={name}
//           onChangeText={setName}
//           placeholder="Enter your name"
//           placeholderTextColor="#888888" //swathi
//         />
//         <Text style={styles.label}>Email:</Text>
//         <TextInput
//           style={styles.input}
//           value={email}
//           onChangeText={setEmail}
//           placeholder="Enter your email"
//           placeholderTextColor="#888888" //swathi
//         />
//         <Text style={styles.label}>Password:</Text>
//         <TextInput
//           style={styles.input}
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry
//           placeholder="Enter your password"
//           placeholderTextColor="#888888" //swathi
//         />
//         {/* swathi */}
//         <View style={styles.buttonContainer}>
//         <TouchableOpacity style={styles.button} onPress={handleSignUp}>
//           <Text style={styles.buttonText}>Sign Up</Text>
//        </TouchableOpacity>
//           {/* <Button title="Sign Up" onPress={handleSignUp} /> */}
//         </View>
// {/* change end here */}
//       </View>
//     </View>
//   );
// };

// const HomeScreen = ({ navigation, route }) => {
//   const [projects, setProjects] = useState([]);

//   useFocusEffect(
//     React.useCallback(() => {
//       const fetchProjects = async () => {
//         try {
//           const storedProjects = await AsyncStorage.getItem('projects');
//           if (storedProjects) {
//             setProjects(JSON.parse(storedProjects));
//           }
//         } catch (error) {
//           console.error('Error occurred while fetching projects:', error);
//         }
//       };

//       fetchProjects();
//     }, [])
//   );

//   const handleSignOut = async () => {
//     try {
//       await AsyncStorage.multiRemove(['name', 'email', 'password']);
//       navigation.navigate('Login');
//     } catch (error) {
//       console.error('Error occurred during sign out:', error);
//     }
//   };

//   const handleAddProject = () => {
//     navigation.navigate('AddProject', { createdBy: route.params.createdBy });
//   };

//   const handleDeleteProject = async (id) => {
//     Alert.alert(
//       'Confirmation',
//       'Are you sure you want to delete this project?',
//       [
//         {
//           text: 'Cancel',
//           style: 'cancel',
//         },
//         {
//           text: 'Confirm',
//           onPress: async () => {
//             try {
//               const storedProjects = await AsyncStorage.getItem('projects');
//               let projects = [];
//               if (storedProjects) {
//                 projects = JSON.parse(storedProjects);
//               }
//               const updatedProjects = projects.filter(
//                 (project) => project.id !== id
//               );
//               await AsyncStorage.setItem(
//                 'projects',
//                 JSON.stringify(updatedProjects)
//               );
//               setProjects(updatedProjects);
//               Alert.alert('Project deleted successfully');
//             } catch (error) {
//               console.error(
//                 'Error occurred while deleting project:',
//                 error
//               );
//             }
//           },
//         },
//       ]
//     );
//   };

//   const handleSelectProject = (project) => {
//     navigation.navigate('ProjectDetails', { project: project });
//   };

//   const renderProjectItem = ({ item }) => (
//     <TouchableOpacity
//       style={styles.projectItemContainer}
//       onPress={() => handleSelectProject(item)}
//     >
//       <Text style={styles.projectItemName}>{item.name}</Text>
//       <Text style={styles.projectItemDate}>
//         Start Date: {item.startDate} | End Date: {item.endDate}
//       </Text>
//       <TouchableOpacity onPress={() => handleDeleteProject(item.id)}>
//         <MaterialIcons name="delete" size={24} color="red" />
//       </TouchableOpacity>
//     </TouchableOpacity>
//   );

  
//   return (
//     //Swathi

//     <View style={styles.container}>
//   <Text style={styles.title}>Projects</Text>
//   <FlatList
//     data={projects}
//     keyExtractor={(item) => item.id}
//     renderItem={({ item }) => (
//       <TouchableOpacity
//         style={styles.projectItemContainer}
//         onPress={() => handleSelectProject(item)}
//       >
//         <View style={styles.projectInfoContainer}>
//           <Text style={styles.label}>{item.name}</Text>
//           <Text style={styles.label}>
//             {item.startDate} - {item.endDate}
//           </Text>
//         </View>
//         <TouchableOpacity
//           style={styles.deleteButtonContainer}
//           onPress={() => handleDeleteProject(item.id)}
//         >
//           <MaterialIcons name="delete" size={24} color="red" />
//         </TouchableOpacity>
//       </TouchableOpacity>
//     )}
//   />
//   {/* swathi */}
//   <View style={styles.buttonContainer}>

//   <TouchableOpacity style={styles.button} onPress={handleAddProject} disabled={route.params.userType !== 'admin'}>
//           <Text style={styles.buttonText}>Add Project</Text>
//        </TouchableOpacity>

//        <TouchableOpacity style={styles.button} onPress={handleSignOut}>
//           <Text style={styles.buttonText}>Sign Out</Text>
//        </TouchableOpacity>
//   </View>
//   {/* //changes end here */}
// </View>

//   );
// };



// {/* <View style={styles.container}>
//       <Text style={styles.title}>ProjectPro</Text>
//       <View style={styles.formContainer}>
//         <Text style={styles.label}>Email:</Text>
//         <TextInput
//           style={styles.input}
//           value={email}
//           onChangeText={setEmail}
//           placeholder="Enter your email"
//         />
//         <Text style={styles.label}>Password:</Text>
//         <TextInput
//           style={styles.input}
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry
//           placeholder="Enter your password"
//         />
//         <View style={styles.buttonContainer}>
//           <Button title="Login" onPress={handleLogin} />
//           <Button
//             title="Sign Up"
//             onPress={() => navigation.navigate('SignUp')}
//             color="#007AFF"
//           />
//         </View>
//       </View>
//     </View> */}


// const UserTaskListScreen = () => {
//   const [tasks, setTasks] = useState([]);

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const storedTasks = await AsyncStorage.getItem('tasks');
//         if (storedTasks) {
//           setTasks(JSON.parse(storedTasks));
//         }
//       } catch (error) {
//         console.error('Error occurred while fetching tasks:', error);
//       }
//     };

//     fetchTasks();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>User Task List</Text>
//       <FlatList
//         data={tasks}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.taskItem} key={item.id}>
//             <Text style={styles.taskItemText}>{item.name}</Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// const AddProjectScreen = ({ navigation, route }) => {
//   const [projectId, setProjectId] = useState('');
//   const [projectName, setProjectName] = useState('');
//   const [projectStartDate, setProjectStartDate] = useState('');
//   const [projectEndDate, setProjectEndDate] = useState('');
//   const [createdBy, setCreatedBy] = useState('');

//   useEffect(() => {
//     setCreatedBy(route.params.createdBy);
//   }, [route.params.createdBy]);

//   const handleAddProject = async () => {
//     if (
//       projectId.trim() &&
//       projectName.trim() &&
//       projectStartDate.trim() &&
//       projectEndDate.trim() &&
//       createdBy.trim()
//     ) {
//       const project = {
//         id: projectId,
//         name: projectName,
//         startDate: projectStartDate,
//         endDate: projectEndDate,
//         createdBy: createdBy,
//       };

//       try {
//         const storedProjects = await AsyncStorage.getItem('projects');
//         let projects = [];
//         if (storedProjects) {
//           projects = JSON.parse(storedProjects);
//         }
//         const updatedProjects = [...projects, project];
//         await AsyncStorage.setItem(
//           'projects',
//           JSON.stringify(updatedProjects)
//         );
//         navigation.goBack(); 
//         Alert.alert('Project added successfully');
//       } catch (error) {
//         console.error('Error occurred during project addition:', error);
//       }
//     } else {
//       Alert.alert('Please fill in all the project details');
//     }
//   };

//   return (
//     <KeyboardAvoidingView style={styles.container} behavior="padding">
//       <Text style={styles.title}>Add Project</Text>
//       <View style={styles.formContainer}>
//         <Text style={styles.label}>Project ID:</Text>
//         <TextInput
//           style={styles.input}
//           value={projectId}
//           onChangeText={setProjectId}
//           placeholder="Enter project ID"
//           placeholderTextColor="#888888" //swathi
//         />
//         <Text style={styles.label}>Project Name:</Text>
//         <TextInput
//           style={styles.input}
//           value={projectName}
//           onChangeText={setProjectName}
//           placeholder="Enter project name"
//           placeholderTextColor="#888888" //swathi
//         />
//        <Text style={styles.label}>Start Date:</Text>
// <DatePicker
//   style={styles.input}
//   date={projectStartDate}
//   locale="en"
//   androidVariant="iosClone"
//   onDateChange={setProjectStartDate}
//   mode="date"
//   placeholder="Select start date"
//   placeholderTextColor="#888888" //swathi
//   format="YYYY-MM-DD"
//   showIcon={false}
// />
// <Text style={styles.label}>End Date:</Text>
// <DatePicker
//   style={styles.input}
//   date={projectEndDate}
//   onDateChange={setProjectEndDate}
//   mode="date"
//   placeholder="Select end date"
//   placeholderTextColor="#888888" //swathi
//   format="YYYY-MM-DD"
//   showIcon={false}
// />

//         <Text style={styles.label}>Created By:</Text>
//         <TextInput
//           style={styles.input}
//           value={createdBy}
//           editable={false}
//         />
//         <View style={styles.buttonContainer}>
//         <TouchableOpacity style={styles.button} onPress={handleAddProject}>
//           <Text style={styles.buttonText}>Add Project</Text>
//        </TouchableOpacity>

//         </View>
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// const TaskListScreen = ({ navigation, route }) => {
//   const { selectedProject } = route.params;
//   const [tasks, setTasks] = useState([]);

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const storedTasks = await AsyncStorage.getItem('tasks');
//         if (storedTasks) {
//           const allTasks = JSON.parse(storedTasks);
//           const filteredTasks = selectedProject
//             ? allTasks.filter(
//                 (task) => task.projectId === selectedProject.id
//               )
//             : [];
//           setTasks(filteredTasks);
//         }
//       } catch (error) {
//         console.error('Error occurred while fetching tasks:', error);
//       }
//     };

//     fetchTasks();
//   }, [selectedProject]);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Tasks</Text>
//       <FlatList
//         data={tasks}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.taskItem} key={item.id}>
//             <Text style={styles.taskItemText}>{item.name}</Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// const AddTaskScreen = ({ navigation, route }) => {
//   const { project } = route.params;
//   const [taskId, setTaskId] = useState('');
//   const [taskName, setTaskName] = useState('');
//   const [taskDescription, setTaskDescription] = useState('');
//   const [taskStartDate, setTaskStartDate] = useState('');
//   const [taskEndDate, setTaskEndDate] = useState('');
//   const [assigneeEmail, setAssigneeEmail] = useState('');
//   const [hourRate, setHourRate] = useState('');

//   const handleAddTaskToDB = async () => {
//     if (taskId.trim() && taskName.trim()) {
//       const task = {
//         id: taskId,
//         name: taskName,
//         description: taskDescription,
//         startDate: taskStartDate,
//         endDate: taskEndDate,
//         projectId: project.id,
//         assignees: [{ email: assigneeEmail, hourRate: hourRate }],
//       };

//       try {
//         const storedTasks = await AsyncStorage.getItem('tasks');
//         let tasks = [];
//         if (storedTasks) {
//           tasks = JSON.parse(storedTasks);
//         }

//         const existingTask = tasks.find(
//           (t) => t.id === taskId && t.projectId === project.id
//         );

//         if (existingTask) {
//           Alert.alert('Task with the same ID already exists in this project');
//           return;
//         }

//         const updatedTasks = [...tasks, task];
//         await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
//         navigation.goBack();
//         Alert.alert('Task added successfully');
//       } catch (error) {
//         console.error('Error occurred during task addition:', error);
//       }
//     } else {
//       Alert.alert('Please fill in all the task details');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Add Task</Text>
//       <View style={styles.formContainer}>
//         <Text style={styles.label}>Task ID:</Text>
//         <TextInput
//           style={styles.input}
//           value={taskId}
//           onChangeText={setTaskId}
//           placeholder="Enter task ID"
//           placeholderTextColor="#888888" //swathi
//         />
//         <Text style={styles.label}>Task Name:</Text>
//         <TextInput
//           style={styles.input}
//           value={taskName}
//           onChangeText={setTaskName}
//           placeholder="Enter task name"
//           placeholderTextColor="#888888" //swathi
//         />
//         <Text style={styles.label}>Task Description:</Text>
//         <TextInput
//           style={styles.input}
//           value={taskDescription}
//           onChangeText={setTaskDescription}
//           placeholder="Enter task description"
//           placeholderTextColor="#888888" //swathi
//         />
//        <Text style={styles.label}>Start Date:</Text>
// <DatePicker
//   style={styles.input}
//   date={taskStartDate}
//   onDateChange={setTaskStartDate}
//   mode="date"
//   placeholder="Select start date"
//   placeholderTextColor="#888888" //swathi
//   format="YYYY-MM-DD"
//   showIcon={false}
// />
// <Text style={styles.label}>End Date:</Text>
// <DatePicker
//   style={styles.input}
//   date={taskEndDate}
//   onDateChange={setTaskEndDate}
//   mode="date"
//   placeholder="Select end date"
//   placeholderTextColor="#888888" //swathi
//   format="YYYY-MM-DD"
//   showIcon={false}
// />

//         <Text style={styles.label}>Assignee Email:</Text>
//         <TextInput
//           style={styles.input}
//           value={assigneeEmail}
//           onChangeText={setAssigneeEmail}
//           placeholder="Enter assignee email"
//           placeholderTextColor="#888888" //swathi
//         />
//         <Text style={styles.label}>Hourly Rate:</Text>
//         <TextInput
//           style={styles.input}
//           value={hourRate}
//           onChangeText={setHourRate}
//           placeholder="Enter hourly rate"
//           placeholderTextColor="#888888" //swathi
//           keyboardType="numeric"
//         />
        
//         <View style={styles.buttonContainer}>
//           {/* swathi */}
//         <TouchableOpacity style={styles.button} onPress={handleAddTaskToDB}>
//           <Text style={styles.buttonText}>Add Task</Text>
//        </TouchableOpacity>
//           {/* changes end here */}
//         </View>
//       </View>
//     </View>
//   );
// };

// const ProjectDetailsScreen = ({ navigation, route }) => {
//   const { project } = route.params;

//   const handleViewTasks = () => {
//     navigation.navigate('TaskList', { selectedProject: project });
//   };

//   const handleAddTask = () => {
//     navigation.navigate('AddTask', { project });
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Project Details</Text>
//       <View style={styles.projectContainer}>
//         <Text style={styles.projectId}>Project ID: {project.id}</Text>
//         <Text style={styles.projectName}>Project Name: {project.name}</Text>
//         <Text style={styles.projectDate}>
//           Start Date: {project.startDate}
//         </Text>
//         <Text style={styles.projectDate}>End Date: {project.endDate}</Text>
//       </View >
//       {/* swathi */}
//       <View style={styles.buttonContainer}>
//       <TouchableOpacity style={styles.button} onPress={handleViewTasks}>
//           <Text style={styles.buttonText}>View Tasks</Text>
//        </TouchableOpacity>
//        <TouchableOpacity style={styles.button} onPress={handleAddTask}>
//           <Text style={styles.buttonText}>Add Task</Text>
//        </TouchableOpacity>

//       {/* <Button title="View Tasks" onPress={handleViewTasks} />
//       <Button title="Add Task" onPress={handleAddTask} /> */}
//       </View>
//       {/* changes end here */}
//     </View>
//   );
// };

// const Stack = createStackNavigator();

// const App = () => {
//   const [selectedProject, setSelectedProject] = useState(null);

//   return (
//     <NavigationContainer theme={MyTheme}>
//       {/* swathi */}
//       <Stack.Navigator 
//        screenOptions={{
//         headerStyle: {
//           backgroundColor: '#444444', // Set the background color of the header
//         },
//       }}
//       >
//         {/* hange end here */}
//         <Stack.Screen name="Login" component={LoginScreen} />
//         <Stack.Screen name="SignUp" component={SignUpScreen} />
//         <Stack.Screen name="Home">
//           {(props) => (
//             <HomeScreen
//               {...props}
//               setSelectedProject={setSelectedProject}
//             />
//           )}
//         </Stack.Screen>
//         <Stack.Screen name="UserTaskList" component={UserTaskListScreen} />
//         <Stack.Screen name="AddProject" component={AddProjectScreen} />
//         <Stack.Screen name="ProjectDetails" component={ProjectDetailsScreen} />
//         <Stack.Screen
//           name="TaskList"
//           component={TaskListScreen}
//           options={{ title: 'Tasks' }}
//         />
//         <Stack.Screen name="AddTask" component={AddTaskScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };


// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     padding: 16,
// //   },
// //   title: {
// //     fontSize: 24,
// //     fontWeight: 'bold',
// //     marginBottom: 24,
// //   },
// //   formContainer: {
// //     width: '100%',
// //   },
// //   label: {
// //     fontSize: 16,
// //     marginBottom: 8,
// //   },
// //   input: {
// //     borderWidth: 1,
// //     borderColor: 'gray',
// //     borderRadius: 4,
// //     padding: 8,
// //     marginBottom: 16,
// //   },
// //   buttonContainer: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-around',
// //   },
// //   taskItem: {
// //     borderWidth: 1,
// //     borderColor: 'gray',
// //     borderRadius: 4,
// //     padding: 8,
// //     marginBottom: 8,
// //   },
// //   taskItemText: {
// //     fontSize: 14,
// //   },
// //   projectContainer: {
// //     borderWidth: 1,
// //     borderColor: 'gray',
// //     borderRadius: 4,
// //     padding: 16,
// //     marginBottom: 16,
// //   },
// //   projectId: {
// //     fontSize: 16,
// //     fontWeight: 'bold',
// //   },
// //   projectName: {
// //     fontSize: 14,
// //     marginBottom: 8,
// //   },
// //   projectDate: {
// //     fontSize: 14,
// //   },
// // });

//  export default App;

// //  ---------------------------deep
// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { DefaultTheme, NavigationContainer, useFocusEffect, useRoute } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { TouchableOpacity } from 'react-native';
// import { MaterialIcons } from '@expo/vector-icons';
// import DatePicker from 'react-native-datepicker';
// import styles from './style';

// //swathi
// const MyTheme = {
//   ...DefaultTheme,
//   colors: {
//     ...DefaultTheme.colors,
//     background: '#000000', // Set the background color of the header
//     primary: '#000000',
//     text: '#444444', // Set the color of the header text and buttons
//     headerTint: '#FF0000', // Set the color of the back button
//   },
// }
// //changes end here

// const LoginScreen = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = () => {
//     if (email === 'Admin1' && password === 'Admin1') {
//       navigation.navigate('Home', { userType: 'admin', createdBy: email });
//     } else if (email === 'Admin2' && password === 'Admin2') {
//       navigation.navigate('Home', { userType: 'admin', createdBy: email });
//     } else if (email === 'User1' && password === 'User1') {
//       navigation.navigate('UserTaskList', { userType: 'user', userEmail: email });
//     } else if (email === 'User2' && password === 'User2') {
//       navigation.navigate('UserTaskList', { userType: 'user', userEmail: email });
//     } else {
//       Alert.alert('Invalid credentials');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Project Management System</Text>
//       <View style={styles.formContainer}>
//         <Text style={styles.label}>Email:</Text>
//         <TextInput
//           style={styles.input}
//           value={email}
//           onChangeText={setEmail}
//           placeholder="Enter your email"
//           placeholderTextColor="#888888" //swathi
//         />
//         <Text style={styles.label}>Password:</Text>
//         <TextInput
//           style={styles.input}
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry
//           placeholder="Enter your password"
//           placeholderTextColor="#888888" //swathi
//         />
//         {/* swathi */}
//        <View style={styles.buttonContainer}>
//         <TouchableOpacity style={styles.button} onPress={handleLogin}>
//           <Text style={styles.buttonText}>Login</Text>
//        </TouchableOpacity>
//       <TouchableOpacity
//           style={[styles.button]}
//           onPress={() => navigation.navigate('SignUp')}
//        >
//       <Text style={styles.buttonText}>Sign Up</Text>
//             </TouchableOpacity>
//       </View>
// {/* changes end here */}
//       </View>
//     </View>
//   );
// };

// const SignUpScreen = ({ navigation }) => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSignUp = async () => {
//     try {
//       await AsyncStorage.setItem('name', name);
//       await AsyncStorage.setItem('email', email);
//       await AsyncStorage.setItem('password', password);
//       navigation.navigate('Login');
//     } catch (error) {
//       console.error('Error occurred during sign up:', error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Sign Up</Text>
//       <View style={styles.formContainer}>
//         <Text style={styles.label}>Name:</Text>
//         <TextInput
//           style={styles.input}
//           value={name}
//           onChangeText={setName}
//           placeholder="Enter your name"
//         />
//         <Text style={styles.label}>Email:</Text>
//         <TextInput
//           style={styles.input}
//           value={email}
//           onChangeText={setEmail}
//           placeholder="Enter your email"
//         />
//         <Text style={styles.label}>Password:</Text>
//         <TextInput
//           style={styles.input}
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry
//           placeholder="Enter your password"
//         />
//         <View style={styles.buttonContainer}>
//           <Button title="Sign Up" onPress={handleSignUp} />
//         </View>
//       </View>
//     </View>
//   );
// };

// const HomeScreen = ({ navigation, route }) => {
//   const [projects, setProjects] = useState([]);

//   useFocusEffect(
//     React.useCallback(() => {
//       const fetchProjects = async () => {
//         try {
//           const storedProjects = await AsyncStorage.getItem('projects');
//           if (storedProjects) {
//             setProjects(JSON.parse(storedProjects));
//           }
//         } catch (error) {
//           console.error('Error occurred while fetching projects:', error);
//         }
//       };

//       fetchProjects();
//     }, [])
//   );

//   const handleSignOut = async () => {
//     try {
//       await AsyncStorage.multiRemove(['name', 'email', 'password']);
//       navigation.navigate('Login');
//     } catch (error) {
//       console.error('Error occurred during sign out:', error);
//     }
//   };

//   const handleAddProject = () => {
//     navigation.navigate('AddProject', { createdBy: route.params.createdBy });
//   };

//   const handleDeleteProject = async (id) => {
//     Alert.alert(
//       'Confirmation',
//       'Are you sure you want to delete this project?',
//       [
//         {
//           text: 'Cancel',
//           style: 'cancel',
//         },
//         {
//           text: 'Confirm',
//           onPress: async () => {
//             try {
//               const storedProjects = await AsyncStorage.getItem('projects');
//               let projects = [];
//               if (storedProjects) {
//                 projects = JSON.parse(storedProjects);
//               }
//               const updatedProjects = projects.filter(
//                 (project) => project.id !== id
//               );
//               await AsyncStorage.setItem(
//                 'projects',
//                 JSON.stringify(updatedProjects)
//               );
//               setProjects(updatedProjects);
//               Alert.alert('Project deleted successfully');
//             } catch (error) {
//               console.error(
//                 'Error occurred while deleting project:',
//                 error
//               );
//             }
//           },
//         },
//       ]
//     );
//   };

//   const handleSelectProject = (project) => {
//     navigation.navigate('ProjectDetails', { project: project });
//   };

//   const renderProjectItem = ({ item }) => (
//     <TouchableOpacity
//       style={styles.projectItemContainer}
//       onPress={() => handleSelectProject(item)}
//     >
//       <Text style={styles.projectItemName}>{item.name}</Text>
//       <Text style={styles.projectItemDate}>
//         Start Date: {item.startDate} | End Date: {item.endDate}
//       </Text>
//       <TouchableOpacity onPress={() => handleDeleteProject(item.id)}>
//         <MaterialIcons name="delete" size={24} color="red" />
//       </TouchableOpacity>
//     </TouchableOpacity>
//   );

//   return (
    
//     <View style={styles.container}>
//   <Text style={styles.title}>Projects</Text>
//   <FlatList
//     data={projects}
//     keyExtractor={(item) => item.id}
//     renderItem={({ item }) => (
//       <TouchableOpacity
//         style={styles.projectItemContainer}
//         onPress={() => handleSelectProject(item)}
//       >
//         <View style={styles.projectInfoContainer}>
//           <Text style={styles.label}>{item.name}</Text>
//           <Text style={styles.label}>
//             {item.startDate} - {item.endDate}
//           </Text>
//         </View>
//         <TouchableOpacity
//           style={styles.deleteButtonContainer}
//           onPress={() => handleDeleteProject(item.id)}
//         >
//           <MaterialIcons name="delete" size={24} color="red" />
//         </TouchableOpacity>
//       </TouchableOpacity>
//     )}
//   />
//   {/* swathi */}
//     {/* swathi */}
//   <View style={styles.buttonContainer}>

// <TouchableOpacity style={styles.button} onPress={handleAddProject} disabled={route.params.userType !== 'admin'}>
//         <Text style={styles.buttonText}>Add Project</Text>
//      </TouchableOpacity>

//      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
//         <Text style={styles.buttonText}>Sign Out</Text>
//      </TouchableOpacity>
// </View>
// {/* //changes end here */}
//     </View>
//   );
// };

// const UserTaskListScreen = ({ route }) => {
//   const [tasks, setTasks] = useState([]);
//   const [hoursWorked, setHoursWorked] = useState('');
//   const userEmail = route.params.userEmail;

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const storedTasks = await AsyncStorage.getItem('tasks');
//         if (storedTasks) {
//           const allTasks = JSON.parse(storedTasks);
//           const filteredTasks = allTasks.filter(
//             (task) => task.assignees.some((assignee) => assignee.email === userEmail)
//           );
//           setTasks(filteredTasks);
//         }
//       } catch (error) {
//         console.error('Error occurred while fetching tasks:', error);
//       }
//     };

//     fetchTasks();
//   }, [userEmail]);

//   const handleAddHours = async (taskId) => {
//     if (hoursWorked === '') {
//       Alert.alert('Please enter the number of hours worked');
//       return;
//     }

//     try {
//       const storedTasks = await AsyncStorage.getItem('tasks');
//       let tasks = [];
//       if (storedTasks) {
//         tasks = JSON.parse(storedTasks);
//       }

//       const updatedTasks = tasks.map((task) => {
//         if (task.id === taskId) {
//           const updatedAssignees = task.assignees.map((assignee) => {
//             if (assignee.email === userEmail) {
//               return {
//                 ...assignee,
//                 hoursWorked: assignee.hoursWorked ? assignee.hoursWorked + parseFloat(hoursWorked) : parseFloat(hoursWorked),
//               };
//             }
//             return assignee;
//           });

//           return { ...task, assignees: updatedAssignees };
//         }
//         return task;
//       });

//       await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
//       setTasks(updatedTasks);
//       setHoursWorked('');
//       Alert.alert('Hours added successfully');
//     } catch (error) {
//       console.error('Error occurred while adding hours:', error);
//     }
//   };

//   const handleCompleteTask = async (taskId) => {
//     try {
//       const storedTasks = await AsyncStorage.getItem('tasks');
//       let tasks = [];
//       if (storedTasks) {
//         tasks = JSON.parse(storedTasks);
//       }
  
//       const updatedTasks = tasks.map((task) => {
//         if (task.id === taskId && task.assignees.some((assignee) => assignee.email === userEmail)) {
//           const updatedAssignees = task.assignees.map((assignee) => {
//             if (assignee.email === userEmail) {
//               return {
//                 ...assignee,
//                 hoursWorked: assignee.hoursWorked ? assignee.hoursWorked : 0,
//               };
//             }
//             return assignee;
//           });
  
//           return { ...task, assignees: updatedAssignees, status: 'Task Completed' };
//         }
//         return task;
//       });
  
//       await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
//       setTasks(updatedTasks);
//       Alert.alert('Task completed successfully');
//     } catch (error) {
//       console.error('Error occurred while completing task:', error);
//     }
//   };
  
//   const renderItem = ({ item }) => {
//     const isTaskCompleted = item.status === 'Task Completed';
//     const statusText = isTaskCompleted ? 'Task Completed' : 'In Progress';
  
//     return (
//       <View style={styles.taskItem} key={item.id}>
//         <Text style={styles.taskItemText}>Task Name: {item.name}</Text>
//         <Text style={styles.taskItemText}>Start Date: {item.startDate}</Text>
//         <Text style={styles.taskItemText}>End Date: {item.endDate}</Text>
//         <Text style={styles.taskItemText}>Project ID: {item.projectId}</Text>
//         <Text style={styles.taskItemText}>Status: {statusText}</Text>
//         <View style={styles.hoursContainer}>
//           <Text style={styles.taskItemText}>Hours Worked:</Text>
//           {item.assignees.map((assignee) => (
//             <Text style={styles.taskItemText} key={assignee.email}>
//               - {assignee.email}: {assignee.hoursWorked || 0} hours
//             </Text>
//           ))}
//         </View>
//         <View style={styles.buttonContainer}>
//           <TextInput
//             style={[styles.input, isTaskCompleted && styles.disabledInput]}
//             value={hoursWorked}
//             onChangeText={setHoursWorked}
//             placeholder="Enter hours worked"
//             keyboardType="numeric"
//             editable={!isTaskCompleted}
//           />
//           <TouchableOpacity
//             style={[styles.button, isTaskCompleted && styles.disabledButton]}
//             onPress={() => handleAddHours(item.id)}
//             disabled={isTaskCompleted}
//           >
//             <Text style={styles.buttonText}>Add Hours</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.button, isTaskCompleted && styles.disabledButton]}
//             onPress={() => handleCompleteTask(item.id)}
//             disabled={isTaskCompleted}
//           >
//             <Text style={styles.buttonText}>Complete Task</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   };
  
  

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>User Task List</Text>
//       <FlatList
//         data={tasks}
//         keyExtractor={(item) => item.id}
//         renderItem={renderItem}
//       />
//     </View>
//   );
// };




// const AddProjectScreen = ({ navigation, route }) => {
//   const [projectId, setProjectId] = useState('');
//   const [projectName, setProjectName] = useState('');
//   const [projectStartDate, setProjectStartDate] = useState('');
//   const [projectEndDate, setProjectEndDate] = useState('');
//   const [createdBy, setCreatedBy] = useState('');

//   useEffect(() => {
//     setCreatedBy(route.params.createdBy);
//   }, [route.params.createdBy]);

//   const handleAddProject = async () => {
//     if (
//       projectId.trim() &&
//       projectName.trim() &&
//       projectStartDate.trim() &&
//       projectEndDate.trim() &&
//       createdBy.trim()
//     ) {
//       const project = {
//         id: projectId,
//         name: projectName,
//         startDate: projectStartDate,
//         endDate: projectEndDate,
//         createdBy: createdBy,
//       };

//       try {
//         const storedProjects = await AsyncStorage.getItem('projects');
//         let projects = [];
//         if (storedProjects) {
//           projects = JSON.parse(storedProjects);
//         }
//         const updatedProjects = [...projects, project];
//         await AsyncStorage.setItem(
//           'projects',
//           JSON.stringify(updatedProjects)
//         );
//         navigation.goBack();
//         Alert.alert('Project added successfully');
//       } catch (error) {
//         console.error('Error occurred during project addition:', error);
//       }
//     } else {
//       Alert.alert('Please fill in all the project details');
//     }
//   };

//   return (
//     <KeyboardAvoidingView style={styles.container} behavior="padding">
//       <Text style={styles.title}>Add Project</Text>
//       <View style={styles.formContainer}>
//         <Text style={styles.label}>Project ID:</Text>
//         <TextInput
//           style={styles.input}
//           value={projectId}
//           onChangeText={setProjectId}
//           placeholder="Enter project ID"
//           placeholderTextColor="#888888" //swathi
//         />
//         <Text style={styles.label}>Project Name:</Text>
//         <TextInput
//           style={styles.input}
//           value={projectName}
//           onChangeText={setProjectName}
//           placeholder="Enter project name"
//           placeholderTextColor="#888888" //swathi
//         />
//         <Text style={styles.label}>Start Date:</Text>
//         <TextInput
//           style={styles.input}
//           value={projectStartDate}
//           onChangeText={setProjectStartDate}
//           placeholder="Enter start date"
//           placeholderTextColor="#888888" //swathi
//         />
//         {/* <DatePicker
//           style={styles.input}
//           date={projectStartDate}
//           locale="en"
//           androidVariant="iosClone"
//           onDateChange={setProjectStartDate}
//           mode="date"
//           placeholder="Select start date"
//           format="YYYY-MM-DD"
//           showIcon={false} */}
//         {/* /> */}
//         <Text style={styles.label}>End Date:</Text>
//         <TextInput
//           style={styles.input}
//           value={projectEndDate}
//           onChangeText={setProjectEndDate}
//           placeholder="Enter end date"
//           placeholderTextColor="#888888" //swathi
//         />
//         {/* <DatePicker
//           style={styles.input}
//           date={projectEndDate}
//           onDateChange={setProjectEndDate}
//           mode="date"
//           placeholder="Select end date"
//           format="YYYY-MM-DD"
//           showIcon={false}
//         /> */}

//         <Text style={styles.label}>Created By:</Text>
//         <TextInput
//           style={styles.input}
//           value={createdBy}
//           editable={false}
//         />
//         <View style={styles.buttonContainer}>
//         <TouchableOpacity style={styles.button} onPress={handleAddProject} disabled={route.params.userType !== 'admin'}>
//           <Text style={styles.buttonText}>Add Project</Text>
//        </TouchableOpacity>
//         </View>
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// const TaskListScreen = ({ route }) => {
//   const { selectedProject } = route.params;
//   const [tasks, setTasks] = useState([]);

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const storedTasks = await AsyncStorage.getItem('tasks');
//         if (storedTasks) {
//           const allTasks = JSON.parse(storedTasks);
//           const filteredTasks = allTasks.filter((task) => task.projectId === selectedProject.id);
//           setTasks(filteredTasks);
//         }
//       } catch (error) {
//         console.error('Error occurred while fetching tasks:', error);
//       }
//     };

//     fetchTasks();
//   }, [selectedProject]);

//   const calculateTotalCost = (task) => {
//     if (task.status === 'Task Completed') {
//       const totalHours = task.assignees.reduce((total, assignee) => {
//         return total + (assignee.hoursWorked || 0);
//       }, 0);
//       const hourlyRate = task.assignees[0].hourRate || 0;
//       return totalHours * hourlyRate;
//     } else {
//       return 0;
//     }
//   };

//   const renderItem = ({ item }) => {
//     const totalCost = calculateTotalCost(item);
//     const totalHours = item.assignees.reduce((total, assignee) => {
//       return total + (assignee.hoursWorked || 0);
//     }, 0);
//     const hourlyRate = item.assignees[0].hourRate || 0;
  
//     return (
//       <View style={styles.taskItem} key={item.id}>
//         <Text style={styles.taskItemText}>Task ID: {item.id}</Text>
//         <Text style={styles.taskItemText}>Task Name: {item.name}</Text>
//         <Text style={styles.taskItemText}>Description: {item.description}</Text>
//         <Text style={styles.taskItemText}>Start Date: {item.startDate}</Text>
//         <Text style={styles.taskItemText}>End Date: {item.endDate}</Text>
//         <Text style={styles.taskItemText}>Status: {item.status}</Text>
//         {item.assignees.map((assignee) => (
//           <Text style={styles.taskItemText} key={assignee.email}>
//             Assigned User Email: {assignee.email}
//           </Text>
//         ))}
//         <Text style={styles.taskItemText}>Total Hours: {totalHours}</Text>
//         <Text style={styles.taskItemText}>Hourly Rate: {hourlyRate}</Text>
//         <Text style={styles.taskItemText}>Total Cost: {totalCost}</Text>
//       </View>
//     );
//   };
  

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Tasks</Text>
//       <FlatList
//         data={tasks}
//         keyExtractor={(item) => item.id}
//         renderItem={renderItem}
//       />
//     </View>
//   );
// };

// const AddTaskScreen = ({ navigation, route }) => {
//   const { project } = route.params;
//   const [taskId, setTaskId] = useState('');
//   const [taskName, setTaskName] = useState('');
//   const [taskDescription, setTaskDescription] = useState('');
//   const [taskStartDate, setTaskStartDate] = useState('');
//   const [taskEndDate, setTaskEndDate] = useState('');
//   const [assigneeEmail, setAssigneeEmail] = useState('');
//   const [hourRate, setHourRate] = useState('');

//   const handleAddTaskToDB = async () => {
//     if (taskId.trim() && taskName.trim()) {
//       const task = {
//         id: taskId,
//         name: taskName,
//         description: taskDescription,
//         startDate: taskStartDate,
//         endDate: taskEndDate,
//         projectId: project.id,
//         assignees: [{ email: assigneeEmail, hourRate: hourRate }],
//       };

//       try {
//         const storedTasks = await AsyncStorage.getItem('tasks');
//         let tasks = [];
//         if (storedTasks) {
//           tasks = JSON.parse(storedTasks);
//         }

//         const existingTask = tasks.find(
//           (t) => t.id === taskId && t.projectId === project.id
//         );

//         if (existingTask) {
//           Alert.alert('Task with the same ID already exists in this project');
//           return;
//         }

//         const updatedTasks = [...tasks, task];
//         await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
//         navigation.goBack();
//         Alert.alert('Task added successfully');
//       } catch (error) {
//         console.error('Error occurred during task addition:', error);
//       }
//     } else {
//       Alert.alert('Please fill in all the task details');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Add Task</Text>
//       <View style={styles.formContainer}>
//         <Text style={styles.label}>Task ID:</Text>
//         <TextInput
//           style={styles.input}
//           value={taskId}
//           onChangeText={setTaskId}
//           placeholder="Enter task ID"
//           placeholderTextColor="#888888" 
//         />
//         <Text style={styles.label}>Task Name:</Text>
//         <TextInput
//           style={styles.input}
//           value={taskName}
//           onChangeText={setTaskName}
//           placeholder="Enter task name"
//           placeholderTextColor="#888888" 
//         />
//         <Text style={styles.label}>Task Description:</Text>
//         <TextInput
//           style={styles.input}
//           value={taskDescription}
//           onChangeText={setTaskDescription}
//           placeholder="Enter task description"
//           placeholderTextColor="#888888" 
//         />
//         <Text style={styles.label}>Start Date:</Text>
//         <TextInput
//           style={styles.input}
//           value={taskStartDate}
//           onChangeText={setTaskStartDate}
//           placeholder="Select start date"
//           placeholderTextColor="#888888" 
//         />
//         {/* <DatePicker
//           style={styles.input}
//           date={taskStartDate}
//           onDateChange={setTaskStartDate}
//           mode="date"
//           placeholder="Select start date"
//           format="YYYY-MM-DD"
//           showIcon={false}
//         /> */}
//         <Text style={styles.label}>End Date:</Text>
//         <TextInput
//           style={styles.input}
//           value={taskEndDate}
//           onChangeText={setTaskEndDate}
//           placeholder="Select end date"
//           placeholderTextColor="#888888" 
//         />
//         {/* <DatePicker
//           style={styles.input}
//           date={taskEndDate}
//           onDateChange={setTaskEndDate}
//           mode="date"
//           placeholder="Select end date"
//           format="YYYY-MM-DD"
//           showIcon={false}
//         /> */}

//         <Text style={styles.label}>Assignee Email:</Text>
//         <TextInput
//           style={styles.input}
//           value={assigneeEmail}
//           onChangeText={setAssigneeEmail}
//           placeholder="Enter assignee email"
//           placeholderTextColor="#888888" 
//         />
//         <Text style={styles.label}>Hourly Rate:</Text>
//         <TextInput
//           style={styles.input}
//           value={hourRate}
//           onChangeText={setHourRate}
//           placeholder="Enter hourly rate"
//           placeholderTextColor="#888888" 
//           keyboardType="numeric"
//         />
//         <View style={styles.buttonContainer}>
//         <TouchableOpacity style={styles.button} onPress={handleAddTaskToDB}>
//           <Text style={styles.buttonText}>Add Task</Text>
//        </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };

// const ProjectDetailsScreen = ({ navigation, route }) => {
//   const { project } = route.params;

//   const handleViewTasks = () => {
//     navigation.navigate('TaskList', { selectedProject: project });
//   };

//   const handleAddTask = () => {
//     navigation.navigate('AddTask', { project });
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Project Details</Text>
//       <View style={styles.projectContainer}>
//         <Text style={styles.projectId}>Project ID: {project.id}</Text>
//         <Text style={styles.projectName}>Project Name: {project.name}</Text>
//         <Text style={styles.projectDate}>
//           Start Date: {project.startDate}
//         </Text>
//         <Text style={styles.projectDate}>End Date: {project.endDate}</Text>
//       </View>
//       {/* swathi */}
//       <View style={styles.buttonContainer}>
//       <TouchableOpacity style={styles.button} onPress={handleViewTasks}>
//           <Text style={styles.buttonText}>View Tasks</Text>
//        </TouchableOpacity>
//        <TouchableOpacity style={styles.button} onPress={handleAddTask}>
//           <Text style={styles.buttonText}>Add Task</Text>
//        </TouchableOpacity>

//       {/* <Button title="View Tasks" onPress={handleViewTasks} />
//       <Button title="Add Task" onPress={handleAddTask} /> */}
//       </View>
//       {/* changes end here */}
//     </View>
//   );
// };

// const Stack = createStackNavigator();

// const App = () => {
//   const [selectedProject, setSelectedProject] = useState(null);

//   return (
//     <NavigationContainer>
//       {/* swathi */}
//       <Stack.Navigator 
//        screenOptions={{
//         headerStyle: {
//           backgroundColor: '#444444', // Set the background color of the header
//         },
//       }}
//       >
//         {/* hange end here */}
//         <Stack.Screen name="Login" component={LoginScreen} />
//         <Stack.Screen name="SignUp" component={SignUpScreen} />
//         <Stack.Screen name="Home">
//           {(props) => (
//             <HomeScreen {...props} setSelectedProject={setSelectedProject} />
//           )}
//         </Stack.Screen>
//         <Stack.Screen name="UserTaskList" component={UserTaskListScreen} />
//         <Stack.Screen name="AddProject" component={AddProjectScreen} />
//         <Stack.Screen name="ProjectDetails" component={ProjectDetailsScreen} />
//         <Stack.Screen
//           name="TaskList"
//           component={TaskListScreen}
//           options={{ title: 'Tasks' }}
//         />
//         <Stack.Screen name="AddTask" component={AddTaskScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };



// // const styles = StyleSheet.create({
// //   LoginContainer: {
// //     flex: 1,
// //     backgroundColor: '#000000',
// //     paddingHorizontal: 20,
// //     paddingTop: 20,
// //     marginBottom: 60,
// //     alignItems: 'center', // Center items horizontally
// //     justifyContent: 'center', // Center items vertically
// //   },
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#000000',
// //     paddingHorizontal: 20,
// //     paddingTop: 20,
// //     marginBottom: 60,
// //   },
// //   title: {
// //     fontSize: 28,
// //     fontWeight: 'bold',
// //     marginBottom: 24,
// //     marginTop:10,
// //     color: '#FFFFFF',
// //     fontFamily: 'System',
// //     textAlign: 'center',
// //   },
// //   formContainer: {
// //     width: '100%',
// //   },
// //   label: {
// //     fontSize: 12,
// //     marginBottom: 8,
// //     color: '#FFFFFF',
// //     fontFamily: 'System',
// //   },
// //   input: {
// //     borderWidth: 1,
// //     borderColor: '#CCCCCC',
// //     borderRadius: 4,
// //     padding: 14,
// //     marginBottom: 16,
// //     color: '#FFFFFF',
// //     fontFamily: 'System',
// //     height: 40,
// //   },
// //   buttonContainer: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-around',
// //     marginTop: 20,
// //     marginBottom: 40,
// //   },
  
// //   button: {
// //     backgroundColor: '#333333', // Set the background color of the buttons
// //     padding: 10,
// //     borderRadius: 5000, 
// //   },
  
// //   buttonText: {
// //     color: '#FFFFFF', // Set the text color of the buttons
// //     fontSize: 16,
// //     fontWeight: 'bold',
// //     fontFamily: 'System',
// //   },

// // //   buttonContainer: {
// // //     flexDirection: 'row',
// // //     justifyContent: 'space-around',
// // //     marginTop: 20,
// // //     marginBottom: 40,
// // //     backgroundColor: '#333333',
// // //     padding: 10,
// // //     borderRadius: 5000,
// // //     color: '#FFFFFF', // Set the text color of the buttons
// // //     fontSize: 16,
// // //     fontWeight: 'bold',
// // //   },
  
  
// //   taskItem: {
// //     borderWidth: 1,
// //     borderColor: '#CCCCCC',
// //     borderRadius: 4,
// //     padding: 16,
// //     marginBottom: 16,
// //     backgroundColor: '#222222',
// //   },
// //   taskItemText: {
// //     fontSize: 16,
// //     color: '#FFFFFF',
// //     fontFamily: 'System',
// //   },
// //   projectContainer: {
// //     borderWidth: 1,
// //     borderColor: '#CCCCCC',
// //     borderRadius: 4,
// //     padding: 20,
// //     marginBottom: 50,
// //     backgroundColor: '#222222',
// //   },
// //   projectId: {
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //     color: '#FFFFFF',
// //     fontFamily: 'System',
// //   },
// //   projectName: {
// //     fontSize: 16,
// //     marginBottom: 12,
// //     color: '#FFFFFF',
// //     fontFamily: 'System',
// //   },
// //   projectDate: {
// //     fontSize: 16,
// //     color: '#FFFFFF',
// //     fontFamily: 'System',
// //   },
// //   projectItemContainer: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'space-between',
// //     marginBottom: 20,
// //     marginTop: 10,
// //   },
// //   projectInfoContainer: {
// //     flex: 1,
// //   },
// //   deleteButtonContainer: {
// //     marginLeft: 12,
// //   },
  
// // });


// export default App;
