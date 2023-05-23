/* eslint-disable prettier/prettier */
import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {TextInput, Button, IconButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {navigationTheme} from '../../constants/theme';
import {AllTasks, updateTask} from '../../State/slices/TaskSlices';

const Form = ({id}) => {
  const allTasks = useSelector(AllTasks);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {
    title: titleValue,
    startDate: startDateValue,
    type: typeValue,
    machine: machineValue,
    duration: durationValue,
    endDate: endDateValue,
    description: descriptionValue,
    instruction: instructionValue,
    comments: commentsValue,
  } = allTasks[id];

  // TextInput Values
  const [title, setTitleValue] = useState(titleValue);
  const [startDate, setStartDateValue] = useState(startDateValue);
  const [type, setTypeValue] = useState(typeValue);
  const [machine, setMachineValue] = useState(machineValue);
  const [duration, setDurationValue] = useState(durationValue);
  const [endDate, setEndDateValue] = useState(endDateValue);
  const [description, setDescriptionValue] = useState(descriptionValue);
  const [instruction, setInstructionValue] = useState(instructionValue);
  const [comments, setCommentsValue] = useState(commentsValue);

  // OnChangeText Values
  const titleChange = titleInput => setTitleValue(titleInput);
  const startDateChange = startDateInput => setStartDateValue(startDateInput);
  const typeChange = typeInput => setTypeValue(typeInput);
  const machineChange = machineInput => setMachineValue(machineInput);
  const durationChange = durationInput => setDurationValue(durationInput);
  const endDateChange = endDateInput => setEndDateValue(endDateInput);
  const descriptionChange = descriptionInput =>
    setDescriptionValue(descriptionInput);
  const instructionChange = instructionInput =>
    setInstructionValue(instructionInput);
  const commentsChange = commentsInput => setCommentsValue(commentsInput);

  const submitHandler = () => {
    const taskData = {
      id,
      title,
      startDate,
      type,
      machine,
      duration,
      endDate,
      description,
      instruction,
      comments,
    };
    dispatch(updateTask(taskData));
    navigation.navigate('Dashboard');
  };

  const backHandler = () => {
    navigation.goBack();
  };

  return (
    <>
      <IconButton
        icon="arrow-left"
        color={navigationTheme.colors.primary}
        onPress={backHandler}
        testID="backBtn"
      />
      <View style={styles.container}>
        <TextInput
          testID="title"
          label="Title"
          mode="outlined"
          onChangeText={titleChange}
          value={title}
        />
        <TextInput
          testID="description"
          label="Description"
          mode="outlined"
          onChangeText={descriptionChange}
          value={description}
        />
        <TextInput
          testID="startDate"
          label="Start date"
          mode="outlined"
          onChangeText={startDateChange}
          value={startDate}
        />
        <TextInput
          testID="duration"
          label="Duration"
          mode="outlined"
          onChangeText={durationChange}
          value={duration}
        />
        <TextInput
          testID="endDate"
          label="Expected End Date"
          mode="outlined"
          onChangeText={endDateChange}
          value={endDate}
        />
        <TextInput
          testID="machine"
          label="Machine"
          mode="outlined"
          onChangeText={machineChange}
          value={machine}
        />
        <TextInput
          testID="type"
          label="Type"
          mode="outlined"
          onChangeText={typeChange}
          value={type}
        />
        <TextInput
          testID="instruction"
          label="Operation Instruction"
          mode="outlined"
          onChangeText={instructionChange}
          value={instruction}
        />
        <View style={styles.flexContainer}>
          <View style={styles.right}>
            <Button
              mode="contained"
              color="red"
              style={styles.button}
              onPress={() => console.log('Pressed')}>
              Start
            </Button>
            <Button
              mode="contained"
              color="yellow"
              style={styles.button}
              onPress={() => console.log('Pressed')}>
              Hold
            </Button>
          </View>
          <View style={styles.left}>
            <Button
              mode="contained"
              color="green"
              style={styles.button}
              onPress={() => console.log('Pressed')}>
              Complete
            </Button>
            <Button
              mode="contained"
              color="blue"
              style={styles.button}
              onPress={() => console.log('Pressed')}>
              Shift Over
            </Button>
          </View>
        </View>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('CameraPage')}>
          Camera
        </Button>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Recorder')}
          style={styles.space}>
          Recorder
        </Button>
        <TextInput
          testID="comments"
          label="Comments"
          mode="outlined"
          onChangeText={commentsChange}
          value={comments}
          multiline
          numberOfLines={5}
        />
        <View style={styles.submit}>
          <Button mode="contained" testID="submitBtn" onPress={submitHandler}>
            Submit
          </Button>
        </View>
      </View>
    </>
  );
};

export default Form;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    height: 100,
  },
  left: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  right: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  submit: {
    marginHorizontal: 50,
    marginVertical: 20,
  },
  button: {
    borderRadius: 20,
    width: 170,
  },
  space: {
    marginVertical: 10,
  },
});
