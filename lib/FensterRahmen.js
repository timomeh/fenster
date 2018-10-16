import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures'

import FensterDrawer from './FensterDrawer'
import { restoreState, storeState } from './storage'

// The wrapper around the app.
export default class FensterRahmen extends React.PureComponent {
  static propTypes = {
    components: PropTypes.array,
    frame: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
    children: PropTypes.node
  }

  static defaultProps = {
    components: [],
    frame: ({ children }) => children
  }

  layout = {}
  state = {
    isInitializing: true,
    isDrawerOpen: false,
    isFensterOpen: false,
    activeFensterName: null
  }

  componentDidMount() {
    restoreState().then(state => {
      this.setState({ isInitializing: false, ...state })
    })
  }

  setPersistedState = state => {
    storeState({ ...this.state, ...state }).then(() => this.setState(state))
  }

  handleItemPress = activeFensterName => {
    this.setPersistedState({
      activeFensterName,
      isFensterOpen: true,
      isDrawerOpen: false
    })
  }

  handleClosePress = () => {
    this.setPersistedState({ isFensterOpen: false, isDrawerOpen: false })
  }

  handleSwipeLeft = swipe => {
    if (swipe.y0 >= this.layout.height - 100) {
      this.setState({ isDrawerOpen: true })
    }
  }

  handleSwipeRight = () => {
    this.setState({ isDrawerOpen: false })
  }

  handleLayout = ({ nativeEvent }) => {
    this.layout = { ...nativeEvent.layout }
  }

  getActiveComponent = () => {
    const { activeFensterName } = this.state
    const { components } = this.props

    const fensterComponent = components.find(c => c.name === activeFensterName)
    if (!fensterComponent) {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Text>Fenster not found:</Text>
          <Text>{activeFensterName}</Text>
        </View>
      )
    }

    const { frame: Frame } = this.props
    const { component: Component } = fensterComponent
    return (
      <Frame>
        <Component />
      </Frame>
    )
  }

  render() {
    const { isDrawerOpen, isFensterOpen, activeFensterName } = this.state
    const { children, components } = this.props

    return (
      <GestureRecognizer
        style={StyleSheet.absoluteFill}
        onSwipeLeft={this.handleSwipeLeft}
        onSwipeRight={this.handleSwipeRight}
        onLayout={this.handleLayout}
      >
        {isFensterOpen ? this.getActiveComponent() : children}
        <FensterDrawer
          components={components}
          isOpen={isDrawerOpen}
          isFensterOpen={isFensterOpen}
          onItemPress={this.handleItemPress}
          onClosePress={this.handleClosePress}
          activeFensterName={activeFensterName}
        />
      </GestureRecognizer>
    )
  }
}
