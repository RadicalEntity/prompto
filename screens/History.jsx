import React, { useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const History = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);

  // Sample data for the past sessions
  const pastSessions = [
    {
      id: '1',
      prompt: '2 cats',
      date: 'Today',
      thumbnail: require('../assets/two-cats.png'),
      matches: [
        require('../assets/two-cats.png'),
        require('../assets/two-cats2.png'),
        require('../assets/two-cats3.png'),
        require('../assets/two-cats4.png'),
        require('../assets/two-cats5.png'),
        // Add more matched images here
      ],
    },
    {
      id: '2',
      prompt: 'Abstract painting of hackers hard at work during HackMIT',
      date: '1 day ago',
      thumbnail: require('../assets/hackers1.png'),
      matches: [
        require('../assets/hackers1.png'),
        require('../assets/hackers2.png'),
        require('../assets/hackers3.png'),
        require('../assets/hackers4.png'),
        // Add more matched images here
      ],
    },
    {
      id: '3',
      prompt: 'Aliens eating a sandwich in space',
      date: '5 days ago',
      thumbnail: require('../assets/alien-sandwich1.png'),
      matches: [
        require('../assets/alien-sandwich1.png'),
        require('../assets/alien-sandwich2.png'),
        require('../assets/alien-sandwich3.png'),
        require('../assets/alien-sandwich4.png'),
        // Add more matched images here
      ],
    },
    // Add more past session data here
  ];

  // Function to show the overlay when a thumbnail is pressed
  const handleThumbnailPress = (session) => {
    setSelectedSession(session);
    setModalVisible(true);
  };

  // Render each session row
  const renderSession = ({ item }) => (
    <TouchableOpacity
      style={styles.sessionContainer}
      onPress={() => handleThumbnailPress(item)}
    >
      <Image source={item.thumbnail} style={styles.thumbnail} />
      <View style={styles.sessionInfo}>
        <Text style={styles.promptText}>{item.prompt}</Text>
        <Text style={styles.dateText}>{item.date}</Text>
      </View>
    </TouchableOpacity>
  );

  // Render matched images in the overlay
  const renderMatchedImages = () => {
    if (!selectedSession) return null;
    return (
      <ScrollView>
        <Text style={styles.overlayPrompt}>{selectedSession.prompt}</Text>
        <View style={styles.matchedImagesContainer}>
          {selectedSession.matches.map((match, index) => (
            <Image key={index} source={match} style={styles.matchedImage} />
          ))}
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={pastSessions}
        renderItem={renderSession}
        keyExtractor={(item) => item.id}
      />

      {/* Modal overlay */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.overlayContainer}>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
          {renderMatchedImages()}
        </View>
      </Modal>
    </View>
  );
};

const SessionDetailScreen = ({ route }) => {
  // Extract the session data from the route
  const { session } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
    <Image source={session.thumbnail} style={styles.thumbnail} />
    <Text style={styles.promptText}>{session.prompt}</Text>
    <Text style={styles.dateText}>{session.date}</Text>

    {/* Render matched images */}
    <View style={styles.matchedImagesContainer}>
      {session.matches.map((match, index) => (
        <Image key={index} source={match} style={styles.matchedImage} />
      ))}
    </View>

    {/* Close button with border radius */}
    <TouchableOpacity
      style={styles.closeButton}
      onPress={() => {
        // Handle button press here
      }}
    >
      <Text style={styles.closeButtonText}>Close</Text>
    </TouchableOpacity>
  </ScrollView>
  );
};

export const HistoryPage = () => {
  return (
    <Stack.Navigator initialRouteName="History">
      <Stack.Screen name="History" component={HistoryScreen} />
      <Stack.Screen name="SessionDetail" component={SessionDetailScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor:'#EAF4F4',
  },
  sessionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#A4C3B2',
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 4,
    marginRight: 16,
  },
  sessionInfo: {
    flex: 1,
  },
  promptText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#30403F',
  },
  dateText: {
    color: '#888',
  },
  overlayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop:60,
    backgroundColor: '#F6FFF8',
  },
  overlayPrompt: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 45,
    marginBottom: 25,
    paddingHorizontal: 20,
    color: '#30403F',
  },
  closeButton: {
    borderRadius: 8, 
    backgroundColor: '#CCE3DE', 
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 16,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#30403F', 
  },
  matchedImagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  matchedImage: {
    width: 140,
    height: 140,
    margin: 8,
  },
});

export default History;
