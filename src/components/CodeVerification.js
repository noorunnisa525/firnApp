import React, {useState, Fragment} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {useThemeAwareObject} from '../theme';
import {hp, wp} from '../util';
import Text from './CustomText';

const CELL_COUNT = 6;

const codeVerification = ({verifyCode, props}) => {
  const createStyles = theme => {
    const themeStyles = StyleSheet.create({
      root: {width: wp(85)},
      cell: {
        width: wp(12),
        height: wp(14),
        lineHeight: wp(14),
        // marginRight: wp(2),
        fontSize: theme.size.xLarge,
        fontFamily: theme.fontFamily.semiBoldFamily,
        color: theme.color.textBlack,
        borderWidth: hp(0.1),
        borderColor: theme.color.textBlack,

        textAlign: 'center',
      },
      focusCell: {
        borderColor: theme.color.inputBorderColor,
      },
      separator: {
        height: hp(0.5),
        width: wp(5),
        backgroundColor: '#000',
        alignSelf: 'center',
      },
    });
    return themeStyles;
  };
  const styles = useThemeAwareObject(createStyles);
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});

  return (
    <SafeAreaView style={styles.root}>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={input => {
          setValue(input);
          verifyCode(input);
        }}
        cellCount={CELL_COUNT}
        keyboardType={'number-pad'}
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <Fragment key={index}>
            <Text
              key={`value-${index}`}
              style={[styles.cell, isFocused && styles.focusCell]}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
            {index === 2 ? (
              <View key={`separator-${index}`} style={styles.separator} />
            ) : null}
          </Fragment>
        )}
      />
    </SafeAreaView>
  );
};

export default codeVerification;
