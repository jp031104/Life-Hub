import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NOTE_KEY = 'LifeHub_SimpleNote';

const NotesScreen = () => {
  const [note, setNote] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadNote();
  }, []);

  const loadNote = async () => {
    try {
      const savedNote = await AsyncStorage.getItem(NOTE_KEY);
      if (savedNote !== null) {
        setNote(savedNote);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load note.');
      console.error('Failed to load note:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveNote = async () => {
    try {
      await AsyncStorage.setItem(NOTE_KEY, note);
      Alert.alert('Success', 'Note saved!');
    } catch (error) {
      Alert.alert('Error', 'Failed to save note.');
      console.error('Failed to save note:', error);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={[styles.container, styles.loadingContainer]}>
          <Text>Loading note...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.container}>
          <Text style={styles.headerTitle}>Simple Note</Text>
          <TextInput
            style={styles.textInput}
            multiline
            placeholder="Jot down your thoughts..."
            value={note}
            onChangeText={setNote}
            textAlignVertical="top" // For Android
          />
          <TouchableOpacity style={styles.saveButton} onPress={saveNote}>
            <Text style={styles.saveButtonText}>Save Note</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  saveButton: {
    backgroundColor: '#007AFF', // Accent color
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default NotesScreen;
