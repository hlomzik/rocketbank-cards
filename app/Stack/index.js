// @flow

import React from 'react'
import { ScrollView, View } from 'react-native'

import StackItem from './Item'

type StackProps = { children?: Element[] }
// Event don't have contentOffset :(
type ScollEvent = { nativeEvent: Event & { contentOffset: { y: number }} }

export default class Stack extends React.Component {
  props: StackProps

  state = { shift: 0 }

  onScroll = (e: ScollEvent) => {
    const y = e.nativeEvent.contentOffset.y
    // there is a problem with changing contentSize.height
    // and contentOffset.y sometimes dropped to zero,
    // so for now just ignore such cases and think about height;
    // also ignore scrolling up (y > 0)
    if (y < 0) this.setState({ shift: -y })
  }

  render() {
    const items = this.props.children || []
    const count = items.length
    const { shift } = this.state

    return (
      // call it every frame (once in 16ms)
      <ScrollView
        onScroll={this.onScroll}
        scrollEventThrottle={16}
        >{items.map((child, i) => (
          // we need a wrapper to place each card on separate z layer
          // to not cross and overlap with others during rotation
          <View key={i} style={{ transform: [{ perspective: 10 - i }] }}>
            <StackItem
              opacity={(10 - count + 1 + i) / 10}
              transform={[
                { perspective: 1000 },
                { translateY: shift * (i + 1) ** 2 },
                // don't flip it over and over, limit angle
                { rotateX: `${Math.max(-35, -shift * (i + 1))}deg` },
              ]}
              >
              {child}
            </StackItem>
          </View>
      ))}</ScrollView>
    )
  }
}
