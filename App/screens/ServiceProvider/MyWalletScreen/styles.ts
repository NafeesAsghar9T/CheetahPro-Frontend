import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import colors from '@App/constants/colors';

export default StyleSheet.create({
  container: {
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImg: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
  },
  creditCard: {
    backgroundColor: colors.notification,
    height: hp(22),
    borderRadius: 20,
    marginTop: hp(1),
    padding: 20,
    overflow: 'hidden',
  },
  cardContent: {
    justifyContent: 'space-between',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanceContainer: {
    alignItems: 'center',
  },
  balance: {
    fontSize: 20,
    fontFamily: 'Segoe UI Semibold',
    color: colors.white,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Segoe UI',
    color: colors.white,
  },
  activeBtn: {
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 40,
    borderRadius: 5,
  },
  btnText: {
    fontSize: 16,
    fontFamily: 'Segoe UI',
    color: colors.accent,
  },
  bottomSheet: {
    backgroundColor: colors.notification,
    height: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 5,
    paddingHorizontal: 20,
    flex: 1,
  },
  lineContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  line: {
    backgroundColor: colors.drakGrey,
    height: 5,
    width: 40,
    borderRadius: 5,
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  box: {
    width: wp(90),
    borderWidth: 1,
    borderColor: colors.drakGrey,
    marginBottom: hp(5),
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  titleimg: {
    fontSize: 16,
    fontFamily: 'Segoe UI Semibold',
    marginLeft: 10,
    color: colors.white,
  },
  num: {
    fontSize: 16,
    fontFamily: 'Segoe UI',
    color: colors.drakGrey,
    marginLeft: 5,
  },
  icon: {
    width: 18,
    height: 18,
    tintColor: colors.white,
  },
});
