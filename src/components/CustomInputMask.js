import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInputMask} from 'react-native-masked-text';
import {useThemeAwareObject} from '../theme';
import {hp, wp} from '../util';

const CustomInputMask = props => {
  const createStyles = theme => {
    const themeStyles = StyleSheet.create({
      style: {
        height: hp(8),
        // marginBottom: hp(3),
        fontSize: hp(1.7),
        fontFamily: theme.fontFamily.regularFamily,
        width: wp(82.5),
        alignSelf: 'center',
        paddingLeft: wp(10),
      },
      placeholderColor: theme.color.placeholderColor,
    });
    return themeStyles;
  };
  const styles = useThemeAwareObject(createStyles);
  return (
    <View
      style={{flexDirection: 'row', alignItems: 'center', marginLeft: wp(3)}}>
      <View style={{position: 'absolute', zIndex: 10, left: wp(3.5)}}>
        {props.leftIcon}
      </View>
      <TextInputMask
        type={props.type}
        options={props.options}
        value={props.value}
        onChangeText={props.onChangeText}
        onChange={props.onChange}
        placeholder={props.placeholder}
        placeholderTextColor={styles.placeholderColor}
        allowFontScaling={false}
        keyboardType={props.keyboardType}
        onBlur={props.onBlur}
        maxLength={props.maxLength}
        style={[styles.style, props.style]}
      />
    </View>
  );
};

export default CustomInputMask;
