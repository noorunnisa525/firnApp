import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Celebrates from '../../../../assets/icons/Celebrates.svg';
import Button from '../../../components/CustomButton';
import Header from '../../../components/CustomHeader';
import Text from '../../../components/CustomText';
import {useThemeAwareObject} from '../../../theme/index';
import {wp} from '../../../util';
import createStyles from './styles';

function SuccessPurchase({navigation}) {
  const styles = useThemeAwareObject(createStyles);

  return (
    <View style={styles.mainContainer}>
      <Header
        placement={'center'}
        barStyle={'dark-content'}
        containerStyle={styles.headerContainerStyle}
        backgroundColor={styles.headerColor}
        statusbar={styles.statusBar}
        centerContainerStyle={{flex: 0}}
        leftComponent={
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => {
              navigation.goBack();
            }}>
            <MaterialIcons
              name={'arrow-back-ios'}
              size={wp(6)}
              color={'black'}
              onPress={() => {
                navigation.goBack();
              }}
            />
          </TouchableOpacity>
        }
      />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        keyboardShouldPersistTaps="handled">
        <Text style={styles.shareText}>Purchase{'\n'} Successful!</Text>
        <Button
          onPress={() => {
            navigation.navigate('Portfolio');
          }}
          style={[styles.carbonButton, styles.text]}
          title1={`View Portfolio`}
        />
      </KeyboardAwareScrollView>
      <Celebrates />
    </View>
  );
}

export default SuccessPurchase;
