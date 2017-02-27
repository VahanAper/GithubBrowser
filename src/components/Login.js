import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableHighlight,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import AuthService from '../services/AuthService';
import logo from '../images/octocat.png';

class Login extends Component {
  state = { showProgress: false };

  onLoginPress() {
    this.setState({ showProgress: true, username: '', password: '' });

    AuthService.login({
      username: this.state.username,
      password: this.state.password
    }, (results) => {
      this.setState({ ...results, showProgress: false });
    });
  }

  renderProgress() {
    return !this.state.showProgress ? null :
      (<ActivityIndicator size="large" style={styles.loader} />);
  }

  renderError() {
    if (!this.state.success && this.state.badCredentials) {
      return (
        <Text style={styles.errorStyle}>
          The username or password is incorrect.
        </Text>
      );
    }
    if (!this.state.success && this.state.unknownError) {
      return (
        <Text style={styles.errorStyle}>
          We experienced an unexpected error.
        </Text>
      );
    }
  }

  render() {
    const passwordInput = true;

    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={logo}
        />
        <Text style={styles.heading}>
          Github browser
        </Text>
        <TextInput
          onChangeText={(value) => this.setState({ username: value })}
          style={styles.input}
          placeholder="Github username"
          underlineColorAndroid="transparent"
        />
        <TextInput
          onChangeText={(value) => this.setState({ password: value })}
          secureTextEntry={passwordInput}
          style={styles.input}
          placeholder="Github password"
          underlineColorAndroid="transparent"
        />
        <TouchableHighlight style={styles.button} onPress={this.onLoginPress.bind(this)}>
          <Text style={styles.buttonStyle}>Login</Text>
        </TouchableHighlight>
        {this.renderError()}
        {this.renderProgress()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
    padding: 10
  },
  logo: {
    width: 66,
    height: 55
  },
  heading: {
    fontSize: 30,
    marginTop: 10
  },
  input: {
    height: 50,
    marginTop: 10,
    padding: 4,
    fontSize: 18,
    borderWidth: 0.5,
    borderColor: '#48BBEC',
    alignSelf: 'stretch'
  },
  button: {
    height: 50,
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center'
  },
  buttonStyle: {
    fontSize: 22,
    color: '#FFFFFF',
    alignSelf: 'center'
  },
  loader: {
    marginTop: 20,
    height: 50
  },
  errorStyle: {
    color: 'red',
    padding: 10
  }
});

export default Login;
