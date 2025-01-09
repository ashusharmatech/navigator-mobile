import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './src/screens/HomeScreen';
import { FundListScreen } from './src/screens/FundListScreen';
import { FundDetailsScreen } from './src/screens/FundDetailsScreen';
import { RootStackParamList } from './src/navigation/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1a73e8',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="FundList" 
          component={FundListScreen}
          options={{ title: 'All Funds' }}
        />
        <Stack.Screen 
          name="FundDetails" 
          component={FundDetailsScreen}
          options={{ title: 'Fund Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}