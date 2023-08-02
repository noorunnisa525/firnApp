import React, {useState} from 'react';
import {
  Image,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Modal from 'react-native-modal';
import {Divider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import AccountLogout from '../../../../assets/icons/AccountLogout.svg';
import FirnSvg from '../../../../assets/icons/FIRN.svg';
import Button from '../../../components/CustomButton';
import Header from '../../../components/CustomHeader';
import CustomInputField from '../../../components/CustomInputField';
import Text from '../../../components/CustomText';
import ProfileCrd from '../../../components/ProfileCrd';
import {onLogin} from '../../../redux/slices/userSlice';
import {useThemeAwareObject} from '../../../theme/index';
import {hp, wp} from '../../../util';
import createStyles from './styles';
const HideKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <View>{children}</View>
  </TouchableWithoutFeedback>
);
function Account({navigation}) {
  const styles = useThemeAwareObject(createStyles);
  const dispatch = useDispatch();
  const [openFeedbackModal, setFeedbackModal] = useState(false);
  const [openSubmitFeedbackModal, setSubmitFeedbackModal] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [error, setErrorText] = useState(false);
  const userData = useSelector(state => state.user.userData);
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
          <View style={styles.titleContainer}>
            <Text style={styles.headerText}>
              {userData?.first_name + ' ' + userData?.last_name}
            </Text>
            <Text style={styles.subText}>{userData?.email}</Text>
            <Text style={styles.subText}>Joined 2022</Text>
          </View>
        }
      />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        keyboardShouldPersistTaps="handled">
        <ProfileCrd
          onPress={() => navigation.navigate('AccountSettings')}
          leftIcon={
            <Image
              style={styles.img}
              source={require('../../../../assets/images/SettingsImage.png')}
              resizeMode="contain"
            />
          }
          rightIcon={
            <Image
              style={styles.feedbackIcon}
              source={require('../../../../assets/images/rightIcon.png')}
              resizeMode="contain"
            />
          }
          title={'Settings'}
          subTitle={
            'Personal information, bank \ninformation, account management'
          }
        />
        <ProfileCrd
          leftIcon={
            <Image
              style={styles.img}
              source={require('../../../../assets/images/feedbackImage.png')}
              resizeMode="contain"
            />
          }
          title={'Feedback form'}
          onPress={() => setFeedbackModal(true)}
          onP
          rightIcon={
            <Image
              style={styles.feedbackIcon}
              source={require('../../../../assets/images/feedbackIcon.png')}
              resizeMode="contain"
            />
          }
          subTitle={'Enter your feedback here and any\n comments'}
        />
        <View style={styles.comingSoonContainer}>
          <Text style={styles.comingSoonText}>Coming soon</Text>
          <Divider style={styles.divider} />
        </View>
        <ProfileCrd
          title={'News'}
          titleText={styles.ProfileTitle}
          subText={styles.ProfileSubText}
          subTitle={
            'Learn about what’s happening across\nthe industry and inside the product'
          }
        />
        <ProfileCrd
          title={'Support'}
          titleText={styles.ProfileTitle}
          subText={styles.ProfileSubText}
          subTitle={'Ask our team any questions you have\nabout the app'}
        />
        <ProfileCrd
          title={'What’s New'}
          titleText={styles.ProfileTitle}
          subText={styles.ProfileSubText}
          subTitle={'Learn about all the updates and\nchanges we are making'}
          border
        />

        <ProfileCrd
          leftIcon={<AccountLogout />}
          title={'Sign Out'}
          onPress={() => dispatch(onLogin(false))}
        />
        <Text style={styles.versionText}>
          Firn Alpha Version 2.0 (Demo Mode)
        </Text>
      </KeyboardAwareScrollView>
      <Modal
        visible={openFeedbackModal}
        coverScreen={true}
        style={{
          marginHorizontal: 0,
          backgroundColor: 'white',
          marginBottom: 0,
          marginTop: Platform.OS == 'ios' ? hp(4) : 0,
        }}>
        <>
          <Header
            placement={'center'}
            barStyle={'dark-content'}
            containerStyle={styles.headerContainerStyleTerms}
            backgroundColor={styles.headerColor}
            statusbar={styles.statusBar}
            rightComponent={
              <TouchableOpacity
                onPress={() => {
                  setFeedbackModal(false);
                  setErrorText(false);
                  setFeedbackText('');
                }}>
                <MaterialIcons
                  name={'close'}
                  size={wp(6)}
                  color={'black'}
                  onPress={() => {
                    setFeedbackModal(false);
                    setErrorText(false);
                    setFeedbackText('');
                  }}
                />
              </TouchableOpacity>
            }
            centerComponent={
              <View>
                <Text style={styles.headerModalText}>Leave your feedback</Text>
              </View>
            }
          />
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled">
            <View style={{marginTop: hp(5), marginHorizontal: wp(8)}}>
              <Text style={styles.textFieldTitle}>
                Enter your feedback here
              </Text>
              <CustomInputField
                name="feedbackText"
                containerStyle={styles.containerStyle}
                inputStyle={styles.loginInputText}
                inputContainerStyle={
                  error && feedbackText.length < 1
                    ? styles.inputContainerStyleWithRed
                    : feedbackText.length == ''
                    ? styles.inputContainerStyle
                    : styles.inputContainerStyleWithGreen
                }
                placeholder="Enter your feedback here"
                // numberOfLines={1}
                value={feedbackText}
                multiline
                keyboardType={'default'}
                onChangeText={text => {
                  setFeedbackText(text);
                }}
              />
              {error && feedbackText.length < 1 && (
                <View style={styles.ErrorContainer}>
                  <Icon name="close-circle" size={hp(2)} color={'red'} />
                  <Text style={styles.errorText}>
                    {'Feedback text is required'}
                  </Text>
                </View>
              )}
            </View>
          </KeyboardAwareScrollView>

          <Button
            onPress={() => {
              if (feedbackText.length < 1) {
                setErrorText(true);
              } else {
                setFeedbackModal(false);
                setTimeout(() => {
                  setSubmitFeedbackModal(true);
                }, 100);
                setErrorText(false);
                setFeedbackText('');
              }
            }}
            style={[styles.submitFeedbackButton, styles.text]}
            title1="Submit feedback"
          />
        </>
      </Modal>
      <Modal
        visible={openSubmitFeedbackModal}
        coverScreen={true}
        style={{
          marginHorizontal: 0,
          backgroundColor: 'white',
          marginBottom: 0,
          marginTop: Platform.OS == 'ios' ? hp(4) : 0,
        }}>
        <>
          <Header
            placement={'center'}
            barStyle={'dark-content'}
            containerStyle={styles.headerContainerStyleTerms}
            backgroundColor={styles.headerColor}
            statusbar={styles.statusBar}
            rightComponent={
              <TouchableOpacity
                onPress={() => {
                  setSubmitFeedbackModal(false);
                  setFeedbackModal(false);
                }}>
                <MaterialIcons
                  name={'close'}
                  size={wp(6)}
                  color={'black'}
                  onPress={() => {
                    setSubmitFeedbackModal(false);
                    setFeedbackModal(false);
                  }}
                />
              </TouchableOpacity>
            }
          />
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
            contentContainerStyle={styles.feedbackContainer}
            keyboardShouldPersistTaps="handled">
            <View style={{alignSelf: 'center'}}>
              <Text style={styles.FeedbackSubmitText}>
                Feedback{'\n'}submitted.
              </Text>
              <Text style={styles.thankText}>Thank you!</Text>
              <Button
                onPress={() => {
                  setFeedbackModal(false);
                  setSubmitFeedbackModal(false);
                }}
                style={[styles.viewAccountButton, styles.text]}
                title1="View account"
              />
            </View>
          </KeyboardAwareScrollView>
        </>
      </Modal>
    </View>
  );
}

export default Account;
