import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import styles from './style';


const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = () => {
      if (email === 'Admin1' && password === 'Admin1') {
        navigation.navigate('Home', { userType: 'admin', createdBy: email });
      } else if (email === 'Admin2' && password === 'Admin2') {
        navigation.navigate('Home', { userType: 'admin', createdBy: email });
      } else if (email === 'User1' && password === 'User1') {
        navigation.navigate('UserTaskList', { userType: 'user', userEmail: email });
      } else if (email === 'User2' && password === 'User2') {
        navigation.navigate('UserTaskList', { userType: 'user', userEmail: email });
      } else {
        Alert.alert('Invalid credentials');
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