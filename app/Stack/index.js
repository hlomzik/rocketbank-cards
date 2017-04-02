// @flow

import React from 'react'
import { ScrollView } from 'react-native'

import ScrollItem from './Item'

type StackProps = { children?: Element[] }
// Event don't have contentOffset :(
type ScollEvent = { nativeEvent: Event & { contentOffset: { y: number }} }

export default class Stack extends React.Component {
  props: StackProps

  state = { shift: 0 }

  onScroll = (e: ScollEvent) => {
    const y = e.nativeEvent.contentOffset.y
    console.log(y, e.nativeEvent)
    // there is a problem with changing contentSize.height
    // and contentOffset.y sometimes dropped to zero,
    // so for now just ignore such cases and think about height;
    // also ignore scrolling up (y > 0)
    if (y < 0) this.setState({ shift: -y })
  }

  render() {
    const items = this.props.children || []

    return (
      // call it every frame (once in 16ms)
      <ScrollView onScroll={this.onScroll} scrollEventThrottle={16}>{
        items.map((child, i) => (
          <ScrollItem
            key={i}
            gap={this.state.shift * (i + 1)}
            >
            {child}
          </ScrollItem>
        ))
      }</ScrollView>
    )
  }
}
