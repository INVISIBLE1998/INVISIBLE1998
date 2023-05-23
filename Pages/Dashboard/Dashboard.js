/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import Cards from '../../Components/Card/Cards';
import {useDispatch, useSelector} from 'react-redux';
import {
  AllTasks,
  FilterTask,
  filteredTask,
} from '../../State/slices/TaskSlices';

const renderTask = taskData => {
  return <Cards {...taskData.item} />;
};

const Dashboard = () => {
  const allTasks = useSelector(AllTasks);
  const filterTask = useSelector(FilterTask);
  const dispatch = useDispatch();
  const [searchFilter, setSearchFilter] = useState('');

  const searchInput = input => setSearchFilter(input);

  useEffect(() => {
    dispatch(filteredTask(searchFilter));
  }, [searchFilter, dispatch]);

  return (
    <>
      <TextInput
        testID="searchFilter"
        mode="outlined"
        label="Search Filter"
        left={<TextInput.Icon icon="filter" />}
        onChangeText={searchInput}
        value={searchFilter}
        dense
        style={styles.filter}
      />
      <FlatList
        data={searchFilter ? filterTask : allTasks}
        renderItem={renderTask}
        keyExtractor={item => item.id}
      />
    </>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  filter: {
    marginHorizontal: 15,
  },
});
