/* @flow */

import React from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'

const Card = (props: CardProps) => {
  const { name, amount, currency} = props
  const { style = {} } = props
  const { width = '100%', height = 180, margin = 0 } = props
  return <View style={[ styles.card, { width, height, margin }, style ]}>
    <Text style={styles.name}>{name}</Text>
    <Text style={styles.money}>
      <Text style={styles.amount}>{formatAmount(amount)}</Text>
      <Text style={styles.currency}> {currency}</Text>
    </Text>
  </View>
}

export default Card

type CardProps = {
  name: string,
  amount: string|number,
  currency: string,
  style?: Object,
  width?: number,
  height?: number,
  margin?: number
}

const formatAmount = amount => ('' + amount)
  // put space after digits followed by groups of 3 digits only
  .replace(/(\d+)(?=(\d{3})+(\D|$))/, '$1 ')

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'orange',
    borderRadius: 10,
    justifyContent: 'space-between',
    padding: 25,

    shadowColor: '#ee7600',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 1,
    shadowRadius: -1,
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

