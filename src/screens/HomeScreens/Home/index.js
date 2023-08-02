import {Formik} from 'formik';
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Modal from 'react-native-modal';
import Snackbar from 'react-native-snackbar';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';
import * as yup from 'yup';
import FirnSvg from '../../../../assets/icons/FIRN.svg';
import Solar from '../../../../assets/icons/Solar.svg';
import SolarInactive from '../../../../assets/icons/SolarInactive.svg';
import Storage from '../../../../assets/icons/Storage.svg';
import StorageInactive from '../../../../assets/icons/StorageInactive.svg';
import Wind from '../../../../assets/icons/Wind.svg';
import WindInactive from '../../../../assets/icons/WindInactive.svg';
import BarChartComponent from '../../../components/BarChartComponent';
import Button from '../../../components/CustomButton';
import CustomInputField from '../../../components/CustomInputField';
import Text from '../../../components/CustomText';
import TopBar from '../../../components/CustomTopBar';
import Header from '../../../components/LoggedInHeader';
import ProjectsCard from '../../../components/ProjectsCard';
import RowComponent from '../../../components/RowComponent';
import {baseUrl} from '../../../constants';
import {
  get_all_companies,
  get_companies,
  get_graphs,
  invest_company,
} from '../../../services/api-config';
import {usePostApiMutation} from '../../../services/service';
import {useThemeAwareObject} from '../../../theme/index';
import {hp, wp} from '../../../util/index';
import createStyles from './styles';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function Home({navigation}) {
  const styles = useThemeAwareObject(createStyles);
  const [allTabs, setAllTabs] = useState([]);
  const [selectedTab, setSelectedTab] = useState('Solar');
  const token = useSelector(state => state.user.token);
  const [barGraphData, setBarGraphData] = useState();
  const [company, setCompany] = useState();
  const [companyCall, companyResponse] = usePostApiMutation();
  const [graphCall, graphResponse] = usePostApiMutation();
  const [barGraphIndex, setGraphIndex] = useState('1');
  const [graphValue, setGraphValue] = useState();
  const [currentGraphIndex, setCurrentGraphIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(1);
  const flatlistRef = useRef();
  const [openModal, setOpenModal] = useState(false);
  const [faqId, setFaqId] = useState('');
  const [openPurchaseModal, setOpenPurchase] = useState(false);
  const [openSuccessModal, setOpenSuccess] = useState(false);
  const [amount, setAmount] = useState('');
  const [openProjectCards, setOpenProjectCards] = useState([]);
  const [investCall, investResponse] = usePostApiMutation();
  const [hideHeader, setHideHeader] = useState(true);
  const keys = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '',
    '0',
    <FeatherIcon name="delete" size={styles.iconSize} />,
  ];

  const validationSchema = yup.object().shape({
    amount: yup
      .string('Amount')
      .required('Amount is required')
      .matches(/^[^,-.]*$/, {
        message: 'No symbols',
      })
      .test('amount', 'Amount should be between 100 and 75000000', value => {
        return validateAmount(parseFloat(value));
      }),
  });

  const validateAmount = amount => {
    return yup
      .number('is not a number')
      .integer('is not an integer')
      .positive('is not positive')
      .test(amount => {
        return amount && amount > 99 && amount < 75000001 ? true : false;
      })
      .isValidSync(amount);
  };

  async function getAllCompaniesApi() {
    let apiData = {
      url: get_all_companies,
      method: 'GET',
      token: token,
    };
    try {
      let apiResponse = await companyCall(apiData).unwrap();
      if (apiResponse.status == 200) {
        setAllTabs(apiResponse.data.data);
        getSelectedCompanyApi(apiResponse.data.data[1].id);
      } else {
        Snackbar.show({
          text: apiResponse?.Message,
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    } catch (e) {
      Snackbar.show({
        text: 'Network Error',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  }
  async function getSelectedCompanyApi(id) {
    let apiData = {
      url: get_companies + id,
      method: 'GET',
      token: token,
    };
    try {
      let apiResponse = await companyCall(apiData).unwrap();
      if (apiResponse.status == 200) {
        setCompany(apiResponse.data);
      } else {
        Snackbar.show({
          text: apiResponse?.Message,
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    } catch (e) {
      Snackbar.show({
        text: 'Network Error',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  }
  function getCurrentMonth() {
    const today = new Date();
    return months[today.getMonth()];
  }

  function getCurrentYear() {
    const currentYear = new Date().getFullYear();

    return currentYear;
  }

  async function getGraphsApi(companyId, bgIndex) {
    let apiData = {
      url: get_graphs + 'company_id=' + companyId + '&key=' + bgIndex,
      method: 'GET',
      token: token,
    };
    try {
      let apiResponse = await graphCall(apiData).unwrap();
      if (apiResponse.status == 200) {
        if (apiResponse?.data?.investment.length > 0) {
          if (bgIndex < 2) {
            let graphIndex = apiResponse.data.month.findIndex(
              item => item == getCurrentMonth(),
            );
            setGraphValue(apiResponse?.data?.investment[graphIndex]);

            setCurrentGraphIndex(graphIndex + 1);
          } else {
            let graphIndex = apiResponse.data.month.findIndex(
              item => item == getCurrentYear(),
            );
            setGraphValue(apiResponse?.data?.investment[graphIndex]);

            setCurrentGraphIndex(graphIndex + 1);
          }
        }
        setGraphIndex(bgIndex);
        setBarGraphData(apiResponse?.data);
      } else {
        Snackbar.show({
          text: apiResponse?.Message,
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    } catch (e) {
      Snackbar.show({
        text: 'Network Error',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  }

  const renderEmptyProjects = () => {
    return (
      <View style={styles.emptyListStyle}>
        <Text style={styles.emptyMessageStyle}>No projects available</Text>
      </View>
    );
  };

  useEffect(() => {
    if (allTabs.length) {
      setTimeout(() => {
        flatlistRef?.current?.scrollToIndex({
          animated: true,
          index: currentIndex,
          behavior: 'smooth',
        });
      }, 1000);
    }
  }, [allTabs]);

  useEffect(() => {
    getAllCompaniesApi();
    getGraphsApi(2, 1);
  }, []);

  const investApi = async values => {
    let data = {
      company_id: company?.company?.id,
      amount: parseFloat(amount),
    };
    let apiData = {
      url: invest_company,
      method: 'POST',
      data: data,
      token: token,
    };

    console.log('apiData', apiData);
    try {
      let apiResponse = await investCall(apiData).unwrap();
      if (apiResponse.status == 200) {
        setOpenPurchase(false);
        setAmount('');
        setOpenSuccess(true);
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
  let solarMonths = barGraphData?.month.map(string => string.slice(0, 3));
  const barChartData = {
    labels: solarMonths,
    datasets: [
      {
        barThickness: 0.5,
        maxBarThickness: 0.5,
        minBarLength: 2,

        // data: barGraphData?.investment,
        data: [100, 50, 400, 300, 200, 600, 500, 1100, 900, 1450, 1300, 1400],
        colors: [
          (opacity = 1) => `#D9DCE7`, // optional
          (opacity = 1) => `#D9DCE7`,
          (opacity = 1) => `#D9DCE7`,
          (opacity = 1) => `#D9DCE7`,
          (opacity = 1) => `#D9DCE7`,
          (opacity = 1) => `#D9DCE7`,
          (opacity = 1) => `#D9DCE7`,
          (opacity = 1) => `#D9DCE7`,
          (opacity = 1) => `#D9DCE7`,
          (opacity = 1) => `#B4BACF`,
          (opacity = 1) => `#B4BACF`,
          (opacity = 1) => `#B4BACF`,
        ],
      },
    ],
  };

  const BarChartConfig = {
    labelColor: (opacity = 1) => `#333`,
    backgroundColor: '#F7F6FA',
    backgroundGradientFrom: '#F7F6FA',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#F7F6FA',
    backgroundGradientToOpacity: hp(15),
    color: () => '#F7F6FA', // THIS
    barPercentage: 0.5,
    // decimalPlaces: 2,
    fillShadowGradient: '#2E78A8', // THIS
    fillShadowGradientOpacity: 3, // THIS
    decimalPlaces: 0,
    propsForLabels: {
      fontFamily: 'Sora-SemiBold',
    },
  };

  const onChangeTab = (item, index) => {
    setFaqId('');
    let tab = item.name.split(' ')[0];
    setSelectedTab(tab);
    setCurrentIndex(index);
    setGraphIndex(1);
    setGraphValue(0);
    getSelectedCompanyApi(item.id);
    getGraphsApi(item.id, 1);
    setOpenProjectCards([]);
  };
  const getItemLayout = (data, index) => {
    return {length: wp(100), offset: wp(100) * index, index};
  };

  return (
    <>
      <View style={styles.mainContainer}>
        <KeyboardAwareScrollView
          style={{height: hp(0)}}
          stickyHeaderIndices={[1]}
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}>
          <Header
            placement={'center'}
            barStyle={'dark-content'}
            containerStyle={styles.headerContainerStyle}
            backgroundColor={styles.headerColor}
            statusbar={styles.statusBar}
            centerComponent={<FirnSvg />}
            rightComponent={
              <TouchableOpacity onPress={() => setOpenModal(true)}>
                <Image
                  source={require('../../../../assets/images/QuestionMarkCircular.png')}
                  style={styles.questionMarkImg}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            }
          />
          <View>
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.topBar}
              data={allTabs}
              renderItem={({item, index}) => (
                <TopBar
                  style={styles.selectedTab}
                  textStyle={[
                    index === currentIndex
                      ? styles.selectedText
                      : styles.UnSelectedText,
                  ]}
                  selectedText={index === currentIndex && styles.underlineText}
                  barText={item.name.split(' ')[0]}
                  barImage={
                    index === currentIndex ? (
                      index === 0 ? (
                        <Solar />
                      ) : index === 1 ? (
                        <Wind />
                      ) : (
                        <Storage />
                      )
                    ) : index === 0 ? (
                      <SolarInactive />
                    ) : index === 1 ? (
                      <WindInactive />
                    ) : (
                      <StorageInactive />
                    )
                  }
                  onPress={() => {
                    onChangeTab(item, index);
                    let tab = item.name.split(' ')[0];
                    setSelectedTab(tab);
                    setCurrentIndex(index);
                    flatlistRef.current.scrollToIndex({
                      animated: true,
                      index: index,
                      behavior: 'smooth',
                    });
                    setGraphIndex(1);
                    setGraphValue(0);
                    getSelectedCompanyApi(item.id);
                    getGraphsApi(item.id, 1);
                  }}
                />
              )}
            />
          </View>
          <FlatList
            pagingEnabled
            bounces={false}
            data={allTabs}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            ref={flatlistRef}
            nestedScrollEnabled={true}
            initialScrollIndex={1}
            getItemLayout={getItemLayout}
            onMomentumScrollEnd={event => {
              const index = Math.floor(
                Math.floor(event.nativeEvent.contentOffset.x) /
                  Math.floor(event.nativeEvent.layoutMeasurement.width),
              );
              if (index != currentIndex) {
                setCurrentIndex(index);
                setFaqId('');
                let data = allTabs.find((item, i) => i == index);
                setGraphIndex(1);
                setGraphValue(0);
                getSelectedCompanyApi(data.id);
                getGraphsApi(data.id, 1);
                setOpenProjectCards([]);
              }
            }}
            renderItem={({item, index}) => (
              <>
                <View
                  style={{
                    width: wp(100),
                    justifyContent: 'flex-start',
                  }}
                  showsVerticalScrollIndicator={false}>
                  {companyResponse.isLoading ? (
                    <ActivityIndicator
                      color="black"
                      style={styles.activityStyle}
                    />
                  ) : (
                    <>
                      <View
                        style={{
                          height: hp(20),
                        }}>
                        <Image
                          source={{uri: baseUrl.base + item?.cover_image}}
                          style={{
                            flex: 1,
                          }}
                          resizeMode="cover"
                        />
                      </View>
                      <View style={{paddingLeft: wp(1.5)}}>
                        <Text style={styles.overviewText}>Overview </Text>

                        <RowComponent
                          title1={item?.return_rate}
                          title2={item?.Co2e_annual_offset}
                          title3={item?.energy_gen}
                          subTitle1="RETURN (IRR)"
                          subTitle2="CO₂e OFFSET / YR"
                          subTitle3="SIZE"
                        />

                        <Text numberOfLines={10} style={styles.descriptionText}>
                          {item?.description}
                        </Text>
                        <Text style={styles.holdingsText}>Projected </Text>
                        <Text style={styles.graphTitle}>
                          {index == 0
                            ? '$46,622,413'
                            : index == 1
                            ? '$251,940,025'
                            : index == 2
                            ? '$10,005,423'
                            : null}
                          {/* {graphValue ? '$' + Math.trunc(graphValue) : '$' + 0} */}
                        </Text>
                        <Text style={styles.graphSubText}>
                          +7% over Last Quarter
                        </Text>

                        {/* Solar Bar Graph */}

                        {graphResponse.isLoading ? (
                          <ActivityIndicator
                            color="black"
                            style={styles.activityStyle}
                          />
                        ) : barGraphData ? (
                          <BarChartComponent
                            onDataPointClick={data => {
                              setGraphValue(data.value);
                              setCurrentGraphIndex(data.index + 1);
                            }}
                            barChartData={barChartData}
                            chartConfig={BarChartConfig}
                          />
                        ) : (
                          <Text style={styles.errorText}>
                            No historical stack available
                          </Text>
                        )}

                        <Text style={styles.holdingsText}>
                          Holdings ({company?.company?.projects?.length}){' '}
                        </Text>

                        {company?.company?.projects?.map(
                          item =>
                            item && (
                              <ProjectsCard
                                item={item}
                                img={baseUrl.base + item?.image}
                                name={item?.name}
                                location={item?.location}
                                projectedValue={item?.amount}
                                onPressAdd={() => {
                                  let updatedCards = [...openProjectCards];
                                  if (openProjectCards.includes(item.id)) {
                                    updatedCards = openProjectCards.filter(
                                      el => el != item.id,
                                    );
                                  } else {
                                    updatedCards.push(item.id);
                                  }
                                  setOpenProjectCards(updatedCards);
                                }}
                                openCard={openProjectCards.includes(item.id)}
                                carbon_offset={
                                  item?.carbon_offset?.split(' ')[0]
                                }
                                irr={item?.irr?.split(' ')[0]}
                                size={item?.size?.split(' ')[0]}
                                contributation={
                                  item?.contributation?.split(' ')[0]
                                }
                              />
                            ),
                        )}

                        <Text style={styles.holdingsText}>
                          Investing with Firn{' '}
                        </Text>
                        <Text style={styles.ecoFundText}>Why ecoFunds?</Text>
                        <Text style={styles.descriptionText}>
                          When you invest in Firn’s ecoFunds, you are investing
                          in sustainable infrastructure and projects, including
                          solar arrays, wind farms, energy efficiency retrofits,
                          electric vehicle charging stations, battery storage,
                          and more. Those assets earn steady rates of return,
                          and are also uncorrelated with the stock market.
                          Therefore, ecoFunds can help lower volatility and
                          improve diversification in one’s portfolio.
                        </Text>
                        <Text style={styles.ecoFundText}>
                          Climate paradigm shift
                        </Text>
                        <Text style={styles.descriptionText}>
                          Investing for the long-term forces all of us to
                          consider the effects of climate change: more droughts,
                          more floods, more famine. Physical risks beget social
                          risks, too: climate refugees and migrations, property
                          values dropping in low-lying coastal areas, and sudden
                          regulatory shifts. Simply investing in the stock
                          market leaves most people too exposed to those risks.
                          In contrast, Firn’s assets remain poised to grow in
                          value as the demand for clean energy, energy storage,
                          and energy efficiency grow in the coming years.
                        </Text>
                        <Text style={styles.ecoFundText}>
                          Conscious value investing
                        </Text>
                        <Text style={styles.descriptionText}>
                          For those who eschew investing in fossil fuels or
                          other heavy industries, it remains remarkably
                          difficult to avoid doing so, at least when one chooses
                          to invest through traditional avenues. For example,
                          many of the largest banks still lend money to oil and
                          gas companies, meaning one’s savings account likely
                          earns interest, in part, from dirty sources. Many
                          index funds–a staple of most 401(k) accounts–also
                          invest in oil and gas companies or utilities that own
                          and operate fossil fuel assets, such as coal-fired
                          power plants. Even those funds describing themselves
                          as “low carbon” occasionally still invest in oil and
                          gas companies. Firn, however, only invests in
                          sustainable infrastructure and gives you full
                          transparency to know exactly what you are investing
                          in. Firn enables you to track the carbon offsets
                          generated from your investments.
                        </Text>
                        <Text style={styles.holdingsText}>FAQs</Text>
                        {company?.faqs?.map((item, index) => (
                          <TouchableOpacity
                            style={styles.faqContainer}
                            onPress={() => {
                              setFaqId(item?.id);
                            }}
                            activeOpacity={item.id == faqId && 1}>
                            <View style={styles.rowContainer}>
                              <Text style={styles.faqTitle}>
                                {item?.faq_question}{' '}
                              </Text>
                              {item.id == faqId ? (
                                <TouchableOpacity onPress={() => setFaqId()}>
                                  <Image
                                    source={require('../../../../assets/images/HideFAQ.png')}
                                    style={{
                                      width: wp(5),
                                      height: wp(5),
                                      marginRight: wp(1.5),
                                    }}
                                    resizeMode="contain"
                                  />
                                </TouchableOpacity>
                              ) : (
                                <Image
                                  source={require('../../../../assets/images/AddFQA.png')}
                                  style={{
                                    width: wp(5),
                                    height: wp(5),
                                    marginRight: wp(1.5),
                                  }}
                                  resizeMode="contain"
                                />
                              )}
                            </View>
                            {item.id == faqId && (
                              <Text style={styles.faqAns}>
                                {item?.faq_answer}{' '}
                              </Text>
                            )}
                          </TouchableOpacity>
                        ))}
                      </View>
                    </>
                  )}
                </View>
              </>
            )}
          />
        </KeyboardAwareScrollView>
        {!companyResponse.isLoading && (
          <View style={styles.bottomContainer}>
            <Button
              onPress={() => {
                setOpenPurchase(true);
              }}
              style={[styles.investButton, styles.text]}
              title1="Invest in fund"
            />
          </View>
        )}
        {openModal && (
          <Modal
            visible={openModal}
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
                containerStyle={styles.headerContainerStyleHelp}
                backgroundColor={styles.headerColor}
                statusbar={styles.statusBar}
                rightComponent={
                  <TouchableOpacity
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
                  <View>
                    <Text style={styles.headerTextModal}>More information</Text>
                  </View>
                }
              />
              <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
                contentContainerStyle={styles.modalContainer}
                keyboardShouldPersistTaps="handled">
                <Image
                  source={require('../../../../assets/images/Help1.png')}
                  style={styles.modalImg}
                  resizeMode="contain"
                />
                <Text style={styles.modalSuText}>
                  Solar power is the most abundant source of energy on Earth.
                  Over 74,000 terawatts of energy strike the Earth’s surface
                  continuously, every single day. If we were able to harness
                  even a fraction of that energy, one hour of sunlight would be
                  equivalent to one year’s worth of energy for the planet. Solar
                  panels capture the sun’s energy and turn it into electricity.
                  When photons from the sun hit a solar panel’s photovoltaic
                  cell, the photons knock electrons loose. Those electrons flow
                  through a circuit to generate electricity.
                </Text>
                <Image
                  source={require('../../../../assets/images/Help2.png')}
                  style={styles.modalImg}
                  resizeMode="contain"
                />
                <Text style={styles.modalSuText}>
                  Wind power has been used by humans for millennia. When air
                  mass hits a wind turbine, it causes the turbine blades to
                  rotate. That spinning motion turns a generator inside the wind
                  turbine, which converts the kinetic energy of the blades’
                  rotation into electricity. Utility scale wind turbine blades
                  average 200 feet long, and the towers can be as high as 300
                  feet tall.{' '}
                </Text>
                <Image
                  source={require('../../../../assets/images/Help3.png')}
                  style={styles.modalImg}
                  resizeMode="contain"
                />
                <Text style={styles.modalSuText}>
                  Energy storage can refer to a number of technologies,
                  including batteries, pumped hydro, thermal storage, and
                  fly-wheels. Storage is key to unlocking the power of renewable
                  for the entire electric grid. When the sun is shining and the
                  wind is blowing, energy storage technologies like batteries or
                  pumped hydro can store any surplus energy the grid does not
                  use. Later on, when demand for electricity is higher, or
                  renewable energy sources are less productive, the grid can
                  call upon storage devices to discharge that clean energy back
                  onto the grid. Therefore, energy storage can mitigate the need
                  for firing up fossil fuel power plants during peak hours.
                </Text>
                <Image
                  source={require('../../../../assets/images/Help4.png')}
                  style={styles.modalImg}
                  resizeMode="contain"
                />
                <Text style={styles.boldTextModal}>Glossary</Text>

                <Text style={styles.modalSuText}>
                  <Text style={styles.modalSuTextFontBold}>
                    Carbon dioxide equivalent (CO₂e){'\n'}
                  </Text>
                  CO₂e refers to the metric tons of greenhouse gas emissions
                  with the same global warming potential (“GWP”) as one metric
                  ton of CO₂. For carbon dioxide, that ratio is one-to-one.
                  Other greenhouse gasses like methane (CH4) have shorter
                  half-lives in the atmosphere but trap more heat. Methane has a
                  GWP score of 25 compared to a score of 1 for carbon dioxide.
                  In other words, one ton of methane traps the same amount of
                  heat as 25 tons of carbon dioxide. CO₂e therefore allows
                  people to compare the impact of various projects apples to
                  apples.
                </Text>
                <Text style={styles.boldTextModal}>EV</Text>
                <Text style={styles.modalSuText}>
                  This abbreviation stands for “electric vehicle.”
                </Text>
                <Text style={styles.boldTextModal}>Greenhouse gas (GHG)</Text>
                <Text style={styles.modalSuText}>
                  Greenhouse gasses trap heat in our atmosphere. While carbon
                  dioxide is the predominant greenhouse gas, it is not the only
                  one. Methane, nitrous oxide, and fluorinated gasses like
                  hydrofluorocarbons, perfluorocarbons, sulfur hexafluoride, and
                  nitrogen trifluoride are other key greenhouse gasses. It is
                  important to note that GHGs are not the only substances that
                  trap heat. For example, soot from smokestacks–also known as
                  “black carbon”–can also warm the planet by lowering the
                  planet’s albedo.
                </Text>
                <Text style={styles.boldTextModal}>
                  Internal Rate of Return (IRR)
                </Text>
                <Text style={styles.modalSuText}>
                  The IRR of a project is the annual rate of growth that an
                  investment is expected to generate. The higher the project’s
                  IRR, the higher the projected returns.
                </Text>
                <Text style={styles.boldTextModal}>
                  Megawatts (MW) and megawatt-hours (MWh)
                </Text>
                <Text style={styles.modalSuText}>
                  A megawatt is a unit of power, equivalent to one million
                  watts. Clean energy projects often list their nameplate
                  capacity in MW, since that figure tells users about the rate
                  of power generation. The total energy created over time is
                  measured in MWh. If a solar array generates 1 MW of power for
                  one hour, it would have produced 1 MWh of energy.
                </Text>
                <Text style={styles.boldTextModal}>Metric Ton (MT)</Text>
                <Text style={styles.modalSuText}>
                  A metric ton is 2,204.6 lbs.
                </Text>
              </KeyboardAwareScrollView>
            </>
          </Modal>
        )}
        {openPurchaseModal && (
          <Modal
            visible={openPurchaseModal}
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
                containerStyle={styles.headerContainerStyleHelp}
                backgroundColor={styles.headerColor}
                statusbar={styles.statusBar}
                // contentContainerStyle={{flex: 0}}
                rightComponent={
                  <TouchableOpacity
                    onPress={() => {
                      setOpenPurchase(false);
                      setAmount('100');
                    }}>
                    <MaterialIcons
                      name={'close'}
                      size={wp(6)}
                      color={'black'}
                      onPress={() => {
                        setOpenPurchase(false);
                        setAmount('100');
                      }}
                    />
                  </TouchableOpacity>
                }
                centerComponent={
                  <View>
                    <Text style={styles.headerText}>
                      Invest in {company?.company.name}
                    </Text>
                  </View>
                }
              />
              <KeyboardAwareScrollView
                contentContainerStyle={styles.investModalContainer}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
                keyboardShouldPersistTaps="handled">
                <Formik
                  validationSchema={validationSchema}
                  initialValues={{amount: '100'}}
                  validateOnChange={false}
                  validateOnBlur={false}
                  onSubmit={values => {
                    investApi(values);
                  }}>
                  {({handleSubmit, values, errors, setFieldValue}) => (
                    <>
                      <View style={styles.inputContainer}>
                        {/* <CustomInputField
                          name="amount"
                          textStyle={styles.loginInputText}
                          style={styles.loginInputText}
                          inputContainerStyle={styles.inputContainerStyle}
                          containerStyle={styles.inputContainerStyle}
                          placeholder="$100"
                          numberOfLines={1}
                          maxLength={8}
                          value={
                            values.amount ? values.amount : '$' + values.amount
                          }
                          onChangeText={handleChange('amount')}
                          onBlur={handleBlur('amount')}
                          keyboardType={'number-pad'}
                        /> */}

                        <Text style={styles.loginInputText}>${amount}</Text>

                        {errors.amount && (
                          <Text style={styles.errorText}>{errors.amount}</Text>
                        )}
                        <View style={styles.carbonButton}>
                          <Text style={styles.carbonText}>
                            {company.company.id == '1'
                              ? `Your investment will offset ${
                                  amount?.length > 0
                                    ? (parseFloat(amount) * 0.001253).toFixed(2)
                                    : 0
                                }
                              metric tons of carbon dioxide (CO₂e) per year`
                              : company.company.id == '2'
                              ? `Your investment will offset ${
                                  amount?.length > 0
                                    ? (parseFloat(amount) * 0.001253).toFixed(2)
                                    : 0
                                } metric tons of carbon dioxide (CO₂e) per year`
                              : `Your investment will offset ${
                                  amount?.length > 0
                                    ? (parseFloat(amount) * 0.001253).toFixed(2)
                                    : 0
                                } metric tons of carbon dioxide (CO₂e) per year`}
                          </Text>
                        </View>
                        <View style={styles.keyboardView}>
                          <FlatList
                            data={keys}
                            numColumns={3}
                            keyExtractor={item => item}
                            renderItem={({item}) => {
                              return (
                                <TouchableOpacity
                                  style={styles.keyboardStyle}
                                  onPress={() => {
                                    if (item == '') {
                                      console.log(1);
                                    } else if (typeof item === 'object') {
                                      console.log(2);
                                      setAmount(
                                        amount.slice(0, amount.length - 1),
                                      );
                                    } else if (
                                      amount == '' ||
                                      parseFloat(amount) <= 74999999
                                    ) {
                                      console.log(3);
                                      setFieldValue('amount', amount + item);
                                      setAmount(amount + item);
                                    } else {
                                      console.log(4);
                                    }
                                  }}>
                                  <Text style={styles.keyboardText}>
                                    {item}
                                  </Text>
                                </TouchableOpacity>
                              );
                            }}
                          />
                        </View>
                      </View>
                      <Button
                        onPress={() => {
                          handleSubmit();
                          console.log('errors', errors);
                        }}
                        loading={investResponse.isLoading}
                        style={[styles.purchaseButton, styles.text]}
                        title1="Confirm investment"
                      />
                    </>
                  )}
                </Formik>
              </KeyboardAwareScrollView>
            </>
          </Modal>
        )}
        {openSuccessModal && (
          <Modal
            visible={openSuccessModal}
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
                containerStyle={styles.headerContainerStyleHelp}
                backgroundColor={styles.headerColor}
                statusbar={styles.statusBar}
                rightComponent={
                  <TouchableOpacity
                    onPress={() => {
                      setOpenSuccess(false);
                      setOpenPurchase(false);
                    }}>
                    <MaterialIcons
                      name={'close'}
                      size={wp(6)}
                      color={'black'}
                      onPress={() => {
                        setOpenSuccess(false);
                        setOpenPurchase(false);
                      }}
                    />
                  </TouchableOpacity>
                }
              />
              <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
                contentContainerStyle={{flexGrow: 1}}
                keyboardShouldPersistTaps="handled">
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: hp(10),
                  }}>
                  <Text style={styles.shareText}>
                    Investment{'\n'} successful!
                  </Text>
                  <Button
                    onPress={() => {
                      setOpenSuccess(false);
                      setOpenPurchase(false);
                      navigation.navigate('Portfolio');
                      // getSelectedCompanyApi(company.company.id);
                      // getGraphsApi(company.company.id, 1);
                    }}
                    style={[styles.successButton, styles.text]}
                    title1={`View portfolio`}
                  />
                </View>
              </KeyboardAwareScrollView>
            </>
          </Modal>
        )}
      </View>
    </>
  );
}

export default Home;
