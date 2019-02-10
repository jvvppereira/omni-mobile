import React, { Component } from 'react';

import {
  KeyboardAvoidingView,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class pages extends Component {
  state = {
    userName: ''
  };

  async componentDidMount() {
    const userName = await AsyncStorage.getItem('@OmniStack:userName');

    if (userName) {
      this.props.navigation.navigate('App');
    }
  }

  handleInputChange = (userName) => {
    this.setState({ userName });
  };

  handleLogin = async () => {
    const { userName } = this.state;

    if (!userName.length) return;

    await AsyncStorage.setItem('@OmniStack:userName', userName);

    this.props.navigation.navigate('App');
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.content}>
          <View>
            <Icon name="twitter" size={64} color="#4BB0EE" />
          </View>

          <TextInput
            style={styles.input}
            placeholder="Nome de usuário"
            value={this.state.userName}
            onChangeText={this.handleInputChange}
            returnKeyType="send"
            onSubmitEditing={this.handleLogin}
          />

          <TouchableOpacity onPress={this.handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30
  },

  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    height: 44,
    paddingHorizontal: 15,
    alignSelf: 'stretch',
    marginTop: 30
  },

  button: {
    height: 44,
    alignSelf: 'stretch',
    marginTop: 10,
    backgroundColor: '#4BB0EE',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold'
  }
});