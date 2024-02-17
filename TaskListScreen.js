import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

import styles from './style';

const TaskListScreen = ({ route }) => {
  const { selectedProject } = route.params;
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks(selectedProject.id);
  }, [selectedProject]);

  const fetchTasks = async (projectId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/tasks/${projectId}`);
      const data = await response.json();

      if (data.success) {
        setTasks(data.tasks);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

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
