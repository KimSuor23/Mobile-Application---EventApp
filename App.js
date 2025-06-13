import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './HomeScreen';
import AdminScreen from './AdminScreen';
import MemberLoginScreen from './MemberLoginScreen';
import EventListScreen from './EventListScreen';
import ManageEventsScreen from './ManageEventsScreen';
import ParticipantListScreen from './ParticipantListScreen';
import CreateEventScreen from './CreateEventScreen';

import { AppProvider } from './AppContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Admin" component={AdminScreen} />
          <Stack.Screen name="MemberLogin" component={MemberLoginScreen} />
          <Stack.Screen name="EventList" component={EventListScreen} />
          <Stack.Screen name="ManageEvents" component={ManageEventsScreen} />
          <Stack.Screen name="ParticipantList" component={ParticipantListScreen} />
          <Stack.Screen name="CreateEvent" component={CreateEventScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
