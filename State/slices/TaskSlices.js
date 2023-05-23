/* eslint-disable prettier/prettier */
import {createSlice} from '@reduxjs/toolkit';
import {Alert} from 'react-native';

const DUMMY_DATA = [
  {
    id: 0,
    startDate: '17-10-2022',
    time: '10:00 AM',
    title: 'Todo 1',
    type: 'Hard',
    machine: 'Motor',
    location: 'Bangalore',
    priority: 'Low',
    approval: 'Yes',
    dependent: 'No',
    detail: 'Click Here',
    subTask: 'No',
    comments: 'Nothing',
    description: 'Some instructions',
    duration: '5 Days',
    endDate: '22-10-2022',
    instruction: 'Some Instructions',
  },
  {
    id: 1,
    startDate: '17-10-2022',
    time: '10:00 AM',
    title: 'Todo 2',
    type: 'Simple',
    machine: 'Motor',
    location: 'Bangalore',
    priority: 'medium',
    approval: 'Yes',
    dependent: 'No',
    detail: 'Click Here',
    subTask: 'No',
    comments: 'Nothing',
    description: 'Some instructions',
    duration: '5 Days',
    endDate: '22-10-2022',
    instruction: 'Some Instructions',
  },
  {
    id: 2,
    startDate: '17-10-2022',
    time: '10:00 AM',
    title: 'Todo 3',
    type: 'Simple',
    machine: 'Motor',
    location: 'Bangalore',
    priority: 'medium',
    approval: 'Yes',
    dependent: 'No',
    detail: 'Click Here',
    subTask: 'No',
    comments: 'Nothing',
    description: 'Some instructions',
    duration: '5 Days',
    endDate: '22-10-2022',
    instruction: 'Some Instructions',
  },
];

const initialState = {
  totalTasks: DUMMY_DATA,
  filterTask: DUMMY_DATA,
};

export const TaskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    updateTask: (state, action) => {
      const updateableTaskIndex = state.totalTasks.findIndex(
        task => task.id === action.payload.id,
      );
      Object.assign(state.totalTasks[updateableTaskIndex], action.payload);
      Alert.alert('Task Details Updated!');
    },
    filteredTask: (state, action) => {
      const filteredData = state.totalTasks.filter(
        ({title, type, priority}) => {
          return (
            title.toLowerCase().includes(action.payload.toLowerCase()) ||
            type.toLowerCase().includes(action.payload.toLowerCase()) ||
            priority.toLowerCase().includes(action.payload.toLowerCase())
          );
        },
      );
      return {
        ...state,
        filterTask: action.payload.length > 0 ? filteredData : state.totalTasks,
      };
    },
  },
});

export const AllTasks = state => state.task.totalTasks;

export const FilterTask = state => state.task.filterTask;

export const {updateTask, filteredTask} = TaskSlice.actions;

export default TaskSlice.reducer;
