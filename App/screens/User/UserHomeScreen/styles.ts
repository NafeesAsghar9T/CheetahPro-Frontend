import {StyleSheet} from 'react-native';

import colors from '@App/constants/colors';
import fonts from '@App/constants/fonts';

export default StyleSheet.create({
  welcomeContainer: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  welcome: {
    color: colors.primary,
    fontSize: 18,
    fontFamily: fonts.Bold,
  },
  today: {
    color: colors.black,
    fontSize: 15,
    fontFamily: fonts.Regular,
  },
  heading: {
    color: colors.black,
    fontSize: 16,
    paddingHorizontal: 15,
    fontFamily: fonts.Medium,
  },
  all: {
    color: colors.primary,
    fontSize: 14,
    paddingHorizontal: 15,
    fontFamily: fonts.Regular,
  },
});
