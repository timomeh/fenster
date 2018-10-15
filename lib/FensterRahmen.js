import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures'

import FensterDrawer from './FensterDrawer'
import { restoreState, storeState } from './storage'

export default class FensterRahmen extends React.PureComponent {
  static propTypes = {
    components: PropTypes.array,
    frame: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
    children: PropTypes.node
  }

  static defaultProps = {
    components: [],
    frame: ({ children }) => (
      <View style={styles.fensterWrapper}>{children}</View>
    )
  }

  layout = {}
  state = {
    isInitializing: true,
    isDrawerOpen: false,
    isFensterOpen: false,
    activeComponent: null
  }

  componentDidMount() {
    restoreState().then(state => {
      this.setState({ isInitializing: false, ...state })
    })
  }

  setPersistedState = state => {
    storeState({ ...this.state, ...state }).then(() => this.setState(state))
  }

  handleItemPress = activeComponent => {
    this.setPersistedState({
      activeComponent,
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
    const { activeComponent } = this.state
    const { components } = this.props

    const fensterComponent = components.find(c => c.name === activeComponent)
    if (!fensterComponent) {
      console.error('Fenster Component not found: ' + activeComponent)
      return null
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
    const { isDrawerOpen, isFensterOpen, activeComponent } = this.state
    const { children, components } = this.props

    return (
      <GestureRecognizer
        onSwipeLeft={this.handleSwipeLeft}
        onSwipeRight={this.handleSwipeRight}
        onLayout={this.handleLayout}
        style={StyleSheet.absoluteFill}
      >
        <FensterDrawer
          components={components}
          isOpen={isDrawerOpen}
          isFensterOpen={isFensterOpen}
          onItemPress={this.handleItemPress}
          onClosePress={this.handleClosePress}
          activeComponent={activeComponent}
        />
        {isFensterOpen ? this.getActiveComponent() : children}
      </GestureRecognizer>
    )
  }
}

const styles = StyleSheet.create({
  fensterWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
