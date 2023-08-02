import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useThemeAwareObject} from '../theme';
import {hp} from '../util';
import Text from './CustomText';

const CustomTopBar = props => {
  const createStyles = theme => {
    const themeStyles = StyleSheet.create({
      barText: {
        color: theme.color.textGray,
        marginTop: hp(0.5),
      },
    });
    return themeStyles;
  };
  const styles = useThemeAwareObject(createStyles);
  return (
    <TouchableOpacity style={props.style} onPress={props.onPress}>
      {props.barImage && props.barImage}
      <Text style={[styles.barText, props.textStyle]}>{props.barText}</Text>
      {/* <View style={props.selectedText} /> */}
    </TouchableOpacity>
  );
};

export default CustomTopBar;
