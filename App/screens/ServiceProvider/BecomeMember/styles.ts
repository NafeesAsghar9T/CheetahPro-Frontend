import colors from '@App/constants/colors';
import fonts from '@App/constants/fonts';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  text: {
    color: colors.black,
    fontSize: 15,
    fontFamily: fonts.Regular,
  },
  description: {
    fontFamily: fonts.Medium,
    fontSize: 16,
    color: colors.black,
    textAlign: 'center',
  },
  center: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    margin: 15,
  },
  paymentView: {
    flex: 1,
    backgroundColor: 'white',
    // paddingTop: isIos ? 30 : 0,
  },
  errorModal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 50,
  },
});
