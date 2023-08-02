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
      flex: 1,
      marginTop: hp(3),
      backgroundColor:'red',
      alignSelf:'center'
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
      borderWidth: wp(0.2),
      backgroundColor: theme.color.textWhite,
      borderBottomWidth: wp(0.2),
      borderBottomColor:theme.color.inputBackgroundColor,
      paddingHorizontal: wp(4),
      // margin:hp(10),
      // height: hp(7),
    },
    container: {
      flexGrow: 1,
      marginTop: hp(0.1),
      paddingHorizontal: wp(2),
      paddingBottom: hp(3),
      backgroundColor: theme.color.textWhite,
      justifyContent: 'center',
      alignItems:'center',
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
      // marginBottom:hp(5)
    },
    text: {
      fontSize: theme.size.small,
      fontFamily: theme.fontFamily.fontFamilySoraBold,
      color: theme.color.textWhite,
    },
  
  });
  return styles;
};
export default createStyles;
