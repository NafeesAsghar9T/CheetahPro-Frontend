import colors from '@App/constants/colors';
import fonts from '@App/constants/fonts';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  img: {
    width: '100%',
    height: '100%',
  },
  screen: {
    flexGrow: 1,
  },
  logoContainer: {
    marginVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 120,
    width: 120,
    borderRadius: 60,
    marginTop: 40,
  },
  formContainer: {
    paddingHorizontal: 15,
  },
  btnContainer: {
    marginTop: 110,
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  radioButtons: {
    // flexDirection: 'row',
    paddingHorizontal:12,
    marginBottom:20,
    // bottom:10,
    justifyContent: 'space-between',
  },
  services: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    borderWidth: 1,
    borderColor: colors.lightGrey,
    borderRadius: 10,
    flexWrap: 'wrap',
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
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  checkBox: {
    width: 20,
    height: 20,
    tintColor: colors.black,
  },
  terms: {
    color: colors.black,
    marginLeft: 10,
    fontSize: 16,
    fontFamily: fonts.Regular,
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
  error: {
    color: colors.red,
    textAlign: 'center',
    top: 10,
    fontFamily: fonts.Regular,
    fontSize: 14,
  },
  serviceHeading: {
    color: colors.primary,
    marginLeft: 10,
    fontSize: 18,
    fontFamily: fonts.SemiBold,
    bottom: -10,
  },
  description: {
    fontFamily: fonts.Regular,
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
    flex: 2,
    justifyContent: 'flex-end',
  },
});
