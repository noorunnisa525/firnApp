import {borders, colors, fontsSize, fonts} from '../constants/index';

const DEFAULT_DARK_COLOR_THEME  = {
  backgroundColor: colors.white,
  headerBackgroundColor: colors.orange,
  textWhite: colors.white,
  textBlack: colors.black,
  textRed: colors.red,
  avatarColor: colors.darkGray,
  dividerColor: colors.lightGray,
  textBlue: colors.blue,
  textGreen: colors.green,
  textLightOrange: colors.lightOrange,
  textGray: colors.gray,
  placeholderColor: colors.placeholderColor,
  inputBorderColor: colors.inputBorderColor,
  textParrotGreen: colors.parrotGreen,
  inputBackgroundColor: colors.inputBackgroundColor,
  inputTitleColor: colors.inputTitleColor,
  termsTextColor: colors.termsTextColor,
  textGreen:colors.green,
  accountColor:colors.accountColor,
  buttonColor:colors.buttonColor,
  titleColor:colors.titleColor,
  textFieldGreen:colors.textFieldGreen,
  fadeTitle:colors.fadeTitle,
  fadeSubTitle:colors.fadeSubTitle
};

const FONT_SET= {
  size: {
    xSmall: fontsSize.extraSmall,
    small: fontsSize.small,
    medium: fontsSize.medium,
    large: fontsSize.large,
    xLarge: fontsSize.extraLarge,
  },
}
const FONT_FAMILY = {
  lightFamily: fonts.fontFamilyLight,
  boldFamily: fonts.fontFamilyBold,
  semiBoldFamily: fonts.fontFamilySemiBold,
  mediumFamily: fonts.fontFamilyMedium,
  regularFamily: fonts.fontFamilyRegular,
  fontFamilySoraRegular: fonts.fontFamilySoraRegular,
  fontFamilySoraSemiBold: fonts.fontFamilySoraSemiBold,
  fontFamilySoraBold: fonts.fontFamilySoraBold,
  fontFamilySoraExtraBold: fonts.fontFamilySoraExtraBold,
  fontFamilyLoraItalic:fonts.fontLoraItalic
};

const BORDER_RADIUS = {
  radius1: borders.buttonBorder,
  radius2: borders.inputRadius,
  radius3: borders.headerRadius,
  radius4: borders.circleRadius,
};

export const DEFAULT_DARK_THEME_ID = 'default-dark';

export const DEFAULT_DARK_THEME = {
  id: DEFAULT_DARK_THEME_ID,
  color: DEFAULT_DARK_COLOR_THEME,
  size: FONT_SET.size,
  borders: BORDER_RADIUS,
  fontFamily: FONT_FAMILY,
};
