// @flow

import React from 'react'
import { Animated, ScrollView, Text, View } from 'react-native'

import { scaleLinear as scale } from 'd3-scale'

type StackProps = { children?: Element[] }
// Event don't have contentOffset :(
type ScollEvent = { nativeEvent: Event & { contentOffset: { y: number }} }

// @todo don't hardcode it this way; should be calculated from screen width
const cardBlockHeight = 180

export default class Stack extends React.Component {
  props: StackProps
  view: ScrollView

  state = { shift: new Animated.Value(0) }

  onScroll = Animated.event([{
    nativeEvent: { contentOffset: { y: this.state.shift } }
  }])

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
            <Animated.View style={{
              padding: 40,
              paddingVertical: 0,
              opacity: this.state.shift.interpolate({
                inputRange: [ h * i + h / 5, h * i + h],
                outputRange: [ 1, 0.2 ],
                extrapolate: 'clamp'
              }),
              transform: [
                { perspective: 1000 },
                { translateY: this.state.shift.interpolate({
                  inputRange: [ 0, h * i ],
                  outputRange: [ 0, -h * i ],
                  extrapolate: 'clamp'
                })},
                { rotateX: this.state.shift.interpolate({
                  inputRange: [ h * i - h, h * i + h ],
                  outputRange: [ '-40deg', '0deg' ],
                  extrapolate: 'clamp'
                })},
              ]
              }}>
              {child}
            </Animated.View>
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
