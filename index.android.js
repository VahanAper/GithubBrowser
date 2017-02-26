import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import Login from './src/components/Login';

export default class GithubBrowser extends Component {
  render() {
    return (
      <Login />
    );
  }
}

AppRegistry.registerComponent('GithubBrowser', () => GithubBrowser);
