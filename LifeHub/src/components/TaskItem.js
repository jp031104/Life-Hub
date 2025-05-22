import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ThemeContext } from '../contexts/ThemeContext';

const TaskItem = ({ task, onToggleComplete, onTaskPress }) => {
  const { colors } = useContext(ThemeContext);
  const checkboxIconName = task.completed ? 'checkbox-marked-circle' : 'checkbox-blank-circle-outline';

  return (
    <TouchableOpacity onPress={onTaskPress} style={[styles.container, { backgroundColor: colors.card, borderBottomColor: colors.separator }]}>
      <TouchableOpacity onPress={onToggleComplete} style={styles.checkboxContainer}>
        <MaterialCommunityIcons name={checkboxIconName} size={26} color={task.completed ? colors.primary : colors.textMuted || 'grey'} />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={[styles.title, {color: colors.text}, task.completed && styles.completedTitle]}>
          {task.title}
        </Text>
        {task.dueDate && (
          <Text style={[styles.dueDate, {color: colors.textMuted || 'grey'}]}>Due: {task.dueDate}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
  },
  checkboxContainer: {
    marginRight: 15,
    padding: 5, // Easier to tap
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    opacity: 0.7, // Make completed text less prominent
  },
  dueDate: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default TaskItem;
