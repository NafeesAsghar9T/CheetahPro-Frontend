import {StyleSheet} from 'react-native';

import colors from '@App/constants/colors';

export default StyleSheet.create({
  notification: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    borderBottomWidth: 0.5,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 15,
    borderRadius: 25,
  },
  heading: {
    color: colors.white,
    fontFamily: 'Segoe UI Semibold',
    fontSize: 16,
  },
  description: {
    color: colors.white,
    fontFamily: 'Segoe UI',
    fontSize: 14,
  },
  dot: {
    backgroundColor: colors.accent,
    height: 10,
    width: 10,
    borderRadius: 10,
    position: 'absolute',
    right: 15,
    top: 30,
  },
});
