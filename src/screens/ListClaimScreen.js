/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect} from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import {ListItem} from 'react-native-elements';
import {ScrollView} from 'react-navigation';
import {Context as AuthContext} from '../context/AuthContext';
import {Context} from '../context/ClaimSubmitionContext';
import {Context as ImageContext} from '../context/ClaimImageContext';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';

const ListClaimScreen = ({navigation}) => {
  const authctx = useContext(AuthContext);
  const imgctx = useContext(ImageContext);
  const {policyNumber, idNumber} = authctx.state;

  const {state, claimSubmitionFetch} = useContext(Context);

  useEffect(() => {
    imgctx.cleanImage();
    claimSubmitionFetch(policyNumber, idNumber);
    const listener = navigation.addListener('didFocus', () => {
      claimSubmitionFetch(policyNumber, idNumber);
      imgctx.cleanImage();
    });

    return () => {
      listener.remove();
    };
  }, []);

  const renderList = () => {
    return state.claimSubmitionHis.map((l, i) => {
      const dateSubmit = moment(l.dateSubmit)
        .format('DD-MM-YYYYTHH:mm:ssZZ')
        .substring(0, 19)
        .substring(0, 10);

      return (
        <View key={i} style={styles.listContainer}>
          <TouchableOpacity
            style={styles.itemList}
            key={i + 1}
            onPress={() =>
              navigation.navigate('Show', {id: l.id, status: l.status})
            }>
            <ListItem
              key={i + 2}
              title={`${dateSubmit} - ${l.poNumber}  - ${l.status}`}
              subtitle={`${l.laName} - Loại Quyền lợi Claim: ${l.benifitType}`}
              bottomDivider
              chevron
            />
          </TouchableOpacity>
          <TouchableOpacity
            disabled={l.status !== 'PENDING'}
            style={styles.imageList}
            key={i + 3}
            onPress={() => navigation.navigate('Image', {id: l.id})}>
            <Icon
              key={i + 4}
              name="image"
              size={30}
              color={l.status !== 'PENDING' ? 'gray' : '#c0972e'}
            />
          </TouchableOpacity>
        </View>
      );
    });
  };

  return (
    <>
      <View>
        <ScrollView>{renderList()}</ScrollView>
      </View>
    </>
  );
};

// ListClaimScreen.navigationOptions = {
//   title: 'Danh sách yêu cầu bồi thường',
//   headerStyle: {
//     backgroundColor: '#c0972e',
//   },
//   headerTintColor: '#fff',
//   headerTitleStyle: {
//     fontWeight: 'bold',
//     color: '#fff',
//     justifyContent: 'space-between',
//     textAlign: 'center',
//     alignSelf: 'center',
//   },
// };
ListClaimScreen.navigationOptions = ({navigation}) => {
  return {
    title: 'Danh sách yêu cầu bảo hiểm',
    headerRight: (
      <TouchableOpacity
        style={styles.iconStyle}
        onPress={() => navigation.navigate('Create')}>
        <Icon name="plus" size={30} color="#fff" />
      </TouchableOpacity>
    ),
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      color: '#fff',
      // justifyContent: 'space-between',
      // textAlign: 'center',
      // alignSelf: 'center',
    },
  };
};
const styles = StyleSheet.create({
  iconStyle: {
    marginRight: 15,
  },
  listContainer: {
    flexDirection: 'row',
    flex: 10,
    alignItems: 'stretch',
  },
  itemList: {
    flex: 9,
    alignSelf: 'center',
  },
  imageList: {
    flex: 1,
    alignSelf: 'center',
    marginRight: 5,
  },
});
export default ListClaimScreen;
