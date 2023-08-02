import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, Image, View} from 'react-native';
import {useDispatch} from 'react-redux';
import FirnSvg from '../../../../assets/icons/FIRN.svg';
import Button from '../../../components/CustomButton';
import Header from '../../../components/CustomHeader';
import Text from '../../../components/CustomText';
import {setWelcome} from '../../../redux/slices/userSlice';
import {useThemeAwareObject} from '../../../theme/index';
import {wp} from '../../../util';
import createStyles from './styles';
function Welcome({navigation}) {
  const styles = useThemeAwareObject(createStyles);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isFocused) {
      setCurrentIndex(0);
    }
  }, [isFocused]);
  const DATA = [
    {
      id: 0,
      title: 'Invest',
      img: require('../../../../assets/images/Intro1.png'),
      subText:
        'Save the planet by funding sustainable projects. Your investments help deploy more clean energy.',
    },
    {
      id: 1,
      title: 'Impact',
      img: require('../../../../assets/images/Intro2.png'),
      subText:
        'View your impact on the environment, invite your friends to the platform, and compete on reducing greenhouse gas emissions.',
    },
    {
      id: 2,
      title: 'Growth',
      img: require('../../../../assets/images/Intro3.png'),
      subText:
        'By investing early and often, you can earn perks like lower fees, being first in line to invest in new funds, and receiving exclusive updates on projects.',
    },
  ];
  return (
    <View style={styles.mainContainer}>
      <Header
        placement={'center'}
        barStyle={'dark-content'}
        containerStyle={styles.headerContainerStyle}
        backgroundColor={styles.headerColor}
        statusbar={styles.statusBar}
        centerComponent={<FirnSvg />}
      />
      <FlatList
        contentContainerStyle={{
          flexGrow: 1,
        }}
        pagingEnabled
        bounces={false}
        data={DATA}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        horizontal
        snapToInterval={Dimensions.get('window').width}
        snapToAlignment="start"
        decelerationRate="fast"
        disableIntervalMomentum
        onMomentumScrollEnd={event => {
          const index = Math.floor(
            Math.floor(event.nativeEvent.contentOffset.x) /
              Math.floor(event.nativeEvent.layoutMeasurement.width),
          );
          setCurrentIndex(index);
        }}
        renderItem={({item}) => (
          <View style={{width: wp(100)}}>
            <View style={{flex: 1}}>
              <Image
                source={item.img}
                style={styles.introImage}
                resizeMode="contain"
              />
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.headerText}> {item.title} </Text>
              <Text style={styles.headerSubText}>{item.subText}</Text>
            </View>
          </View>
        )}
      />
      <View style={styles.bottomContainer}>
        <Button
          onPress={() => {
            dispatch(setWelcome(false));
            navigation.replace('CreateAccount');
          }}
          style={[styles.skipIntroButton, styles.text]}
          title1="Skip intro"
        />
      </View>
      <View style={styles.dashStyle}>
        <View
          style={
            currentIndex == 0 ? styles.lineStyle : styles.lineStyleInactive
          }
        />
        <View
          style={
            currentIndex == 1 ? styles.lineStyle : styles.lineStyleInactive
          }
        />
        <View
          style={
            currentIndex == 2 ? styles.lineStyle : styles.lineStyleInactive
          }
        />
      </View>
    </View>
  );
}

export default Welcome;
