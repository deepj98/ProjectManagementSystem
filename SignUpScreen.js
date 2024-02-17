import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import styles from './style';

const SignUpScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSignUp = async () => {
      try {
        // await AsyncStorage.setItem('name', name);
        // await AsyncStorage.setItem('email', email);
        // await AsyncStorage.setItem('password', password);

        const response = await fetch('http://localhost:3000/api/registerUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',

        },
        body: JSON.stringify({name, email,password,userType: 'User', createdBy: 'Admin1'}),
        });

        const data = await response.json();
        if(data.success){
          Alert.alert('Registration successful.');
          navigation.navigate('Login');
        }else{
          Alert.alert(data.message);
        }
        
      } catch (error) {
        console.error('Error occurred during sign up:', error);
        Alert.alert('Error signing up. Please try again later');
      }
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Name:</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
          />
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
          />
          <Text style={styles.label}>Password:</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="Enter your password"
          />
          <View style={styles.buttonContainer}>
            <Button title="Sign Up" onPress={handleSignUp} />
          </View>
        </View>
      </View>
    );
  };

  export default SignUpScreen;