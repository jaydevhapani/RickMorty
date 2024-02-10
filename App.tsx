import {LogBox, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/reduxConfigration/store';
import RootNavigation from './src/navigationController/rootNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const App = () => {
  LogBox.ignoreAllLogs();
  return (
    <QueryClientProvider client={new QueryClient()}>
      <Provider store={store}>
        <NavigationContainer>
          <RootNavigation />
        </NavigationContainer>
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
