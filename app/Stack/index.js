// @flow

import React from 'react'
import { ScrollView } from 'react-native'

import ScrollItem from './Item'

type StackProps = { children?: Element[] }

const Stack = ({ children }: StackProps) => (
  <ScrollView>{children && children.map((child, i) => (
    <ScrollItem key={i} gap={20 + i * 50}>{child}</ScrollItem>
  ))}</ScrollView>
)

export default Stack
