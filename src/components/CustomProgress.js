import React from 'react';
import {StyleSheet, View} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import Diamond from '../../assets/icons/Diamond.svg';
import {useThemeAwareObject} from '../theme';
import {hp} from '../util';
import Text from './CustomText';
const CustomProgress = ({children, numberOfLines, style, onPress}) => {
  const createStyles = theme => {
    const themeStyles = StyleSheet.create({
      textStyle: {
        fontSize: hp(1.8),
        fontFamily: theme.fontFamily.fontFamilySoraBold,
        color: theme.color.textBlack,
        textAlign: 'center',

        // marginBottom: hp(0.5),
      },
      title: {
        fontSize: theme.size.medium,
        fontFamily: theme.fontFamily.fontFamilySoraBold,
        color: theme.color.textBlack,
        textAlign: 'center',
        marginTop: hp(4.5),
      },
      subText: {
        fontSize: theme.size.xSmall,
        fontFamily: theme.fontFamily.fontFamilySoraRegular,
        color: theme.color.textBlack,
        textAlign: 'center',
      },
      SvgContainer: {
        alignSelf: 'center',
        transform: [{rotateZ: '90deg'}, {rotateX: 'Odeg'}, {rotateY: '180deg'}],
      },
      pointsText: {
        fontSize:hp(2.2),
        fontFamily: theme.fontFamily.fontFamilySoraExtraBold,
        color: theme.color.textBlack,
        textAlign: 'center',
      },
    });
    return themeStyles;
  };
  const styles = useThemeAwareObject(createStyles);
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: hp(-11),
        marginBottom:hp(2)
      }}>
      <AnimatedCircularProgress
        arcSweepAngle={220}
        rotation={71}
        size={250}
        width={20}
        fill={61.64}
        tintColor="#000"
        onAnimationComplete={() => console.log('onAnimationComplete')}
        backgroundColor="#D4DEEF"
      />
      <View
        style={{
          position: 'absolute',
          alignItems: 'center',
          top: hp(12),
        }}>
        <Diamond />
        <Text style={styles.textStyle}>DIAMOND</Text>
        <Text style={styles.pointsText}>61.64 tons</Text>
        <Text style={styles.subText}>total offset</Text>
      </View>
    </View>
  );
};

export default CustomProgress;
