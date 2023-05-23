/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {IconButton, Headline, Card} from 'react-native-paper';

/* istanbul ignore next */
const Player = ({
  onStartRecord,
  onStopRecord,
  onPauseRecord,
  onResumeRecord,
  onStartPlay,
  onPausePlay,
  onResumePlay,
  onStopPlay,
}) => {
  /* istanbul ignore next */
  return (
    <View>
      <Headline>Start Record</Headline>
      <Card>
        <View style={styles.main}>
          <IconButton onPress={onStartRecord} icon="record-circle" size={50} />
          <IconButton
            onPress={onStopRecord}
            icon="stop-circle-outline"
            size={50}
          />
          <IconButton onPress={onPauseRecord} icon="pause-circle" size={50} />
          <IconButton onPress={onResumeRecord} icon="play-circle" size={50} />
        </View>
      </Card>
      <Headline>Play Recordring</Headline>
      <Card>
        <View style={styles.main}>
          <IconButton onPress={onStartPlay} icon="play" size={50} />
          <IconButton onPress={onPausePlay} icon="pause" size={50} />
          <IconButton onPress={onResumePlay} icon="play-circle" size={50} />
          <IconButton
            onPress={onStopPlay}
            icon="stop-circle-outline"
            size={50}
          />
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 15,
    padding: 10,
  },
});

export default Player;
