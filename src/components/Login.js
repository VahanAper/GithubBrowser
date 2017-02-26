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
import { Buffer } from 'buffer';
import logo from '../images/octocat.png';

class Login extends Component {
  state = { showProgress: false };

  onLoginPress() {
    this.setState({ showProgress: true, username: '', password: '' });

    const userPass = Buffer(`${this.state.username}:${this.state.password}`);
    const encodedAuth = userPass.toString('base64');

    window.fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `Basic ${encodedAuth}`
      }
    })
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response;
      }
      throw {
        badCredentials: response.status === 401,
        unknownError: response.status !== 401
      };
    })
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      console.log(result);
      this.setState({ success: true });
    })
    .catch((error) => {
      console.log(error);
      this.setState(error);
    })
    .finally(() => {
      this.setState({ showProgress: false });
      console.log(this.state);
    });
  }

  renderProgress() {
    return !this.state.showProgress
      ? null
      : (
          <ActivityIndicator
            size="large"
            style={styles.loader}
          />
        );
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
