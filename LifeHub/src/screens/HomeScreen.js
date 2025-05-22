import React, { useContext } from 'react'; // Added useContext
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import FAB from '../components/FAB';
import { ThemeContext } from '../contexts/ThemeContext'; // Import ThemeContext

const HomeScreen = () => {
  const { theme, colors } = useContext(ThemeContext); // Use theme and colors

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  // Define styles inside the component or make them adaptable if they depend on 'colors'
  // For this example, we'll pass colors to styles or redefine styles that need theme colors
  const dynamicStyles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background, // Use theme background
    },
    greeting: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: colors.text, // Use theme text color
    },
    section: {
      marginBottom: 25,
      backgroundColor: colors.card, // Use theme card color
      borderRadius: 8,
      padding: 15,
      shadowColor: '#000', // Shadow might need theme adjustment too for subtlety
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: theme === 'dark' ? 0.5 : 0.22, // Example: different shadow for dark
      shadowRadius: 2.22,
      elevation: 3,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 10,
      color: colors.text, // Use theme text color
    },
    placeholderText: {
        color: colors.text, // Use theme text color for placeholder content
    },
    balanceText: {
      fontSize: 22,
      fontWeight: 'bold',
      color: colors.primary, // Use theme primary color for emphasis
    },
  });

  // Original static styles (can be merged or kept separate)
  const staticStyles = StyleSheet.create({
    scrollView: {
      flex: 1,
    },
    container: {
      padding: 20,
    },
    placeholderContent: {
      // Styles for the content within each section
    },
  });


  return (
    <SafeAreaView style={dynamicStyles.safeArea}>
      <ScrollView style={staticStyles.scrollView}>
        <View style={staticStyles.container}>
          <Text style={dynamicStyles.greeting}>{`${getGreeting()}, User!`}</Text>

          <View style={dynamicStyles.section}>
            <Text style={dynamicStyles.sectionTitle}>Today's Tasks</Text>
            <View style={staticStyles.placeholderContent}>
              <Text style={dynamicStyles.placeholderText}>Task 1 (Checkbox, Title, List Name)</Text>
              <Text style={dynamicStyles.placeholderText}>Task 2 (Checkbox, Title, List Name)</Text>
            </View>
          </View>

          <View style={dynamicStyles.section}>
            <Text style={dynamicStyles.sectionTitle}>Current Balance</Text>
            <View style={staticStyles.placeholderContent}>
              <Text style={dynamicStyles.balanceText}>$0.00</Text>
            </View>
          </View>

          <View style={dynamicStyles.section}>
            <Text style={dynamicStyles.sectionTitle}>Today's Habits</Text>
            <View style={staticStyles.placeholderContent}>
              <Text style={dynamicStyles.placeholderText}>Habit 1 (Checkmark, Streak)</Text>
              <Text style={dynamicStyles.placeholderText}>Habit 2 (Checkmark, Streak)</Text>
            </View>
          </View>

        </View>
      </ScrollView>
      {/* FAB styling might also need to adapt to theme, e.g., its backgroundColor */}
      <FAB onPress={() => console.log('FAB pressed!')} style={{backgroundColor: colors.primary}} />
    </SafeAreaView>
  );
};

// It's generally better to define styles outside if they don't depend on theme,
// or use a function to generate them if they do, to avoid re-creation on every render.
// The above `dynamicStyles` inside the component is for quick demonstration.
// A more optimized approach would involve memoizing styles or passing theme to StyleSheet.create.

export default HomeScreen;
