import {StyleSheet} from 'react-native';

import colors from '@App/constants/colors';
import fonts from '@App/constants/fonts';

export default StyleSheet.create({
  headerContainer: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    color: colors.black,
    fontSize: 16,
    fontFamily: fonts.Medium,
  },
  text: {
    color: colors.white,
    fontSize: 16,
    flexWrap: 'wrap',
    fontFamily: 'Segoe UI',
  },
  name: {
    color: colors.accent,
    fontSize: 15,
    fontFamily: 'Segoe UI',
  },
  status: {
    fontSize: 14,
    fontFamily: 'Segoe UI',
    textTransform: 'capitalize',
  },
  serviceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
  },
  serviceContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  serviceText: {
    color: colors.black,
    fontSize: 14,
    fontFamily: fonts.Medium,
  },
  serviceValue: {
    color: colors.black,
    fontSize: 15,
    fontFamily: fonts.Regular,
  },
  addressContainer: {
    paddingHorizontal: 15,
    // justifyContent: 'flex-end',
    // flex: 1,
    marginTop: 10,
  },
  addressHeading: {
    marginVertical: 1,
    marginTop: 10,
    marginHorizontal: 0,
    padding: 10,
  },
  address: {
    marginVertical: 0,
    marginHorizontal: 0,
    padding: 10,
    marginTop: 2,
  },
  addressText: {
    color: colors.white,
    paddingVertical: 3,
    fontFamily: 'Segoe UI',
    fontSize: 15,
  },
  buttonContainer: {
    paddingHorizontal: 15,
    justifyContent: 'flex-end',
    flex: 1,
    marginVertical: 20,
  },
  questions: {
    marginVertical: 30,
  },

  modalHeader: {
    alignItems: 'center',
    marginVertical: 15,
  },
  questionContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: colors.black,
    borderRadius: 10,
    width: '90%',
    padding: 8,
  },
  cross: {
    position: 'absolute',
    right: 8,
    top: 8,
  },
  crossIcon: {
    height: 15,
    width: 15,
    tintColor: colors.white,
  },
  radio: {
    height: 15,
    width: 15,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  checked: {
    height: 15,
    width: 15,
    borderRadius: 15,
    backgroundColor: colors.accent,
  },
  contentContainerStyle: {
    alignSelf: 'center',
    marginBottom: 15,
  },
  containerStyle: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    // padding: 15,
  },
});
