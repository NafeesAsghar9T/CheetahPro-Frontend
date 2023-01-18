import {StyleSheet} from 'react-native';
import Colors from '@App/constants/colors';
import colors from '@App/constants/colors';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    borderBottomWidth: 0.3,
    paddingBottom: 5,
    // backgroundColor: colors.primary
  },
  leftSide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  image: {
    width: 30,
    height: 30,
  },
  heading: {
    fontFamily: 'Segoe UI Semibold',
    fontSize: 16,
    color: Colors.white,
  },
  date: {
    fontFamily: 'Segoe UI',
    fontSize: 14,
    color: Colors.drakGrey,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
