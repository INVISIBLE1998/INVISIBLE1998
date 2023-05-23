/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {Provider, useSelector} from 'react-redux';
import Icons from 'react-native-vector-icons/Ionicons';
import SplashScreen from 'react-native-splash-screen';

import {theme, navigationTheme, bottomNavigator} from './constants/theme';
import AppBar from './Components/Appbar/Appbar';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import Dashboard from './Pages/Dashboard/Dashboard';
import Profile from './Pages/Profile/Profile';
import Details from './Pages/Details/Details';
import CameraPage from './Pages/CameraPage/CameraPage';
import Recorder from './Pages/Recorder/Recorder';

import store from './State/store';
import {selectLoggedIn} from './State/slices/UserSlice';

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const Home = () => {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      activeColor={bottomNavigator.activeColor}
      inactiveColor={bottomNavigator.color}
      barStyle={styles.bottomBar}>
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({color}) => (
            <Icons name="home" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <Icons name="person-circle" color={color} size={20} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export const Main = () => {
  const isLoggedIn = useSelector(selectLoggedIn);
  return (
    <>
      <AppBar />
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!isLoggedIn ? (
          <Stack.Group initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
          </Stack.Group>
        ) : (
          <Stack.Group initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Details" component={Details} />
            <Stack.Screen name="CameraPage" component={CameraPage} />
            <Stack.Screen name="Recorder" component={Recorder} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </>
  );
};

export const Container = () => {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={navigationTheme}>
        <Main />
      </NavigationContainer>
    </PaperProvider>
  );
};

const App = () => {
  /* istanbul ignore next */
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <Container />
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  bottomBar: {
    backgroundColor: bottomNavigator.backgroundColor,
  },
});
