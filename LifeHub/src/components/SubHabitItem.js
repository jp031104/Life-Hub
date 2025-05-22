import React, { useContext } from 'react'; // Added useContext
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Import
import { ThemeContext } from '../contexts/ThemeContext'; // Import ThemeContext

const SubHabitItem = ({ subHabit, onToggleComplete }) => {
  const { colors } = useContext(ThemeContext); // Use theme colors
  const checkboxIconName = subHabit.completedToday ? 'checkbox-marked-circle' : 'checkbox-blank-circle-outline';

  return (
    <View style={[styles.container, { backgroundColor: colors.card /* or a slightly different shade like colors.cardOffset */ }]}>
      <TouchableOpacity onPress={onToggleComplete} style={styles.checkboxContainer}>
        <MaterialCommunityIcons name={checkboxIconName} size={22} color={subHabit.completedToday ? colors.primary : colors.textMuted || 'grey'} />
      </TouchableOpacity>
      <Text style={[styles.name, {color: colors.text}, subHabit.completedToday && styles.completedName]}>
        {subHabit.name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingLeft: 15, // Indent sub-habits
    // backgroundColor: '#f9f9f9', // Will be set by theme
  },
  checkboxContainer: { // Consistent with TaskItem/HabitItem
    marginRight: 10, // Adjusted for potentially smaller sub-item text
    padding: 3, 
  },
  // checkboxBase and checkboxChecked removed
  name: {
    fontSize: 14,
    // color from theme
  },
  completedName: { // Consistent with TaskItem/HabitItem
    textDecorationLine: 'line-through',
    opacity: 0.7,
  },
});

export default SubHabitItem;
