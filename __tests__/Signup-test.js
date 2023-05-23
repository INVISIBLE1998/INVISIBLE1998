/* eslint-disable prettier/prettier */
import 'react-native';
import React from 'react';
import Signup from '../Pages/Signup/Signup';
import {screen, render, fireEvent} from '@testing-library/react-native';
import '@react-navigation/native';
import Redux from 'react-redux';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock('@react-navigation/native');

describe('Sign Up Component', () => {
  // Fake timers using Jest
  beforeEach(() => {
    jest.useFakeTimers();
  });

  // Running all pending timers and switching to real timers using Jest
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('mock testing for First name', async () => {
    render(<Signup />);
    const clickSubmit = await screen.getByTestId('firstnametest');
    fireEvent.changeText(clickSubmit, 'abhilash');
    expect(clickSubmit.props.value).toBe('abhilash');
  });

  test('mock testing for last name', async () => {
    render(<Signup />);
    const clickSubmit = await screen.getByTestId('lastnametest');
    fireEvent.changeText(clickSubmit, 'nyamagoud');
    expect(clickSubmit.props.value).toBe('nyamagoud');
  });

  test('mock testing for email', async () => {
    render(<Signup />);
    const clickSubmit = await screen.getByTestId('emailtest');
    fireEvent.changeText(clickSubmit, 'abc@gmail.com');
    expect(clickSubmit.props.value).toBe('abc@gmail.com');
  });

  test('mock testing for password', async () => {
    render(<Signup />);
    const clickSubmit = await screen.getByTestId('passwordtest');
    fireEvent.changeText(clickSubmit, '1234');
    expect(clickSubmit.props.value).toBe('1234');
  });

  test('mock testing for confirm password', async () => {
    render(<Signup />);
    const clickSubmit = await screen.getByTestId('confpasswordtest');
    fireEvent.changeText(clickSubmit, '1234');
    expect(clickSubmit.props.value).toBe('1234');
  });

  test('Sign up Await', async () => {
    const fakeNavigation = {
      navigate: jest.fn(),
    };

    Redux.useDispatch.mockReturnValue(jest.fn());

    render(<Signup navigation={fakeNavigation} />);

    const firstName = screen.getByTestId('firstnametest');
    const lastName = screen.getByTestId('lastnametest');
    const email = screen.getByTestId('emailtest');
    const password = screen.getByTestId('passwordtest');
    const confirmP = screen.getByTestId('confpasswordtest');
    fireEvent.changeText(firstName, 'Abhilash');
    fireEvent.changeText(lastName, 'Nyamagoud');
    fireEvent.changeText(email, 'arn@gmail.com');
    fireEvent.changeText(password, 'hello123');
    fireEvent.changeText(confirmP, 'hello123');
    const signupBtn = screen.getByTestId('submittest');
    fireEvent.press(signupBtn);
    expect(fakeNavigation.navigate).toBeCalledWith('Login');
  });

  test('Login Button', () => {
    const fakeNavigation = {
      navigate: jest.fn(),
    };

    render(<Signup navigation={fakeNavigation} />);
    const loginBtn = screen.getByTestId('backToLogin');
    fireEvent.press(loginBtn);
    expect(fakeNavigation.navigate).toBeCalledWith('Login');
  });
});
