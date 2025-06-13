import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { db, collection, getDocs } from './firebase/index';
import AppContext from './AppContext';

export default function MemberLoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const { setMemberName } = useContext(AppContext);

  const handleLogin = async () => {
    if (username.trim() === '') {
      Alert.alert('Missing Input', 'Please enter your name.');
      return;
    }

    try {
      const snapshot = await getDocs(collection(db, 'members'));
      let found = false;

      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.name.toLowerCase() === username.trim().toLowerCase()) {
          found = true;
        }
      });

      if (found) {
        setMemberName(username);
        navigation.navigate('EventList');
      } else {
        Alert.alert('Login Failed', 'Member not found.');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Something went wrong. Try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>🔐 Member Login</Text>

      <TextInput
        placeholder="Enter your name"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />

      <Pressable style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>

      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>⬅ Back to Home</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#212529',
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  loginButton: {
    backgroundColor: '#0d6efd',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  backButton: {
    backgroundColor: '#dee2e6',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
  },
});
