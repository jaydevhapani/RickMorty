import {Dimensions, PixelRatio} from 'react-native';

export const BASE_URL = 'https://rickandmortyapi.com/api/';

const getResponsiveDimensions = () => {
  const baselineWidth = 375; // Adjust based on your design
  const baselineHeight = 812; // Adjust based on your design
  const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('screen'); // Use physical screen dimensions
  const baseScaleX = SCREEN_WIDTH / baselineWidth;
  const baseScaleY = SCREEN_HEIGHT / baselineHeight;
  return {
    widthPixel: (size: any) =>
      Math.round(PixelRatio.roundToNearestPixel(size * baseScaleX)), // use for width
    heightPixel: (size: any) =>
      Math.round(PixelRatio.roundToNearestPixel(size * baseScaleY)), // use for height
    fontPixel: (size: any) =>
      Math.round(PixelRatio.roundToNearestPixel(size * baseScaleY)), // Consider rem or em
    pixelSizeVertical: (size: any) => heightPixel(size), //use on margin and padding
    pixelSizeHorizontal: (size: any) => widthPixel(size), //use on margin and padding
    SCREEN_WIDTH,
    SCREEN_HEIGHT,
  };
};

export const {
  widthPixel,
  heightPixel,
  fontPixel,
  pixelSizeVertical,
  pixelSizeHorizontal,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
} = getResponsiveDimensions();
