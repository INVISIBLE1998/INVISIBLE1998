/* eslint-disable prettier/prettier */

// Import Jest Native matchers
import '@testing-library/jest-native/extend-expect';
import 'rn-fetch-blob';

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock(
  'rn-fetch-blob',
  () => {
    return {
      fetch: jest.fn(),
    };
  },
  {virtual: true},
);
