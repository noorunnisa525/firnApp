import {StyleSheet} from 'react-native';
import {hp, wp} from '../../../util/index';

const createStyles = theme => {
  const styles = StyleSheet.create({
    mainContainer: {
      backgroundColor: theme.color.textWhite,
      flexGrow: 1,
    },
    inputContainer: {
      flexGrow: 1,
      marginTop: hp(3),
    },
    headerText: {
      fontSize: theme.size.large,
      color: theme.color.textBlack,
      fontFamily: theme.fontFamily.fontFamilySoraExtraBold,
      textAlign: 'center',
    },
    headerSubText: {
      fontSize: hp(1.7),
      color: theme.color.textBlack,
      fontFamily: theme.fontFamily.fontFamilySoraRegular,
      alignSelf: 'center',
      textAlign: 'center',
      marginTop: hp(1),
      width: wp(70),
    },
    headerContainerStyle: {
      borderBottomColor: theme.color.textWhite,
      backgroundColor: theme.color.textWhite,
      paddingTop: hp(5),
      // height: hp(15),
    },
    headerColor: theme.color.textWhite,
    statusBar: {
      backgroundColor: 'transparent',
    },
    container: {
      flexGrow: 1,
      marginHorizontal: wp(5),
      backgroundColor: theme.color.textWhite,
      justifyContent: 'space-between',
    },
    bottomContainer: {
      flexDirection: 'row',
      marginBottom: hp(3),
      alignSelf: 'center',
      justifyContent: 'space-between',
      alignItems:'center',
      paddingHorizontal:wp(1)
    },
    loginText: {
      fontSize: hp(3.5),
      fontFamily: theme.fontFamily.boldFamily,
      paddingVertical: hp(2),
      alignSelf: 'center',
    },

    headerImage: {
      height: hp(10),
    },

    introImage: {
      width: wp(88),
      height: wp(70),
      marginVertical: hp(5),
      alignSelf: 'center',
    },
    skipIntroButton: {
      width: wp(92),
      height: hp(7),
      borderRadius: theme.borders.radius1,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: hp(0.01),
      // marginTop: hp(10),
      borderColor: theme.color.textWhite,
      fontFamily: theme.fontFamily.fontFamilySoraSemiBold,
      backgroundColor: theme.color.buttonColor,
    },
    text: {
      fontSize: theme.size.small,
      fontFamily: theme.fontFamily.fontFamilySoraBold,
      color: theme.color.textWhite,
    },
    dashStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    lineStyle: {
      borderWidth: hp(0.2),
      borderColor: theme.color.textBlack,
      margin: hp(2),
      width: wp(25),
      backgroundColor: theme.color.textBlack,
    },
    lineStyleInactive: {
      borderWidth: hp(0.2),
      borderColor: '#E5E5E5',
      backgroundColor: '#E5E5E5',
      margin: hp(2),
      width: wp(25),
    },
  });
  return styles;
};
export default createStyles;
