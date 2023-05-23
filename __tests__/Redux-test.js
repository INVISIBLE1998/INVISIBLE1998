/* eslint-disable prettier/prettier */
import store from '../State/store';
import {addUsers, checkUser, logoutUser} from '../State/slices/UserSlice';
import {updateTask} from '../State/slices/TaskSlices';

describe('Redux Testing', () => {
  test('Add Users Reducer', () => {
    store.dispatch(
      addUsers({
        firstName: 'Jake',
        lastName: 'Blu',
        email: 'jakeblu@g.com',
        password: 'hello123',
        confirmP: 'hello123',
      }),
    );
    let state = store.getState().user.totalUsers;
    let users = state;
    expect(users).toHaveLength(1);
  });

  test('Login Check User', () => {
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
    let check = store.getState().user.loggedUser;
    expect(check).toMatchObject({
      email: 'jakeblu@g.com',
      password: 'hello123',
    });
    let isLoggedIn = store.getState().user.isLoggedIn;
    expect(isLoggedIn).toBe(true);
  });

  test('Logout User', () => {
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
    store.dispatch(logoutUser());
    let logoutCheck = store.getState().user.loggedUser;
    let isLoggedInCheck = store.getState().user.isLoggedIn;
    expect(logoutCheck).toMatchObject({});
    expect(isLoggedInCheck).toBe(false);
  });

  test('Update Tasks reducer', () => {
    store.dispatch(
      updateTask({
        id: 1,
        title: 'Todos title',
        type: 'Complex',
      }),
    );
    let check = store.getState().task.totalTasks;
    let indexed = check.find(find => find.id === 1);
    expect(indexed).toMatchObject({
      id: 1,
      title: 'Todos title',
      type: 'Complex',
    });
  });
});
