/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {TextInput, Button, Card} from 'react-native-paper';
import isEmail from 'validator/lib/isEmail';
import {useDispatch} from 'react-redux';
import {addUsers} from '../../State/slices/UserSlice';
import * as Animatable from 'react-native-animatable';

const Signup = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmP, setConfirmP] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const errors = {};

  const dispatch = useDispatch();

  const handleFName = name => setFirstName(name);
  const handleLname = lName => setLastName(lName);
  const handleEmail = email1 => setEmail(email1);
  const handlePassword = password1 => setPassword(password1);
  const handleConfirm = cPassword => setConfirmP(cPassword);

  /* istanbul ignore next */
  const validate = () => {
    if (firstName.trim().length === 0) {
      errors.firstName = 'Field Required';
    }
    if (lastName.trim().length === 0) {
      errors.lastName = 'Field Required';
    }
    if (email.trim().length === 0) {
      errors.email = 'Field Required';
    } else if (!isEmail(email)) {
      errors.email = 'Invalid Email';
    }
    if (password.trim().length === 0) {
      errors.password = 'Password Required';
    }
    if (password !== confirmP) {
      errors.cPassword = 'Password Should Match';
    }
  };

  const handleSubmit = e => {
    validate();
    if (Object.keys(errors).length === 0) {
      setFormErrors({});
      const formData = {
        firstName,
        lastName,
        email,
        password,
        confirmP,
      };
      console.log(formData);
      dispatch(addUsers(formData));
      navigation.navigate('Login');
    } else {
      /* istanbul ignore next */
      setFormErrors(errors);
    }
  };

  return (
    <ScrollView style={styes.main}>
      <Animatable.View animation="fadeInUpBig" duration={3000}>
        <Card style={styes.cardStyle}>
          <Card.Title title="Register" />
          <View style={styes.signUpContainer}>
            <TextInput
              label="First Name"
              testID="firstnametest"
              placeholder="Enter First Name"
              mode="outlined"
              style={styes.inputField}
              value={firstName}
              onChangeText={handleFName}
              right={<TextInput.Affix text="/20" />}
              left={<TextInput.Icon name="account" />}
            />
            {formErrors.firstName && (
              <Text style={styes.errText}>{formErrors.firstName} </Text>
            )}
            <TextInput
              label="Last Name"
              placeholder="Enter Last Name"
              testID="lastnametest"
              mode="outlined"
              style={styes.inputField}
              value={lastName}
              onChangeText={handleLname}
              right={<TextInput.Affix text="/20" />}
              left={<TextInput.Icon name="account-arrow-left" />}
            />
            {formErrors.lastName && (
              <Text style={styes.errText}>{formErrors.lastName} </Text>
            )}
            <TextInput
              label="Email"
              placeholder="Enter Valid Email"
              testID="emailtest"
              mode="outlined"
              style={styes.inputField}
              value={email}
              onChangeText={handleEmail}
              right={<TextInput.Affix text="/20" />}
              left={<TextInput.Icon name="email" />}
            />
            {formErrors.email && (
              <Text style={styes.errText}>{formErrors.email} </Text>
            )}
            <TextInput
              label="Password"
              secureTextEntry
              placeholder="Enter Password"
              testID="passwordtest"
              mode="outlined"
              style={styes.inputField}
              value={password}
              onChangeText={handlePassword}
              right={<TextInput.Affix text="/20" />}
              left={<TextInput.Icon name="script-text-key" />}
            />
            {formErrors.password && (
              <Text style={styes.errText}>{formErrors.password} </Text>
            )}
            <TextInput
              label="Confirm password"
              secureTextEntry
              placeholder="Confirm Password"
              testID="confpasswordtest"
              mode="outlined"
              style={styes.inputField}
              value={confirmP}
              onChangeText={handleConfirm}
              right={<TextInput.Affix text="/20" />}
              left={<TextInput.Icon name="script-text-key" />}
            />
            {formErrors.cPassword && (
              <Text style={styes.errText}>{formErrors.cPassword} </Text>
            )}
            <Button
              onPress={handleSubmit}
              mode="contained"
              style={styes.btn}
              testID="submittest">
              Submit
            </Button>
            <Text>
              Already Have Account,{' '}
              <Text
                style={styes.lgBtn}
                testID="backToLogin"
                onPress={() => navigation.navigate('Login')}>
                Login{' '}
              </Text>{' '}
            </Text>
          </View>
        </Card>
      </Animatable.View>
    </ScrollView>
  );
};

const styes = StyleSheet.create({
  inputField: {
    marginVertical: 5,
  },
  signUpContainer: {
    margin: 20,
  },
  errText: {
    color: 'red',
  },
  btn: {
    marginVertical: 15,
    borderRadius: 10,
  },
  lgBtn: {
    fontSize: 18,
    color: '#000',
  },
  cardStyle: {
    margin: 15,
    borderTopStartRadius: 30,
    borderBottomEndRadius: 30,
    backgroundColor: '#fff',
  },
  main: {
    flex: 1,
    backgroundColor: '#fa5c34',
  },
});

export default Signup;
