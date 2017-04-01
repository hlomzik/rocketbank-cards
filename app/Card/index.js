/* @flow */

import React from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'

const Card = ({ name, amount, currency }) => (
  <View style={styles.card}>
    <Text style={styles.name}>{name}</Text>
    <Text style={styles.money}>
      <Text style={styles.amount}>{amount}</Text>
      <Text style={styles.currency}>{currency}</Text>
    </Text>
  </View>
)

export default Card

const styles = StyleSheet.create({
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
  }
})

