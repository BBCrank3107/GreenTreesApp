import React from 'react';

import {
  StyleSheet,
} from 'react-native';

import RootComponent from './components/index'

const App = () => {
  return (
    <RootComponent/>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
  },
});

export default App;
