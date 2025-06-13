import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { db, collection, getDocs, deleteDoc, updateDoc, doc } from './firebase/index';

export default function ManageEventsScreen({ navigation }) {
  const [events, setEvents] = useState([]);
  const [editId, setEditId] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editDate, setEditDate] = useState('');
  const [editLocation, setEditLocation] = useState('');

  useEffect(() => {
    getEventList();
  }, []);

  async function getEventList() {
    let list = [];
    const result = await getDocs(collection(db, 'events'));
    result.forEach((d) => {
      list.push({ id: d.id, ...d.data() });
    });
    setEvents(list);
  }

  async function removeEvent(id) {
    const result = await getDocs(collection(db, 'participants'));
    result.forEach(async (d) => {
      let p = d.data();
      if (p.eventId === id) {
        await deleteDoc(doc(db, 'participants', d.id));
      }
    });

    await deleteDoc(doc(db, 'events', id));
    getEventList();
  }

  async function saveEdit() {
    await updateDoc(doc(db, 'events', editId), {
      title: editTitle,
      date: editDate,
      location: editLocation,
    });
    setEditId('');
    getEventList();
  }

  function showEvent({ item }) {
    return (
      <View style={styles.card}>
        {editId === item.id ? (
          <>
            <TextInput style={styles.input} value={editTitle} onChangeText={setEditTitle} placeholder="Title" />
            <TextInput style={styles.input} value={editDate} onChangeText={setEditDate} placeholder="Date" />
            <TextInput style={styles.input} value={editLocation} onChangeText={setEditLocation} placeholder="Location" />

            <Pressable style={[styles.button, styles.save]} onPress={saveEdit}>
              <Text style={styles.buttonText}>💾 Save</Text>
            </Pressable>
            <Pressable style={[styles.button, styles.cancel]} onPress={() => setEditId('')}>
              <Text style={styles.buttonText}>❌ Cancel</Text>
            </Pressable>
          </>
        ) : (
          <>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.detail}>{item.date}</Text>
            <Text style={styles.detail}>{item.location}</Text>

            <Pressable
              style={[styles.button, styles.edit]}
              onPress={() => {
                setEditId(item.id);
                setEditTitle(item.title);
                setEditDate(item.date);
                setEditLocation(item.location);
              }}
            >
              <Text style={styles.buttonText}>✏️ Edit</Text>
            </Pressable>

            <Pressable style={[styles.button, styles.delete]} onPress={() => removeEvent(item.id)}>
              <Text style={styles.buttonText}>🗑️ Delete</Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.view]}
              onPress={() => navigation.navigate('ParticipantList', { eventId: item.id })}
            >
              <Text style={styles.buttonText}>👥 View Participants</Text>
            </Pressable>
          </>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>📋 Manage Events</Text>

      <FlatList
        data={events}
        renderItem={showEvent}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
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
    backgroundColor: '#f8f9fa',
    flex: 1,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#212529',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 18,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#343a40',
    marginBottom: 4,
  },
  detail: {
    fontSize: 15,
    color: '#6c757d',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginVertical: 6,
  },
  button: {
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 16,
  },
  edit: {
    backgroundColor: '#0d6efd',
  },
  delete: {
    backgroundColor: '#dc3545',
  },
  view: {
    backgroundColor: '#198754',
  },
  save: {
    backgroundColor: '#0d6efd',
  },
  cancel: {
    backgroundColor: '#6c757d',
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
