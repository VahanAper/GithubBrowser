import React, { Component } from 'react';
import {
  View,
  Text,
  ListView,
  ActivityIndicator
} from 'react-native';
import AuthService from '../services/AuthService';

class Feed extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      dataSource: ds,
      showProgress: true
    };
  }

  componentDidMount() {
    this.fetchFeed();
  }

  fetchFeed() {
    AuthService.getAuthInfo((err, authInfo) => {
      const url = `https://api.github.com/users/${authInfo.user.login}/received_events`;

      fetch(url, { headers: authInfo.header })
        .then((response) => {
          return response.json();
        })
        .then((responseData) => {
          const feedItems = responseData.filter((event) => event.type === 'WatchEvent');
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(feedItems),
            showProgress: false
          });
        })
        .catch((error) => console.log('error', error));
    });
  }

  renderRow(rowData) {
    console.log(rowData);
    return (
      <Text
        style={{
          color: '#333333',
          alignSelf: 'center'
        }}
      >
        {rowData.actor.login}
      </Text>
    );
  }

  render() {
    if (this.state.showProgress) {
      return (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1
          }}
        >
            <ActivityIndicator style={{ flex: 1 }} size="large" animating />
        </View>
      );
    }

    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start'
        }}
      >
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
        />
      </View>
    );
  }
}

export default Feed;
