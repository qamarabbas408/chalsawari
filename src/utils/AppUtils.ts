// src/utils/AppUtils.ts
import { CommonActions } from '@react-navigation/native';

export const handleNavigationTo = (navigation: any, route:string) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: route }],
    })
  );
};
