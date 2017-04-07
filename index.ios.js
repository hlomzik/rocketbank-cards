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

import Stack from './app/Stack'
import Card from './app/Card'

export default class RocketbankCards extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Stack>
          <Card name="Рублевая карта" amount={31337} currency="₽" />
          <Card name="Долларовая карта" amount={800} currency="$" />
          <Card name="Зарплатная карта" amount={200000} currency="₽" />
          <Card name="Запасная карта" amount={1000} currency="€" />
          <Card name="Запасная карта" amount={1000} currency="€" />
          <Card name="Запасная карта" amount={1000} currency="€" />
        </Stack>
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
