import React from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures'

import FensterDrawerItem from './FensterDrawerItem'
import FensterDrawerHead from './FensterDrawerHead'
import FensterDrawerActive from './FensterDrawerActive'

export default class FensterDrawer extends React.PureComponent {
  static propTypes = {
    components: PropTypes.array.isRequired,
    onItemPress: PropTypes.func.isRequired,
    onClosePress: PropTypes.func.isRequired,
    activeComponent: PropTypes.string,
    isOpen: PropTypes.bool,
    isFensterOpen: PropTypes.bool
  }

  static listTypes = {
    HEAD: 'head',
    ACTIVE_FENSTER: 'active_fenster',
    COMPONENT: 'component'
  }

  handleItemPress = componentName => () => {
    this.props.onItemPress(componentName)
  }

  renderItem = ({ item }) => {
    const {
      activeComponent: activeComponentName,
      onClosePress,
      components,
      isOpen,
      isFensterOpen
    } = this.props

    const activeComponent = components.find(
      comp => comp.name === activeComponentName
    )

    switch (item.type) {
      case FensterDrawer.listTypes.HEAD:
        return <FensterDrawerHead />
      case FensterDrawer.listTypes.ACTIVE_FENSTER:
        return (
          <FensterDrawerActive
            activeComponent={activeComponent}
            isActive={isFensterOpen}
            onClosePress={onClosePress}
            onPress={this.handleItemPress(activeComponentName)}
          />
        )
      case FensterDrawer.listTypes.COMPONENT:
        return (
          <FensterDrawerItem
            {...item}
            isActive={isFensterOpen && activeComponentName === item.name}
            onPress={this.handleItemPress(item.name)}
          />
        )
    }
  }

  render() {
    const { isOpen, components } = this.props
    if (!isOpen) return null

    const listItems = [
      { type: FensterDrawer.listTypes.HEAD, key: 'head' },
      { type: FensterDrawer.listTypes.ACTIVE_FENSTER, key: 'active_fenster' },
      ...components.map(component => ({
        type: FensterDrawer.listTypes.COMPONENT,
        key: `component-${component.name}`,
        ...component
      }))
    ]

    return (
      <View style={styles.background}>
        <FlatList
          contentContainerStyle={styles.card}
          data={listItems}
          renderItem={this.renderItem}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 99999
  },
  card: {
    marginLeft: '20%',
    height: '100%',
    width: '80%',
    backgroundColor: 'white',
    flex: 1
  }
})
