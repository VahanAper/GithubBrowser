import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TabBarIOS,
  Platform
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import icon from '../images/octocat.png';
import FacebookTabBar from './FacebookTabBar';
import Feed from './Feed';

class AppContainer extends Component {
  state = { selectedTab: 'feed' };

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
            <Feed />
          </TabBarIOS.Item>

          <TabBarIOS.Item
            title="Search"
            selected={this.state.selectedTab === 'search'}
            icon={icon}
            onPress={() => this.setState({ selectedTab: 'search' })}
          >
            <Text style={styles.welcome}>Tab 2(ios)</Text>
          </TabBarIOS.Item>
        </TabBarIOS>
      );
    }

    return (
      <ScrollableTabView
        style={{ marginTop: 20 }}
        initialPage={0}
        tabBarPosition="bottom"
        renderTabBar={() => <FacebookTabBar />}
      >
        <ScrollView tabLabel="ios-paper">
          <View
            style={{
              flex: 1,
              alignItems: 'center'
            }}
          >
            <Feed />
          </View>
        </ScrollView>
        <ScrollView tabLabel="ios-search" style={styles.tabView}>
          <View style={styles.card}>
            <Text>Tab 2(android)</Text>
          </View>
        </ScrollView>
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
