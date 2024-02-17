import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import styles from './style';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/validateUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        // User validation successful, navigate to the appropriate screen
        const { userType, createdBy } = data.user;

        if (userType === 'Admin') {
          navigation.navigate('Home', { userType, createdBy });
        } else if (userType === 'User') {
          navigation.navigate('UserTaskList', { userType, userEmail: email });
        }
      } else {
        // User validation failed, show an alert
        Alert.alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      Alert.alert('Error logging in. Please try again later.');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <>
        {/* <Image source={require('./assets/PMS.jpeg')} style={{widht: 20, aspectRatio: 1.5, resizeMode:'contain'}}/> */}
        <View style={styles.LoginContainer}>
          <Text style={styles.title}>Project Sync</Text>
          <View style={styles.formContainer}>
            <Text style={styles.label}>Email:</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              placeholderTextColor="#888888" //swathi
            />
            <Text style={styles.label}>Password:</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder="Enter your password"
              placeholderTextColor="#888888" //swathi
            />
            {/* swathi */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button]}
                onPress={() => navigation.navigate('SignUp')}
              >
                <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
            {/* changes end here */}
          </View>
        </View>
      </>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
