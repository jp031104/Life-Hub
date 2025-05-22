import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, SafeAreaView } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext'; // Import ThemeContext

const SettingsScreen = () => {
  const { theme, toggleTheme, colors } = useContext(ThemeContext);
  const isDarkMode = theme === 'dark';

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={styles.container}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Settings</Text>

        <View style={[styles.settingItem, { borderBottomColor: colors.separator }]}>
          <Text style={[styles.settingText, { color: colors.text }]}>Dark Mode</Text>
          <Switch
            trackColor={{ false: "#767577", true: colors.primary }}
            thumbColor={isDarkMode ? "#f4f3f4" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleTheme}
            value={isDarkMode}
          />
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Data Management</Text>
          <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]}>
            <Text style={styles.buttonText}>Backup Data (Placeholder)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary, marginTop: 10 }]}>
            <Text style={styles.buttonText}>Import Data (Placeholder)</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
};

// Styles need to be adaptable or very generic if not consuming theme context directly here
// For simplicity, some styles are kept generic. In a full app, more styles would use theme colors.
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  settingText: {
    fontSize: 18,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default SettingsScreen;
