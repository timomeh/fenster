import React from 'react'
import { View, SectionList, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures'

import SectionTitle from './SectionTitle'
import FensterDrawerItem from './FensterDrawerItem'
import FensterDrawerHead from './FensterDrawerHead'
import FensterDrawerActive from './FensterDrawerActive'

export default class FensterDrawer extends React.PureComponent {
  static propTypes = {
    components: PropTypes.array.isRequired,
    onItemPress: PropTypes.func.isRequired,
    onClosePress: PropTypes.func.isRequired,
    activeFensterName: PropTypes.string,
    isOpen: PropTypes.bool,
    isFensterOpen: PropTypes.bool
  }

  static listTypes = {
    HEAD: 'head',
    ACTIONS: 'actions',
    COMPONENTS: 'components'
  }

  getComponentSections = () => {
    const { components } = this.props

    const componentSections = components.reduce((acc, component) => {
      if (component.group) {
        const title = component.group
        acc[title] = acc[title] || []
        acc[title].push({
          ...component,
          key: component.group + ':' + component.name
        })
      } else {
        acc['Components'] = acc['Components'] || []
        acc['Components'].push({ ...component, key: component.name })
      }
      return acc
    }, {})

    const componentSectionsArray = Object.keys(componentSections).map(sec => ({
      type: FensterDrawer.listTypes.COMPONENTS,
      title: sec,
      data: componentSections[sec]
    }))

    return componentSectionsArray
  }

  handleItemPress = componentName => () => {
    this.props.onItemPress(componentName)
  }

  renderSectionHeader = ({ section }) => {
    const {
      activeFensterName,
      onClosePress,
      components,
      isFensterOpen
    } = this.props

    const activeComponent = components.find(c => c.name === activeFensterName)

    switch (section.type) {
      case FensterDrawer.listTypes.HEAD:
        return <FensterDrawerHead />
      case FensterDrawer.listTypes.ACTIONS:
        return (
          <FensterDrawerActive
            activeFensterName={activeFensterName}
            isActive={isFensterOpen}
            onClosePress={onClosePress}
            onPress={this.handleItemPress(activeFensterName)}
          />
        )
      case FensterDrawer.listTypes.COMPONENTS:
        return <SectionTitle>{section.title}</SectionTitle>
    }
  }

  renderItem = ({ item, section }) => {
    if (section.type !== FensterDrawer.listTypes.COMPONENTS) return null

    const { activeFensterName, isFensterOpen } = this.props

    return (
      <FensterDrawerItem
        name={item.name}
        isActive={isFensterOpen && activeFensterName === item.name}
        onPress={this.handleItemPress(item.name)}
      />
    )
  }

  render() {
    if (!this.props.isOpen) return null

    const sections = [
      { type: FensterDrawer.listTypes.HEAD, data: [] },
      { type: FensterDrawer.listTypes.ACTIONS, data: [] },
      ...this.getComponentSections()
    ]

    return (
      <View style={styles.background}>
        <SectionList
          contentContainerStyle={styles.card}
          sections={sections}
          renderSectionHeader={this.renderSectionHeader}
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
    width: '80%',
    minHeight: '100%',
    backgroundColor: 'white'
  }
})
