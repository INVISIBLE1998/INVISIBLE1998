/* eslint-disable prettier/prettier */
import * as React from 'react';
import {
  screen,
  render,
  fireEvent,
  cleanup,
} from '@testing-library/react-native';
import App from '../App';
import store from '../State/store';
import {addUsers, checkUser} from '../State/slices/UserSlice';
import 'react-native-vision-camera';
import 'react-native-splash-screen';

jest.mock('react-native-vision-camera');
jest.mock('react-native-splash-screen', () => ({
  hide: jest.fn(),
}));

describe('React Navigation', () => {
  afterEach(cleanup);

  test('Login Screen', () => {
    render(<App />);
    expect(screen.findByPlaceholderText('Email')).toBeTruthy();
    expect(screen.findByPlaceholderText('Password')).toBeTruthy();
    expect(screen.findByText("Don't Have Account,")).toBeTruthy();
  });

  test('Register Screen', async () => {
    render(<App />);
    const clickRegister = await screen.findByText('Register');
    fireEvent(clickRegister, 'press');
    expect(screen.findByPlaceholderText('First Name')).toBeTruthy();
    expect(screen.findByPlaceholderText('Last Name')).toBeTruthy();
    expect(screen.findByPlaceholderText('Email')).toBeTruthy();
    expect(screen.findByPlaceholderText('Password')).toBeTruthy();
    expect(screen.findByPlaceholderText('Confirm Password')).toBeTruthy();
    expect(screen.findByText('Already Have Account')).toBeTruthy();
  });

  test('Dashboard Page', () => {
    store.dispatch(
      addUsers({
        firstName: 'Jake',
        lastName: 'Blu',
        email: 'jakeblu@g.com',
        password: 'hello123',
        confirmP: 'hello123',
      }),
    );
    store.dispatch(
      checkUser({
        email: 'jakeblu@g.com',
        password: 'hello123',
      }),
    );
    let isLoggedIn = store.getState().user.isLoggedIn;
    expect(isLoggedIn).toBe(true);
    render(<App />);
    expect(screen.findByPlaceholderText('Search Filter')).toBeTruthy();
  });
});
