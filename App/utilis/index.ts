import {KeyboardAvoidingView, View} from 'react-native';

import {isIOS} from './platform';

export const Form = isIOS ? KeyboardAvoidingView : View;

export const offset = {
  thirty: isIOS ? 30 : 0,
  seventy: isIOS ? 70 : 0,
  eighty: isIOS ? 80 : 0,
  hundred: isIOS ? 100 : 0,
};

import RgbToHex from './rgbToHex';
import hslToHex from './hslToHex';
import hexToHsl from './hexToHsl';

export {RgbToHex, hslToHex, hexToHsl};
