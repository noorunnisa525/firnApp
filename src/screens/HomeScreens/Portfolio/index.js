import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Modal from 'react-native-modal';
import Snackbar from 'react-native-snackbar';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import FirnSvg from '../../../../assets/icons/FIRN.svg';
import BarChartComponent from '../../../components/BarChartComponent';
import Button from '../../../components/CustomButton';
import Header from '../../../components/CustomHeader';
import CustomProgress from '../../../components/CustomProgress';
import Text from '../../../components/CustomText';
import PortfolioDiversitiesComponent from '../../../components/PortfolioDiversitiesComponent';
import PortfolioGraphComponent from '../../../components/PortfolioGraphComponent';
import PortfolioTopBar from '../../../components/PortfolioTopBar';
import {get_portfolio} from '../../../services/api-config';
import {usePostApiMutation} from '../../../services/service';
import {useThemeAwareObject} from '../../../theme/index';
import {hp, wp} from '../../../util/index';
import createStyles from './styles';

function Portfolio({navigation}) {
  const styles = useThemeAwareObject(createStyles);
  const [selectedTab, setSelectedTab] = useState('portfolio');
  const [getPortfolioCall, getPortfolioResponse] = usePostApiMutation();
  const token = useSelector(state => state.user.token);
  const [portfolioData, setPortfolioData] = useState();
  const [currentGraphIndex, setCurrentGraphIndex] = useState(
    moment().format('M') - 1,
  );
  const [openModal, setOpenModal] = useState(false);
  const [lakesModal, setLakesModal] = useState(false);
  const [northView, setNothviewModal] = useState(false);
  const [walkerModal, setWalkerModal] = useState(false);

  const [graphValues, setGraphValues] = useState();
  const [images, setImages] = useState([
    {
      id: 1,
      img: require('../../../../assets/images/Impact4.png'),
      name: 'Projects funded',
      value: '13',
    },
    {
      id: 2,
      img: require('../../../../assets/images/Impact5.png'),
      name: 'Renewable energy created',
      value: '26,030 kWh',
    },
    {
      id: 3,
      img: require('../../../../assets/images/LakeWithSHadow.png'),
      name: 'Thousand Lakes Wind Farm',
      value: '',
    },
    {
      id: 4,
      img: require('../../../../assets/images/NorthviewWithShadow.png'),
      name: 'Northview Middle School',
    },
    {
      id: 5,
      img: require('../../../../assets/images/WalkerWithShadow.png'),
      name: 'Walker Family Farms',
    },
  ]);
  const [portfolioGraph, setPortfolioGraph] = useState([]);
  const [graphColor, setGraphColor] = useState();
  const [graphIndex, setGraphIndex] = useState();

  useEffect(() => {
    getPortfolioApi();
  }, []);

  let months = portfolioGraph?.map(item => item.Month.slice(0, 3));

  const barChartData = {
    labels: months,
    datasets: [
      {
        barThickness: 0.5,
        maxBarThickness: 0.5,
        minBarLength: 3,
        data: portfolioGraph?.map(item => item.Total),
        // colors: [
        //   (opacity = 1) =>
        //     currentGraphIndex > curMonth
        //       ? '#003D81'
        //       : currentGraphIndex < curMonth
        //       ? '#007844'
        //       : currentGraphIndex == 0
        //       ? '#3E7BFA'
        //       : `#D9DCE7`, // optional
        //   (opacity = 1) =>
        //     currentGraphIndex > curMonth
        //       ? '#003D81'
        //       : currentGraphIndex < curMonth
        //       ? '#007844'
        //       : currentGraphIndex == 1
        //       ? '#3E7BFA'
        //       : `#D9DCE7`,
        //   (opacity = 1) =>
        //     currentGraphIndex > curMonth
        //       ? '#003D81'
        //       : currentGraphIndex < curMonth
        //       ? '#007844'
        //       : currentGraphIndex == 2
        //       ? '#3E7BFA'
        //       : `#D9DCE7`,
        //   (opacity = 1) =>
        //     currentGraphIndex > curMonth
        //       ? '#003D81'
        //       : currentGraphIndex < curMonth
        //       ? '#007844'
        //       : currentGraphIndex == 3
        //       ? '#3E7BFA'
        //       : `#D9DCE7`,
        //   (opacity = 1) =>
        //     currentGraphIndex > curMonth
        //       ? '#003D81'
        //       : currentGraphIndex < curMonth
        //       ? '#007844'
        //       : currentGraphIndex == 4
        //       ? '#3E7BFA'
        //       : `#D9DCE7`,
        //   (opacity = 1) =>
        //     currentGraphIndex > curMonth
        //       ? '#003D81'
        //       : currentGraphIndex < curMonth
        //       ? '#007844'
        //       : currentGraphIndex == 5
        //       ? '#3E7BFA'
        //       : `#D9DCE7`,
        //   (opacity = 1) =>
        //     currentGraphIndex > curMonth
        //       ? '#003D81'
        //       : currentGraphIndex < curMonth
        //       ? '#007844'
        //       : currentGraphIndex == 6
        //       ? '#3E7BFA'
        //       : `#D9DCE7`,
        //   (opacity = 1) =>
        //     currentGraphIndex > curMonth
        //       ? '#003D81'
        //       : currentGraphIndex < curMonth
        //       ? '#007844'
        //       : currentGraphIndex == 7
        //       ? '#3E7BFA'
        //       : `#D9DCE7`,
        //   (opacity = 1) =>
        //     currentGraphIndex > curMonth
        //       ? '#003D81'
        //       : currentGraphIndex < curMonth
        //       ? '#007844'
        //       : currentGraphIndex == 8
        //       ? '#3E7BFA'
        //       : `#D9DCE7`,
        //   (opacity = 1) =>
        //     currentGraphIndex > curMonth
        //       ? '#003D81'
        //       : currentGraphIndex < curMonth
        //       ? '#007844'
        //       : currentGraphIndex == 9
        //       ? '#3E7BFA'
        //       : `#D9DCE7`,
        //   (opacity = 1) =>
        //     currentGraphIndex > curMonth
        //       ? '#003D81'
        //       : currentGraphIndex < curMonth
        //       ? '#007844'
        //       : currentGraphIndex == 10
        //       ? '#3E7BFA'
        //       : `#D9DCE7`,
        //   (opacity = 1) =>
        //     currentGraphIndex > curMonth
        //       ? '#003D81'
        //       : currentGraphIndex < curMonth
        //       ? '#007844'
        //       : currentGraphIndex == 11
        //       ? '#3E7BFA'
        //       : `#D9DCE7`,
        // ],

        colors: [
          (opacity = 1) =>
            graphColor && graphColor[0]?.index == currentGraphIndex
              ? graphColor[0]?.color
              : '#D9DCE7',
          (opacity = 1) =>
            graphColor && graphColor[1]?.index == currentGraphIndex
              ? graphColor[1]?.color
              : '#D9DCE7',
          (opacity = 1) =>
            graphColor && graphColor[2]?.index == currentGraphIndex
              ? graphColor[2]?.color
              : '#D9DCE7',
          (opacity = 1) =>
            graphColor && graphColor[3]?.index == currentGraphIndex
              ? graphColor[3]?.color
              : '#D9DCE7',
          (opacity = 1) =>
            graphColor && graphColor[4]?.index == currentGraphIndex
              ? graphColor[4]?.color
              : '#D9DCE7',
          (opacity = 1) =>
            graphColor && graphColor[5]?.index == currentGraphIndex
              ? graphColor[5]?.color
              : '#D9DCE7',
          (opacity = 1) =>
            graphColor && graphColor[6]?.index == currentGraphIndex
              ? graphColor[6]?.color
              : '#D9DCE7',
          (opacity = 1) =>
            graphColor && graphColor[7]?.index == currentGraphIndex
              ? graphColor[7]?.color
              : '#D9DCE7',
          (opacity = 1) =>
            graphColor && graphColor[8]?.index == currentGraphIndex
              ? graphColor[8]?.color
              : '#D9DCE7',
          (opacity = 1) =>
            graphColor && graphColor[9]?.index == currentGraphIndex
              ? graphColor[9]?.color
              : '#D9DCE7',
          (opacity = 1) =>
            graphColor && graphColor[10]?.index == currentGraphIndex
              ? graphColor[10]?.color
              : '#D9DCE7',
          (opacity = 1) =>
            graphColor && graphColor[11]?.index == currentGraphIndex
              ? graphColor[11]?.color
              : '#D9DCE7',
        ],
      },
    ],
  };

  async function getPortfolioApi() {
    let apiData = {
      url: get_portfolio,
      method: 'GET',
      token: token,
    };
    try {
      let apiResponse = await getPortfolioCall(apiData).unwrap();
      if (apiResponse.status == 200) {
        setPortfolioData(apiResponse.data);
        let curMonth = new Date().getMonth();

        let index = apiResponse.data.portfolio.findIndex(
          item => item.Month == apiResponse.data.month[curMonth],
        );
        setGraphValues(apiResponse.data.portfolio[index]);

        let tempPortfolio = [...apiResponse.data.portfolio];
        // let cIndex = moment().format('M');
        let currentMonthObject = tempPortfolio.find(
          item => item.Month == moment().format('MMMM'),
        );

        // let nextCIndex = parseInt(cIndex) + 2;

        // let remainingPortfolio = tempPortfolio.splice(
        //   parseInt(nextCIndex + 1),
        //   parseInt(tempPortfolio.length - 1),
        // );

        // let finalPortfolio = [...remainingPortfolio, ...tempPortfolio];

        // if (cIndex > 8) {
        //   let greaterIndex = cIndex - 9;
        //   let greaterPortfolio = tempPortfolio.splice(0, greaterIndex);
        //   let temp = [...tempPortfolio, ...greaterPortfolio];
        //   let tempColor = [];
        //   let found = false;
        //   let itemIndex;
        //   temp?.map((item, index) => {
        //     if (found == false) {
        //       tempColor[index] = {color: '#007844', index: index};
        //     }
        //     if (item.Month == currentMonthObject.Month) {
        //       tempColor[index] = {color: '#3E7BFA', index: index};
        //       found = true;
        //       itemIndex = index;
        //       setCurrentGraphIndex(index);
        //     }
        //     if (found == true && itemIndex < index) {
        //       tempColor[index] = {color: '#003D81', index: index};
        //     }
        //   });
        //   setGraphColor(tempColor);
        //   setPortfolioGraph([...tempPortfolio, ...greaterPortfolio]);
        // } else {
        let tempColor = [];
        let found = false;
        let itemIndex;
        tempPortfolio?.map((item, index) => {
          if (found == false) {
            tempColor[index] = {
              color: '#007844',
              index: index,
              month: item.Month,
            };
          }
          if (item.Month == currentMonthObject.Month) {
            tempColor[index] = {
              color: '#3E7BFA',
              index: index,
              month: item.Month,
            };
            found = true;
            itemIndex = index;
            setCurrentGraphIndex(index);
            setGraphIndex(index);
          }
          if (found == true && itemIndex < index) {
            tempColor[index] = {
              color: '#003D81',
              index: index,
              month: item.Month,
            };
          }
        });
        setGraphColor(tempColor);
        setPortfolioGraph(tempPortfolio);
        // }
      } else {
        Snackbar.show({
          text: apiResponse?.Message,
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    } catch (e) {}
  }

  const BarChartConfig = {
    labelColor: (opacity = 1) => `#333`,
    backgroundColor: '#F7F6FA',
    backgroundGradientFrom: '#F7F6FA',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#F7F6FA',
    backgroundGradientToOpacity: hp(15),
    color: () => '#F7F6FA', // THIS
    barPercentage: 0.5,
    fillShadowGradient: '#2E78A8', // THIS
    fillShadowGradientOpacity: 3, // THIS
    decimalPlaces: 0,
    propsForLabels: {
      fontFamily: 'Sora-SemiBold',
    },
  };

  return (
    <>
      <View style={styles.mainContainer}>
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
                style={{width: wp(6), height: wp(6)}}
                resizeMode="contain"
              />
            </TouchableOpacity>
          }
        />
        <PortfolioTopBar
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
        <KeyboardAwareScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
          keyboardShouldPersistTaps="handled">
          {selectedTab == 'portfolio' && (
            <>
              {getPortfolioResponse.isLoading ? (
                <ActivityIndicator
                  color="black"
                  style={{marginTop: hp(5), alignSelf: 'center'}}
                />
              ) : (
                <>
                  <PortfolioGraphComponent
                    value={
                      graphColor &&
                      graphColor[currentGraphIndex]?.index > graphIndex
                        ? `Projected ${graphValues?.Month} value`
                        : graphColor &&
                          graphColor[currentGraphIndex]?.index < graphIndex
                        ? `${graphValues?.Month} value`
                        : `Current value`
                    }
                    currentGraphIndex={currentGraphIndex}
                    graphIndex={graphIndex}
                    graphValues={graphValues}
                    amount={graphValues ? +graphValues.Total : 0}
                    estimated={graphValues ? '+' + graphValues?.YTD : '+' + 0}
                    carbon={graphValues ? +graphValues.Dividends : +0}
                    update={graphValues ? +graphValues.Contributions : +0}
                  />

                  {portfolioData?.investment?.length ? (
                    <BarChartComponent
                      barChartData={barChartData}
                      chartConfig={BarChartConfig}
                      onDataPointClick={data => {
                        setGraphValues(portfolioGraph?.[data.index]);
                        setCurrentGraphIndex(data.index);
                      }}
                    />
                  ) : (
                    <Text style={styles.errorText}>
                      No portfolio stack available
                    </Text>
                  )}

                  <PortfolioDiversitiesComponent
                    value="Diversification"
                    transaction={
                      portfolioData?.transaction
                        ? portfolioData?.transaction + ' transactions'
                        : 0 + ' transactions'
                    }
                    projects={
                      portfolioData?.projects[0]?.length
                        ? portfolioData?.projects[0]?.length + ' projects'
                        : 0 + ' projects'
                    }
                  />
                  <Text style={styles.holdingText}>Allocations</Text>
                  <PortfolioDiversitiesComponent
                    solar="20.0%"
                    wind="70.2%"
                    storage="9.8%"
                  />
                </>
              )}
            </>
          )}
          {selectedTab == 'impact' && (
            <View>
              <View>
                <CustomProgress />
              </View>
              <View style={{margin: hp(2)}}>
                <FlatList
                  data={images}
                  keyExtractor={item => item.id}
                  numColumns={3}
                  columnWrapperStyle={styles.row}
                  renderItem={({item, index}) => {
                    return index !== 0 && index !== 1 ? (
                      <ImageBackground
                        source={item.img}
                        resizeMode={'stretch'}
                        style={{
                          width: wp(88),
                          height: wp(34),
                          backgroundColor: 'white',
                          overflow: 'hidden',
                          marginVertical: wp(0.1),
                        }}>
                        <View style={styles.imgBackgroundStyle}>
                          <Text style={styles.nameTextImpact}>{item.name}</Text>
                          <Button
                            onPress={() => {
                              if (item.id == 3) {
                                setLakesModal(true);
                              } else if (item.id == 4) {
                                setNothviewModal(true);
                              } else if (item.id == 5) {
                                setWalkerModal(true);
                              }
                            }}
                            style={[styles.readImpactButton, styles.text]}
                            title1={`Read about your impact`}
                          />
                        </View>
                      </ImageBackground>
                    ) : (
                      <View style={styles.flatContainer}>
                        <ImageBackground
                          source={item.img}
                          resizeMode={'stretch'}
                          style={styles.flatContainerImg}>
                          <View style={styles.imgBackgroundStyle}>
                            <Text style={styles.nameText}>{item.name}</Text>
                            <Text style={styles.valueText}>{item.value}</Text>
                            <Text style={styles.valueText}></Text>
                          </View>
                        </ImageBackground>
                      </View>
                    );
                  }}
                />
              </View>
            </View>
          )}
        </KeyboardAwareScrollView>
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
                Solar power is the most abundant source of energy on Earth. Over
                74,000 terawatts of energy strike the Earth’s surface
                continuously, every single day. If we were able to harness even
                a fraction of that energy, one hour of sunlight would be
                equivalent to one year’s worth of energy for the planet. Solar
                panels capture the sun’s energy and turn it into electricity.
                When photons from the sun hit a solar panel’s photovoltaic cell,
                the photons knock electrons loose. Those electrons flow through
                a circuit to generate electricity.
              </Text>
              <Image
                source={require('../../../../assets/images/Help2.png')}
                style={styles.modalImg}
                resizeMode="contain"
              />
              <Text style={styles.modalSuText}>
                Wind power has been used by humans for millennia. When air mass
                hits a wind turbine, it causes the turbine blades to rotate.
                That spinning motion turns a generator inside the wind turbine,
                which converts the kinetic energy of the blades’ rotation into
                electricity. Utility scale wind turbine blades average 200 feet
                long, and the towers can be as high as 300 feet tall.{' '}
              </Text>
              <Image
                source={require('../../../../assets/images/Help3.png')}
                style={styles.modalImg}
                resizeMode="contain"
              />
              <Text style={styles.modalSuText}>
                Energy storage can refer to a number of technologies, including
                batteries, pumped hydro, thermal storage, and fly-wheels.
                Storage is key to unlocking the power of renewable for the
                entire electric grid. When the sun is shining and the wind is
                blowing, energy storage technologies like batteries or pumped
                hydro can store any surplus energy the grid does not use. Later
                on, when demand for electricity is higher, or renewable energy
                sources are less productive, the grid can call upon storage
                devices to discharge that clean energy back onto the grid.
                Therefore, energy storage can mitigate the need for firing up
                fossil fuel power plants during peak hours.
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
                CO₂e refers to the tons of greenhouse gas emissions with the
                same global warming potential (“GWP”) as one metric ton of CO₂.
                For carbon dioxide, that ratio is one-to-one. Other greenhouse
                gasses like methane (CH4) have shorter half-lives in the
                atmosphere but trap more heat. Methane has a GWP score of 25
                compared to a score of 1 for carbon dioxide. In other words, one
                ton of methane traps the same amount of heat as 25 tons of
                carbon dioxide. CO₂e therefore allows people to compare the
                impact of various projects apples to apples.
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
                “black carbon”–can also warm the planet by lowering the planet’s
                albedo.
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
                A megawatt is a unit of power, equivalent to one million watts.
                Clean energy projects often list their nameplate capacity in MW,
                since that figure tells users about the rate of power
                generation. The total energy created over time is measured in
                MWh. If a solar array generates 1 MW of power for one hour, it
                would have produced 1 MWh of energy.
              </Text>
              <Text style={styles.boldTextModal}>Metric Ton (MT)</Text>
              <Text style={styles.modalSuText}>
                A metric ton is 2,204.6 lbs.
              </Text>
            </KeyboardAwareScrollView>
          </>
        </Modal>
      )}
      {lakesModal && (
        <Modal
          visible={lakesModal}
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
              containerStyle={styles.headerContainerStyleHelp}
              backgroundColor={styles.headerColor}
              statusbar={styles.statusBar}
              rightComponent={
                <TouchableOpacity
                  onPress={() => {
                    setLakesModal(false);
                  }}>
                  <MaterialIcons
                    name={'close'}
                    size={wp(6)}
                    color={'black'}
                    onPress={() => {
                      setLakesModal(false);
                    }}
                  />
                </TouchableOpacity>
              }
              centerComponent={
                <View>
                  <Text style={styles.headerTextImpactModal}>
                    Thousand Lakes {'\n'} Wind Farm
                  </Text>
                </View>
              }
            />
            <KeyboardAwareScrollView
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true}
              contentContainerStyle={styles.modalContainer}
              keyboardShouldPersistTaps="handled">
              <Text style={styles.lineStyle}></Text>
              <Text style={styles.dateModalText}>Last updated Oct 06.</Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.initialTextModal}>L</Text>
                <Text style={styles.modalSubText}>
                  {' '}afayette Renewables operates the{'\n'} Thousand Lake Wind Farm
                  in{'\n'}
                </Text>
              </View>
              <Text style={styles.modalSubTextWithoutTopMargin}>
                Minnesota. This is just the latest in wind farm developments
                done by the small developers, but the goal of this project isn’t
                just to improve the meter.
              </Text>

              <Image
                source={require('../../../../assets/images/ThousandsLake.png')}
                style={styles.modalImgImpact}
                resizeMode="cover"
              />
              <Text style={styles.modalSubText}>
                The Wind Farm created more than 25 “green collar” jobs and
                continues to provide energy to agricultural businesses in the
                Minneapolis area through a virtual power purchase agreement
                (“PPA”) program. {'\n'}
                {'\n'}Thousand Lakes is just one of many examples of how
                renewable energy infrastructure can help existing communities
                transition to clean energy economy, creating jobs and replacing
                older coal-fired power plants in the process.
              </Text>
            </KeyboardAwareScrollView>
          </>
        </Modal>
      )}
      {northView && (
        <Modal
          visible={northView}
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
                    setNothviewModal(false);
                  }}>
                  <MaterialIcons
                    name={'close'}
                    size={wp(6)}
                    color={'black'}
                    onPress={() => {
                      setNothviewModal(false);
                    }}
                  />
                </TouchableOpacity>
              }
              centerComponent={
                <View>
                  <Text style={styles.headerTextImpactModal}>
                    Northview Middle {'\n'}School
                  </Text>
                </View>
              }
            />
            <KeyboardAwareScrollView
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true}
              contentContainerStyle={styles.modalContainer}
              keyboardShouldPersistTaps="handled">
              <Text style={styles.lineStyle}></Text>
              <Text style={styles.dateModalText}>Last updated Dec 01.</Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.initialTextModal}>N</Text>
                <Text style={styles.modalSubText}>
                  {' '}orthwest Middle School serves a{'\n'} small suburban community
                  in western {'\n'}
                </Text>
              </View>
              <Text style={styles.modalSubTextWithoutTopMargin}>
                Massachusetts. In 2020, the School Board decided to make a
                commitment to sustainability. With the help of a local
                developer, the School installed a 500 kW system on its roof.
              </Text>

              <Image
                source={require('../../../../assets/images/NorthView1.png')}
                style={styles.modalImgImpact}
                resizeMode="cover"
              />
              <Text style={styles.modalSubText}>
                The developer employed a local roofing company, creating 10 jobs
                for the local community.{'\n'}
              </Text>
              <Image
                source={require('../../../../assets/images/NorthView.png')}
                style={styles.modalImgImpact}
                resizeMode="cover"
              />
              <Text style={styles.modalSubText}>
                Firn is now refinancing the secured loan, saving the School
                money on its original interest payments. The School now boasts a
                negative carbon footprint, providing surplus electricity to the
                local grid.
              </Text>
            </KeyboardAwareScrollView>
          </>
        </Modal>
      )}
      {walkerModal && (
        <Modal
          visible={walkerModal}
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
                    setWalkerModal(false);
                  }}>
                  <MaterialIcons
                    name={'close'}
                    size={wp(6)}
                    color={'black'}
                    onPress={() => {
                      setWalkerModal(false);
                    }}
                  />
                </TouchableOpacity>
              }
              centerComponent={
                <View>
                  <Text style={styles.headerTextImpactModal}>
                    Walker Family {'\n'}Farms
                  </Text>
                </View>
              }
            />
            <KeyboardAwareScrollView
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true}
              contentContainerStyle={styles.modalContainer}
              keyboardShouldPersistTaps="handled">
              <Text style={styles.lineStyle}></Text>
              <Text style={styles.dateModalText}>Last updated Nov 21.</Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.initialTextModal}>L</Text>
                <Text style={styles.modalSubText}>
                  {' '}ocated outside of Modesto, CA,{'\n'} Walker Family Farms
                  produces a {'\n'}
                </Text>
              </View>
              <Text style={styles.modalSubTextWithoutTopMargin}>
                variety of seasonal crops. Now, they also produce electricity
                for their community in northern California.
              </Text>

              <Image
                source={require('../../../../assets/images/Walker1.png')}
                style={styles.modalImgImpact}
                resizeMode="cover"
              />
              <Text style={styles.modalSubText}>
                Joe Walker, the owner of the farm, has headed the Walker family
                business for more than two decades. Since the 1970s, the Walkers
                have been farmers, when Joe’s father originally bought the land
                to farm asparagus,{'\n'}
              </Text>
              <Image
                source={require('../../../../assets/images/Walkers.png')}
                style={styles.modalImgImpact}
                resizeMode="cover"
              />
              <Text style={styles.modalSubText}>
                lettuce, and other seasonal varietals. Now, they “farm” the sun,
                too. For Joe, adding a solar installation not only allowed him
                to expand his operations, but it also allowed him to make the
                world a more sustainable place for his family. For Joe, adding a
                solar installation not only allowed him to expand his
                operations, but it also allowed him to make the world a more
                sustainable place for his family. His children, Tia (27), and
                John (22), are also involved in the business and plan to take
                part in managing the day-to-day operations of the installation.
                Walker Family Farms employs over 150 people. With the help of
                Firn’s investors, the Walker family built the solar installation
                for no-money down.
              </Text>
            </KeyboardAwareScrollView>
          </>
        </Modal>
      )}
    </>
  );
}

export default Portfolio;
