// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard, ImageBackground } from 'react-native';
// import styles from './style';

// const UserTaskListScreen = ({ route }) => {
//   const [tasks, setTasks] = useState([]);
//   const [hoursWorked, setHoursWorked] = useState('');
//   const userEmail = route.params.userEmail;
//   console.log("Testing the userEmail data ", userEmail)
//   //route.params.userEmail

//   useEffect(() => {
//     fetchUserTasks(userEmail);
//   }, [userEmail]);

//   const fetchUserTasks = async (userEmail) => {
//     try {
//       const response = await fetch(`http://localhost:3000/api/tasks/${userEmail}`);
//       const data = await response.json();
//       if (data.success) {
//         setTasks(data.tasks);
//         console.log("Fetched information",data.tasks)
//       } else {
//         console.error('Failed to fetch tasks:', data.message);
//       }
//     } catch (error) {
//       console.error('Error fetching tasks:', error);
//     }
//   };

//   const handleAddHours = async (taskId) => {
//     if (hoursWorked === '') {
//       Alert.alert('Enter number of hours worked');
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:3000/api/addHours', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           taskId,
//           userEmail,
//           hoursWorked: parseFloat(hoursWorked),
//         }),
//       });

//       const data = await response.json();
//       if (data.success) {
//         fetchUserTasks(userEmail);
//         setHoursWorked('');
//         Alert.alert('Hours added successfully');
//       } else {
//         Alert.alert('Failed to add hours. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error adding hours:', error);
//       Alert.alert('Failed to add hours. Please try again.');
//     }
//   };

//   const handleCompleteTask = async (taskId) => {
//     try {
//       const response = await fetch('http://localhost:3000/api/completeTask', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           taskId,
//           userEmail,
//         }),
//       });

//       const data = await response.json();
//       if (data.success) {
//         fetchUserTasks(userEmail);
//         Alert.alert('Task completed successfully');
//       } else {
//         Alert.alert('Failed to complete the task. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error completing task:', error);
//       Alert.alert('Failed to complete the task. Please try again.');
//     }
//   };

//   const renderItem = ({ item }) => {
//     const isTaskCompleted = item.status === 'Task Completed';
//     const statusText = isTaskCompleted ? 'Task Completed' : 'In Progress';

//     return (
//       <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
//         <View style={styles.taskItem} key={item.id}>
//           <Text style={styles.taskItemText}>Task Name: {item.name}</Text>
//           <Text style={styles.taskItemText}>Start Date: {item.startDate}</Text>
//           <Text style={styles.taskItemText}>End Date: {item.endDate}</Text>
//           <Text style={styles.taskItemText}>Project ID: {item.projectId}</Text>
//           <Text style={styles.taskItemText}>Status: {statusText}</Text>
//           <View style={styles.hoursContainer}>
//             <Text style={styles.taskItemText}>Hours Worked:</Text>
//             {item.assignees.map((assignee) => (
//               <Text style={styles.taskItemText} key={assignee.email}>
//                 - {assignee.email}: {assignee.hoursWorked || 0} hours
//               </Text>
//             ))}
//           </View>
//           <View style={styles.userTaskListButtonCon}>
//             <TextInput
//               style={[styles.UserListInput, isTaskCompleted && styles.disabledInput]}
//               value={hoursWorked}
//               onChangeText={setHoursWorked}
//               placeholder="Enter hours worked"
//               keyboardType="numeric"
//               editable={!isTaskCompleted}
//             />
//             <Button
//               title="Add Hours"
//               onPress={() => handleAddHours(item.id)}
//               disabled={isTaskCompleted}
//             />
//             <Button
//               title="Complete Task"
//               onPress={() => handleCompleteTask(item.id)}
//               disabled={isTaskCompleted}
//             />
//           </View>
//         </View>
//       </TouchableWithoutFeedback>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Your Tasks!</Text>
//       <FlatList
//         data={tasks}
//         keyExtractor={(item) => item.id}
//         renderItem={renderItem}
//       />
//     </View>
//   );
// };

// export default UserTaskListScreen;

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { TouchableOpacity } from 'react-native';
import styles from './style';
import axios from 'axios'; // Install axios using npm/yarn: npm install axios or yarn add axios

const UserTaskListScreen = ({ route }) => {
  const [tasks, setTasks] = useState([]);
  const [hoursWorked, setHoursWorked] = useState('');
  const userEmail = route.params.userEmail;

  useEffect(() => {
    fetchTasks();
  }, [userEmail]);

  

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/tasks', {
        params: { email: userEmail }, // Pass the userEmail as a query parameter
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error occurred while fetching tasks:', error);
    }
  };

  // const handleAddHours = async (taskId) => {
  //   if (hoursWorked === '') {
  //     Alert.alert('Enter number of hours worked');
  //     return;
  //   }

  //   try {
  //     await axios.post(`http://localhost:3000/api/tasks/add-hours`, {
  //       taskId,
  //       email: userEmail,
  //       hoursWorked: parseFloat(hoursWorked),
  //     });
  //     setHoursWorked('');
  //     Alert.alert('Hours added successfully');
  //     fetchTasks(); // Fetch updated tasks after adding hours
  //   } catch (error) {
  //     console.error('Error occurred while adding hours:', error);
  //   }
  // };

  const handleAddHours = async (taskId) => {
    if (hoursWorked === '') {
      Alert.alert('Enter number of hours worked');
      return;
    }

    try {
      await axios.post(`http://localhost:3000/api/tasks/add-hours`, {
        taskId,
        email: userEmail,
        hoursWorked: parseFloat(hoursWorked),
      });
      setHoursWorked('');
      Alert.alert('Hours added successfully');
      fetchTasks(); // Fetch updated tasks after adding hours
    } catch (error) {
      console.error('Error occurred while adding hours:', error);
      Alert.alert('Failed to add hours. Please try again.');
    }
  };

  const handleCompleteTask = async (taskId) => {
    try {
      await axios.post(`http://localhost:3000/api/tasks/complete`, {
        taskId,
        email: userEmail,
      });
      Alert.alert('Task completed successfully');
      fetchTasks(); // Fetch updated tasks after completing task
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

