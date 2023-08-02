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
    },
    headerText: {
      fontSize: theme.size.medium,
      color: theme.color.textBlack,
      fontFamily: theme.fontFamily.boldFamily,
      textAlign: 'center',
      // marginVertical: hp(2),
    },
    amountText:{
      fontSize: theme.size.xLarge,
      color: theme.color.textBlack,
      fontFamily: theme.fontFamily.fontFamilySoraBold,
      textAlign:'center'
    },
    shareText:{
      fontSize: theme.size.large,
      color: theme.color.textBlack,
      fontFamily: theme.fontFamily.fontFamilySoraBold,
      textAlign:'center',
      marginTop:hp(3)
    },
    headerContainerStyle: {
      borderBottomColor: theme.color.textWhite,
      backgroundColor: theme.color.textWhite,
    },
    headerColor: theme.color.textWhite,
    statusBar: {
      backgroundColor: 'transparent',
    },
    inputContainerStyle: {
      borderColor: theme.color.textWhite,
      alignItems: 'center',
      backgroundColor: theme.color.textWhite,
      // marginHorizontal: wp(30),
      // margin:hp(10),
      height: hp(10),
    },
    loginInputText:{
      fontSize: theme.size.xLarge,
      color: theme.color.textBlack,
      fontFamily: theme.fontFamily.fontFamilySoraBold,
      textAlign:'center'
    },
    container: {
      flexGrow: 1,
      marginTop: hp(0.1),
      paddingHorizontal: wp(2),
      paddingBottom: hp(3),
      backgroundColor: theme.color.textWhite,
      justifyContent: 'space-between',
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
      marginBottom:hp(5)

    },
    usingAccountButton: {
      width: wp(91),
      height: hp(6),
      marginTop: hp(3),
      borderRadius: theme.borders.radius1,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: hp(0.2),
      borderColor: theme.color.textBlack,
      backgroundColor: theme.color.textWhite,
    },
    carbonButton: {
      width: wp(80),
      height: hp(7),
      marginTop: hp(3),
      borderRadius: theme.borders.radius4,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: hp(0.01),
      borderColor: theme.color.textWhite,
      backgroundColor: '#E6F9F1',
    },
    text: {
      fontSize: theme.size.small,
      fontFamily: theme.fontFamily.fontFamilySoraBold,
      color: theme.color.textWhite,
    },
    accountText: {
      fontSize: theme.size.small,
      fontFamily: theme.fontFamily.fontFamilySoraRegular,
      color: theme.color.textBlack,
      paddingRight:wp(2)
    },
    carbonText:{
      fontSize: theme.size.xSmall,
      fontFamily: theme.fontFamily.fontFamilySoraRegular,
      color: '#06C270',
      textAlign:'center'
    },
    errorText: {
      textAlign:'center',
      fontSize: theme.size.xSmall,
      color: theme.color.textRed,
      marginHorizontal: wp(3),
    },
  });
  return styles;
};
export default createStyles;
