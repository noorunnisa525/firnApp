import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CheckboxUnselected from '../../assets/icons/CheckboxUnselected.svg';
import {useThemeAwareObject} from '../theme';
import {hp, wp} from '../util';
import Button from './CustomButton';
const ProgressCard = props => {
  const createStyles = theme => {
    const themeStyles = StyleSheet.create({
      titleText: {
        fontSize: theme.size.small,
        fontFamily: theme.fontFamily.fontFamilySoraSemiBold,
        color: theme.color.textBlack,
        paddingLeft: wp(4),
      },

      cardStyle: {
        width: wp(92),
        height: hp(8),
        alignSelf: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
        flexDirection: 'row',
        borderRadius: hp(2.5),
        paddingLeft: wp(6),
        paddingRight:wp(6)
      },

      iconContainer: {justifyContent: 'center', alignItems: 'center'},
      listItemIconView: {
        width: wp(9),
        height: wp(9),
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      },
      subText: {
        fontSize: theme.size.xSmall,
        fontFamily: theme.fontFamily.fontFamilySoraRegular,
        color: theme.color.termsTextColor,
        paddingLeft: wp(4),
      },
      subIconStyle: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      accountButton: {
        marginTop:hp(2),
        height: hp(7),
        width: wp(80),
        borderRadius: wp(1),
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: hp(2),

        borderWidth: hp(0.2),
        borderColor: theme.color.textBlack,
        backgroundColor: 'transparent',
      },
      arrowRightView: {},
    });
    return themeStyles;
  };
  const styles = useThemeAwareObject(createStyles);

  return (
    <View style={{flexDirection: 'column'}}>
      <View style={styles.cardStyle}>
        <View style={{flexDirection: 'row'}}>
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
      </View>
      <View style={{flexDirection: 'column', alignSelf: 'center'}}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', margin: hp(1)}}>
          <TouchableOpacity
            onPress={props?.onPress}
            style={styles.subIconStyle}>
            {props?.subIcon}
          </TouchableOpacity>
          <Text style={styles.subText}>Profile</Text>
        </View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', margin: hp(1)}}>
          <TouchableOpacity
            onPress={props?.onPress}
            style={styles.subIconStyle}>
            {props?.subIcon}
          </TouchableOpacity>
          <Text style={styles.subText}>Identity Verification</Text>
        </View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', margin: hp(1)}}>
          <TouchableOpacity
            onPress={props?.onPress}
            style={styles.subIconStyle}>
            {props?.subIcon}
          </TouchableOpacity>
          <Text style={styles.subText}>Payment Setup</Text>
        </View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', margin: hp(1)}}>
          <TouchableOpacity
            onPress={props?.onPress}
            style={styles.subIconStyle}>
            <CheckboxUnselected />
          </TouchableOpacity>
          <Text style={styles.subText}>Tax Document Review</Text>
        </View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', margin: hp(1)}}>
          <TouchableOpacity
            onPress={props?.onPress}
            style={styles.subIconStyle}>
            <CheckboxUnselected />
          </TouchableOpacity>
          <Text style={styles.subText}>Recurring Investments</Text>
        </View>
      </View>
      <Button
        onPress={() => {}}
        style={[styles.accountButton, styles.titleText]}
        title1="Continue Acct. Setup."
      />
    </View>
  );
};

export default ProgressCard;
