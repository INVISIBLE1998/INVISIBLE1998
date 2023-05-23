/* eslint-disable prettier/prettier */
import 'react-native';
import React from 'react';
import Form from '../Components/Form/Form';
import {screen, render, fireEvent} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import store from '../State/store';
import {updateTask} from '../State/slices/TaskSlices';

describe('Form Component', () => {
  jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
  }));

  // Fake timers using Jest
  beforeEach(() => {
    jest.useFakeTimers();
  });

  // Running all pending timers and switching to real timers using Jest
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('form UI', () => {
    const fakeNavigation = {
      goBack: jest.fn(),
    };
    render(
      <Provider store={store}>
        <NavigationContainer>
          <Form id={1} navigation={fakeNavigation} />
        </NavigationContainer>
      </Provider>,
    );
    let backBtn = screen.getByTestId('backBtn');
    expect(backBtn).toBeTruthy();
    fireEvent.press(backBtn);
    expect(fakeNavigation.goBack).toBeCalledWith('Dashboard');
  });

  test('form value change', () => {
    render(
      <Provider store={store}>
        <NavigationContainer>
          <Form id={1} />
        </NavigationContainer>
      </Provider>,
    );
    const title = screen.getByTestId('title');
    const description = screen.getByTestId('description');
    const startDate = screen.getByTestId('startDate');
    const duration = screen.getByTestId('duration');
    const endDate = screen.getByTestId('endDate');
    const machine = screen.getByTestId('machine');
    const type = screen.getByTestId('type');
    const instruction = screen.getByTestId('instruction');
    const comments = screen.getByTestId('comments');

    fireEvent.changeText(title, 'faketitle');
    fireEvent.changeText(description, 'fakedescrption');
    fireEvent.changeText(startDate, '01-01-2022');
    fireEvent.changeText(duration, 'fakeduration');
    fireEvent.changeText(endDate, '31-12-2022');
    fireEvent.changeText(machine, 'fakemachine');
    fireEvent.changeText(type, 'faketype');
    fireEvent.changeText(instruction, 'fakeinstruction');
    fireEvent.changeText(comments, 'fakecomment');

    expect(title.props.value).toBe('faketitle');
    expect(description.props.value).toBe('fakedescrption');
    expect(startDate.props.value).toBe('01-01-2022');
    expect(duration.props.value).toBe('fakeduration');
    expect(endDate.props.value).toBe('31-12-2022');
    expect(machine.props.value).toBe('fakemachine');
    expect(type.props.value).toBe('faketype');
    expect(instruction.props.value).toBe('fakeinstruction');
    expect(comments.props.value).toBe('fakecomment');
  });

  test('Submit Button', () => {
    const fakeNavigation = {
      navigate: jest.fn(),
    };
    render(
      <Provider store={store}>
        <NavigationContainer>
          <Form id={1} navigation={fakeNavigation} />
        </NavigationContainer>
      </Provider>,
    );

    const title = screen.getByTestId('title');
    const description = screen.getByTestId('description');
    const startDate = screen.getByTestId('startDate');
    const duration = screen.getByTestId('duration');
    const endDate = screen.getByTestId('endDate');
    const machine = screen.getByTestId('machine');
    const type = screen.getByTestId('type');
    const instruction = screen.getByTestId('instruction');
    const comments = screen.getByTestId('comments');

    fireEvent.changeText(title, 'faketitle');
    fireEvent.changeText(description, 'fakedescrption');
    fireEvent.changeText(startDate, '01-01-2022');
    fireEvent.changeText(duration, 'fakeduration');
    fireEvent.changeText(endDate, '31-12-2022');
    fireEvent.changeText(machine, 'fakemachine');
    fireEvent.changeText(type, 'faketype');
    fireEvent.changeText(instruction, 'fakeinstruction');
    fireEvent.changeText(comments, 'fakecomment');

    const task = {
      id: 1,
      title: title.props.value,
      description: description.props.value,
      startDate: startDate.props.value,
      duration: duration.props.value,
      endDate: endDate.props.value,
      machine: machine.props.value,
      type: type.props.value,
      instruction: instruction.props.value,
      comments: comments.props.value,
    };

    const submitBtn = screen.getByTestId('submitBtn');
    expect(submitBtn).toBeTruthy();
    fireEvent.press(submitBtn);
    store.dispatch(updateTask(task));
    expect(fakeNavigation.navigate).toBeCalledWith('Dashboard');
  });
});
