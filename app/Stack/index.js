// @flow

import React from 'react'
import { Animated, Easing, ScrollView, Text, View } from 'react-native'

import { scaleLinear as scale } from 'd3-scale'

type StackProps = { children?: Element[] }
// Event don't have contentOffset :(
type ScollEvent = { nativeEvent: Event & { contentOffset: { y: number }} }

// @todo don't hardcode it this way; should be calculated from screen width
const cardBlockHeight = 180
// make cards closer to each other; this's necessary because of rotation
// and jusr for nice look
const k = 0.8

export default class Stack extends React.Component {
  props: StackProps
  view: ScrollView

  state = { shift: new Animated.Value(0) }

  onScroll = Animated.event([{
    nativeEvent: { contentOffset: { y: this.state.shift } }
  }])

  /** Scroll to the last card on init ASAP */
  componentDidMount () {
    // @todo for long additional content here should be
    // scrolling to the end of all cards and with
    // card reducing coefficient in mind.
    const items = this.props.children || []
    const count = items.length
    const y = cardBlockHeight * (count - 1) * k

    // but it's ok for now to just scroll to the end.
    setTimeout(() => this.view.scrollToEnd())
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
        <View style={{
          marginBottom: cardBlockHeight * (1 - k) / 2
        }}>{items.map((child, i) => (
          // we need a wrapper to place each card on separate z layer
          // to not cross and overlap with others during rotation
          <View key={i} style={{
            height: cardBlockHeight * k,
            transform: [{ perspective: count - i }]
          }}>
            <Animated.View style={{
              padding: 40,
              paddingVertical: 0,
              opacity: this.state.shift.interpolate({
                inputRange: [ k * h * i + h / 2, k * h * count ],
                outputRange: [ 1, 0.2 ],
                easing: Easing.out(Easing.cubic),
                extrapolate: 'clamp'
              }),
              transform: [
                { perspective: 1000 },
                { translateY: this.state.shift.interpolate({
                  inputRange: i ? [
                    0,
                    // before this point just a linear move down
                    k * h * (count + i - 1) / 2
                    // start moving card some cards before;
                    // second card should go after the first,
                    // prev to last should go only on its turn,
                    // so here is some kind of gaussian
                    // k * h * (i + i * (count - i - 1) / count)
                    )
                  ] : [ 0, 0 ],
                  outputRange: i ? [
                    0,
                    k * -h * i,
                  ] : [ 0, 0 ],
                  // the lesser index — the curvier curve
                  // last card has linear easing
                  easing: Easing.bezier(
                    .6 + .4 * i / (count - 1),
                    1,
                    1,
                    1,
                  ),
                  extrapolate: 'clamp'
                })},
                { rotateX: this.state.shift.interpolate({
                  inputRange: [ h * i - h, h * i + h ],
                  outputRange: [ '-30deg', '0deg' ],
                  extrapolate: 'clamp'
                })},
                { scaleY: this.state.shift.interpolate({
                  inputRange: [ h * i - h, h * i + h ],
                  outputRange: [ 0.8, 1 ],
                  extrapolate: 'clamp'
                })},
                { scaleX: this.state.shift.interpolate({
                  inputRange: [ h * i - h, h * count - h ],
                  outputRange: [ 1, 0.6 ],
                  easing: Easing.bezier(.4, 0, .4, 0),
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
