import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ListView,
  ActivityIndicator,
  TouchableHighlight
} from 'react-native';
import moment from 'moment';
import AuthService from '../services/AuthService';
// import PushPayload from './PushPayload';

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

  pressRow(rowData) {
    // console.log('rowData', rowData);
    this.props.navigator.push({
      title: 'Push Event',
      index: 1,
      passProps: {
        pushEvent: rowData
      }
    });
  }

  renderRow(rowData) {
    return (
      <TouchableHighlight
        onPress={() => this.pressRow(rowData)}
        underlayColor="#DDDDDD"
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            padding: 20,
            alignItems: 'center',
            borderColor: '#D7D7D7',
            borderBottomWidth: 1,
            backgroundColor: '#FFFFFF'
          }}
        >
          <Image
            source={{ uri: rowData.actor.avatar_url }}
            style={{
              height: 36,
              width: 36,
              borderRadius: 18
            }}
          />
          <View style={{ paddingLeft: 20 }}>
            <Text>{moment(rowData.created_at).fromNow()}</Text>
            <Text><Text style={{ fontWeight: '600' }}>{rowData.actor.login}</Text> pushed to</Text>
            <Text>{rowData.payload.ref}</Text>
            <Text>at <Text style={{ fontWeight: '600' }}>{rowData.repo.name}</Text></Text>
          </View>
        </View>
      </TouchableHighlight>
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
          justifyContent: 'flex-start',
          paddingTop: 56
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
