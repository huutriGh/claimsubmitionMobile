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
import {StyleSheet} from 'react-native';
import ShowClaimScreen from './src/screens/ShowClaimScreen';
import EditClaimScreen from './src/screens/EditClaimScreen';
import TakeImageScreen from './src/screens/TakeImageScreen';
import StartScreen from './src/screens/StartScreen';

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
const switchNavigator = createSwitchNavigator({
  Start: StartScreen,
  loginFlow: createStackNavigator({
    Signin: SigninScreen,
  }),
  mainFlow: createBottomTabNavigator({
    attentionFlow,
    ListClaim,
    //createClaimFlow,
    Account: AccountScreen,
  }),
});

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
