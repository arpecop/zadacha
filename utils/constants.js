import { Dimensions, Platform } from 'react-native'
const { width, height } = Dimensions.get('window')
const ratio = width / height
const constants = {
  width,
  height,
  ratio,
  isAndroid: Platform.OS === 'android',
  isIos: Platform.OS === 'ios',
  halfWidth: width / 2,
  halfHeight: height / 2,
  thirdWidth: width / 3,
  thirdHeight: height / 3,
  isLandscape: width > height,
  isPortrait: width < height,
}

export default constants
