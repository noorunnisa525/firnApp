import {Formik} from 'formik';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Modal from 'react-native-modal';
import Snackbar from 'react-native-snackbar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import ToggleSwitch from 'toggle-switch-react-native';
import * as yup from 'yup';
import FirnSvg from '../../../../assets/icons/FIRN.svg';
import Code from '../../../components/CodeVerification';
import Button from '../../../components/CustomButton';
import Header from '../../../components/CustomHeader';
import CustomInputField from '../../../components/CustomInputField';
import Text from '../../../components/CustomText';
import {
  onLogin,
  rememberMe,
  setToken,
  setUser,
} from '../../../redux/slices/userSlice';
import {
  login_api,
  otp_verification,
  password_recovery,
} from '../../../services/api-config';
import {usePostApiMutation} from '../../../services/service';
import {useThemeAwareObject} from '../../../theme/index';
import {hp, wp} from '../../../util/index';
import createStyles from './styles';

function Login({navigation}) {
  const styles = useThemeAwareObject(createStyles);
  const dispatch = useDispatch();
  const [clearField, setClearField] = useState(false);
  const [LoginCall, LoginResponse] = usePostApiMutation();
  const formikRef = React.createRef();
  const [signupValues, setSignupValues] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [RecoveryCall, RecoveryResponse] = usePostApiMutation();
  const accessToken = useSelector(state => state.user.token);
  const rememberCredentials = useSelector(state => state.user.remember);
  const [ResendCall, ResendResponse] = usePostApiMutation();
  const [isEnabled, setIsEnabled] = useState(
    rememberCredentials == false ? true : false,
  );
  const postProfileVisibility = async value => {
    setIsEnabled(!isEnabled);
    dispatch(rememberMe(isEnabled));
  };
  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email address is required'),
  });
  const loginApi = async values => {
    let data = {
      email: values.email.toLowerCase(),
    };
    let apiData = {
      url: login_api,
      method: 'POST',
      data: data,
    };
    try {
      let apiResponse = await LoginCall(apiData).unwrap();
      if (apiResponse.status == 200) {
        setSignupValues(values);
        setOpenModal(true);
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
  const recoveryApi = async value => {
    let data = {
      email: signupValues.email,
      otp: value,
    };
    let apiData = {
      url: otp_verification,
      method: 'POST',
      data: data,
      token: accessToken,
    };
    try {
      let apiResponse = await RecoveryCall(apiData).unwrap();
      if (apiResponse.status == 200) {
        if (value.length == 6) {
          dispatch(setUser(apiResponse.data.user));
          dispatch(setToken(apiResponse.data.access_token));
          dispatch(onLogin(true));
        }
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
  const resendApi = async values => {
    let data = {
      email: signupValues.email,
    };
    let apiData = {
      url: password_recovery,
      method: 'POST',
      data: data,
      token: accessToken,
    };
    try {
      let apiResponse = await ResendCall(apiData).unwrap();
      if (apiResponse.status == 200) {
        Snackbar.show({
          text: 'Otp sent successfully',
          duration: Snackbar.LENGTH_SHORT,
        });
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
  function verifyCode(value) {
    if (value.length == 6) {
      recoveryApi(value);
    }
    setOtpValue(value);
  }

  return (
    <View style={styles.mainContainer}>
      <Header
        placement={'center'}
        barStyle={'dark-content'}
        containerStyle={styles.headerContainerStyle}
        backgroundColor={styles.headerColor}
        statusbar={styles.statusBar}
        centerContainerStyle={{flex: 0, marginTop: hp(5)}}
        centerComponent={
          <>
            <FirnSvg />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('CreateAccount');
                formikRef.current?.resetForm();
              }}>
              <Text style={styles.loggingText}>New around here? Sign up </Text>
            </TouchableOpacity>
          </>
        }
      />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        keyboardShouldPersistTaps="handled">
        <View
          style={{
            justifyContent: 'space-between',
            flexGrow: 1,
          }}>
          <Text style={styles.headerText}>Sign in with your credentials</Text>
          <Formik
            innerRef={formikRef}
            validationSchema={loginValidationSchema}
            initialValues={{email: __DEV__ ? 'test.stackup3@gmail.com' : ''}}
            onSubmit={values => {
              loginApi(values);
            }}
            validateOnChange={true}
            validateOnBlur={true}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              isValid,
            }) => (
              <View style={styles.inputContainer}>
                <View style={styles.subContainer}>
                  <View>
                    <Text style={styles.textFieldTitle}>Enter your email</Text>
                    <CustomInputField
                      name="email"
                      inputStyle={styles.loginInputText}
                      inputContainerStyle={
                        errors.email && !isValid
                          ? styles.inputContainerStyleWithRed
                          : values.email == ''
                          ? styles.inputContainerStyle
                          : styles.inputContainerStyleWithGreen
                      }
                      placeholder="Email address"
                      numberOfLines={1}
                      value={values.email}
                      onBlur={handleBlur('email')}
                      leftIcon={
                        <Image
                          style={styles.img}
                          source={require('../../../../assets/images/mail.png')}
                          resizeMode="contain"
                        />
                      }
                      onChangeText={handleChange('email')}
                    />
                    {errors.email && !isValid && (
                      <View style={styles.ErrorContainer}>
                        <Icon name="close-circle" size={hp(2)} color={'red'} />
                        <Text style={styles.errorText}>{errors.email}</Text>
                      </View>
                    )}
                  </View>
                </View>

                <View style={styles.resetPasswordContainer}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingRight: wp(3),
                    }}>
                    <Text style={styles.legalText}>Remember me</Text>
                    <ToggleSwitch
                      isOn={isEnabled}
                      onColor="#3190E8"
                      offColor="#767577"
                      size="medium"
                      onToggle={postProfileVisibility}
                    />
                  </View>
                  <Text style={styles.termsAndConditionText}>
                    Remember me as the primary{'\n'}account on this device.
                  </Text>
                </View>

                <Button
                  onPress={val => {
                    handleSubmit(val);
                    setClearField(false);
                  }}
                  style={[styles.loginButton, styles.text]}
                  title1="Send me a login code"
                  loading={LoginResponse.isLoading}
                />
              </View>
            )}
          </Formik>
          {/* <LoadingModal modalVisible={RecoveryResponse.isLoading}/> */}

          {openModal && (
            <Modal
              visible={openModal}
              style={{
                marginHorizontal: 0,
                backgroundColor: 'white',
                marginBottom: 0,
                marginTop: Platform.OS == 'ios' ? hp(4) : 0,
              }}
              coverScreen={true}>
              <>
                <Header
                  placement={'center'}
                  barStyle={'dark-content'}
                  containerStyle={styles.headerContainerStyle}
                  backgroundColor={styles.headerColor}
                  centerContainerStyle={{flex: 0}}
                  statusbar={styles.statusBar}
                  rightComponent={
                    <TouchableOpacity
                      style={styles.iconContainer}
                      onPress={() => {
                        setOpenModal(false);
                      }}>
                      <MaterialIcons
                        name={'close'}
                        size={wp(6)}
                        color={'black'}
                        onPress={() => {
                          setOpenModal(false);
                        }}
                      />
                    </TouchableOpacity>
                  }
                  centerComponent={
                    <View style={{marginTop: hp(4)}}>
                      <Text style={styles.headerTextModal}>
                        Check your email for a code
                      </Text>
                      <Text style={styles.headerSubTextModal}>
                        We’ve sent a 6-character code to{' '}
                      </Text>

                      <Text style={styles.headerSubTextModal}>
                        {signupValues?.email ? signupValues?.email : ''}. The{' '}
                      </Text>

                      <Text style={styles.headerSubTextModal}>
                        code expires shortly, so please{' '}
                      </Text>

                      <Text style={styles.headerSubTextModal}>
                        enter it soon.{' '}
                      </Text>
                    </View>
                  }
                />
                <KeyboardAwareScrollView
                  showsVerticalScrollIndicator={false}
                  nestedScrollEnabled={true}
                  keyboardShouldPersistTaps="handled">
                  <View>
                    <View style={styles.optContainer}>
                      {RecoveryResponse.isLoading ? (
                        <ActivityIndicator size="large" color="black" />
                      ) : (
                        <Code verifyCode={value => verifyCode(value)} />
                      )}
                      <View style={styles.codeTextContainer}>
                        <Text style={styles.codeText}>
                          haven't receive any code?
                        </Text>
                        <Button
                          onPress={() => resendApi()}
                          style={[styles.sendLinkButton, styles.resendText]}
                          title1=" Resend"
                          loading={ResendResponse.isLoading}
                          blackLoader
                        />
                      </View>
                    </View>
                  </View>
                </KeyboardAwareScrollView>
              </>
            </Modal>
          )}
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

export default Login;
