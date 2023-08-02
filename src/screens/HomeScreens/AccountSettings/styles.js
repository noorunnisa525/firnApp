import {StyleSheet} from 'react-native';
import {hp, wp} from '../../../util/index';

const createStyles = theme => {
  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: theme.color.textWhite,
      flexGrow: 1,
      paddingLeft: wp(3),
    },
    inputContainer: {
      flexGrow: 1,
      marginTop: hp(3),
      paddingRight:wp(4)
    },
    headerText: {
      fontSize: theme.size.medium,
      color: theme.color.textBlack,
      fontFamily: theme.fontFamily.boldFamily,
      textAlign: 'left',
      marginVertical: hp(1),
      marginHorizontal: wp(3),
    },
    textFieldTitle: {
      fontSize: hp(1.5),
      fontFamily: theme.fontFamily.fontFamilySoraSemiBold,
      color: theme.color.fadeTitle,
      marginLeft: wp(3.5),
      marginBottom: hp(0.5),
      fontFamily: theme.fontFamily.fontFamilySoraSemiBold,
    },
    loginInputText: {
      fontSize: theme.size.xSmall,
      fontFamily: theme.fontFamily.fontFamilySoraRegular,
    },
    amountText: {
      fontSize: theme.size.xLarge,
      color: theme.color.textBlack,
      fontFamily: theme.fontFamily.fontFamilySoraBold,
      textAlign: 'center',
    },
    shareText: {
      fontSize: theme.size.large,
      color: theme.color.textBlack,
      fontFamily: theme.fontFamily.fontFamilySoraBold,
      textAlign: 'center',
      marginTop: hp(3),
    },
    headerContainerStyle: {
      borderBottomColor: theme.color.textWhite,
      backgroundColor: theme.color.textWhite,
    },
    headerColor: theme.color.textWhite,
    statusBar: {
      backgroundColor: 'transparent',
    },

    container: {
      marginTop: hp(2),
      paddingHorizontal: wp(2),
      paddingBottom: hp(10),
      backgroundColor: theme.color.textWhite,
      justifyContent: 'space-between',
    },
    versionText: {
      fontSize: theme.size.xSmall,
      fontFamily: theme.fontFamily.semiBoldFamily,
      color: '#8F90A6',
      paddingLeft: wp(7),
      marginTop: -hp(2.5),
    },
    profileImg: {
      width: wp(6.5),
      height: wp(6.5),
      marginHorizontal: -wp(1.5),
    },
    headerSubText: {
      fontSize: theme.size.xSmall,
      color: theme.color.textBlack,
      alignSelf: 'center',
      marginTop: -hp(1.5),
      width: wp(55),
      textAlign: 'center',
    },
    iconContainer: {
      width: hp(4),
      height: hp(4),
      justifyContent: 'center',
      alignItems: 'center',
    },

    headerImage: {
      height: hp(10),
    },
    purchaseButton: {
      width: wp(91),
      height: hp(7),
      marginTop: hp(3),
      borderRadius: theme.borders.radius1,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: hp(0.01),
      borderColor: theme.color.textWhite,
      backgroundColor: theme.color.textBlack,
      marginBottom: hp(5),
    },

    carbonButton: {
      width: wp(40),
      height: hp(7),
      marginTop: hp(3),
      borderRadius: theme.borders.radius1,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: hp(0.01),
      borderColor: theme.color.textWhite,
      backgroundColor: theme.color.textBlack,
    },
    text: {
      fontSize: theme.size.small,
      fontFamily: theme.fontFamily.fontFamilySoraBold,
      color: theme.color.textWhite,
    },
    titleContainer: {
      marginLeft: wp(1),
      width: wp(55),
      marginTop: hp(7),
      flexDirection: 'row',
      alignItems: 'center',
    },
    subText: {
      fontFamily: theme.fontFamily.fontFamilySoraBold,
      color: theme.color.textBlack,
      width: wp(85),
      fontSize: theme.size.xSmall,
      marginLeft: wp(4),
    },
    ProfileTitle: {
      fontSize: hp(1.5),
      fontFamily: theme.fontFamily.fontFamilySoraSemiBold,
      color: theme.color.fadeTitle,
      marginLeft:wp(1.5)
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

    ProfileSubText: {
      fontSize: theme.size.xSmall,
      fontFamily: theme.fontFamily.fontFamilySoraRegular,
      color: theme.color.fadeSubTitle,
      marginLeft:wp(1.5)
    },
    comingSoonText: {
      fontFamily: theme.fontFamily.fontFamilySoraBold,
      color: theme.color.textBlack,
      fontSize: hp(2.1),
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
    comingSoonContainer: {
      marginHorizontal: wp(2),
      marginVertical: hp(2),
      flexDirection: 'row',
      alignItems: 'center',
    },
    divider: {
      width: wp(90),
      backgroundColor: '#E4E4EB',
      marginLeft: wp(4),
      height:hp(0.2),
      marginTop: hp(0.5),
    },
    feedbackIcon: {
      width: wp(5),
      height: wp(5),
    },
    img: {
      width: wp(5),
      height: wp(5),
    },
    countText: {
      fontSize: theme.size.xSmall,
      fontFamily: theme.fontFamily.fontFamilySoraBold,
      color: theme.color.textWhite,
    },
    title: {
      fontSize: theme.size.small,
      fontFamily: theme.fontFamily.fontFamilySoraBold,
      color: theme.color.textBlack,
      flexDirection: 'row',
      marginBottom: hp(1),
    },
    notificationsCount: {
      width: wp(7),
      height: wp(7),
      borderRadius: hp(7),
      backgroundColor: theme.color.textBlack,
      justifyContent: 'center',
      alignItems: 'center',
    },
    accountProgressContainer: {
      flexGrow: 1,
      backgroundColor: theme.color.accountColor,
      marginHorizontal: wp(4),
      paddingVertical: hp(2),
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
      backgroundColor: '#B3B3B3',
      marginBottom:hp(4),
    },

    text: {
      fontSize: theme.size.small,
      fontFamily: theme.fontFamily.fontFamilySoraBold,
      color: '#CFCFD0',
    },
    updateButtonText: {
      fontSize: theme.size.small,
      fontFamily: theme.fontFamily.fontFamilySoraBold,
      color: theme.color.textWhite,
    },
    updateSettingButton: {
      width: wp(85),
      height: hp(7),
      marginTop: hp(2),
      borderRadius: theme.borders.radius1,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: hp(0.01),
      borderColor: theme.color.textWhite,
      backgroundColor: theme.color.textBlack,
    },

  });
  return styles;
};
export default createStyles;
