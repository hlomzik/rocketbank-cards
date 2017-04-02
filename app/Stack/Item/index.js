// @flow

import React from 'react'
import { View } from 'react-native'

type StackItemProps = { children?: Element, gap: number }

const StackItem = ({ children, gap }: StackItemProps) => (
  <View style={{ height: gap }}>{children}</View>
)

export default StackItem
