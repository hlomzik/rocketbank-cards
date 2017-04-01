/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class RocketbankCards extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.name}>Рублевая карта</Text>
          <Text style={styles.money}>
            <Text style={styles.amount}>10 000</Text>
            <Text style={styles.currency}>$</Text>
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch'
  },
  card: {
    justifyContent: 'space-between',
    backgroundColor: 'orange',
    height: 200,
    margin: 20,
    padding: 25,
    borderRadius: 10
  },
  name: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600'
  },
  money: {
    color: 'white',
    fontSize: 40,
    fontWeight: '600'
  },
  currency: {
    paddingLeft: 30
  },

  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('RocketbankCards', () => RocketbankCards);
