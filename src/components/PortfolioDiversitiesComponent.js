import React from 'react';
import {StyleSheet, View} from 'react-native';

import Solar from '../../assets/icons/Solar.svg';
import Storage from '../../assets/icons/Storage.svg';
import Wind from '../../assets/icons/Wind.svg';
import {useThemeAwareObject} from '../theme';
import {hp, wp} from '../util';
import Text from './CustomText';

const PortfolioDiversitiesComponent = props => {
  const createStyles = theme => {
    const themeStyles = StyleSheet.create({
      titleContainer: {
        justifyContent: 'flex-start',
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
      },
      rowContainer: {
        width: wp(20),
        justifyContent: 'space-between',

        alignItems: 'center',
      },
      subText: {
        color: theme.color.textBlack,
        width: wp(75),
        fontSize: theme.size.xSmall,
        fontFamily: theme.fontFamily.fontFamilySoraRegular,
      },
      headingSubText: {
        color: theme.color.textBlack,
        width: wp(12),
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        paddingVertical: hp(0.5),
        fontSize: theme.size.xSmall,
        fontFamily: theme.fontFamily.fontFamilySoraRegular,
      },
      title: {
        fontSize: theme.size.medium,
        fontFamily: theme.fontFamily.fontFamilySoraBold,
        color: theme.color.textGreen,
        flexDirection: 'row',
      },

      headingText: {
        fontSize: theme.size.xSmall,
        fontFamily: theme.fontFamily.fontFamilySoraBold,
        color: theme.color.textBlack,
        textAlign: 'center',
        width: wp(12),
      },
      bottomTitle: {
        fontSize: theme.size.small,
        fontFamily: theme.fontFamily.boldFamily,
        color: theme.color.textBlack,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: wp(2),
      },

      valueText: {
        fontSize: theme.size.small,
        fontFamily: theme.fontFamily.fontFamilySoraSemiBold,
        color: theme.color.textBlack,
        textAlign: 'left',
        width: wp(75),
      },
      filterText: {
        fontSize: theme.size.xSmall,
        fontFamily: theme.fontFamily.fontFamilySoraBold,
        color: '#A9A9AE',
      },
      listItem: {
        marginHorizontal: wp(3),
        // width: wp(92),
        backgroundColor: theme.color.textWhite,
      },

      header: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
        paddingVertical: hp(2),
      },
    });
    return themeStyles;
  };
  const styles = useThemeAwareObject(createStyles);
  return (
    <View style={[styles.listItem]}>
      <View style={styles.header}>
        {props.value ? (
          <View style={styles.titleContainer}>
            <Text style={styles.valueText}>{props.value}</Text>

            <Text style={styles.subText}>{props.projects}</Text>
            <Text style={styles.subText}>{'12 equity investments'}</Text>
          </View>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              width: wp(90),
            }}>
            <View style={styles.rowContainer}>
              <Solar />
              <Text style={styles.headingText}>{'Solar'}</Text>
              <Text style={styles.headingSubText}>{props.solar}</Text>
            </View>
            <View style={styles.rowContainer}>
              <Wind />
              <Text style={styles.headingText}>{'Wind'}</Text>
              <Text style={styles.headingSubText}>{props.wind}</Text>
            </View>
            <View style={styles.rowContainer}>
              <Storage />
              <Text style={[styles.headingText, {width: wp(14)}]}>
                {'Storage'}
              </Text>
              <Text style={styles.headingSubText}>{props.storage}</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default PortfolioDiversitiesComponent;
