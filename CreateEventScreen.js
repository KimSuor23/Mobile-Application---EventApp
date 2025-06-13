import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { db, collection, addDoc } from './firebase/index';

export default function CreateEventScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');

  async function addEvent() {
    if (!title || !date || !location) {
      Alert.alert('Missing Fields', 'Please fill out all fields before submitting.');
      return;
    }

    try {
      await addDoc(collection(db, 'events'), {
        title,
        date,
        location,
      });

      setTitle('');
      setDate('');
      setLocation('');
      Alert.alert('Success', 'Event created successfully!');
    } catch (error) {
      console.error("Error adding event:", error);
      Alert.alert('Error', 'Failed to create event.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create New Event</Text>

      <TextInput
        placeholder="Event Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Date (e.g. 2025-07-01)"
        value={date}
        onChangeText={setDate}
        style={styles.input}
      />
      <TextInput
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
        style={styles.input}
      />

      <Pressable style={styles.primaryButton} onPress={addEvent}>
        <Text style={styles.buttonText}>➕ Add Event</Text>
      </Pressable>

      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>⬅ Back</Text>
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
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 14,
    fontSize: 16,
  },
  primaryButton: {
    backgroundColor: '#0d6efd',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  backButton: {
    marginTop: 20,
    backgroundColor: '#dee2e6',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
  },
});
