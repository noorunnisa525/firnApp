import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useThemeAwareObject } from '../theme';
import { hp, wp } from '../util';

const NotificationCard = props => {
  const createStyles = theme => {
    const themeStyles = StyleSheet.create({
      titleText: {
        fontSize: theme.size.small,
        fontFamily: theme.fontFamily.fontFamilySoraSemiBold,
        color: theme.color.textBlack,
        paddingLeft: wp(4),
      },
   
      listWithBorderItem: {
        width: wp(92),
        height: hp(12),
        alignSelf: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.color.textWhite,
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: hp(2.5),
        paddingLeft: wp(1.5),
        paddingRight: wp(2),
        borderBottomWidth: hp(0.1),
        borderColor: theme.color.dividerColor,
        marginBottom: hp(3),
      },

      iconContainer: {justifyContent: 'center', alignItems: 'center'},
      listItemIconView: {
        width: wp(9),
        height: wp(9),
        justifyContent: 'center',
        alignItems: 'center',
      },
      arrowRightView: {},
    });
    return themeStyles;
  };
  const styles = useThemeAwareObject(createStyles);

  return (
    <TouchableOpacity style={styles.listWithBorderItem}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          onPress={props?.onPress}
          style={styles.listItemIconView}>
          {props?.leftIcon}
        </View>
        <Text style={styles.titleText}>{props?.title}</Text>
      </View>
      <View style={styles.arrowRightView}>
        {props.rightIcon}
      </View>
    </TouchableOpacity>
  );
};

export default NotificationCard;
