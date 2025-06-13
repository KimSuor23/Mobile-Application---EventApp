import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { db, collection, getDocs, addDoc, deleteDoc, doc } from './firebase/index';

import AppContext from './AppContext';

export default function EventListScreen({ navigation }) {
  const { memberName } = useContext(AppContext);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEventList();
  }, []);

  async function getEventList() {
    let list = [];
    const result = await getDocs(collection(db, 'events'));
    const participants = await getDocs(collection(db, 'participants'));

    result.forEach((d) => {
      let e = { id: d.id, ...d.data(), registered: false };
      participants.forEach((p) => {
        let data = p.data();
        if (data.name === memberName && data.eventId === e.id) {
          e.registered = true;
        }
      });
      list.push(e);
    });

    setEvents(list);
  }

  async function toggleRegister(id) {
    let list = [];

    for (let e of events) {
      if (e.id === id) {
        if (!e.registered) {
          await addDoc(collection(db, 'participants'), {
            name: memberName,
            email: '',
            userid: '',
            eventId: id,
            title: e.title,
            isPresent: false,
          });
        } else {
          const data = await getDocs(collection(db, 'participants'));
          data.forEach(async (d) => {
            let p = d.data();
            if (p.name === memberName && p.eventId === id) {
              await deleteDoc(doc(db, 'participants', d.id));
            }
          });
        }
        list.push({ ...e, registered: !e.registered });
      } else {
        list.push(e);
      }
    }

    setEvents(list);
  }

  function showEvent({ item }) {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>{item.date}</Text>
        <Text style={styles.location}>{item.location}</Text>

        <Pressable
          style={[styles.button, item.registered ? styles.unregister : styles.register]}
          onPress={() => toggleRegister(item.id)}
        >
          <Text style={styles.buttonText}>
            {item.registered ? 'Unregister' : 'Register'}
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>📅 Event List</Text>
      <FlatList
        data={events}
        renderItem={showEvent}
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
    backgroundColor: '#f8f9fa',
    flex: 1,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#212529',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    color: '#343a40',
  },
  date: {
    fontSize: 15,
    color: '#555',
    marginBottom: 2,
  },
  location: {
    fontSize: 15,
    color: '#777',
    marginBottom: 12,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  register: {
    backgroundColor: '#0d6efd',
  },
  unregister: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  backButton: {
    backgroundColor: '#ced4da',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  backButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
  },
});
