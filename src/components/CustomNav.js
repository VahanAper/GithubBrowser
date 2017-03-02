import React, { Component } from 'react';
import {
  Text,
  Navigator
} from 'react-native';

class CustomNav extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{ title: 'Awesome Scene', index: 0 }}
        renderScene={(route, navigator) => {
          console.log('navigator from CustomNav', navigator);
          return <Text>Hello {route.title}!</Text>;
        }
        }
        style={{ padding: 100 }}
      />
    );
  }
}

export default CustomNav;
