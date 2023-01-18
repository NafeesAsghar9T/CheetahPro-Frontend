import colors from '@App/constants/colors';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  heading: {
    color: colors.white,
    marginVertical: 30,
    paddingHorizontal: 15,
    fontSize: 16,
    fontFamily: 'Segoe UI',
  },
  error: {
    color: colors.red,
    textAlign: 'center',
    fontFamily: 'Segoe UI',
    fontSize: 14,
  },
  button: {
    marginHorizontal: 15,
    marginTop: 30,
  },
});
