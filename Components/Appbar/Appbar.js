/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet} from 'react-native';
import {Appbar} from 'react-native-paper';
import {appbarStyle} from '../../constants/theme';

const AppBar = () => {
  return (
    <Appbar.Header style={styles.headerText}>
      <Appbar.Content title="Task Manager" color={appbarStyle.color} />
    </Appbar.Header>
  );
};

export default AppBar;

const styles = StyleSheet.create({
  headerText: {
    backgroundColor: appbarStyle.backgroundColor,
  },
});
