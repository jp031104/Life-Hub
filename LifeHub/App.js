import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { ThemeProvider } from './src/contexts/ThemeContext'; // Import ThemeProvider

const App = () => {
  return (
    <ThemeProvider>
      {/* NavigationContainer can also be themed if needed, 
          but for now, components will consume context directly */}
      <NavigationContainer> 
        <AppNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
