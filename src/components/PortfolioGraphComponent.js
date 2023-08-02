import React from 'react';
import {StyleSheet, View} from 'react-native';

import {useThemeAwareObject} from '../theme';
import {hp, wp} from '../util';
import Text from './CustomText';
const PortfolioGraphComponent = props => {
  const createStyles = theme => {
    const themeStyles = StyleSheet.create({
      titleContainer: {
        justifyContent: 'space-between',
      },

      subText: {
        fontFamily: theme.fontFamily.fontFamilySoraSemiBold,
        color: '#A4A4A9',
        textAlign: 'right',
        width: wp(55),
      },
      titleGray: {
        fontSize: theme.size.large,
        fontFamily: theme.fontFamily.fontFamilySoraBold,
        color: theme.color.textGreen,
        textAlign: 'center',
      },
      title: {
        fontSize: theme.size.large,
        fontFamily: theme.fontFamily.fontFamilySoraBold,
        color: theme.color.textGreen,
        textAlign: 'center',
      },

      titleDarkBlue: {
        fontSize: theme.size.large,
        fontFamily: theme.fontFamily.fontFamilySoraBold,
        color: '#003D81',
        textAlign: 'center',
      },

      titleLightBlue: {
        fontSize: theme.size.large,
        fontFamily: theme.fontFamily.fontFamilySoraBold,
        color: '#3E7BFA',
        textAlign: 'center',
      },

      bottomTitle: {
        fontSize: theme.size.small,
        fontFamily: theme.fontFamily.boldFamily,
        color: theme.color.textBlack,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: wp(2),
      },

      valueText: {
        fontSize: theme.size.small,
        fontFamily: theme.fontFamily.fontFamilySoraSemiBold,
        color: theme.color.textBlack,
        width: wp(70),
        // marginVertical:hp(2)
      },
      filterText: {
        fontSize: theme.size.small,
        fontFamily: theme.fontFamily.fontFamilySoraBold,
        color: '#A9A9AE',
      },
      listItem: {
        flexGrow: 1,
        width: wp(92),
        alignSelf: 'center',
        borderBottomWidth: hp(0.1),
        paddingHorizontal: wp(1),
        backgroundColor: theme.color.textWhite,
        borderColor: theme.color.dividerColor,
      },

      header: {
        justifyContent: 'space-between',
        flexDirection: 'column',
        paddingVertical: hp(2),
      },
      headerStyle: {
        justifyContent: 'space-between',
        flexDirection: 'column',
        marginTop: -hp(2),
      },
    });
    return themeStyles;
  };
  const styles = useThemeAwareObject(createStyles);

  return (
    <View style={[styles.listItem, props.cardStyle]}>
      <Text style={styles.valueText}>{props.value}</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: hp(3),
        }}>
        <Text
          style={[
            props.currentGraphIndex > props.graphIndex
              ? styles.titleDarkBlue
              : props.currentGraphIndex < props.graphIndex
              ? styles.title
              : props.currentGraphIndex == props.graphIndex
              ? styles.titleLightBlue
              : styles.titleGray,
          ]}>
          ${parseFloat(props.amount).toLocaleString()}
        </Text>

        <View style={styles.titleContainer}>
          <Text style={styles.subText}>{props.estimated} Year-to-date</Text>
          <Text style={styles.subText}>
            {props.currentGraphIndex > props.graphIndex
              ? `Potential +$ ${parseFloat(
                  props.carbon,
                ).toLocaleString()} Prev. month`
              : props.currentGraphIndex < props.graphIndex
              ? `+$ ${parseFloat(
                  props.carbon,
                ).toLocaleString()} Over last month`
              : `+$ ${parseFloat(
                  props.carbon,
                ).toLocaleString()} Over last year`}
          </Text>

          <Text style={styles.subText}>
            ${parseFloat(props.update).toLocaleString()} Capital invested
          </Text>
          <Text style={styles.subText}>{'$500'} Auto-deposit enabled</Text>
        </View>
      </View>
    </View>
  );
};

export default PortfolioGraphComponent;
