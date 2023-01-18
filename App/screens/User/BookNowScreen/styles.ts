import colors from '@App/constants/colors';
import fonts from '@App/constants/fonts';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  heading: {
    color: colors.black,
    fontSize: 16,
    fontFamily: fonts.Medium,
  },
  subHeading: {
    color: colors.black,
    fontSize: 15,
    fontFamily: fonts.Regular,
  },
});
