import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import TasksScreen from '../screens/TasksScreen';
import MoneyScreen from '../screens/MoneyScreen';
import HabitsScreen from '../screens/HabitsScreen';
import NotesScreen from '../screens/NotesScreen';
import SettingsScreen from '../screens/SettingsScreen'; 
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Uncommented

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#007AFF', // Placeholder, will be replaced by theme
        tabBarInactiveTintColor: 'gray', // Placeholder, will be replaced by theme
        tabBarIcon: ({ focused, color, size }) => { 
          let iconName;
          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Tasks') iconName = focused ? 'format-list-checks' : 'format-list-bulleted';
          else if (route.name === 'Money') iconName = focused ? 'finance' : 'cash-multiple';
          else if (route.name === 'Habits') iconName = focused ? 'star-check' : 'star-check-outline';
          else if (route.name === 'Notes') iconName = focused ? 'note-text' : 'note-text-outline';
          else if (route.name === 'Settings') iconName = focused ? 'cog' : 'cog-outline';
          
          // Fallback icon if needed
          if (!iconName) iconName = 'help-circle-outline'; 
          
          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
      })}
      // The TabNavigator itself can be themed via NavigationContainer theme prop
      // For now, tabBarActiveTintColor/tabBarInactiveTintColor might be overridden by ThemeContext in individual screens if they wrap the whole screen.
      // Or, better, pass theme to NavigationContainer directly in App.js.
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Tasks" component={TasksScreen} />
      <Tab.Screen name="Money" component={MoneyScreen} />
      <Tab.Screen name="Habits" component={HabitsScreen} />
      <Tab.Screen name="Notes" component={NotesScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} /> 
    </Tab.Navigator>
  );
};

export default AppNavigator;
