// utils/responsiveFont.js
import { Dimensions, PixelRatio } from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

/**
 * Function to calculate responsive font size based on screen height.
 * @param {number} size - The base font size.
 * @returns {number} - The responsive font size.
 */
export const responsiveFontSize = (size: number) => {
    // Guideline sizes are based on standard ~5" screen mobile device
    const guidelineBaseHeight = 812; // Adjust this base height as per your requirement

    return PixelRatio.roundToNearestPixel((SCREEN_HEIGHT / guidelineBaseHeight) * size);
};

export const FontSize = {
    Font12: responsiveFontSize(12),
    Font14: responsiveFontSize(14),
    Font15: responsiveFontSize(15),
    Font16: responsiveFontSize(16),
    Font18: responsiveFontSize(18),
    Font20: responsiveFontSize(20),
    Font22: responsiveFontSize(22),
    Font24: responsiveFontSize(24),
    Font26: responsiveFontSize(26),
    Font28: responsiveFontSize(28),
    Font29: responsiveFontSize(29),
    Font30: responsiveFontSize(30),
}