import {useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Snackbar from 'react-native-snackbar';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import Button from '../../../components/CustomButton';
import Header from '../../../components/CustomHeader';
import CustomInputField from '../../../components/CustomInputField';
import Text from '../../../components/CustomText';
import {invest_company} from '../../../services/api-config';
import {usePostApiMutation} from '../../../services/service';
import {useThemeAwareObject} from '../../../theme/index';
import {wp} from '../../../util';
import createStyles from './styles';

function FundsScreen({navigation}) {
  const styles = useThemeAwareObject(createStyles);
  const [amount, setAmount] = useState('');
  const route = useRoute();
  const {projectId, projectName} = route?.params;
  const [investCall, investResponse] = usePostApiMutation();
  const token = useSelector(state => state.user.token);

  const investApi = async () => {
    let data = {
      company_id: projectId,
      amount: amount.substring(1),
    };
    let apiData = {
      url: invest_company,
      method: 'POST',
      data: data,
      token: token,
    };
    try {
      let apiResponse = await investCall(apiData).unwrap();
      if (apiResponse.status == 200) {
        navigation.navigate('SuccessPurchase');
      } else {
        Snackbar.show({
          text: apiResponse?.message,
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    } catch (e) {
      Snackbar.show({
        text: 'Network Error',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  };
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
        centerComponent={
          <>
            <Text style={styles.headerText}>Purchase {projectName}</Text>
          </>
        }
      />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        keyboardShouldPersistTaps="handled">
        <View style={{paddingVertical: 2}}>
          <View style={styles.inputContainer}>
            <CustomInputField
              name="amount"
              textStyle={styles.loginInputText}
              style={styles.loginInputText}
              inputContainerStyle={styles.inputContainerStyle}
              placeholder="$0"
              numberOfLines={1}
              value={amount}
              keyboardType="number-pad"
              onChangeText={text => {
                text = text.split('$').join('');
                if (text > amount) {
                  setAmount(`$${text}`);
                } else {
                  setAmount(text);
                }
              }}
            />
            {amount.length < 4 && amount.length > 0 && (
              <Text style={styles.errorText}>
                Amount must be greater than 100$
              </Text>
            )}
            <Button
              onPress={() => {}}
              style={[styles.carbonButton, styles.carbonText]}
              title1={`Your investment will lead to\n350KG carbon reduced`}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>

      <Button
        onPress={() => {
          if (amount.length > 3) {
            investApi();
          } else {
            Snackbar.show({
              text: 'Amount is required',
              duration: Snackbar.LENGTH_SHORT,
            });
          }
        }}
        loading={investResponse.isLoading}
        style={[styles.purchaseButton, styles.text]}
        title1="Confirm Purchase"
      />
    </View>
  );
}

export default FundsScreen;
