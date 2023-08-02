import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useThemeAwareObject } from '../theme';
import { wp } from '../util';
import Text from './CustomText';

const LineChartComponent = props => {
  const createStyles = theme => {
    const themeStyles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: theme.color.containerGray,
        margin: wp(2),
        padding: wp(2),
        overflow: 'hidden',
      },
      lineChartTitle: {
        alignSelf: 'flex-start',
        fontFamily: theme.fontFamily.semiBoldFamily,
        fontSize: theme.size.small,
        color: theme.color.textWhite,
        paddingLeft: wp(3),
      },
    });
    return themeStyles;
  };
  const styles = useThemeAwareObject(createStyles);

  return (
    <View style={[styles.container, props.lineChartContainer]}>
      {props.title && <Text style={styles.lineChartTitle}>{props.title}</Text>}

      <LineChart
        data={props.lineChartData}
        width={props.width}
        height={props.height}
        yAxisInterval={1}
        withDots={props.withDots}
        withInnerLines={props.withInnerLines}
        withShadow={props.withShadow}
        segments={props.segments}
        withOuterLines={props.withOuterLines}
        style={props.styles}
        bezier
        chartConfig={props.chartConfig}
        yAxisSuffix={props.yAxisSuffix}
        
      />
    </View>
  );
};

export default LineChartComponent;

