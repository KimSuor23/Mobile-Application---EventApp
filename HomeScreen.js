import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎟️ Event Management App</Text>
      <Text style={styles.subtitle}>Choose your role to continue</Text>

      <Pressable style={styles.button} onPress={() => navigation.navigate('Admin')}>
        <Text style={styles.buttonText}>👨‍💼 Admin</Text>
      </Pressable>

      <Pressable style={[styles.button, styles.memberButton]} onPress={() => navigation.navigate('MemberLogin')}>
        <Text style={styles.buttonText}>🧑‍🤝‍🧑 Member</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#212529',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6c757d',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#0d6efd',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  memberButton: {
    backgroundColor: '#198754',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '500',
  },
});
