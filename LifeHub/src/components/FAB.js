import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Import
import { ThemeContext } from '../contexts/ThemeContext'; // Import ThemeContext to get primary color for icon potentially
import { useContext } from 'react';


const FAB = ({ onPress, style, iconName = "plus", iconSize = 24 }) => {
  const { colors } = useContext(ThemeContext); // Consume theme context

  return (
    <TouchableOpacity 
      onPress={onPress} 
      style={[
        styles.fab, 
        { backgroundColor: colors.primary }, // Use theme primary color for background
        style
      ]}
    >
      <MaterialCommunityIcons name={iconName} size={iconSize} color={'#fff'} /> 
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 20,
    bottom: 20,
    // backgroundColor is now from theme
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
  }
  // fabText style removed
});

export default FAB;
