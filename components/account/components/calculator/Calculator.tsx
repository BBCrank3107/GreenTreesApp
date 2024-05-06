import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Switch, View, Text, Image, TouchableOpacity } from 'react-native';
import { myColors } from './src/styles/Colors';
import { ThemeContext } from './src/context/ThemeContext';
import MyKeyboard from './src/components/MyKeyboard';

export default function Calculator({ navigation }: any) {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={theme}>
      <SafeAreaView style={theme === 'light' ? styles.container : [styles.container, { backgroundColor: 'black' }]}>
        <View style={{ height: 50, width: '100%', backgroundColor: '#d9d9d9', flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            style={{ padding: 10 }}
            onPress={() => {
              navigation.navigate('Account')
            }}>
            <Image style={{ height: 26, width: 26 }} source={require('../../../../images/icons/back.png')} />
          </TouchableOpacity>
          <Text style={{ fontSize: 20 }}>Máy tính</Text>
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
