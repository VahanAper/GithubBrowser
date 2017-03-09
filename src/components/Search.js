import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet
} from 'react-native';

class Search extends Component {
  state = { searchQuery: '' };

  onSearchPressed() {
    console.log('Attempting to search for ', this.state.searchQuery);
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          onChangeText={(value) => this.setState({ searchQuery: value })}
          style={styles.input}
          placeholder="Search Query"
          underlineColorAndroid="transparent"
        />
        <TouchableHighlight style={styles.button} onPress={this.onSearchPressed.bind(this)}>
          <Text style={styles.buttonStyle}>Search</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    paddingTop: 100,
    alignItems: 'center',
    padding: 30
  },
  heading: {
    fontSize: 30,
    marginTop: 10
  },
  input: {
    height: 50,
    // marginTop: 10,
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
    marginTop: 20,
    justifyContent: 'center'
  },
  buttonStyle: {
    fontSize: 22,
    color: '#FFFFFF',
    alignSelf: 'center'
  }
});

export default Search;
