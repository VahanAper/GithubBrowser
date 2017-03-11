import React, { Component } from 'react';
import {
  View,
  Text,
  ListView,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class SearchResults extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      dataSource: ds,
      showProgress: true,
      searchQuery: props.searchQuery
    };
  }

  componentDidMount() {
    this.doSearch();
  }

  doSearch() {
    const searchQuery = encodeURIComponent(this.state.searchQuery);
    const url = `https://api.github.com/search/repositories?q=${searchQuery}`;

    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          repositories: responseData.items,
          dataSource: this.state.dataSource.cloneWithRows(responseData.items)
        });
      })
      .finally(() => {
        this.setState({
          showProgress: false
        });
      });
  }

  renderRow(rowData) {
    return (
      <View
        style={{
          padding: 20,
          borderColor: '#D7D7D7',
          borderBottomWidth: 1,
          backgroundColor: '#FFFFFF'
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: '600'
          }}
        >
          {rowData.full_name}
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
            marginBottom: 20
          }}
        >
          <View style={styles.repoCell}>
            <Icon name="ios-star-outline" size={30} />
            <Text style={styles.repoCellLabel}>{rowData.stargazers_count}</Text>
          </View>
          <View style={styles.repoCell}>
            <Icon name="ios-git-branch" size={30} />
            <Text style={styles.repoCellLabel}>{rowData.forks}</Text>
          </View>
          <View style={styles.repoCell}>
            <Icon name="ios-alert-outline" size={30} />
            <Text style={styles.repoCellLabel}>{rowData.open_issues}</Text>
          </View>
        </View>
      </View>
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

const styles = StyleSheet.create({
  repoCell: {
    width: 50,
    alignItems: 'center'
  },
  repoCellIcon: {
    width: 20,
    height: 20
  },
  repoCellLabel: {
    textAlign: 'center'
  }
});

export default SearchResults;
