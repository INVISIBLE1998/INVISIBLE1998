/* eslint-disable prettier/prettier */
import 'react-native';
import React from 'react';
import Login from '../Pages/Login/Login';
import {screen, render, fireEvent} from '@testing-library/react-native';
import store from '../State/store';
import {addUsers} from '../State/slices/UserSlice';
import Redux from 'react-redux';
import '@react-navigation/native';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  useRoute: jest.fn(),
}));

describe('Login Component', () => {
  test('Login Screen UI', () => {
    render(<Login />);
    expect(screen.findByRole('Headline')).toBeTruthy();
    expect(screen.findByPlaceholderText('Email')).toBeTruthy();
    expect(screen.findByPlaceholderText('Password')).toBeTruthy();
    expect(screen.findByText("Don't Have Account,")).toBeTruthy();
  });

  test('Login TextInputs', async () => {
    render(<Login />);
    const email = screen.getByTestId('emailInput');
    const password = screen.getByTestId('passwordInput');
    fireEvent.changeText(email, 'jakeblu@g.com');
    fireEvent.changeText(password, 'hello123');
    expect(email.props.value).toBe('jakeblu@g.com');
    expect(password.props.value).toBe('hello123');
  });

  test('Login Submit', async () => {
    store.dispatch(
      addUsers({
        firstName: 'Jake',
        lastName: 'Blu',
        email: 'jakeblu@g.com',
        password: 'hello123',
        confirmP: 'hello123',
      }),
    );
    Redux.useDispatch.mockReturnValue(jest.fn());
    render(<Login />);
    const email = screen.getByTestId('emailInput');
    const password = screen.getByTestId('passwordInput');
    fireEvent.changeText(email, 'jakeblu@g.com');
    fireEvent.changeText(password, 'hello123');
    const loginBtn = screen.getByTestId('loginSubmit');
    fireEvent.press(loginBtn);
    expect(screen.findByPlaceholderText('Search Filter')).toBeTruthy();
  });
});
