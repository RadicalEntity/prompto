import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';

import History from './screens/History';
import Swipe from './screens/Swipe';

import SwipesIcon from './assets/swipes-icon.png'; // Import your custom icon images
import HistoryIcon from './assets/history-icon.png';

// bottom tab navigation
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: styles.tabBar, // Use the tabBar style from the stylesheet
          tabBarActiveTintColor: '#F6FFF8', // Color for active tab text
          tabBarInactiveTintColor: '#A4C3B2', // Color for inactive tab text
          tabBarIcon: ({ focused, color, size }) => {
            let icon;

            if (route.name === 'Swipe') {
              icon = SwipesIcon;
            } else if (route.name === 'History') {
              icon = HistoryIcon;
            }

            // Use the 'focused' property to control the tint
            const tintColor = focused ? '#F6FFF8' : '#A4C3B2';

            return <Image source={icon} style={[styles.tabBarIcon, { tintColor, width: size, height: size }]} />;
          },
        })}
      >
        <Tab.Screen name="Swipe" component={Swipe} />
        <Tab.Screen name="History" component={History} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 90,
    paddingTop: 5,
    backgroundColor: '#6B9080', // Background color for the tabBar
  },
  tabBarIcon: {
    resizeMode: 'contain', // Contain the image within its dimensions
  },
});