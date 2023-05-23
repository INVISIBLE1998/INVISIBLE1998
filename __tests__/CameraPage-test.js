/* eslint-disable prettier/prettier */
import * as React from 'react';
import {screen, render} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from '../State/store';
import CameraPage from '../Pages/CameraPage/CameraPage';

describe('CameraPage Component', () => {
  test('CameraPage', () => {
    render(
      <Provider store={store}>
        <NavigationContainer>
          <CameraPage />
        </NavigationContainer>
      </Provider>
    );
    expect(screen.getByText('Camera Loading')).toBeTruthy();
  });
});
