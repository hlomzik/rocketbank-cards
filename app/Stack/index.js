// @flow

import React from 'react'
import { ScrollView, Text, View } from 'react-native'

import { scaleLinear as scale } from 'd3-scale'

type StackProps = { children?: Element[] }
// Event don't have contentOffset :(
type ScollEvent = { nativeEvent: Event & { contentOffset: { y: number }} }

// @todo don't hardcode it this way; should be calculated from screen width
const cardBlockHeight = 180

export default class Stack extends React.Component {
  props: StackProps
  view: ScrollView

  state = { shift: cardBlockHeight * 3 }

  onScroll = (e: ScollEvent) => {
    const y = e.nativeEvent.contentOffset.y
    // just stick on start values on scrolling up
    this.setState({ shift: y > 0 ? y : 0 })
  }

  /** Scroll to the last card on init ASAP */
  componentDidMount () {
    const items = this.props.children || []
    const count = items.length
    const y = cardBlockHeight * (count - 1)

    setTimeout(() => {
      this.view.scrollTo({ x: 0, y, animate: false })
    })
  }

  render() {
    const items = this.props.children || []
    const count = items.length
    const { shift } = this.state
    const h = cardBlockHeight

    return (
      <ScrollView
        onScroll={this.onScroll}
        // call it every frame (once in 16ms)
        scrollEventThrottle={16}
        // make all the cards effects in isolated static "header"
        // it doesn't affect scrolling and avoids scrolling lags
        stickyHeaderIndices={[ 0 ]}
        style={{ paddingTop: 40 }}
        // used to scroll after mount only
        ref={view => { this.view = view }}
        >
        <View>{items.map((child, i) => (
          // we need a wrapper to place each card on separate z layer
          // to not cross and overlap with others during rotation
          <View key={i} style={{ transform: [{ perspective: count - i }] }}>
            <View style={{
              padding: 40,
              paddingVertical: 0,
              opacity: (10 - count + 1 + i) / 10,
              transform: [
                { perspective: 1000 },
                { translateY: scale()
                  .clamp(true)
                  .domain([ 0, h * i ])
                  .range([ 0, -h * i ])
                  (shift)
                },
                // don't flip it over and over, limit angle
                { rotateX: `${Math.max(-35, -shift * (i + 1))}deg` },
              ]
              }}>
              {child}
            </View>
          </View>
        ))}</View>
        {/* @todo hardcoded value for iPhone 6; use real sizes */}
        <View style={{ minHeight: 430, padding: 20 }}>
          <Text>Some other elements</Text>
        </View>
      </ScrollView>
    )
  }
}
