/* eslint-disable prettier/prettier */
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Text, Card} from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

export default function Cards({
  id,
  startDate,
  time,
  title,
  type,
  machine,
  location,
  priority,
  approval,
  detail,
  dependent,
  subTask,
  comments,
}) {
  const navigation = useNavigation();

  const cardPressHandler = () => {
    navigation.navigate('Details', {id: id});
  };

  return (
    <Animatable.View animation="fadeInUpBig" duration={1500}>
      <TouchableOpacity testID="dashboardCard" onPress={cardPressHandler}>
        <Card style={styles.container} elevation={5}>
          <Card.Content>
            <Text>Task Code: {id + 1}</Text>
            <Text style={styles.right}>Date:{startDate}</Text>
            <Text>Task Title: {title}</Text>
            <Text style={styles.right}>Time: {time}</Text>
            <Text>Machine: {machine}</Text>
            <Text style={styles.right}>Type: {type}</Text>
            <Text>Priority: {priority}</Text>
            <Text style={styles.right}>Location: {location}</Text>
            <View style={styles.line} />
            <Text>Approval: {approval}</Text>
            <Text style={styles.right}>Detail: {detail}</Text>
            <Text>Dependent: {dependent}</Text>
            <Text style={styles.right}>Sub Task: {subTask}</Text>
            <Text>Comments: {comments}</Text>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    margin: 15,
    borderTopStartRadius: 30,
    borderBottomEndRadius: 30,
  },
  right: {
    textAlign: 'right',
    marginTop: -20,
    marginBottom: 10,
  },
  line: {
    marginVertical: 10,
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
