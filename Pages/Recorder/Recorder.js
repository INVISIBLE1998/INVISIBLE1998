/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  PermissionsAndroid,
  Platform,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
  OutputFormatAndroidType,
} from 'react-native-audio-recorder-player';
import {IconButton} from 'react-native-paper';
import RNFetchBlob from 'rn-fetch-blob';

import Player from '../../Components/Player/Player';
import {navigationTheme} from '../../constants/theme';

/* istanbul ignore next */
const Recorder = ({navigation}) => {
  const [, setState] = useState({
    isLoggingIn: false,
    recordSecs: 0,
    recordTime: '00:00:00',
    currentPositionSec: 0,
    currentDurationSec: 0,
    playTime: '00:00:00',
    duration: '00:00:00',
  });

  /* istanbul ignore next */
  const dirs = RNFetchBlob.fs.dirs;
  const path = Platform.select({
    ios: undefined,
    android: `${dirs.CacheDir}/hello.mp3`,
  });

  /* istanbul ignore next */
  const audioRecorderPlayer = new AudioRecorderPlayer();
  audioRecorderPlayer.setSubscriptionDuration(0.1);

  /* istanbul ignore next */
  useEffect(() => {
    if (Platform.OS === 'android') {
      return async () => {
        try {
          const grants = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          ]);

          console.log('write external stroage', grants);

          if (
            grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            grants['android.permission.READ_EXTERNAL_STORAGE'] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            grants['android.permission.RECORD_AUDIO'] ===
              PermissionsAndroid.RESULTS.GRANTED
          ) {
            console.log('Permissions granted');
          } else {
            console.log('All required permissions not granted');
          }
        } catch (error) {
          console.warn(error);
          return;
        }
      };
    }
  }, []);

  /* istanbul ignore next */
  const onStartRecord = () => {
    const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
      OutputFormatAndroid: OutputFormatAndroidType.AAC_ADTS,
    };

    console.log('aUDIO', audioSet);

    const record = async () => {
      await audioRecorderPlayer.startRecorder(path, audioSet);
    };

    const uri = record();

    audioRecorderPlayer.addRecordBackListener(e => {
      setState({
        recordSecs: e.currentPosition,
        recordTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
      });
    });

    console.log('uri', uri);
  };

  /* istanbul ignore next */
  const onPauseRecord = async () => {
    try {
      const r = await audioRecorderPlayer.pauseRecorder();
      console.log(r);
    } catch (err) {
      console.log('Pause Record', err);
    }
  };

  /* istanbul ignore next */
  const onResumeRecord = async () => {
    await audioRecorderPlayer.resumeRecorder();
  };

  /* istanbul ignore next */
  const onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setState({
      recordSecs: 0,
    });
    console.log('result', result);
  };

  /* istanbul ignore next */
  const onStartPlay = async () => {
    console.log('onStartPlay');

    const msg = await audioRecorderPlayer.startPlayer();
    const volume = await audioRecorderPlayer.setVolume(1.0);
    console.log(`file: ${msg}`, `volume: ${volume}`);

    audioRecorderPlayer.addPlayBackListener(e => {
      setState({
        currentPositionSec: e.currentPosition,
        currentDurationSec: e.duration,
        playTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
        duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
      });
    });
  };

  /* istanbul ignore next */
  const onPausePlay = async () => {
    await audioRecorderPlayer.pausePlayer();
  };

  /* istanbul ignore next */
  const onResumePlay = async () => {
    await audioRecorderPlayer.resumePlayer();
  };

  /* istanbul ignore next */
  const onStopPlay = async () => {
    console.log('onStopPlay');
    await audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
  };

  /* istanbul ignore next */
  const backHandler = () => {
    navigation.goBack();
  };

  /* istanbul ignore next */
  return (
    <>
      <IconButton
        icon="arrow-left"
        color={navigationTheme.colors.primary}
        onPress={backHandler}
      />
      <SafeAreaView style={styles.container}>
        <Player
          onStartRecord={onStartRecord}
          onStopRecord={onStopRecord}
          onPauseRecord={onPauseRecord}
          onResumeRecord={onResumeRecord}
          onStartPlay={onStartPlay}
          onPausePlay={onPausePlay}
          onResumePlay={onResumePlay}
          onStopPlay={onStopPlay}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
});

export default Recorder;
