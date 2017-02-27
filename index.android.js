import React, { Component } from 'react';
import { AppRegistry, View, Text, ActivityIndicator } from 'react-native';
import Login from './src/components/Login';
import AuthService from './src/services/AuthService';

class GithubBrowser extends Component {
  state = { isLoggedIn: false, checkingAuth: true };

  componentDidMount() {
    AuthService.getAuthInfo((err, authInfo) => {
      // console.log('authInfo', authInfo);
      this.setState({
        checkingAuth: false,
        isLoggedIn: authInfo != null
      });
    });
  }

  onLogin() {
    this.setState({ isLoggedIn: true });
  }

  render() {
    if (this.state.checkingAuth) {
      const animating = true;
      return (
        <View>
          <ActivityIndicator
            animating={animating}
            size="large"
          />
        </View>
      );
    }

    if (this.state.isLoggedIn) {
      return (
        <View>
          <Text>Welcome!!!</Text>
        </View>
      );
    }

    return (
      <Login onLogin={this.onLogin.bind(this)} />
    );
  }
}

AppRegistry.registerComponent('GithubBrowser', () => GithubBrowser);
