import React, {useState} from 'react';
import {
  ActivityIndicator,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Modal from 'react-native-modal';
import Snackbar from 'react-native-snackbar';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import FirnSvg from '../../../../assets/icons/FIRN.svg';
import Code from '../../../components/CodeVerification';
import Button from '../../../components/CustomButton';
import Header from '../../../components/CustomHeader';
import Text from '../../../components/CustomText';
import {onLogin, setToken, setUser} from '../../../redux/slices/userSlice';
import {
  login_api,
  otp_verification,
  password_recovery,
} from '../../../services/api-config';
import {usePostApiMutation} from '../../../services/service';
import {useThemeAwareObject} from '../../../theme/index';
import {hp, wp} from '../../../util/index';
import createStyles from './styles';

function WelcomeBack({navigation}) {
  const styles = useThemeAwareObject(createStyles);
  const dispatch = useDispatch();
  const [clearField, setClearField] = useState(false);
  const [LoginCall, LoginResponse] = usePostApiMutation();
  const userData = useSelector(state => state.user.userData);
  const [openModal, setOpenModal] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [RecoveryCall, RecoveryResponse] = usePostApiMutation();
  const [ResendCall, ResendResponse] = usePostApiMutation();
  const accessToken = useSelector(state => state.user.token);

  const loginApi = async () => {
    let data = {
      email: userData.email,
    };
    let apiData = {
      url: login_api,
      method: 'POST',
      data: data,
    };
    try {
      let apiResponse = await LoginCall(apiData).unwrap();
      if (apiResponse.status == 200) {
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
      email: userData.email,
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
        Snackbar.LENGTH_LONG;
        Snackbar.show({
          text: apiResponse?.message,
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    } catch (e) {
      Snackbar.show({
        text: 'Network Error',
        duration: Snackbar.LENGTH_LONG,
      });
    }
  };
  const resendApi = async values => {
    let data = {
      email: userData.email,
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
          duration: Snackbar.LENGTH_LONG,
        });
      } else {
        Snackbar.show({
          text: apiResponse?.message,
          duration: Snackbar.LENGTH_LONG,
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
              }}></TouchableOpacity>
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
          <View>
            <Text style={styles.headerText}>
              Welcome back, {userData?.first_name}!
            </Text>
          </View>
          <View>
            <Text
              style={styles.newText}
              onPress={() => {
                navigation.navigate('Login');
              }}>
              Not {userData?.first_name}? Change your{'\n'} credentials here
            </Text>
          </View>
          <View>
            <Button
              onPress={values => {
                loginApi();
              }}
              style={[styles.loginButton, styles.text]}
              title1="Send me a login code"
              loading={LoginResponse.isLoading}
            />
          </View>

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
                        {userData.email ? userData.email : ''}. The{' '}
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
                  contentContainerStyle={styles.container}
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

export default WelcomeBack;
