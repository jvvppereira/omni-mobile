import React, { Component } from 'react';

import { View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Tweet from '../components/Tweet';

import api from '../services/api';

import socket from 'socket.io-client';

export default class Timeline extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Tweets',
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate('New')}>
        <Icon
          style={{ marginRight: 10 }}
          name="add-circle-outline"
          size={24}
          color="#4BB0EE"
        />
      </TouchableOpacity>
    )
  });

  state = {
    tweets: []
  };

  subscribeToEvents = () => {
    const io = socket('https://omni-back.herokuapp.com/');

    io.on('tweet', (data) => {
      this.setState({ tweets: [data, ...this.state.tweets] });
    });

    io.on('like', (data) => {
      this.setState({
        tweets: this.state.tweets.map((tweet) =>
          tweet._id === data._id ? data : tweet
        )
      });
    });
  };

  async componentDidMount() {
    this.subscribeToEvents();

    const response = await api.get('tweets');

    this.setState({
      tweets: response.data
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.tweets.map((tweet) => (
          <Tweet key={tweet._id} tweet={tweet} />
        ))}

        <FlatList
          data={this.state.tweets}
          keyExtractor={(tweet) => tweet._id}
          renderItem={({ item }) => <Tweet tweet={item} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  }
});
