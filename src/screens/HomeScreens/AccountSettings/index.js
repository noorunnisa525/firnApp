import {Formik} from 'formik';
import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Divider} from 'react-native-paper';
import Snackbar from 'react-native-snackbar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import * as yup from 'yup';
import FirnSvg from '../../../../assets/icons/FIRN.svg';
import Button from '../../../components/CustomButton';
import Header from '../../../components/CustomHeader';
import CustomInputField from '../../../components/CustomInputField';
import Text from '../../../components/CustomText';
import ProfileCrd from '../../../components/ProfileCrd';
import {setUser} from '../../../redux/slices/userSlice';
import {account_settings} from '../../../services/api-config';
import {usePostApiMutation} from '../../../services/service';
import {useThemeAwareObject} from '../../../theme/index';
import {hp} from '../../../util';
import createStyles from './styles';

function AccountSettings({navigation}) {
  const styles = useThemeAwareObject(createStyles);
  const userData = useSelector(state => state.user.userData);
  const dispatch = useDispatch();
  const auth_token = useSelector(state => state.user.token);
  const regexPhone = '^[0-9]{3}-[0-9]{3}-[0-9]{4}$';
  const [updateSettingsCall, updateSettingResponse] = usePostApiMutation();
  const loginValidationSchema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    phoneNumber: yup
      .string()
      .required('Phone number is required')
      .matches(regexPhone, 'Phone format must be must be ###-###-####'),
  });

  const updateSettingsApi = async values => {
    let data = {
      first_name: values.firstName,
      last_name: values.lastName,
      phone: values.phoneNumber,
    };
    let apiData = {
      url: account_settings,
      method: 'POST',
      data: data,
      token: auth_token,
    };
    try {
      let apiResponse = await updateSettingsCall(apiData).unwrap();
      if (apiResponse.status == 200) {
        Snackbar.show({
          text: apiResponse?.message,
          duration: Snackbar.LENGTH_SHORT,
        });
        dispatch(setUser(apiResponse?.data));
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
        centerComponent={
          <View
            style={{
              paddingVertical: hp(2),
            }}>
            <FirnSvg />
          </View>
        }
        leftComponent={
          <TouchableOpacity
            style={styles.titleContainer}
            onPress={() => navigation.goBack()}>
            <Image
              style={styles.feedbackIcon}
              source={require('../../../../assets/images/BackIcon.png')}
              resizeMode="contain"
            />
            <Text style={styles.subText}>Back to Account</Text>
          </TouchableOpacity>
        }
      />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        keyboardShouldPersistTaps="handled">
        <Text style={styles.headerText}>Settings</Text>
        <Formik
          validationSchema={loginValidationSchema}
          validateOnChange={true}
          validateOnBlur={true}
          initialValues={{
            firstName: '',
            lastName:'',
            phoneNumber: '',
          }}
          onSubmit={values => {
            updateSettingsApi(values);
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isValid,
          }) => (
            <View style={styles.inputContainer}>
              <View>
                <Text style={styles.textFieldTitle}>First name</Text>
                <CustomInputField
                  name="firstName"
                  inputStyle={styles.loginInputText}
                  inputContainerStyle={
                    errors.firstName && !isValid
                      ? styles.inputContainerStyleWithRed
                      : values.firstName == ''
                      ? styles.inputContainerStyle
                      : styles.inputContainerStyleWithGreen
                  }
                  placeholder={userData?.first_name}
                  numberOfLines={1}
                  onBlur={handleBlur('firstName')}
                  leftIcon={
                    <Image
                      style={styles.profileImg}
                      source={require('../../../../assets/images/profile.png')}
                      resizeMode="contain"
                    />
                  }
                  value={values.firstName}
                  onChangeText={handleChange('firstName')}
                />
                {errors.firstName && !isValid && (
                  <View style={styles.ErrorContainer}>
                    <Icon name="close-circle" size={hp(2)} color={'red'} />
                    <Text style={styles.errorText}>{errors.firstName}</Text>
                  </View>
                )}
              </View>
              <View>
                <Text style={styles.textFieldTitle}>Last name</Text>
                <CustomInputField
                  name="lastName"
                  inputStyle={styles.loginInputText}
                  inputContainerStyle={
                    errors.lastName && !isValid
                      ? styles.inputContainerStyleWithRed
                      : values.lastName == ''
                      ? styles.inputContainerStyle
                      : styles.inputContainerStyleWithGreen
                  }
                  placeholder={userData.last_name}
                  numberOfLines={1}
                  value={values.lastName}
                  leftIcon={
                    <Image
                      style={styles.profileImg}
                      source={require('../../../../assets/images/profile.png')}
                      resizeMode="contain"
                    />
                  }
                  onBlur={handleBlur('lastName')}
                  onChangeText={handleChange('lastName')}
                />
                {errors.lastName && !isValid && (
                  <View style={styles.ErrorContainer}>
                    <Icon name="close-circle" size={hp(2)} color={'red'} />
                    <Text style={styles.errorText}>{errors.lastName}</Text>
                  </View>
                )}
              </View>
              <View>
                <Text style={styles.textFieldTitle}>Phone number</Text>

                <CustomInputField
                  name="phoneNumber"
                  inputStyle={styles.loginInputText}
                  inputContainerStyle={
                    errors.phoneNumber && !isValid
                      ? styles.inputContainerStyleWithRed
                      : values.phoneNumber == ''
                      ? styles.inputContainerStyle
                      : styles.inputContainerStyleWithGreen
                  }
                  placeholder={userData.phone}
                  numberOfLines={1}
                  maxLength={12}
                  value={
                    values.phoneNumber
                    // ? (values.phoneNumber.slice(-1) != '-' &&
                    //     values.phoneNumber.length == 3) ||
                    //   values.phoneNumber.length == 7
                    //   ? values.phoneNumber + '-'
                    //   : values.phoneNumber
                    // : ''
                  }
                  onChangeText={handleChange('phoneNumber')}
                  leftIcon={
                    <Image
                      style={styles.img}
                      source={require('../../../../assets/images/phone.png')}
                      resizeMode="contain"
                    />
                  }
                  onBlur={handleBlur('phoneNumber')}
                  keyboardType={'number-pad'}
                />

                {errors.phoneNumber && !isValid && (
                  <View style={styles.ErrorContainer}>
                    <Icon name="close-circle" size={hp(2)} color={'red'} />
                    <Text style={styles.errorText}>{errors.phoneNumber}</Text>
                  </View>
                )}
              </View>
              <Button
                onPress={val => {
                  handleSubmit(val);
                }}
                style={[styles.updateSettingButton, styles.updateButtonText]}
                title1="Update settings"
                loading={updateSettingResponse.isLoading}
              />
              <View style={styles.comingSoonContainer}>
                <Text style={styles.comingSoonText}>Coming soon</Text>
                <Divider style={styles.divider} />
              </View>
              <ProfileCrd
                title={'Bank information not connected'}
                titleText={styles.ProfileTitle}
                subText={styles.ProfileSubText}
                subTitle={
                  'Connect your bank account so that you can invest with us.'
                }
              />

              <Button
                onPress={() => {}}
                style={[styles.registerButton, styles.text]}
                title1="Connect"
                // loading={SignupResponse.isLoading}
              />
            </View>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </View>
  );
}

export default AccountSettings;
