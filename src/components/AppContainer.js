import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TabBarIOS,
  Platform,
  Navigator,
  TouchableOpacity
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import icon from '../images/octocat.png';
import FacebookTabBar from './FacebookTabBar';
import Feed from './Feed';
import PushPayload from './PushPayload';
import Search from './Search';
import SearchResults from './SearchResults';

class AppContainer extends Component {
  state = { selectedTab: 'feed' };

  renderScene(route, navigator) {
     if (route.title === 'Feed') {
       return <Feed navigator={navigator} />;
     }
     if (route.title === 'Push Event') {
       return <PushPayload navigator={navigator} {...route.passProps} />;
     }
     if (route.title === 'Search') {
       return <Search navigator={navigator} />;
     }
     if (route.title === 'Search Results') {
       return <SearchResults navigator={navigator} {...route.passProps} />;
     }
  }

  render() {
    if (Platform.OS === 'ios') {
      return (
        <TabBarIOS style={styles.container}>
          <TabBarIOS.Item
            title="Feed"
            selected={this.state.selectedTab === 'feed'}
            icon={icon}
            onPress={() => this.setState({ selectedTab: 'feed' })}
          >
            <Navigator
              style={{ flex: 1 }}
              initialRoute={{
                component: Feed,
                title: 'Feed'
              }}
            />
          </TabBarIOS.Item>

          <TabBarIOS.Item
            title="Search"
            selected={this.state.selectedTab === 'search'}
            icon={icon}
            onPress={() => this.setState({ selectedTab: 'search' })}
          >
            <Navigator
              style={{ flex: 1 }}
              initialRoute={{
                component: Search,
                title: 'Search'
              }}
            />
          </TabBarIOS.Item>
        </TabBarIOS>
      );
    }

    return (
      <ScrollableTabView
        style={{ flex: 1 }}
        initialPage={0}
        tabBarPosition="bottom"
        renderTabBar={() => <FacebookTabBar />}
      >
        <Navigator
          tabLabel="ios-paper"
          style={{ flex: 1 }}
          initialRoute={{ title: 'Feed', index: 0 }}
          renderScene={this.renderScene}
          navigationBar={
            <Navigator.NavigationBar
              style={{
                backgroundColor: '#FFFFFF',
                flex: 1,
                flexDirection: 'row'
              }}
              routeMapper={{
                LeftButton: (route, navigator) => {
                  if (route.index === 0) {
                    return null;
                  }
                  if (route.index === 1) {
                    return (
                      <TouchableOpacity
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          flex: 1,
                          marginLeft: 10
                        }}
                        onPress={() => navigator.pop()}
                      >
                        <Icon name="ios-arrow-back" size={30} color="rgb(59,89,152)" />
                      </TouchableOpacity>
                    );
                  }
                },
                RightButton: () => {},
                Title: (route) => {
                  return (
                    <View
                      style={{
                        flex: 3,
                        justifyContent: 'center',
                        alignSelf: 'center',
                        marginLeft: -60
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: '900',
                          color: 'rgb(59,89,152)'
                        }}
                      >
                        {route.title}
                      </Text>
                    </View>
                  );
                },
              }}
            />
          }
        />

        <Navigator
          tabLabel="ios-search"
          style={{ flex: 1 }}
          initialRoute={{ title: 'Search', index: 0 }}
          renderScene={this.renderScene}
          navigationBar={
            <Navigator.NavigationBar
              style={{
                backgroundColor: '#FFFFFF',
                flex: 1,
                flexDirection: 'row'
              }}
              routeMapper={{
                LeftButton: (route, navigator) => {
                  if (route.index === 0) {
                    return null;
                  }
                  if (route.index === 1) {
                    return (
                      <TouchableOpacity
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          flex: 1,
                          marginLeft: 10
                        }}
                        onPress={() => navigator.pop()}
                      >
                        <Icon name="ios-arrow-back" size={30} color="rgb(59,89,152)" />
                      </TouchableOpacity>
                    );
                  }
                },
                RightButton: () => {},
                Title: (route) => {
                  return (
                    <View
                      style={{
                        flex: 3,
                        justifyContent: 'center',
                        alignSelf: 'center',
                        marginLeft: -60
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: '900',
                          color: 'rgb(59,89,152)'
                        }}
                      >
                        {route.title}
                      </Text>
                    </View>
                  );
                },
              }}
            />
          }
        />
      </ScrollableTabView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  tabView: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
  card: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 5,
    height: 150,
    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
});

export default AppContainer;
