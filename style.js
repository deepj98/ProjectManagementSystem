 import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  LoginContainer: {
    flex: 1,
    backgroundColor: '#000000',
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 60,
    alignItems: 'center', // Center items horizontally
    justifyContent: 'center', // Center items vertically
  },
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    marginTop:10,
    color: '#FFFFFF',
    fontFamily: 'System',
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
  },
  label: {
    fontSize: 20,
    marginBottom: 8,
    color: '#FFFFFF',
    fontFamily: 'System',
  },
  Datelabel: {
    fontSize: 12,
    marginBottom: 8,
    color: '#FFFFFF',
    fontFamily: 'System',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 4,
    padding: 14,
    marginBottom: 16,
    color: '#FFFFFF',
    fontFamily: 'System',
    height: 50,
  },
  UserListInput: {
    marginRight: 5,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 4,
    padding: 10,
    backgroundColor:'#555',
    color: '#FFFFFF',
    fontFamily: 'System',
    height: 50,
    width:70,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 40,
  },
  userTaskListButtonCon:{
      flexDirection: 'row',
      alignItems:'center',
      //justifyContent: 'space-between', // Changed to space-between for better button spacing
      marginTop: 20,
      marginBottom: 40,
      paddingHorizontal: 10, // Added horizontal padding for better spacing
    
  },
  
  button: {
    backgroundColor: '#333333', // Set the background color of the buttons
    padding: 15,
    borderRadius: 5000, 
    paddingHorizontal: 30,
  },
  UserListbutton: {
    backgroundColor: '#333333', // Set the background color of the buttons
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10, 
    marginRight: 5
  },
  
  buttonText: {
    color: '#FFFFFF', // Set the text color of the buttons
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'System',
  },

//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginTop: 20,
//     marginBottom: 40,
//     backgroundColor: '#333333',
//     padding: 10,
//     borderRadius: 5000,
//     color: '#FFFFFF', // Set the text color of the buttons
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
  
  
taskItem: {
  borderWidth: 1,
  borderColor: '#CCCCCC',
  borderRadius: 4,
  paddingVertical: 12, // Adjusted padding for better spacing
  paddingHorizontal: 16, // Adjusted padding for better spacing
  marginBottom: 16,
  backgroundColor: '#222222',
},
taskItemText: {
  fontSize: 16,
  color: '#FFFFFF',
  fontFamily: 'System',
  marginVertical: 4, // Adjusted margin for better spacing
},
hoursContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },

  projectContainer: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 4,
    padding: 20,
    marginBottom: 50,
    backgroundColor: '#222222',
  },
  projectId: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'System',
  },
  projectName: {
    fontSize: 16,
    marginBottom: 12,
    color: '#FFFFFF',
    fontFamily: 'System',
  },
  projectDate: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'System',
  },
  projectItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 10,
  },
  projectInfoContainer: {
    flex: 1,
  },
  deleteButtonContainer: {
    marginLeft: 12,
  },
  
  
});

export default styles;