/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Avatar, Card, Title, Paragraph, Button} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {loggedInUser, logoutUser} from '../../State/slices/UserSlice';

const Profile = () => {
  const loggedUser = useSelector(loggedInUser);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logoutUser());
  };

  return (
    <View style={styles.profileContainer}>
      <Card style={styles.profileCard} elevation={5}>
        <Card.Content style={styles.profileCardContent}>
          <Avatar.Text size={50} label={loggedUser.firstName.charAt(0).toUpperCase() + loggedUser.lastName.charAt(0).toUpperCase()} />
          <Title>{loggedUser.email}</Title>
          <Paragraph>First Name : {loggedUser.firstName}</Paragraph>
          <Paragraph>Last Name : {loggedUser.lastName}</Paragraph>
        </Card.Content>
      </Card>
      <Button
        testID="logoutBtn"
        mode="contained"
        style={styles.logoutButton}
        onPress={logoutHandler}>
        Logout
      </Button>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  profileContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileCard: {
    width: '80%',
    marginTop: 30,
    borderTopStartRadius: 30,
    borderBottomEndRadius: 30,
  },
  profileCardContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButton: {
    marginVertical: 10,
  },
});
