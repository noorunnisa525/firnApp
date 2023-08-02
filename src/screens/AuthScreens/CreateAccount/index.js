import {Formik} from 'formik';
import React, {useRef, useState} from 'react';
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
import CustomInputMask from '../../../components/CustomInputMask';
import Text from '../../../components/CustomText';
import {onLogin, setToken, setUser} from '../../../redux/slices/userSlice';
import {
  otp_verification,
  password_recovery,
  signup_api,
} from '../../../services/api-config';
import {usePostApiMutation} from '../../../services/service';
import {useThemeAwareObject} from '../../../theme/index';
import {hp, wp} from '../../../util';
import createStyles from './styles';

function CreateAccount({navigation}) {
  const styles = useThemeAwareObject(createStyles);
  const [clearField, setClearField] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [SignupCall, SignupResponse] = usePostApiMutation();
  const [openModal, setOpenModal] = useState(false);
  const [openServiceModal, setOpenServiceModal] = useState(false);
  const [openTermsModal, setOpenTermsModal] = useState(false);
  const scrollViewRef = useRef();
  const scrollViewRefForPrivacy = useRef();
  const [otpValue, setOtpValue] = useState('');
  const dispatch = useDispatch();
  const accessToken = useSelector(state => state.user.token);
  const [RecoveryCall, RecoveryResponse] = usePostApiMutation();
  const [signupValues, setSignupValues] = useState();
  const [ResendCall, ResendResponse] = usePostApiMutation();
  const regexPhone = '^[0-9]{3}-[0-9]{3}-[0-9]{4}$';
  const createValidationSchema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    phoneNumber: yup
      .string()
      .required('Phone number is required')
      .matches(regexPhone, 'Phone format must be must be ###-###-####'),
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email address is required'),
  });
  const postProfileVisibility = async value => {
    setIsEnabled(prev => !prev);
  };
  const signupApi = async values => {
    let data = {
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email.toLowerCase(),
      phone: values.phoneNumber,
    };
    let apiData = {
      url: signup_api,
      method: 'POST',
      data: data,
    };
    try {
      let apiResponse = await SignupCall(apiData).unwrap();
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
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loggingText}>
                Already have an account? Login{' '}
              </Text>
            </TouchableOpacity>
          </>
        }
      />
      <Text style={styles.headerText}>Create an Account!</Text>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        keyboardShouldPersistTaps="handled">
        <Formik
          validationSchema={createValidationSchema}
          validateOnChange={true}
          validateOnBlur={true}
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
          }}
          onSubmit={(values, {resetForm}) => {
            if (clearField) {
              resetForm({
                values: {
                  ...values,
                },
              });
            } else if (isEnabled) {
              signupApi(values);
            } else {
              Snackbar.show({
                text: 'Please accept terms and conditions',
                duration: Snackbar.LENGTH_SHORT,
              });
            }
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            isValid,
            errors,
            touched,
          }) => (
            <View style={styles.inputContainer}>
              <View>
                <Text style={styles.textFieldTitle}>Enter your email</Text>
                <CustomInputField
                  name="email"
                  inputStyle={styles.createInputText}
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
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  leftIcon={
                    <Image
                      style={styles.img}
                      source={require('../../../../assets/images/mail.png')}
                      resizeMode="contain"
                    />
                  }
                />
                {errors.email && !isValid && (
                  <View style={styles.ErrorContainer}>
                    <Icon name="close-circle" size={hp(2)} color={'red'} />
                    <Text style={styles.errorText}>{errors.email}</Text>
                  </View>
                )}
              </View>

              <View>
                <Text style={styles.textFieldTitle}>Enter your first name</Text>
                <CustomInputField
                  name="firstName"
                  inputStyle={styles.createInputText}
                  inputContainerStyle={
                    errors.firstName && !isValid
                      ? styles.inputContainerStyleWithRed
                      : values.firstName == ''
                      ? styles.inputContainerStyle
                      : styles.inputContainerStyleWithGreen
                  }
                  placeholder="First name"
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
                <Text style={styles.textFieldTitle}>Enter your last name</Text>
                <CustomInputField
                  name="lastName"
                  inputStyle={styles.createInputText}
                  inputContainerStyle={
                    errors.lastName && !isValid
                      ? styles.inputContainerStyleWithRed
                      : values.lastName == ''
                      ? styles.inputContainerStyle
                      : styles.inputContainerStyleWithGreen
                  }
                  placeholder="Last name"
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
                <Text style={styles.textFieldTitle}>
                  Enter your phone number
                </Text>

                <CustomInputMask
                  placeholder="Phone"
                  keyboardType={'number-pad'}
                  type={'custom'}
                  options={{mask: '999-999-9999'}}
                  style={
                    errors.phoneNumber && !isValid
                      ? styles.inputContainerStyleWithRed
                      : values.phoneNumber == ''
                      ? styles.inputContainerStyle
                      : styles.inputContainerStyleWithGreen
                  }
                  onBlur={handleBlur('phoneNumber')}
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
                  maxLength={12}
                  leftIcon={
                    <Image
                      style={styles.img}
                      source={require('../../../../assets/images/phone.png')}
                      resizeMode="contain"
                    />
                  }
                />

                <View style={styles.maskErrorContainer}>
                  {errors.phoneNumber && !isValid && (
                    <Icon name="close-circle" size={hp(2)} color={'red'} />
                  )}
                  <Text style={styles.errorText}>{errors.phoneNumber}</Text>
                </View>
              </View>

              <View style={styles.checkboxContainer}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingRight: wp(3),
                  }}>
                  <Text style={styles.legalText}>Legal Disclosure </Text>
                  <ToggleSwitch
                    isOn={isEnabled ? true : false}
                    onColor="#3190E8"
                    offColor="#767577"
                    size="medium"
                    onToggle={postProfileVisibility}
                  />
                </View>
                <Text style={styles.termsAndConditionText}>
                  I have read the{' '}
                  <Text
                    style={styles.privacyText}
                    onPress={() => setOpenServiceModal(true)}>
                    privacy policy
                  </Text>
                  , and {'\n'}
                  agree to the{' '}
                  <Text
                    style={styles.privacyText}
                    onPress={() => setOpenTermsModal(true)}>
                    terms and conditions
                  </Text>
                  .
                </Text>
              </View>

              <Button
                onPress={val => {
                  handleSubmit(val);
                  setClearField(false);
                }}
                style={[styles.registerButton, styles.text]}
                title1="Sign up with email"
                loading={SignupResponse.isLoading}
              />
            </View>
          )}
        </Formik>

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
              statusbar={styles.statusBar}
              centerContainerStyle={{flex: 0}}
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

                  <Text style={styles.headerSubTextModal}>enter it soon. </Text>
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

        <Modal
          visible={openServiceModal}
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
              containerStyle={styles.headerContainerStyleTerms}
              backgroundColor={styles.headerColor}
              statusbar={styles.statusBar}
              rightComponent={
                <TouchableOpacity
                  onPress={() => {
                    setOpenServiceModal(false);
                  }}>
                  <MaterialIcons
                    name={'close'}
                    size={wp(6)}
                    color={'black'}
                    onPress={() => {
                      setOpenServiceModal(false);
                    }}
                  />
                </TouchableOpacity>
              }
              centerComponent={
                <View>
                  <Text style={styles.headerTextTermModal}>Privacy policy</Text>
                </View>
              }
            />
            <KeyboardAwareScrollView
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true}
              ref={scrollViewRefForPrivacy}
              contentContainerStyle={styles.modalContainer}
              keyboardShouldPersistTaps="handled">
              <Text style={styles.boldTextModal}>
                Date of Last Revision: November 12, 2022
              </Text>
              <Text>
                Firn, Inc. (“Firn”) provides online tools to assist companies,
                potential investors, and others who are interested or involved
                in the acquisition, development, leasing, management, and/or
                financing of clean energy projects and other related assets.
                This privacy policy (our “Privacy Policy”) describes our data
                practices regarding Personal Information (defined below). This
                Privacy Policy applies to Personal Information collected through
                our website, located at www.firninvestments.com (the “Site”), or
                through our mobile apps (collectively, the Site and mobile apps
                are the “Services”). This Privacy Policy does not apply to any
                Personal Information collected by third party websites or apps
                not operated by Firn. As a financial company, federal law (the
                Gramm-Leach-Bliley Act, or “GLBA”) also requires us to tell you
                how we collect, share, and protect your Personal Information.
                Please see the GLBA Appendix at the end of this Privacy Policy
                to learn more about how we treat your Personal Information under
                GLBA. By accessing the Site and/or using our Services, you are
                consenting to our use of your Personal Information in accordance
                with this Privacy Policy. Further, your access to and use of the
                Services is subject to the Firn Terms of Use. Information Firn
                Collects About You Personal Information You Provide. We use the
                term “Personal Information” to mean any information that could
                be used to identify you, including your name, address, email
                address, birth date, financial information, cell or land-line
                phone number, or any combination of information that could be
                used to identify you. What Personal Information we collect from
                you depends on what Services you choose to use and how you
                interact with the Site: Site Visitors. We have structured our
                Site so that, as a casual site visitor, you may come to our Site
                and review selected information about our Services without
                registering or providing Personal Information. However, if you
                wish to become an Investor, then we require you to provide
                certain Personal Information. Investors. If you choose to access
                our Services as an Investor, we require that you complete a
                registration form. An Investor is an individual who is over the
                age of 18 and has completed the registration process on the
                Site. Our registration forms will specify the information which
                you must provide in order to enjoy the particular features to
                which you wish to subscribe, which may include such items as (i)
                name; (ii) email address; (iii) phone number(s); (iv) mailing
                address; (v) Social Security number (for IRS tax reporting
                purposes); (vi) bank account number; and (vii) birth date. Our
                registration forms may additionally request information that you
                may, at your option, choose to provide or withhold. To the
                extent this additional information constitutes Personal
                Information, we will treat it in the manner specified in this
                Privacy Policy. We may require each Investor to provide
                information designed to verify his, her, or their identity. This
                information may include (i) information from a successfully
                completed electronic check transaction, (ii) a credit report, or
                (iii) other similar information designed to authenticate and
                confirm your identity or to otherwise comply with applicable
                law. We also require each Investor to provide certain financial
                information. For example, we require that each Investor also
                provide Internal Revenue Service Form W-9 data, which includes
                your Social Security number (or Taxpayer Identification number,
                where applicable). We also require that Investors provide us
                with certain account and other payment information, such as
                information needed to make payments via ACH, wire, or electronic
                checks. Our registration process for Investors provides
                additional details on the types of payment information needed.
                Users also may choose to upload media files such as videos,
                photos, text, and other content to the Site to share with Firn
                and other users. When you upload this content, we may also
                collect metadata associated with these media files including
                date, time, location and device information. Firn’s use of such
                content will be governed by our user-generated terms and
                conditions which are provided at the time of collection of such
                content. Location Data. We may collect your location information
                through our mobile apps by capturing the location (e.g.
                latitude/longitude) of your mobile device. If you have given the
                app permission to access your location, we may collect your
                device’s location even if you are not using the Service and
                store your location history. If you want to opt-out of the
                collection of your location data, please adjust your settings in
                your mobile device to restrict the app’s access to your location
                data. Geolocation data may be used to enhance the Services, for
                example to offer additional functionality and information
                regarding your location in connection with the location of Firn
                properties. Automatically-Collected Information. We, our service
                providers, and marketing partners, may automatically log
                information, such as the type of computer or mobile device
                accessing our Services, interactions over time with our
                Services, our communications (including emails and alerts), and
                other online services, such as: Device data, such as the
                computer or mobile device’s operating system type and version,
                manufacturer and model, browser type, screen resolution, RAM and
                disk size, CPU usage, device type (e.g., phone, tablet), IP
                address, unique identifiers (including identifiers used for
                advertising purposes), language settings, mobile device carrier,
                radio/network information (e.g., WiFi, LTE, 4G), and general
                location information such as city, state or geographic area.
                Online activity data, such as pages or screens viewed, how long
                was spent on a page or screen, browsing history, navigation
                paths between pages or screens, information about activity on a
                page or screen, access times, and duration of access, and
                whether marketing emails were opened or links within them
                clicked. We may use Google Analytics, a web analytics service
                provided by Google LLC (“Google”) to help collect and analyze
                Usage Information. For more information on how Google uses this
                information, click here. We use the following tools for
                automatic data collection: Cookies, which are text files that
                websites store on a visitor‘s device to uniquely identify the
                visitor’s browser or to store information or settings in the
                browser for the purpose of helping navigate between pages
                efficiently, remembering preferences, enabling functionality,
                helping us understand user activity and patterns, and
                facilitating online advertising. Local storage technologies,
                like HTML5, that provide cookie-equivalent functionality but can
                store larger amounts of data, including on devices outside of
                browsers in connection with specific applications. Web beacons,
                also known as pixel tags or clear GIFs, which are used to
                demonstrate that a webpage or email was accessed or opened, or
                that certain content was viewed or clicked. How We Use Personal
                Information We may use your Personal Information for the
                following business purposes: to process transactions that you
                have authorized us to make; to facilitate your activities with
                respect to our Site; to contact you regarding administrative
                issues, such as questions about your specific request, or
                otherwise respond to your comments or requests; to verify and
                authenticate your identity, to help us ensure that the
                individuals who use the Site and Services are who they claim to
                be; to prevent, detect, mitigate, and investigate fraud,
                security breaches, and potentially prohibited or illegal
                activities, including, for example, activities prohibited by the
                Anti-Money Laundering Act; to help us operate our Site; to
                deliver notices regarding your account; to comply with IRS
                requirements and for tax reporting purposes; to provide you with
                information, such as notices of investment opportunities via our
                Site or updates concerning investments that you have
                participated in; to send you information we believe is relevant
                to you, such as news, bulletins, or other information; to
                enforce this Privacy Policy and our Terms of Use; to conduct
                user surveys and questionnaires; and to comply with applicable
                law. Marketing and advertising. We and our advertising partners
                may collect and use Personal Information for marketing and
                advertising purposes, including: Direct marketing. We may from
                time-to-time send direct marketing communications including, but
                not limited to, communications about special promotions, offers
                and events. Recipients may opt out of our marketing
                communications as described in the “Opt out of marketing
                communications” section below. Interest-based advertising. We
                may engage third-party advertising companies and social media
                companies to display ads promoting our services across the web.
                These companies may use cookies and similar technologies to
                collect information about interactions (including the data
                described above) over time across the Internet and use that
                information to serve online ads that they think will be of
                interest. This is called interest-based advertising. We use
                aggregated information to analyze the effectiveness of our Site,
                to improve our Services, and for other similar purposes. In
                addition, from time to time, we may undertake or commission
                statistical and other summary analyses of the general behavior
                and characteristics of users participating in our Services and
                the characteristics of visitors at our Site, and may share
                aggregated information with third parties, including
                advertisers. We may collect aggregated information through
                features of the software that support our Services, through
                cookies, and through other means described in this Privacy
                Policy. To enable us to better understand the characteristics of
                our Investors and/or to provide services tailored to your needs,
                we may combine the Personal Information an Investor provides
                with certain automatically-collected information that would not
                otherwise be personally identifiable. If we combine or link any
                automatically-collected, non-individually identifiable
                information with your Personal Information, the resulting
                combination will be treated as Personal Information under this
                Privacy Policy. How We Share Personal Information We do not
                disclose your Personal Information to unaffiliated third parties
                except as provided in this Privacy Policy, as follows: Service
                Providers. We may share Personal Information with third party
                companies and individuals that provide services on our behalf or
                help us operate our Services, such as hosting services, cloud
                services, information technology services, email communication
                software, email newsletter services, advertising and marketing
                services, payment processors, customer relationship management
                and customer support services, and web analytics services.
                Plaid. For users who choose to link their bank accounts, we are
                planning to use Plaid Technologies, Inc. (“Plaid”) to facilitate
                the automatic connection with, and gather required transaction
                data from, your financial institution. In addition to
                facilitating transactions, we use Plaid to prevent overdrafts on
                your account and to prevent, detect, and mitigate fraud. By
                using our joint services, you grant us and Plaid the right,
                power, and authority to act on your behalf to access and
                transmit your Personal Information (including bank account
                information) from the relevant financial institution. You agree
                to your Personal Information (including bank account
                information) being transferred, stored, and processed by Plaid
                in accordance with the Plaid Privacy Policy (located at
                https://plaid.com/legal/#privacy-policy). Stripe. We may use
                Stripe, Inc. (Stripe) as a payment processor to facilitate the
                processing of certain payment transactions for our Services.
                Stripe collects the financial information necessary to process
                your payments for the Service. We may disclose your Personal
                Information to Stripe to prevent, detect, mitigate, and
                investigate potentially illegal acts, fraud and/or security
                breaches and to assess and manage risk, including to alert you
                if fraudulent activities have been detected on your Firn or
                Stripe accounts; and provide customer services, including to
                help service your account or resolve disputes. Accordingly, in
                addition to this Privacy Policy and our Terms of Use, your
                financial information is also processed pursuant to Stripe’s
                services agreement and privacy policy (located at
                https://stripe.com/privacy). Advertising Partners. We may share
                Personal Information with third party advertising companies for
                interest-based advertising purposes as described above. IRA. We
                may team up with third-party custodians to allow you to invest
                your IRA funds in diversified commercial real estate
                investments. These parties are not affiliated with Firn, but act
                as a directed custodian for IRAs and other custodial accounts.
                If you elect to initiate the opening of a self-directed IRA
                account with Firn, we streamline the enrollment process by
                sharing certain Personal Information with these custodians,
                including but not limited to your name, Social Security number,
                date of birth, and contact information. You are not required to
                invest your IRA funds as a condition of using the Services.
                Affiliates. We may share information with our affiliates,
                meaning an entity that controls, is controlled by, or is under
                common control with Firn. Our affiliates may use the Personal
                Information we share in a manner consistent with this Privacy
                Policy. For Legal Reasons. We may share your Personal
                Information to the extent we reasonably believe we are required
                to do so by law or to comply with legal or regulatory
                requirements, or to protect against fraud, illegal activity, or
                to otherwise protect Firn against liability. In Connection with
                a Corporate Transaction. In the event of a transaction or
                proposed transaction involving the transfer of substantially all
                of the assets of Firn or one or more of its businesses to
                another entity, whether an affiliate or a third party, or in
                connection with a bankruptcy, we may share your Personal
                Information in the diligence process or to otherwise facilitate
                the transaction, and with individuals assisting in the
                transaction or in connection with a bankruptcy. Your Personal
                Information may also be one of the transferred assets as part of
                the transaction or bankruptcy. For Safety & Security. We may
                reveal your Personal Information to third parties, including law
                enforcement agencies, in order to protect the safety and
                security of our employees and employees of our affiliates, users
                or of any third party. Feedback, Questionnaires and Surveys Our
                Site may allow site visitors and Investors to participate in
                surveys and questionnaires, which from time to time we may post
                on the Site. We also encourage our users to provide feedback to
                us about our Site and our Services. You are free to choose
                whether you participate in these activities. We may ask that, in
                addition to providing your responses, you also provide us with
                your contact information. In these instances, we use any
                Personal Information you choose to provide to us in connection
                with these activities for the purposes for which you submit the
                information. We aggregate information derived from survey and
                questionnaire information – with your Personal Information
                removed – for monitoring or improving the use and appeal of this
                Site (with no other obligation to you and, specifically, with no
                obligation to compensate you for these uses). You are not
                obligated to participate in any of these activities. Links to
                Other Sites This privacy statement applies only to Personal
                Information collected by our Site. Our Site contains links to
                other sites that are not owned or controlled by Firn. Firn is
                not responsible for the privacy practices of such other sites,
                and we encourage you to be aware when you leave our Site and to
                read the privacy statements of each and every web site that
                collects Personal Information. Data Security We have put in
                place commercially-reasonable security systems intended to
                prevent unauthorized access to or disclosure of Personal
                Information, and we take reasonable steps to secure and
                safeguard this Personal Information against loss, theft, and
                unauthorized use, disclosure, or modification. With that said,
                there is no such thing as 100% security of the networks,
                servers, and databases we operate or that are operated on our
                behalf. For example, email sent to or from the Site may not be
                secure. Before submitting any Personal Information via the Site,
                please be aware of these inherent risks and understand that you
                do so at your own risk. Data Retention We keep your Personal
                Information for as long as reasonably necessary for the purposes
                described in this Privacy Policy, while we have a legitimate
                business need to do so in connection with your account, or as
                required by law (e.g., for tax, legal, accounting or other
                purposes), whichever is longer. Your Choices In general, you may
                browse the Site without providing Personal Information. However,
                if you choose not to provide certain Personal Information
                through our Site, we may not be able to provide certain services
                or process certain of your requests. You will not be able to
                become an Investor or use all of the features and products that
                we offer through this Site. Depending on the functionality
                associated with the Site feature you are using, you may be able
                to update or delete certain of your Personal Information on the
                Site. Accordingly, at your request, we will take reasonable
                steps to remove your Personal Information from our databases.
                However, please note that: we may not be permitted to delete
                your Personal Information completely, due to IRS and regulatory
                reporting requirements, investments on the platform and the
                rights thereof, and data backups and records of deletions; if
                you request deletion of your Personal Information, you may be
                unable to use certain features of the Site and any associated
                Services; certain of your Personal Information may remain in our
                databases following the deletion of your account; and, we may
                not be able to remove de-identified, anonymous, or aggregate
                data from our databases. Any deletion requests may be sent to
                info@firninvestments.com. Opt out of marketing communications.
                If you no longer wish to receive marketing emails from us, you
                can opt out of these communications by clicking on the
                “unsubscribe” link included in those emails, or by contacting us
                at info@firninvestments.com. Please understand that you will not
                be allowed to opt-out of transactional notices or other legal
                and related notices concerning your relationship to the Site or
                your account. Online tracking opt-out. There are a number of
                ways to opt out of having online activity and device data
                collected through our Services, which we have summarized below:
                Blocking browser cookies. Most browsers let users remove or
                reject cookies, including cookies used for interest-based
                advertising. To do this, follow the instructions in the browser
                settings. Many browsers accept cookies by default until users
                change their settings. For more information about cookies,
                including how to see what cookies and other technologies have
                been set on a device and how to manage and delete them, visit
                allaboutcookies.org or http://preferences-mgr.truste.com. Use
                the following links to learn more about how to control cookies
                and online tracking through the following browsers: Firefox;
                Chrome; Microsoft Edge; and Safari. Blocking advertising ID use
                in mobile settings. Mobile device settings may provide
                functionality to limit use of the advertising ID associated with
                the mobile device for interest-based advertising purposes. Using
                privacy plug-ins or browsers. Another way to block our Services
                from setting cookies used for interest-based ads is by using a
                browser with privacy features, like Brave, or installing browser
                plugins like Privacy Badger, DuckDuckGo, Ghostery, or uBlock
                Origin, and configuring them to block third party
                cookies/trackers. You can also install a browser add-on to opt
                out of Google Analytics. Platform opt-outs. The following
                advertising partners offer features to control the use of
                Personal Information for interest-based advertising: Google;
                Twitter; Facebook; and Microsoft. Advertising industry opt-out
                tools. The following opt-out options also limit use of
                information for interest-based advertising by participating
                companies: Digital Advertising Alliance for Websites; Digital
                Advertising Alliance for Mobile Apps; and Network Advertising
                Initiative. Note that, because these opt-out mechanisms are
                specific to the device or browser on which they are exercised,
                they will need to be separately configured on every browser and
                device that accesses the Services. Children’s Privacy Our Site
                is not directed to children under the age of 18. We do not
                knowingly seek to collect or maintain Personal Information or
                other information from children under the age of 18. We will use
                commercially reasonable efforts to delete any Personal
                Information or other information later determined to be provided
                by a child under the age of 18. Use of the Site by children
                under the age of 18 is not permitted. If you become aware that a
                minor has provided Personal Information through our Site, please
                email us at info@firninvestments.com. Changes to This Privacy
                Policy We reserve the right to alter, modify, update, add to,
                subtract from or otherwise change this Privacy Policy at any
                time, which will become effective as of posting on the Site. We
                encourage you to periodically review this Privacy Policy to stay
                informed about how we collect, use, and share Personal
                Information. Additional Notice to California Residents We are
                required by the California Consumer Privacy Act of 2018 (“CCPA”)
                to provide this CCPA notice (“CCPA Notice”) to California
                residents to explain how we collect, use, and share their
                Personal Information, and the rights and choices we offer
                California residents regarding our handling of their Personal
                Information. CCPA Scope And Exclusions. This CCPA Notice,
                including the description of our privacy practices and
                California residents’ privacy rights, apply only to California
                residents whose interactions with us are limited to: visiting
                our consumer websites; signing up for email alerts; and applying
                for our job openings on our websites (however, note that the
                CCPA limits some of the privacy rights for job applicants). This
                CCPA Notice does not apply to the Personal Information we
                collect, use, or disclose about: consumers who initiate or
                complete the process of becoming an investor through Firn. This
                is because this information is subject to the federal
                Gramm-Leach-Bliley Act and implementing regulations, or the
                California Financial Information Privacy Act (for additional
                information relating to your choices about this information
                specifically, see the GLBA Appendix at the end of this Privacy
                Policy); or representatives of businesses that seek to obtain
                our products or services, or to provide products or services to
                us. Privacy Rights. The CCPA grants California residents the
                following rights: Information. California residents can request
                information about how we have collected, used and shared their
                Personal Information during the past 12 months. We have made
                this information available to California residents without
                having to request it by including it in this Privacy Policy.
                Access. California residents can request a copy of the Personal
                Information that we maintain about them. Deletion. California
                residents can ask us to delete the Personal Information that we
                collected or maintain about them. Opt out of sale of Personal
                Information. We do not sell Personal Information. Like many
                businesses, we use services that display interest-based ads to
                users around the web. We offer instructions on how to limit
                online tracking in the “Your Choices” section above. Please note
                that the CCPA limits these rights by, for example, prohibiting
                us from providing certain sensitive information in response to
                an access request and limiting the circumstances in which we
                must comply with a deletion request. We will also respond to
                requests for information and access only to the extent we are
                able to associate with a reasonable effort the information we
                maintain with the identifying details in a request. If we deny a
                request, we will communicate our decision to the requester.
                California residents are entitled to exercise the rights
                described above free from discrimination. How California
                Residents Can Submit A Request. California residents may submit
                a request for information, access, or deletion, by contacting us
                at info@firninvestments.com or at the mailing address in the
                “Contact Us” section of this Privacy Policy. To opt out of the
                sale of Personal Information we offer California residents
                instructions on how to limit online tracking in the “Your
                Choices” section above. Extension. We will make an effort to
                fulfill verified requests within 45 days of receipt. However,
                the period for responding to verified request may be extended,
                based on the complexity and the number of requests received. If
                this extension is required, we will communicate the extension
                and the reason(s) for the delay within 45 days of receiving the
                request. Identity Verification. We will need to confirm the
                identity of the requester and their California residency in
                order to process requests to exercise the above rights. We
                cannot process requests if we are not provided with sufficient
                detail to allow us to understand and respond to it. Authorized
                Agents. California residents can empower an “authorized agent”
                to submit requests on their behalf. We will require the
                authorized agent to have a written authorization confirming that
                authority. “Shine the Light” Law California law permits users
                who are California residents to request and obtain from us once
                a year, free of charge, a list of the third parties to whom we
                have disclosed their Personal Information (if any) for such
                third parties’ direct marketing purposes in the prior calendar
                year, as well as the type of Personal Information disclosed to
                those parties. However, Firn does not share your Personal
                Information with third parties for their direct marketing
                purposes. How We Respond to “Do Not Track” Signals Our Site
                currently does not respond to “Do Not Track” (DNT) signals and
                operates as described in this Privacy Policy whether or not a
                DNT signal is received. If we do so in the future, we will
                describe how we do so in this Privacy Policy. Contact Us If you
                have any questions about this Privacy Policy, the practices of
                our Site or Services, or your dealings with our Site or
                Services, please contact us at: info@firninvestments.com. GLBA
                Privacy Notice Rev. 10/25/2022 FACTS WHAT DOES FIRN, INC.
                (“FIRN”) DO WITH YOUR PERSONAL INFORMATION? Why? Financial
                companies choose how they share your personal information.
                Federal law gives consumers the right to limit some but not all
                sharing. Federal law also requires us to tell you how we
                collect, share, and protect your personal information. Please
                read this notice carefully to understand what we do. What? The
                types of personal information we collect and share depend on the
                product or service you have with us. This information can
                include: Social Security number and income Investment experience
                and assets Account transactions and checking account information
                When you are no longer our customer, we continue to share your
                information as described in this notice. How? All financial
                companies need to share customers' personal information to run
                their everyday business. In the section below, we list the
                reasons financial companies can share their customers' personal
                information; the reasons Firn chooses to share; and whether you
                can limit this sharing. Reasons we can share your personal
                information Does Firn share? Can you limit this sharing? For our
                everyday business purposes— such as to process your
                transactions, maintain your account(s), respond to court orders
                and legal investigations, or report to credit bureaus Yes No For
                our marketing purposes— to offer our products and services to
                you Yes No For joint marketing with other financial companies No
                We don’t share For our affiliates' everyday business
                purposes—Information about your transactions and experiences Yes
                No For our affiliates' everyday business purposes — information
                about your creditworthiness No We don’t share For our affiliates
                to market to you No We don’t share For nonaffiliates to market
                to you No We don’t share Questions? Email at
                info@firninvestments.com or to go www.firninvestments.com. Page
                2 Who we are Who is providing this notice? This notice is being
                provided on behalf of Firn, Inc. and its affiliated companies.
                What we do How does Firn protect my personal information? To
                protect your personal information from unauthorized access and
                use, we use security measures that comply with federal law.
                These measures include computer safeguards and secured files and
                buildings. How does Firn collect my personal information? We
                collect your personal information, for example, when you Open an
                account Give us your contact information Provide account
                information Show your government-issued ID Buy securities from
                us Give us your income information Tell us about your investment
                or retirement portfolio We also collect your personal
                information from others, such as credit bureaus, affiliates, or
                other companies. Why can’t I limit all sharing? Federal law
                gives you the right to limit only sharing for affiliates'
                everyday business purposes— information about your
                creditworthiness affiliates from using your information to
                market to you sharing for nonaffiliates to market to you State
                laws and individual companies may give you additional rights to
                limit sharing. See below for more on your rights under state
                law. Definitions Affiliates Companies related by common
                ownership or control. They can be financial and nonfinancial
                companies. They may include companies with a Firn branded name.
                Nonaffiliates Companies not related by common ownership or
                control. They can be financial and nonfinancial companies. Firn
                does not share with nonaffiliates so they can market to you.
                Joint marketing A formal agreement between nonaffiliated
                financial companies that together market financial products or
                services to you. Firn does not currently jointly market. Other
                important information California Residents Only: Under
                California law, we will not share information we collect about
                you with nonaffiliates unless the law allows. For example, we
                may share information with your consent, to service your
                accounts. We will limit sharing among our affiliates to the
                extent required by California law.
              </Text>
            </KeyboardAwareScrollView>
            <Button
              onPress={() => {
                scrollViewRefForPrivacy.current.scrollToEnd({animated: true});
              }}
              style={[styles.scrollToBottomButton, styles.text]}
              title1="Scroll to the bottom"
              loading={SignupResponse.isLoading}
            />
          </>
        </Modal>

        <Modal
          visible={openTermsModal}
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
              containerStyle={styles.headerContainerStyleTerms}
              backgroundColor={styles.headerColor}
              statusbar={styles.statusBar}
              rightComponent={
                <TouchableOpacity
                  onPress={() => {
                    setOpenTermsModal(false);
                  }}>
                  <MaterialIcons
                    name={'close'}
                    size={wp(6)}
                    color={'black'}
                    onPress={() => {
                      setOpenTermsModal(false);
                    }}
                  />
                </TouchableOpacity>
              }
              centerComponent={
                <View>
                  <Text style={styles.headerTextTermModal}>
                    Terms of service
                  </Text>
                </View>
              }
            />
            <KeyboardAwareScrollView
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true}
              ref={scrollViewRef}
              contentContainerStyle={styles.modalContainer}
              keyboardShouldPersistTaps="handled">
              <Text style={styles.boldTextModal}>
                Date of Last Revision: November 12,2022
              </Text>
              <Text>
                Firn, Inc. (“Firn,” “we,” “us,” “our”) provides its services
                (described below) to you through its website located at
                www.firninvestments.com (the “Site”) and through its mobile
                applications and related technology and services (collectively,
                such services, including any new features and applications, and
                the Site, the “Service”), subject to the following Terms of
                Service (as amended from time to time, the “Terms of Service”).
                We reserve the right, at our sole discretion, to change or
                modify portions of these Terms of Service at any time. If we do
                this, we will post the changes on this page and will indicate at
                the top of this page the date these terms were last revised. We
                will also notify you, either through the Service user interface,
                in an email notification or through other reasonable means. Any
                such changes will become effective no earlier than fourteen (14)
                days after they are posted, except that changes addressing new
                functions of the Service or changes made for legal reasons will
                be effective immediately. Your continued use of the Service
                after the date any such changes become effective constitutes
                your acceptance of the new Terms of Service.
                {'\n'}
                {'\n'}
                <Text style={styles.italicText}>
                  PLEASE READ THESE TERMS OF SERVICE CAREFULLY, AS THEY CONTAIN
                  AN AGREEMENT TO ARBITRATE AND OTHER IMPORTANT INFORMATION
                  REGARDING YOUR LEGAL RIGHTS, REMEDIES, AND OBLIGATIONS. THE
                  AGREEMENT TO ARBITRATE REQUIRES (WITH LIMITED EXCEPTION) THAT
                  YOU SUBMIT CLAIMS YOU HAVE AGAINST US TO BINDING AND FINAL
                  ARBITRATION, AND FURTHER (1) YOU WILL ONLY BE PERMITTED TO
                  PURSUE CLAIMS AGAINST FIRN ON AN INDIVIDUAL BASIS, NOT AS A
                  PLAINTIFF OR CLASS MEMBER IN ANY CLASS OR REPRESENTATIVE
                  ACTION OR PROCEEDING, (2) YOU WILL ONLY BE PERMITTED TO SEEK
                  RELIEF (INCLUDING MONETARY, INJUNCTIVE, AND DECLARATORY
                  RELIEF) ON AN INDIVIDUAL BASIS, AND (3) YOU MAY NOT BE ABLE TO
                  HAVE ANY CLAIMS YOU HAVE AGAINST US RESOLVED BY A JURY OR IN A
                  COURT OF LAW.
                </Text>
                {'\n'}
                {'\n'} In addition, when using certain services, you will be
                subject to any additional terms applicable to such services that
                may be posted on the Service from time to time, including,
                without limitation, the Privacy Policy (the “Privacy Policy”).
                All such terms are hereby incorporated by reference into these
                Terms of Service.{'\n'}
                {'\n'}
                <Text style={styles.withUnderlineText}>
                  Disclosures{'\n'}
                  {'\n'}
                </Text>
                <Text style={styles.boldText}>
                  Forward-Looking Statements:{' '}
                </Text>
                By using the Service, you explicitly acknowledge that it is a
                demonstration, or “demo,” that in no way creates a binding
                contract. Nothing on Firn’s Website or in this Service should be
                construed as a sale of a security, financial advice, legal
                advice, or solicitation for investment. Any estimated,
                projected, or historical information is fictitious and
                illustrative in nature and may not represent future results. Any
                resemblance to real projects, corporations, entities, or people
                is purely coincidental. Other statements on the Service are also
                forward-looking and illustrative in nature; they neither convey
                an offer for contract nor shall be construed to imply an offer
                for contract or sale of goods or services. {'\n'}
                {'\n'}
                <Text style={styles.boldText}>Investment Disclosures: </Text>
                All investing carries risk. Any subscriber who signs up to
                invest through the Firn platform may experience different
                returns from examples and projections provided on the Website or
                the Service. You should not make investment decisions based
                solely on the information, charts, or data contained herein. The
                Service contains projections and forward-looking statements that
                are based on our beliefs, assumptions, and information currently
                available to us.
                {'\n'}
                {'\n'}
                <Text style={styles.boldText}>Registration Disclosures: </Text>
                Firn is not currently a registered broker-dealer, investment
                adviser, or crowdfunding portal and does not currently engage in
                any activities requiring any such registration. The information
                contained on the Service is provided for informational and
                discussion purposes only and is not intended to be a
                recommendation to invest in, or purchase, sell, or hold, any
                securities, or to engage in any type of transaction. Any such
                offers will only be made pursuant to formal offering materials
                containing full details regarding risks, investment terms, and
                fees. {'\n'}
                {'\n'}{' '}
                <Text style={styles.withUnderlineText}>
                  Access and Use of the Service
                </Text>
                {'\n'}
                {'\n'}
                <Text style={styles.boldText}>Service Description: </Text>
                Firn provides online and mobile tools to assist potential
                investors to give access to the investment class of private (or
                off-market) clean energy projects and related assets. The
                Service allows investors to diversify their portfolios across a
                hand-picked selection of clean energy investment opportunities
                thereby allowing investors to unlock new and exciting
                opportunities for portfolio growth. {'\n'}
                {'\n'}{' '}
                <Text style={styles.boldText}>
                  Your Registration Obligations:{' '}
                </Text>{' '}
                You may be required to register with Firn in order to access and
                use certain features of the Service. If you choose to register
                for the Service, you agree to provide and maintain true,
                accurate, current and complete information about yourself as
                prompted by the Service’s registration form. Registration data
                and certain other information about you are governed by the
                Privacy Policy. If you are under 18 years of age, you are not
                authorized to use the Service, with or without registering.
                {'\n'}
                {'\n'}{' '}
                <Text style={styles.boldText}>
                  Member Account, Password and Security:
                </Text>{' '}
                You are responsible for maintaining the confidentiality of your
                password and account, if any, and are fully responsible for any
                and all activities that occur under your password or account.
                You agree to (a) immediately notify Firn of any unauthorized use
                of your password or account or any other breach of security, and
                (b) ensure that you exit from your account at the end of each
                session when accessing the Service. Firn will not be liable for
                any loss or damage arising from your failure to comply with this
                Section.
                {'\n'}
                {'\n'}{' '}
                <Text style={styles.boldText}>Modifications to Service:</Text>{' '}
                Firn reserves the right to modify or discontinue, temporarily or
                permanently, the Service (or any part thereof) with or without
                notice. You agree that Firn will not be liable to you or to any
                third party for any modification, suspension or discontinuance
                of the Service.
                {'\n'}
                {'\n'}{' '}
                <Text style={styles.boldText}>
                  General Practices Regarding Use and Storage:
                </Text>{' '}
                You acknowledge that Firn may establish general practices and
                limits concerning use of the Service, including without
                limitation the maximum period of time that data or other content
                will be retained by the Service and the maximum storage space
                that will be allotted on Firn’s servers on your behalf. You
                agree that Firn has no responsibility or liability for the
                deletion or failure to store any data or other content
                maintained or uploaded by the Service. You acknowledge that Firn
                reserves the right to terminate accounts that are inactive for
                an extended period of time. You further acknowledge that Firn
                reserves the right to change these general practices and limits
                at any time, in its sole discretion, with or without notice.{' '}
                {'\n'}
                {'\n'} <Text style={styles.boldText}>Mobile Services:</Text> The
                Service includes certain services that are available via a
                mobile device, including (i) the ability to monitor and make
                adjustments to your investment portfolio, (ii) the ability to
                browse the Service from a mobile device and (iii) the ability to
                access certain features through a mobile application downloaded
                and installed on a mobile device (such application, the
                “Application”, and such services collectively, the “Mobile
                Services”). To the extent you access the Service through a
                mobile device, your wireless service carrier’s standard charges,
                data rates and other fees may apply. In addition, downloading,
                installing, or using certain Mobile Services may be prohibited
                or restricted by your carrier, and not all Mobile Services may
                work with all carriers or devices. In the event you change or
                deactivate your mobile telephone number, you agree to promptly
                update your Firn account information to ensure that your
                messages are not sent to the person that acquires your old
                number. {'\n'}
                {'\n'} <Text style={styles.boldText}>License:</Text>Subject to
                the Terms of Service, Firn hereby grants to you a limited,
                revocable, non-exclusive, non-transferable, non-sublicensable
                license to (a) install the Application on one mobile device and
                (b) use the Application for your own personal use. For clarity,
                the foregoing is not intended to prohibit you from installing
                the Application for another device on which you also agreed to
                the Terms of Service. Each instance of the Terms of Service that
                you agree to grants you the aforementioned rights in connection
                with the installation and use of the Application on one device.{' '}
                {'\n'}
                {'\n'} <Text style={styles.boldText}>Open Source:</Text> The
                Application may contain or be provided together with open source
                software. Each item of open source software is subject to its
                own applicable license terms, which can be found at
                Firn.com/open-source and/or in the Application documentation or
                the applicable help, notices, about or source files. Copyrights
                to the open source software are held by the respective copyright
                holders indicated therein.
              </Text>
            </KeyboardAwareScrollView>
            <Button
              onPress={() => {
                scrollViewRef.current.scrollToEnd({animated: true});
              }}
              style={[styles.scrollToBottomButton, styles.text]}
              title1="Scroll to the bottom"
              loading={SignupResponse.isLoading}
            />
          </>
        </Modal>
      </KeyboardAwareScrollView>
    </View>
  );
}

export default CreateAccount;
