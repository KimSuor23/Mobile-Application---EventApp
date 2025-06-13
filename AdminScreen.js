import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AdminScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Admin Dashboard</Text>

      <View style={styles.card}>
        <Ionicons name="calendar-outline" size={40} color="#0d6efd" />
        <Text style={styles.cardTitle}>Create Event</Text>
        <Pressable style={styles.actionButton} onPress={() => navigation.navigate('CreateEvent')}>
          <Text style={styles.actionText}>Go</Text>
        </Pressable>
      </View>

      <View style={styles.card}>
        <Ionicons name="construct-outline" size={40} color="#198754" />
        <Text style={styles.cardTitle}>Manage Events</Text>
        <Pressable style={[styles.actionButton, { backgroundColor: '#198754' }]} onPress={() => navigation.navigate('ManageEvents')}>
          <Text style={styles.actionText}>Go</Text>
        </Pressable>
      </View>

      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={18} color="#333" />
        <Text style={styles.backText}>Back to Home</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f3f5',
    padding: 24,
    alignItems: 'center',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#212529',
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 10,
    color: '#343a40',
  },
  actionButton: {
    marginTop: 10,
    backgroundColor: '#0d6efd',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 10,
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  backButton: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ced4da',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  backText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 8,
  },
});
