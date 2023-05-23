/* eslint-disable prettier/prettier */
import * as React from 'react';
import {screen, render} from '@testing-library/react-native';
import Profile from '../Pages/Profile/Profile';
import {Provider} from 'react-redux';
import store from '../State/store';
import {addUsers, checkUser} from '../State/slices/UserSlice';

describe('Profile Component', () => {
  jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
  }));

  test('Profile UI', () => {
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
    render(
      <Provider store={store}>
        <Profile />
      </Provider>,
    );
    expect(screen.getByText('jakeblu@g.com')).toBeTruthy();
    expect(screen.getByText('First Name : Jake')).toBeTruthy();
    expect(screen.getByText('Last Name : Blu')).toBeTruthy();
    expect(screen.getByText('Logout')).toBeTruthy();
  });
});
