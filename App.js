// import {FontAwesome} from '@expo/vector-icons';
import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {Provider as AuthProvider} from './src/context/AuthContext';
import {Provider as PolicyProvider} from './src/context/PolicyContext';
import {Provider as ClaimProvider} from './src/context/ClaimSubmitionContext';
import {Provider as ClaimImageProvider} from './src/context/ClaimImageContext';
import {setNavigator} from './src/navigationRef';
import AccountScreen from './src/screens/AccountScreen';
import CreateClaimScreen from './src/screens/CreateClaimScreen';
import SigninScreen from './src/screens/SigninScreen';
import ListClaimScreen from './src/screens/ListClaimScreen';
import TermAndPolictyScreen from './src/screens/TermAndPolictyScreen';
// import Icon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome';
import AttentionSCreen from './src/screens/AttentionSCreen';
import FileRequestScreen from './src/screens/FileRequestScreen';
import FileDetail from './src/components/FileDetail';
import {StyleSheet, Animated, Easing} from 'react-native';
import ShowClaimScreen from './src/screens/ShowClaimScreen';
import EditClaimScreen from './src/screens/EditClaimScreen';
import TakeImageScreen from './src/screens/TakeImageScreen';
import StartScreen from './src/screens/StartScreen';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import {Transition} from 'react-native-reanimated';

// const createClaimFlow = createStackNavigator({
//   CreateClaim: CreateClaimScreen,
//   TeamAndPolicty: TermAndPolictyScreen,
// });

// createClaimFlow.navigationOptions = {
//   title: 'Yêu cầu BH',
//   tabBarIcon: ({tintColor}) => (
//     <Icon name="plus-circle" size={28} color={tintColor} />
//   ),
// };
// const FileRequestFlow = createStackNavigator({
//   FileRequest: FileRequestScreen,
//   FileDetail: FileDetail,
// });

const attentionFlow = createStackNavigator({
  Attention: AttentionSCreen,
  FileRequest: FileRequestScreen,
  FileDetail: FileDetail,
});

attentionFlow.navigationOptions = {
  title: 'Lưu ý',
  tabBarIcon: ({tintColor}) => (
    <Icon name="info-circle" type="entypo" size={25} color={tintColor} />
  ),
};
const ListClaim = createStackNavigator(
  {
    Index: ListClaimScreen,
    Show: ShowClaimScreen,
    Create: CreateClaimScreen,
    Edit: EditClaimScreen,
    EditTeamAndPolicty: TermAndPolictyScreen,
    Image: TakeImageScreen,
  },
  {
    initialRouteName: 'Index',
    defaultNavigationOptions: {
      title: 'Yêu cầu bảo hiểm',
      headerStyle: {
        backgroundColor: '#c0972e',
        elevation: 0,
        shadowOpacity: 0,
      },
    },
  },
);
ListClaim.navigationOptions = {
  title: 'Danh sách',
  tabBarIcon: ({tintColor}) => (
    <Icon name="list-alt" type="entypo" size={25} color={tintColor} />
  ),
};
const switchNavigator = createAnimatedSwitchNavigator(
  {
    Start: StartScreen,
    loginFlow: createStackNavigator(
      {
        Signin: SigninScreen,
      },
      {
        headerMode: 'none',
        mode: 'modal',
        defaultNavigationOptions: {
          gesturesEnabled: false,
        },
        transitionConfig: () => ({
          transitionSpec: {
            duration: 1000,
            easing: Easing.out(Easing.poly(4)),
            timing: Animated.timing,
          },
          screenInterpolator: sceneProps => {
            const {layout, position, scene} = sceneProps;
            const {index} = scene;

            const height = layout.initHeight;
            const translateY = position.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [height, 0, 0],
            });

            const opacity = position.interpolate({
              inputRange: [index - 1, index - 0.99, index],
              outputRange: [0, 1, 1],
            });

            return {
              opacity,
              transform: [
                {
                  translateY,
                },
              ],
            };
          },
        }),
      },
    ),
    mainFlow: createBottomTabNavigator({
      attentionFlow,
      ListClaim,
      //createClaimFlow,
      Account: AccountScreen,
    }),
  },
  {
    // The previous screen will slide to the bottom while the next screen will fade in
    transition: (
      <Transition.Together>
        <Transition.Out
          type="slide-left"
          durationMs={500}
          interpolation="easeIn"
        />
        <Transition.In type="fade" durationMs={2000} />
      </Transition.Together>
    ),
  },
);

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <AuthProvider>
      <PolicyProvider>
        <ClaimProvider>
          <ClaimImageProvider>
            <App
              ref={navigator => {
                setNavigator(navigator);
              }}
              style={styles.appStyle}
            />
          </ClaimImageProvider>
        </ClaimProvider>
      </PolicyProvider>
    </AuthProvider>
  );
};
const styles = StyleSheet.create({
  appStyle: {
    flex: 1,
  },
});
