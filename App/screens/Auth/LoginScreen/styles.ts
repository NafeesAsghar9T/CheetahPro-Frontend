import {StyleSheet} from 'react-native';

import colors from '@App/constants/colors';
import fonts from '@App/constants/fonts';

export default StyleSheet.create({
  screen: {
    flexGrow: 1,
  },
  logoContainer: {
    // flex: 2,
    alignItems: 'center',
  },
  heading: {
    color: colors.primary,
    fontSize: 30,
    letterSpacing: 1,
    fontFamily: fonts.Bold,
  },
  subHeading: {
    color: colors.black,
    fontSize: 16,
    letterSpacing: 0.5,
    fontFamily: fonts.SemiBold,
  },
  logo: {
    height: 120,
    width: 120,
    marginTop: 40,
  },
  formContainer: {
    // flex: 2,
    paddingHorizontal: 15,
  },

  error: {
    color: colors.red,
    textAlign: 'center',
    fontFamily: fonts.Regular,
    fontSize: 14,
  },
  btnContainer: {
    // flex: 1,
    paddingHorizontal: 15,
    marginTop: 70,
    // justifyContent: 'flex-end',
    // marginBottom: 50,
  },
  forgot: {
    color: colors.black,
    textAlign: 'right',
    fontSize: 16,
    fontFamily: fonts.Medium,
    top: -10,
  },
  accountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  text: {
    color: colors.black,
    fontSize: 15,
    fontFamily: fonts.Regular,
  },
  signUp: {
    color: colors.primary,
    fontSize: 16,
    fontFamily: fonts.SemiBold,
    marginLeft: 5,
    textTransform: 'uppercase',
  },
  description: {
    fontFamily: fonts.Medium,
    fontSize: 16,
    color: colors.black,
    textAlign: 'center',
  },
  codeFieldRoot: {
    top: -10,
    marginBottom: 20,
    width: '95%',
    alignSelf: 'center',
  },
  cellRoot: {
    width: 55,
    height: 55,
    borderWidth: 1,
    justifyContent: 'center',
    borderRadius: 5,
    // backgroundColor: colors.black,
  },
  cellText: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: fonts.SemiBold,
  },
  contentContainerStyle: {
    alignSelf: 'center',
    marginBottom: 15,
  },
  containerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  center: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    flex: 2,
    justifyContent: 'flex-end',
  },
});
