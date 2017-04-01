/* @flow */

import React from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'

type CardProps = { name: string, amount: string|number, currency: string }

const Card = ({ name, amount, currency }: CardProps) => (
  <View style={styles.card}>
    <Text style={styles.name}>{name}</Text>
    <Text style={styles.money}>
      <Text style={styles.amount}>{formatAmount(amount)}</Text>
      <Text style={styles.currency}> {currency}</Text>
    </Text>
  </View>
)

export default Card

const formatAmount = amount => ('' + amount)
  // put space after digits followed by groups of 3 digits only
  .replace(/(\d+)(?=(\d{3})+(\D|$))/, '$1 ')

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'orange',
    borderRadius: 10,
    height: 200,
    justifyContent: 'space-between',
    margin: 20,
    padding: 25,
    shadowColor: 'black',
    shadowRadius: 5,
    shadowOpacity: 0.3
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

