import React from 'react';
import {StyleSheet, View} from 'react-native';
import {BarChart} from 'react-native-chart-kit-with-pressable-bar-graph';
import {useThemeAwareObject} from '../theme';
import {hp, wp} from '../util';
const BarChartComponent = props => {
  const createStyles = theme => {
    const themeStyles = StyleSheet.create({
      container: {
        flexGrow: 1,
        backgroundColor: theme.color.containerStyle,
        margin: wp(1),
        borderRadius: theme.borders.radius1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        overflow: 'hidden',
      },

      barChartStyle: {
        alignSelf: 'flex-start',
        backgroundColor: 'transparent',
        paddingRight: wp(2),
      },
    });
    return themeStyles;
  };
  const styles = useThemeAwareObject(createStyles);

  return (
    <View style={styles.container}>
      <BarChart
        onDataPointClick={props.onDataPointClick}
        style={styles.barChartStyle}
        data={props.barChartData}
        withHorizontalLabels={false}
        width={wp(90)}
        height={hp(25)}
        chartConfig={props.chartConfig}
        showBarTops={false}
        withInnerLines={false}
        yAxisLabel=""
        fromZero={true}
        withCustomBarColorFromData={true}
        flatColor={true}
        hidePointsAtIndex={[1, 3, 5, 7, 9, 11]}
      />
    </View>
  );
};

export default BarChartComponent;
