import React, { Component } from 'react';
import {
  View,
  Text,
  Image
} from 'react-native';
import moment from 'moment';

class PushPayload extends Component {

  render() {
    console.log(this.props.pushEvent.payload);
    return (
      <View
        style={{
          flex: 1,
          paddingTop: 70,
          justifyContent: 'flex-start',
          alignItems: 'center'
        }}
      >
        <Image
          source={{ uri: this.props.pushEvent.actor.avatar_url }}
          style={{
            height: 120,
            width: 120,
            borderRadius: 60
          }}
        />
        <Text
          style={{
            paddingTop: 20,
            paddingBottom: 20,
            fontSize: 20
          }}
        >
          {moment(this.props.pushEvent.created_at).fromNow()}
        </Text>
        <Text>{this.props.pushEvent.actor.login}</Text>
        <Text>at {this.props.pushEvent.repo.name}</Text>
      </View>
    );
  }
}

export default PushPayload;
