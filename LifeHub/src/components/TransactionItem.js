import React, { useContext } from 'react'; // Added useContext
import { View, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Import
import { ThemeContext } from '../contexts/ThemeContext'; // Import ThemeContext

const TransactionItem = ({ transaction }) => {
  const { colors } = useContext(ThemeContext); // Use theme colors
  const isIncome = transaction.type === 'income';
  
  // Determine icon and color based on transaction type and theme
  let iconName = isIncome ? 'arrow-up-circle-outline' : 'arrow-down-circle-outline';
  let iconColor = isIncome ? colors.income || '#4CAF50' : colors.expense || '#F44336'; // Use theme-defined income/expense or defaults

  // If theme has specific success/error or income/expense colors, use them
  // For example, if colors.success and colors.error are defined in ThemeContext:
  // iconColor = isIncome ? colors.success : colors.error;

  return (
    <View style={[styles.container, { backgroundColor: colors.card, borderBottomColor: colors.separator }]}>
      <MaterialCommunityIcons name={iconName} size={28} color={iconColor} style={styles.icon} />
      <View style={styles.detailsContainer}>
        <Text style={[styles.category, { color: colors.text }]}>{transaction.category}</Text>
        <Text style={[styles.description, { color: colors.textMuted || 'gray' }]}>{transaction.description}</Text>
      </View>
      <View style={styles.amountContainer}>
        <Text style={[styles.amount, { color: iconColor }]}>
          {isIncome ? '+' : '-'}${transaction.amount.toFixed(2)}
        </Text>
        <Text style={[styles.date, { color: colors.textMuted || 'gray' }]}>{transaction.date}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    // marginBottom: 10, // Using borderBottom instead for a list feel
    // borderRadius: 8, 
    borderBottomWidth: 1, // Separator line
    // shadowColor: '#000', // Removing shadows for a flatter list item, theme dependent
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.1,
    // shadowRadius: 2,
    // elevation: 2,
  },
  icon: {
    marginRight: 15,
  },
  detailsContainer: {
    flex: 1,
  },
  category: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 12,
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 10,
  },
});

export default TransactionItem;
