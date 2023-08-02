import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useThemeAwareObject} from '../theme';
import {hp, wp} from '../util';
import Text from './CustomText';

const ProjectsCard = props => {
  const createStyles = theme => {
    const themeStyles = StyleSheet.create({
      titleContainer: {
        justifyContent: 'space-between',
        width: wp(60),
        marginLeft: wp(3),
        alignSelf: 'center',
      },

      subText: {
        fontFamily: theme.fontFamily.fontFamilySoraRegular,
        color: theme.color.textBlack,
        width: wp(50),
      },
      locationText: {
        fontFamily: theme.fontFamily.fontFamilySoraRegular,
        color: '#28293D',
        width: wp(50),
      },

      title: {
        fontSize: theme.size.small,
        fontFamily: theme.fontFamily.fontFamilySoraBold,
        color: theme.color.textBlack,
        width: wp(50),
      },
      bottomTitle: {
        fontSize: theme.size.small,
        fontFamily: theme.fontFamily.boldFamily,
        color: theme.color.textBlack,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: wp(2),
      },

      listItem: {
        flexGrow: 1,
        marginBottom: hp(1),
        width: wp(88),
        padding: wp(2),
        marginHorizontal: wp(4),
        borderRadius: hp(0.8),
        borderWidth: hp('0.1'),
        backgroundColor: theme.color.textWhite,
        borderColor: theme.color.dividerColor,
      },

      header: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: wp(2),
      },
      bottomContainer: {
        backgroundColor: '#F4F4F7',
        overflow: 'hidden',
        borderBottomLeftRadius: theme.borders.radius1,
        borderBottomRightRadius: theme.borders.radius1,
        flexDirection: 'row',
        padding: hp(2),
        justifyContent: 'center',
        alignItems: 'center',
      },
      imgContainer: {
        width: wp(20),
        height: wp(22),
        borderRadius: theme.borders.radius1,
      },
      ViewDetailsText: {
        fontFamily: theme.fontFamily.fontLoraSemiBold,
        color: theme.color.buttonColor,
        fontSize: theme.size.small,
        textAlign: 'center',
        marginVertical: hp(1),
      },
      gridValue: {
        fontFamily: theme.fontFamily.fontFamilySoraExtraBold,
        color: theme.color.textBlack,
        fontSize: theme.size.xSmall,
        textAlign: 'center',
      },
      gridValueStorage: {
        fontFamily: theme.fontFamily.fontFamilySoraExtraBold,
        color: theme.color.textBlack,
        fontSize: theme.size.xSmall,
        textAlign: 'left',
      },
      gridTitleStorage: {
        fontFamily: theme.fontFamily.fontFamilySoraSemiBold,
        color: theme.color.textBlack,
        fontSize: theme.size.xSmall,
        // width:wp(28),
        textAlign: 'left',
      },
      gridTitle: {
        fontFamily: theme.fontFamily.fontFamilySoraSemiBold,
        color: theme.color.textBlack,
        fontSize: theme.size.xSmall,
        // width:wp(28),
        textAlign: 'center',
      },
      unitText: {
        fontFamily: theme.fontFamily.fontFamilySoraRegular,
        color: '#28293D',
        textAlign: 'center',
      },
      unitTextStorage: {
        fontFamily: theme.fontFamily.fontFamilySoraRegular,
        color: '#28293D',
        textAlign: 'left',
      },
    });
    return themeStyles;
  };
  const styles = useThemeAwareObject(createStyles);
  return (
    <TouchableOpacity
      style={[styles.listItem]}
      onPress={props.onPressAdd}
      disabled={props?.item?.company_id == '3' ? true : false}>
      <View style={styles.header}>
        <View
          style={
            props?.item?.company_id == '3'
              ? {
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: wp(2),
                }
              : {
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingTop: wp(6),
                  padding: wp(2),
                  paddingLeft: wp(8),
                }
          }>
          <View style={styles.imgContainer}>
            <Image
              source={{uri: props.img}}
              style={{flex: 1}}
              resizeMode="contain"
            />
          </View>
          <View style={styles.titleContainer}>
            <Text style={[styles.title, props.titleStyle]} numberOfLines={2}>
              {props.name}
            </Text>
            <Text style={styles.locationText}>{props.location}</Text>

            <Text style={styles.subText}>{props.projectedValue}</Text>
            {props?.item?.company_id == '3' ? (
              <Text style={styles.gridTitleStorage}>
                {'Size '}
                <Text style={styles.gridValueStorage}>
                  {props.item?.size?.split(' ')[0]}
                </Text>
                <Text style={styles.unitTextStorage}>{' MW'}</Text>
              </Text>
            ) : null}
          </View>
        </View>
      </View>
      {props?.item?.company_id == '3' ? null : (
        <Text style={styles.ViewDetailsText} onPress={props.onPressAdd}>
          {props.openCard ? 'Close card' : 'Open card'}
        </Text>
      )}
      {props?.item?.company_id == '3'
        ? null
        : props.openCard && (
            <>
              <View
                style={{
                  marginHorizontal: wp(7),
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                  borderBottomWidth: wp(0.1),
                  marginTop: hp(2),
                }}>
                <View
                  style={{
                    borderRightWidth: wp(0.1),
                    width: wp(36),
                    padding: wp(5),
                  }}>
                  <Text style={styles.gridTitle}>Size</Text>
                  <Text style={styles.gridValue}>{props.size}</Text>
                  <Text style={styles.unitText}>{'MW'}</Text>
                </View>
                <View style={{width: wp(32)}}>
                  <Text style={styles.gridTitle}>{'Return Rate'}</Text>
                  <Text style={styles.gridValue}>{props.irr}</Text>
                  <Text style={styles.unitText}>{'IRR'}</Text>
                </View>
              </View>
              <View
                style={{
                  marginHorizontal: wp(7),
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginBottom: hp(2),
                }}>
                <View
                  style={{
                    borderRightWidth: wp(0.1),
                    width: wp(36),
                    padding: wp(5),
                  }}>
                  <Text style={styles.gridTitle}>{'CO₂e Offset MT/yr'}</Text>
                  <Text style={styles.gridValue}>{props.carbon_offset}</Text>
                  <Text style={styles.unitText}>{'OFFSET'}</Text>
                </View>
                <View style={{width: wp(32)}}>
                  <Text style={styles.gridTitle}>{'Fund Contribution'}</Text>
                  <Text style={styles.gridValue}>{props.contributation}</Text>
                  <Text style={styles.unitText}>{'WEIGHT'}</Text>
                </View>
              </View>
            </>
          )}
    </TouchableOpacity>
  );
};

export default ProjectsCard;
