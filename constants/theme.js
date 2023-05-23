/* eslint-disable prettier/prettier */
import {DefaultTheme} from 'react-native-paper';
import {DefaultTheme as NavigationTheme} from '@react-navigation/native';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#023e8a',
    accent: '#0077b6',
    background: '#fff',
    text: '#03045e',
    surface: '#48cae4',
  },
};

export const navigationTheme = {
  ...NavigationTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#023e8a',
    accent: '#0077b6',
    background: '#caf0f8',
    text: '#03045e',
    surface: '#48cae4',
  },
};

export const appbarStyle = {
  backgroundColor: '#023e8a',
  color: '#caf0f8',
};

export const bottomNavigator = {
  backgroundColor: '#023e8a',
  color: '#03045e',
  activeColor: '#caf0f8',
};
