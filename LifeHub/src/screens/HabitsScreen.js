import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, SectionList } from 'react-native';
import HabitItem from '../components/HabitItem'; // Updated import

const HabitsScreen = () => {
  const [habitsByCategories, setHabitsByCategories] = useState([
    {
      title: 'Morning Routine',
      data: [
        { id: '1', name: 'Make Bed', streak: 10, completedToday: false, subHabits: [] },
        { id: '2', name: 'Meditate (10 min)', streak: 5, completedToday: true, subHabits: [] },
      ]
    },
    {
      title: 'Fitness',
      data: [
        { id: '3', name: 'Workout', streak: 32, completedToday: false, subHabits: [
          { id: 'sub1', name: 'Warm-up', completedToday: false },
          { id: 'sub2', name: 'Main Exercise', completedToday: false },
          { id: 'sub3', name: 'Cool-down', completedToday: false },
        ]},
        { id: '4', name: 'Evening Walk', streak: 12, completedToday: false, subHabits: [] },
      ]
    },
    // Add more sample data as needed
  ]);

  const toggleHabitComplete = (habitId, categoryTitle) => {
    setHabitsByCategories(prevCategories =>
      prevCategories.map(category => {
        if (category.title === categoryTitle) {
          return {
            ...category,
            data: category.data.map(habit =>
              habit.id === habitId ? { ...habit, completedToday: !habit.completedToday } : habit
            ),
          };
        }
        return category;
      })
    );
    // TODO: Add streak update logic here. Typically, streaks increment if completedToday was true
    // and a new day starts, or resets if a day is missed. This is complex and needs date tracking.
  };

  const toggleSubHabitComplete = (habitId, subHabitId, categoryTitle) => {
    setHabitsByCategories(prevCategories =>
      prevCategories.map(category => {
        if (category.title === categoryTitle) {
          return {
            ...category,
            data: category.data.map(habit => {
              if (habit.id === habitId) {
                return {
                  ...habit,
                  subHabits: habit.subHabits.map(sub =>
                    sub.id === subHabitId ? { ...sub, completedToday: !sub.completedToday } : sub
                  ),
                };
              }
              return habit;
            }),
          };
        }
        return category;
      })
    );
    // Optional: Check if all sub-habits are complete to mark main habit complete
    // This depends on desired app logic.
  };
  
  const handleAddHabitOrCategory = () => {
    console.log('Add new habit or category');
  };

  const renderHabitItem = ({ item, section }) => (
    <HabitItem
      habit={item}
      onToggleHabitComplete={() => toggleHabitComplete(item.id, section.title)}
      onToggleSubHabitComplete={(habitId, subHabitId) => toggleSubHabitComplete(habitId, subHabitId, section.title)}
      // onHabitPress={() => console.log('Habit pressed:', item.name)} // For future detail view
    />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Habits</Text>
          <TouchableOpacity onPress={handleAddHabitOrCategory} style={styles.addButton}>
            <Text style={styles.addButtonText}>+ Add</Text>
          </TouchableOpacity>
        </View>

        <SectionList
          sections={habitsByCategories}
          keyExtractor={(item) => item.id}
          renderItem={renderHabitItem}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.categoryTitle}>{title}</Text>
          )}
          ListEmptyComponent={<Text style={styles.emptyListText}>No habits defined yet. Add some!</Text>}
          stickySectionHeadersEnabled={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f0f0f0' },
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 10 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  addButton: { backgroundColor: '#007AFF', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 20 },
  addButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  categoryTitle: { fontSize: 20, fontWeight: 'bold', color: '#555', marginTop: 20, marginBottom: 10, paddingVertical: 5, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  emptyListText: { textAlign: 'center', marginTop: 50, fontSize: 16, color: 'gray' },
});

export default HabitsScreen;
