import React, { Component } from 'react';
import { AppRegistry, View, ActivityIndicator } from 'react-native';
import Login from './src/components/Login';
import AppContainer from './src/components/AppContainer';
import AuthService from './src/services/AuthService';

class GithubBrowser extends Component {
  state = { isLoggedIn: false, checkingAuth: true };

  componentDidMount() {
    AuthService.getAuthInfo((err, authInfo) => {
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
        <View style={{ flex: 1 }}>
          <ActivityIndicator
            style={{ justifyContent: 'center', alignSelf: 'center' }}
            animating={animating}
            size="large"
          />
        </View>
      );
    }

    if (this.state.isLoggedIn) {
      return (
        <AppContainer />
      );
    }

    return (
      <Login onLogin={this.onLogin.bind(this)} />
    );
  }
}

AppRegistry.registerComponent('GithubBrowser', () => GithubBrowser);
