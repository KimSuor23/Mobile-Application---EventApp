import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { db, collection, getDocs, doc, updateDoc } from './firebase/index';
import AppContext from './AppContext';

export default function ParticipantListScreen({ navigation, route }) {
  const { eventId } = route.params;
  const { memberName } = useContext(AppContext);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    loadParticipants();
  }, []);

  async function loadParticipants() {
    let list = [];
    const result = await getDocs(collection(db, 'participants'));
    result.forEach((d) => {
      const data = d.data();
      if (data.eventId === eventId) {
        list.push({ id: d.id, ...data });
      }
    });
    setParticipants(list);
  }

  async function toggleStatus(id, current) {
    await updateDoc(doc(db, 'participants', id), {
      isPresent: !current,
    });
    loadParticipants();
  }

  function showParticipant({ item }) {
    return (
      <View style={styles.card}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.status}>
          Status:{' '}
          <Text style={item.isPresent ? styles.present : styles.absent}>
            {item.isPresent ? 'Present' : 'Absent'}
          </Text>
        </Text>

        <Pressable
          style={[styles.button, item.isPresent ? styles.absentBtn : styles.presentBtn]}
          onPress={() => toggleStatus(item.id, item.isPresent)}
        >
          <Text style={styles.buttonText}>
            {item.isPresent ? 'Mark Absent' : 'Mark Present'}
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>👥 Participants</Text>
      <FlatList
        data={participants}
        renderItem={showParticipant}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>⬅ Back</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#212529',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 18,
    marginBottom: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
    color: '#343a40',
  },
  status: {
    fontSize: 15,
    marginBottom: 10,
    color: '#6c757d',
  },
  present: {
    color: '#198754',
    fontWeight: 'bold',
  },
  absent: {
    color: '#dc3545',
    fontWeight: 'bold',
  },
  button: {
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  presentBtn: {
    backgroundColor: '#198754',
  },
  absentBtn: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  backButton: {
    backgroundColor: '#dee2e6',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  backButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
  },
});
