import React, { useContext } from 'react'; // Added useContext
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Import
import SubHabitItem from './SubHabitItem';
import { ThemeContext } from '../contexts/ThemeContext'; // Import ThemeContext

const HabitItem = ({ habit, onToggleHabitComplete, onToggleSubHabitComplete, onHabitPress }) => { // Added onHabitPress
  const { colors } = useContext(ThemeContext); // Use theme colors
  const hasSubHabits = habit.subHabits && habit.subHabits.length > 0;
  const checkboxIconName = habit.completedToday ? 'checkbox-marked-circle' : 'checkbox-blank-circle-outline';

  return (
    <TouchableOpacity onPress={onHabitPress} style={[styles.container, { backgroundColor: colors.card, borderBottomColor: colors.separator }]}>
      <View style={styles.mainHabitRow}>
        <TouchableOpacity onPress={() => onToggleHabitComplete(habit.id)} style={styles.checkboxContainer}>
          <MaterialCommunityIcons name={checkboxIconName} size={26} color={habit.completedToday ? colors.primary : colors.textMuted || 'grey'} />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={[styles.name, {color: colors.text}, habit.completedToday && styles.completedName]}>
            {habit.name}
          </Text>
          <Text style={[styles.streak, {color: colors.textMuted || 'grey'}]}>Streak: {habit.streak} days</Text>
        </View>
        {/* Optional: Add an icon here to expand/collapse sub-habits if needed */}
      </View>
      {hasSubHabits && (
        <FlatList
          data={habit.subHabits}
          keyExtractor={(item) => item.id}
          renderItem={({ item: subHabit }) => (
            <SubHabitItem
              subHabit={subHabit}
              // Pass habit.id and subHabit.id to the handler in HabitsScreen
              onToggleComplete={() => onToggleSubHabitComplete(habit.id, subHabit.id)} 
            />
          )}
          style={styles.subHabitList}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor is from theme
    paddingVertical: 10,
    // marginBottom: 10, // Using borderBottom for consistency
    borderBottomWidth: 1,
    // borderRadius: 8, // Removing border radius for a list item feel
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.1,
    // shadowRadius: 2,
    // elevation: 2,
  },
  mainHabitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  checkboxContainer: { // Consistent with TaskItem
    marginRight: 15,
    padding: 5, 
  },
  // checkboxBase and checkboxChecked removed, replaced by MaterialCommunityIcons
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
  },
  completedName: { // Consistent with TaskItem
    textDecorationLine: 'line-through',
    opacity: 0.7,
  },
  streak: {
    fontSize: 12,
    marginTop: 4,
  },
  subHabitList: {
    marginTop: 10,
    paddingLeft: 30, // Indent sub-habit list more clearly
  }
});

export default HabitItem;
