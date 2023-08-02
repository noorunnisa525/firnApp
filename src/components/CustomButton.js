import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useThemeAwareObject} from '../theme';
import Text from './CustomText';

function CustomButton(props) {
  const createStyles = theme => {
    const themeStyles = StyleSheet.create({
      black: theme.color.textBlack,
      whiteColor: theme.color.textWhite,
      disabledButton: {
        backgroundColor: theme.color.shadowColor,
      },
    });
    return themeStyles;
  };

  const styles = useThemeAwareObject(createStyles);
  return (
    <>
      {!props.loading ? (
        !props.disabled ? (
          <TouchableOpacity
            style={props?.style[0]}
            onPress={props.onPress}
            disabled={props.disable}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={props?.style[1]}>{props?.title1}</Text>
              {props.title2 && (
                <Text onPress={props.onPressTitle2} style={props.style[2]}>
                  {props.title2}
                </Text>
              )}
            </View>
            {props.children && props.children}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            disabled
            style={[props.style[0], styles.disabledButton]}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={props.style[1]}>{props.title1} </Text>
              {props.title2 && (
                <Text style={props.style[2]}> {props.title2}</Text>
              )}
            </View>
            {props.children && props.children}
          </TouchableOpacity>
        )
      ) : (
        <TouchableOpacity
          disabled
          style={[props.style[0]]}
          onPress={props.onPress}>
          <ActivityIndicator
            color={props.blackLoader ? styles.black : styles.whiteColor}
          />
        </TouchableOpacity>
      )}
    </>
  );
}

export default CustomButton;
