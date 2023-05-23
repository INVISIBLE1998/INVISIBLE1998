/* eslint-disable prettier/prettier */
import {ScrollView} from 'react-native';
import React from 'react';
import Form from '../../Components/Form/Form';

const Details = ({route}) => {
  const {id} = route.params;
  return (
    <ScrollView>
      <Form id={id} />
    </ScrollView>
  );
};

export default Details;
