import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Switch, View, Text, Image, TouchableOpacity } from 'react-native';
import { myColors } from './src/styles/Colors';
import { ThemeContext } from './src/context/ThemeContext';
import MyKeyboard from './src/components/MyKeyboard';
import BackBtn from '../../../backBtn';

export default function Calculator({ navigation, route }: any) {
  const userID = route.params?.userID || '';
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={theme}>
      <SafeAreaView style={theme === 'light' ? styles.container : [styles.container, { backgroundColor: 'black' }]}>
        <View style={{ height: 50, width: '100%', justifyContent: 'center'}}>
          <BackBtn onPress={() => {navigation.navigate('Account', {userID})}}/>
        </View>
        <Switch
          value={theme === 'dark'}
          onValueChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        />
        <MyKeyboard />
      </SafeAreaView>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myColors.light,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
