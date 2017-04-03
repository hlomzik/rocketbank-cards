// @flow

import React from 'react'
import { View } from 'react-native'

type StackItemProps = {
  children?: Element,
  opacity?: number,
  transform?: Object[]
}

const StackItem = ({ children, opacity, transform }: StackItemProps) => (
  <View style={{
    position: 'absolute', top: 0,
    width: '100%',
    opacity, transform
  }}>{children}</View>
)

export default StackItem
