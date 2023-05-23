/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {TextInput, Text, Headline, Button, Card} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {checkUser} from '../../State/slices/UserSlice';
import isEmail from 'validator/lib/isEmail';
import * as Animatable from 'react-native-animatable';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginErr, setLoginErr] = useState('');
  const errors = {};
  const [hidePasscode, setHidePasscode] = useState(false);

  const dispatch = useDispatch();
  const handleEmail = email1 => setEmail(email1);
  const handlePassword = password1 => setPassword(password1);

  /* istanbul ignore next */
  const loginValidate = () => {
    if (email.trim().length === 0) {
      errors.email = 'Field Required';
    } else if (!isEmail(email)) {
      errors.email = 'Invalid Email';
    }
    if (password.trim().length === 0) {
      errors.password = 'Field Required';
    }
  };

  const handleSubmit = e => {
    loginValidate();
    if (Object.keys(errors).length === 0) {
      setLoginErr({});
      const credintials = {
        email,
        password,
      };
      dispatch(checkUser(credintials));
    } else {
      /* istanbul ignore next */
      setLoginErr(errors);
    }
  };

  return (
    <View style={styles.main}>
      <Animatable.View animation="fadeInUpBig" duration={2000}>
        <Card style={styles.cardStyle}>
          <View style={styles.loginContainer}>
            <Headline
              data-testid="loginHeading"
              testID="headtest"
              style={styles.heading}>
              Login
            </Headline>
            <TextInput
              testID="emailInput"
              label="Email"
              mode="outlined"
              placeholder="Enter Valid Email"
              error={false}
              style={styles.textInputStyle}
              selectionColor="yellow"
              underlineColor="green"
              value={email}
              onChangeText={handleEmail}
              left={<TextInput.Icon name="shield-outline" />}
            />
            {loginErr.email && (
              <Text style={styles.errText}>{loginErr.email} </Text>
            )}
            <TextInput
              testID="passwordInput"
              mode="outlined"
              label="Password"
              secureTextEntry={hidePasscode}
              right={
                <TextInput.Icon
                  onPress={() => setHidePasscode(!hidePasscode)}
                  name="eye"
                />
              }
              style={styles.textInputStyle}
              placeholder="Enter Valid Password"
              value={password}
              onChangeText={handlePassword}
              left={<TextInput.Icon name="shield-plus" />}
            />
            {loginErr.password && (
              <Text style={styles.errText}>{loginErr.password} </Text>
            )}
            <Button
              testID="loginSubmit"
              mode="contained"
              style={styles.buttonStyle}
              onPress={handleSubmit}>
              Login
            </Button>
            <Text style={styles.textStyle}>
              Don't Have Account,{' '}
              <Text
                style={styles.buttonStyle}
                onPress={() => navigation.navigate('Signup')}>
                Register
              </Text>{' '}
            </Text>
          </View>
        </Card>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    margin: 20,
  },
  textStyle: {
    marginTop: 10,
  },
  errText: {
    color: 'red',
    textAlign: 'center',
  },
  textInputStyle: {
    marginVertical: 10,
    fontSize: 15,
  },
  buttonStyle: {
    fontSize: 17,
    color: '#000',
  },
  heading: {fontSize: 30, textAlign: 'center', color: '#000', marginTop: 20},
  main: {
    flex: 1,
    backgroundColor: '#fa5c34',
  },
  cardStyle: {
    margin: 15,
    backgroundColor: '#fff',
    borderTopStartRadius: 30,
    borderBottomEndRadius: 30,
  },
});

export default Login;
