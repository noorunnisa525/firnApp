import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useThemeAwareObject } from '../theme';
import { hp, wp } from '../util';
import Text from './CustomText';
const PortfolioTopBar = props => {
  const createStyles = theme => {
    const themeStyles = StyleSheet.create({
      taskCard: {
        alignSelf: 'flex-start',
        width: wp(100),
        paddingLeft: wp(2),
        height:hp(7),
        marginBottom:hp(1),
        marginLeft:wp(3),
        flexDirection: 'row', // row
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
      selectedText: {
        fontSize: theme.size.medium,
        fontFamily: theme.fontFamily.fontFamilySoraBold,
        color: theme.color.textBlack,
        textAlign: 'left',
      },
      UnSelectedText: {
        fontSize: theme.size.medium,
        fontFamily: theme.fontFamily.fontFamilySoraBold,
        color: theme.color.dividerColor,
        textAlign: 'left',
      },
   
  
      selectedTab: {
        width: wp(35),
        justifyContent: 'center',
      },

      selectedMiddleTab: {
        backgroundColor: theme.color.textWhite,
        width: wp(35),
        justifyContent: 'center',
      },
  
      UnSelectedMiddleTab: {
        backgroundColor: theme.color.textWhite,
        width: wp(35),
        justifyContent: 'center',
      },
  
      UnSelectedTab: {
        backgroundColor: theme.color.textWhite,
        width: wp(35),

        justifyContent: 'center',
      },
  
    });
    return themeStyles;
  };
  const styles = useThemeAwareObject(createStyles);
  return (
    <View style={[styles.taskCard, props.taskCardStyle]}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => props.setSelectedTab('portfolio')}
        style={
          props.selectedTab == 'portfolio'
            ? styles.selectedTab
            : styles.UnSelectedTab
        }>
        <Text
          style={
            props.selectedTab == 'portfolio'
              ? styles.selectedText
              : styles.UnSelectedText
          }>
          Portfolio{' '}
       
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={1}
        onPress={() => props.setSelectedTab('impact')}
        style={
          props.selectedTab == 'impact'
            ? styles.selectedMiddleTab
            : styles.UnSelectedMiddleTab
        }>
        <Text
          style={
            props.selectedTab == 'impact'
              ? styles.selectedText
              : styles.UnSelectedText
          }>
          Impact{' '}
        
        </Text>
      </TouchableOpacity>

    
    </View>
  );
};

export default PortfolioTopBar;
