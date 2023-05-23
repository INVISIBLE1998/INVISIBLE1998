/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import {Camera, useCameraDevices} from 'react-native-vision-camera';

const LoadingView = () => {
  return (
    <View>
      <Text>Camera Loading</Text>
    </View>
  );
};

const CameraComponent = () => {
  const devices = useCameraDevices();
  const device = devices.back;

  if (device == null) {
    return <LoadingView />;
  } else {
    /* istanbul ignore next */
    return (
      <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} />
    );
  }
};

export default CameraComponent;
