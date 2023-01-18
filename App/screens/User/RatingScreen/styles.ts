import {StyleSheet} from 'react-native';

import colors from '@App/constants/colors';
import fonts from '@App/constants/fonts';

export default StyleSheet.create({
  screen: {
    paddingHorizontal: 15,
  },
  providerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  text: {
    color: colors.black,
    fontFamily: fonts.Medium,
    fontSize: 16,
    marginBottom: 5,
  },
  name: {
    color: colors.black,
    fontFamily: fonts.SemiBold,
    fontSize: 16,
    marginTop: 5,
  },
  starsContainer: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    color: colors.primary,
    fontFamily: fonts.SemiBold,
    fontSize: 18,
    marginTop: 5,
  },
  stars: {
    width: 150,
  },
  textInput: {
    textAlignVertical: 'top',
    color: colors.black,
    fontFamily: fonts.Regular,
    height: '100%',
    width: '100%',
    paddingHorizontal: 10,
    fontSize: 15,
  },
  btnContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    // height: 100,
    // marginTop: 30,
    margin: 15,
  },
});
