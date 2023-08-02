import React from 'react';
import {StyleSheet} from 'react-native';
import {Input} from 'react-native-elements';
import {useThemeAwareObject} from '../theme';
import {hp, wp} from '../util';

const CustomInputField = ({
  placeholder,
  onChangeText,
  onChange,
  value,
  leftIcon,
  rightIcon,
  onBlur,
  secureTextEntry,
  keyboardType,
  editable,
  multiline,
  maxLength,
  style,
  containerStyle,
  inputContainerStyle,
  onPress,
  numberOfLines,
  inputContainer,
  inputStyle,
}) => {
  const createStyles = theme => {
    const themeStyles = StyleSheet.create({
      inputContainer: {
        height: hp(7),
      },
      textStyle: {
        fontSize: hp(1.7),
        fontFamily: theme.fontFamily.regularFamily,
      },
      containerStyle: {
        height: hp(8),
        marginBottom: hp(0.5),
      },
      placeholderColor: theme.color.placeholderColor,
    });
    return themeStyles;
  };
  const styles = useThemeAwareObject(createStyles);
  return (
    <Input
      inputStyle={inputStyle}
      containerStyle={[styles.containerStyle, containerStyle]}
      onPress={onPress}
      inputContainerStyle={[styles.inputContainer, inputContainerStyle]}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      secureTextEntry={secureTextEntry}
      editable={editable}
      multiline={multiline}
      placeholder={placeholder}
      numberOfLines={numberOfLines}
      placeholderTextColor={styles.placeholderColor}
      style={[styles.textStyle, style]}
      maxLength={maxLength}
      onChangeText={onChangeText}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      keyboardType={keyboardType}
    />
  );
};

export default CustomInputField;
