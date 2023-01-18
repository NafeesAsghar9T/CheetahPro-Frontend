import {StyleSheet} from 'react-native';

import colors from '@App/constants/colors';
import fonts from '@App/constants/fonts';

export default StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {
    fontFamily: fonts.SemiBold,
    fontSize: 18,
    color: colors.black,
  },
});
