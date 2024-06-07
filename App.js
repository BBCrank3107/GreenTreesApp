import React from 'react';

import {
  StyleSheet,
} from 'react-native';

import RootComponent from './components/index'
import InforOrder from './Test/inforOrder';

const App = () => {
  return (
    <RootComponent/>
    // <InforOrder></InforOrder>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
  },
});

export default App;
