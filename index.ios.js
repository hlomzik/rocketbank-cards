/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View
} from 'react-native';

import Card from './app/Card'

export default class RocketbankCards extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Card name="Рублевая карта" amount="10000" currency="$" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch'
  }
});

AppRegistry.registerComponent('RocketbankCards', () => RocketbankCards);
