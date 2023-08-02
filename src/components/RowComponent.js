import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useThemeAwareObject} from '../theme';
import {wp, hp} from '../util';
import Text from './CustomText';
const RowComponent = props => {
  const createStyles = theme => {
    const themeStyles = StyleSheet.create({
      taskCard: {
        alignSelf: 'flex-start',
        padding: wp(3),
        flexDirection: 'row', // row
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: wp(4),
      },
      selectedTab: {
        width: wp(28),
        justifyContent: 'center',
      },
      selectedText: {
        fontSize: theme.size.medium,
        fontFamily: theme.fontFamily.fontFamilySoraBold,
        color: theme.color.textBlack,
        textAlign: 'left',
      },

      selectedSubText: {
        fontSize: hp(1.2),
        fontFamily: theme.fontFamily.fontFamilySoraRegular,
        color: theme.color.textBlack,
        textAlign: 'left',
        marginTop: hp(0.5),
      },
    });
    return themeStyles;
  };
  const styles = useThemeAwareObject(createStyles);
  return (
    <View style={[styles.taskCard, props.taskCardStyle]}>
      <View style={styles.selectedTab}>
        <Text style={styles.selectedText}>{props.title1}</Text>
        <Text style={styles.selectedSubText}>{props.subTitle1}</Text>
      </View>

      <View style={styles.selectedTab}>
        <Text style={styles.selectedText}>{props.title2}</Text>
        <Text style={styles.selectedSubText}>{props.subTitle2}</Text>
      </View>
      <View style={styles.selectedTab}>
        <Text style={styles.selectedText}>{props.title3}</Text>
        <Text style={styles.selectedSubText}>{props.subTitle3}</Text>
      </View>
      {props.subTitle4 && (
        <View style={styles.selectedTab}>
          <Text style={styles.selectedText}>{props.title4}</Text>
          <Text style={styles.selectedSubText}>{props.subTitle4}</Text>
        </View>
      )}
    </View>
  );
};

export default RowComponent;
