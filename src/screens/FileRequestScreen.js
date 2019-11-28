import React, {useContext, useEffect} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {ListItem} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import {NavigationEvents, withNavigationFocus} from 'react-navigation';
import {Context} from '../context/PolicyContext';

const FileRequestScreen = ({navigation}) => {
  function removeDuplicates(myArr, prop) {
    return myArr.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  }
  const {state, getcomponentFile} = useContext(Context);
  const list = removeDuplicates(state.componentFile, 'componentCode');

  useEffect(() => {
    getcomponentFile();
  }, []);
  return (
    <>
      {/* <NavigationEvents onWillFocus={getcomponentFile} /> */}
      <View>
        {list.map((l, i) => (
          <TouchableOpacity
            key={l.componentCode}
            onPress={() =>
              navigation.navigate('FileDetail', {
                componentCode: l.componentCode,
                componentFile: state.componentFile,
              })
            }>
            <ListItem
              key={l.componentCode}
              title={l.componentName}
              bottomDivider
              chevron
            />
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
};
FileRequestScreen.navigationOptions = {
  title: 'Loại quyền lợi bảo hiểm',
  tabBarIcon: ({tintColor}) => (
    <Icon name="list" type="entypo" size={28} color={tintColor} />
  ),
  headerStyle: {
    backgroundColor: '#c0972e',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
    color: '#fff',
    justifyContent: 'space-between',
    textAlign: 'center',
    alignSelf: 'center',
  },
};

export default withNavigationFocus(FileRequestScreen);
