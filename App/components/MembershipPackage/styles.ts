import colors from '@App/constants/colors';
import fonts from '@App/constants/fonts';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  contentContainerStyle: {
    alignSelf: 'center',
    marginBottom: 15,
  },
  containerStyle: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    // padding: 15,
  },
  package: {
    backgroundColor: colors.primary,
    width: '100%',
    height: '100%',
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  title: {
    color: colors.white,
    fontFamily: fonts.Medium,
    fontSize: 16,
    marginRight: 5,
  },
  amount: {
    color: colors.white,
    fontFamily: fonts.Regular,
    fontSize: 15,
  },
  row: {
    flexDirection: 'row',
    // alignItems: 'center',
  },
});
