import {StyleSheet} from 'react-native';
import {hp, wp} from '../../../util/index';

const createStyles = theme => {
  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: theme.color.textWhite,
      flexGrow: 1,
    },
    inputContainer: {
      flexGrow: 1,
      marginTop: hp(3),
      marginHorizontal: wp(4),
    },

    headerImage: {
      height: hp(10),
    },
    headerText: {
      fontSize: theme.size.large,
      color: theme.color.textBlack,
      fontFamily: theme.fontFamily.fontFamilySoraExtraBold,
      textAlign: 'center',
      paddingHorizontal: wp(2),
      marginTop: hp(2),
    },
    headerSubText: {
      fontSize: theme.size.xSmall,
      color: theme.color.textWhite,
      alignSelf: 'center',
      marginTop: -hp(1.5),
      textAlign: 'center',
    },

    headerContainerStyle: {
      borderBottomColor: theme.color.textWhite,
      backgroundColor: theme.color.textWhite,
    },
    headerContainerStyleTerms: {
      borderBottomColor: theme.color.textWhite,
      backgroundColor: theme.color.textWhite,
    },
    headerColor: theme.color.textWhite,
    statusBar: {
      backgroundColor: 'white',
    },
    container: {
      flexGrow: 1,
      paddingHorizontal: wp(2),
      paddingBottom: hp(5),
      backgroundColor: theme.color.textWhite,
      justifyContent: 'space-between',
    },
    modalContainer: {
      flexGrow: 1,
      marginHorizontal: wp(4),
      paddingBottom: hp(4),
      backgroundColor: theme.color.textWhite,
      justifyContent: 'space-between',
    },
    inputContainerStyleWithRed: {
      borderColor: theme.color.textRed,
      borderRadius: theme.borders.radius1,
      alignItems: 'center',
      borderWidth: wp(0.2),
      backgroundColor: theme.color.textWhite,
      borderBottomWidth: wp(0.2),
      paddingHorizontal: wp(4),
      height: hp(6),
    },
    inputContainerStyleWithBlack: {
      borderColor: theme.color.textBlack,
      borderRadius: theme.borders.radius1,
      alignItems: 'center',
      borderWidth: wp(0.2),
      backgroundColor: theme.color.textWhite,
      borderBottomWidth: wp(0.2),
      paddingHorizontal: wp(4),
      height: hp(6),
    },
    inputContainerStyleWithGreen: {
      borderColor: theme.color.textFieldGreen,
      borderRadius: theme.borders.radius1,
      alignItems: 'center',
      borderWidth: wp(0.2),
      backgroundColor: theme.color.textWhite,
      borderBottomWidth: wp(0.2),
      paddingHorizontal: wp(4),
      height: hp(6),
    },
    inputContainerStyle: {
      borderColor: theme.color.inputTitleColor,
      borderRadius: theme.borders.radius1,
      alignItems: 'center',
      borderWidth: wp(0.2),
      backgroundColor: theme.color.textWhite,
      borderBottomWidth: wp(0.2),
      paddingHorizontal: wp(4),
      height: hp(6),
    },

    termsButton: {
      width: wp(100),
      height: hp(5),
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      position: 'absolute',
      bottom: 0,
      backgroundColor: theme.color.textWhite,
    },
    loggingText: {
      fontSize: theme.size.small,
      color: theme.color.textBlack,
      fontFamily: theme.fontFamily.fontFamilySoraSemiBold,
      textDecorationLine: 'underline',
      paddingTop: hp(3),
    },
    legalText: {
      fontSize: theme.size.small,
      color: theme.color.textBlack,
      fontFamily: theme.fontFamily.fontFamilySoraSemiBold,
      paddingBottom: hp(1),
    },
    italicText: {
      fontSize: theme.size.small,
      color: theme.color.textBlack,
      fontFamily: theme.fontFamily.fontFamilySoraSemiBold,
      paddingBottom: hp(1),
      fontStyle: 'italic',
    },
    boldText: {
      fontSize: theme.size.xSmall,
      color: theme.color.textBlack,
      fontFamily: theme.fontFamily.fontFamilySoraSemiBold,
    },
    boldTextModal: {
      fontSize: theme.size.xSmall,
      color: theme.color.textBlack,
      marginBottom: hp(1),
      fontFamily: theme.fontFamily.fontFamilySoraSemiBold,
    },
    withUnderlineText: {
      fontSize: theme.size.xSmall,
      color: theme.color.textBlack,
      marginBottom: hp(1),
      textDecorationLine: 'underline',

      fontFamily: theme.fontFamily.fontFamilySoraSemiBold,
    },
    termsAndConditionText: {
      fontSize: theme.size.xSmall,
      fontFamily: theme.fontFamily.regularFamily,
      color: theme.color.termsTextColor,
    },
    privacyText: {
      fontSize: theme.size.xSmall,
      fontFamily: theme.fontFamily.regularFamily,
      color: theme.color.textBlue,
      textDecorationLine: 'underline',
    },
    inputSubContainer: {
      width: wp(75),
      height: hp(8),
    },
    textFieldTitle: {
      fontSize: theme.size.xSmall,
      textAlign: 'left',
      paddingLeft: wp(3.5),
      marginBottom: hp(0.5),
      fontFamily: theme.fontFamily.fontFamilySoraBold,
      color: theme.color.titleColor,
    },
    createInputText: {
      fontSize: theme.size.xSmall,
      fontFamily: theme.fontFamily.fontFamilySoraRegular,
    },
    signupSubText: {
      fontSize: theme.size.xSmall,
      alignSelf: 'center',
      marginTop: -hp(1.5),
    },
    phoneContainerStyle: {
      borderColor: theme.color.inputTitleColor,
      borderRadius: theme.borders.radius1,
      backgroundColor: theme.color.textWhite,
      borderWidth: wp(0.2),
      height: hp(6),
      borderBottomWidth: wp(0.2),
      marginHorizontal: wp(2.5),
      flexDirection: 'row',
      alignItems: 'center',
      padding: wp(0.5),
    },
    inputStyle: {
      backgroundColor: theme.color.loginInputText,
      borderWidth: wp(0),
      height: hp(3),
      paddingHorizontal: wp(1),
      borderBottomWidth: wp(0),
      overflow: 'hidden',
    },
    loginText: {
      fontSize: theme.size.small,
      fontFamily: theme.fontFamily.boldFamily,
      color: theme.color.textWhite,
    },

    scrollToBottomButton: {
      width: wp(85),
      height: hp(7),
      borderRadius: theme.borders.radius1,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: hp(0.01),
      marginBottom: hp(1),
      borderColor: theme.color.textWhite,
      backgroundColor: theme.color.textBlack,
    },
    registerButton: {
      width: wp(85),
      height: hp(7),
      marginTop: hp(2),
      borderRadius: theme.borders.radius1,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: hp(0.01),
      borderColor: theme.color.textWhite,
      backgroundColor: theme.color.buttonColor,
    },
    text: {
      fontSize: theme.size.small,
      fontFamily: theme.fontFamily.fontFamilySoraBold,
      color: theme.color.textWhite,
    },
    img: {
      width: wp(5),
      height: wp(5),
    },
    profileImg: {
      width: wp(6.5),
      height: wp(6.5),
      marginHorizontal: -wp(1.5),
    },
    errorText: {
      fontSize: theme.size.xSmall,
      color: theme.color.textBlack,
      fontFamily: theme.fontFamily.fontFamilySoraRegular,

      marginHorizontal: wp(1),
    },

    errorPhoneText: {
      fontSize: theme.size.xSmall,
      color: theme.color.textBlack,
      marginHorizontal: wp(1),
      marginTop: -hp(1.5),
    },
    ErrorContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: wp(3),
      marginTop: -hp(2),
      marginBottom: hp(1),
    },
    maskErrorContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: wp(3),
      marginTop: hp(0.5),
      marginBottom: hp(1),
    },
    checkboxContainer: {
      marginBottom: hp(3),
      marginHorizontal: wp(3),
    },
    checkbox: {
      alignSelf: 'center',
    },
    headerTextTermModal: {
      fontSize: theme.size.small,
      color: theme.color.textBlack,
      fontFamily: theme.fontFamily.fontFamilySoraBold,
      textAlign: 'center',
      marginVertical: hp(2),
      width: wp(65),
      marginTop: -hp(0.2),
    },

    headerTextModal: {
      fontSize: theme.size.small,
      color: theme.color.textBlack,
      fontFamily: theme.fontFamily.fontFamilySoraBold,
      textAlign: 'center',
      marginVertical: hp(2),
      width: wp(65),
      marginTop: -hp(1.5),
    },
    headerSubTextModal: {
      fontSize: hp(1.6),
      color: theme.color.textBlack,
      alignSelf: 'center',
      textAlign: 'center',
      paddingTop: hp(0.3),
      fontFamily: theme.fontFamily.fontFamilySoraRegular,
      width: wp(65),
    },
    iconContainer: {
      width: wp(5),
      height: hp(4),
      justifyContent: 'flex-start',
      borderRadius: hp(1),
      alignItems: 'center',
      zIndex: 10,
    },
    dialogStyle: {height: hp(100), alignSelf: 'center', width: wp(100)},
    codeText: {
      fontSize: theme.size.xSmall,
      color: theme.color.textBlack,
      alignSelf: 'center',
      textAlign: 'center',
    },
    headerImage: {
      height: hp(21),
    },
    codeTextContainer: {
      flexDirection: 'row',
      marginTop: hp(3),
      alignSelf: 'flex-end',
      alignItems: 'center',
      justifyContent: 'center',
      paddingRight: wp(2),
    },
    optContainer: {
      flexGrow: 1,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: hp(5),
      height: hp(30),
    },
    resendText: {
      fontSize: theme.size.small,
      fontFamily: theme.fontFamily.semiBoldFamily,
      color: theme.color.textBlack,
    },
  });
  return styles;
};
export default createStyles;