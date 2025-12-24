import AsyncStorage from '@react-native-async-storage/async-storage';

const FIRST_LAUNCH_KEY = 'hasLaunched';

export const checkFirstLaunch = async (): Promise<boolean> => {
  const value = await AsyncStorage.getItem(FIRST_LAUNCH_KEY);
  if (value === null) {
    await AsyncStorage.setItem(FIRST_LAUNCH_KEY, 'true');
    return true; // first launch
  }
  return false; // not first launch
};
