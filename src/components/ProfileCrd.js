import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useThemeAwareObject } from '../theme';
import { hp, wp } from '../util';

const ProfileCrd = props => {
  const createStyles = theme => {
    const themeStyles = StyleSheet.create({
      nameContainer: {
        justifyContent: 'flex-start',
        // alignItems: 'center',
        padding: hp(2),
      },
    
      subText: {
        fontSize: theme.size.xSmall,
        fontFamily: theme.fontFamily.fontFamilySoraRegular,
        color: theme.color.termsTextColor,
      },
      titleText: {
        fontSize: hp(1.7),
        fontFamily: theme.fontFamily.fontFamilySoraSemiBold,
        color: theme.color.textBlack,
      },
      listStyle: {
        width: wp(92),
        height: hp(8),
        alignSelf: 'center',

        justifyContent: 'space-between',
        backgroundColor: theme.color.textWhite,
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: hp(2.5),
       paddingHorizontal:wp(2),
       paddingRight:wp(4),
        marginBottom: hp(1.3),
      },
      listWithBorderItem: {
        width: wp(100),
        height: hp(12),
        alignSelf: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.color.textWhite,
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: wp(2.5),
        paddingLeft:wp(2),
        marginLeft:wp(8),

        borderBottomWidth: hp(0.2),
        borderColor: '#E4E4EB',
      },

      iconContainer: {justifyContent: 'center', alignItems: 'center'},
      listItemIconView: {
        width: wp(9),
        height: wp(9),
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: wp(4),

      },
      arrowRightView: {},
    });
    return themeStyles;
  };
  const styles = useThemeAwareObject(createStyles);

  return (
    <TouchableOpacity
      onPress={props?.onPress}
      style={props.border ? styles.listWithBorderItem : styles.listStyle}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {props.leftIcon&&<TouchableOpacity
          onPress={props?.onPress}
          style={styles.listItemIconView}>
          {props?.leftIcon}
        </TouchableOpacity>}
        <View style={{flexDirection: 'column'}}>
          <Text style={[styles.titleText,props.titleText]}>{props?.title}</Text>
          {props?.subTitle && (
            <Text style={[styles.subText,props.subText]}>{props?.subTitle}</Text>
          )}
        </View>
      </View>
      <TouchableOpacity style={styles.arrowRightView} onPress={props?.onPress}>
        {props.rightIcon}
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default ProfileCrd;
