import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

import FensterDrawerItem from './FensterDrawerItem'

export default class FensterDrawerActive extends React.PureComponent {
  static propTypes = {
    isActive: PropTypes.bool,
    onPress: PropTypes.func.isRequired,
    onClosePress: PropTypes.func.isRequired,
    activeComponent: PropTypes.object
  }

  render() {
    const { name, isActive, onPress, onClosePress, activeComponent } = this.props

    if (!activeComponent) return null

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{isActive ? 'Active' : 'Last'} Fenster</Text>
        <FensterDrawerItem
          {...activeComponent}
          isActive={isActive}
          onPress={onPress}
          onClosePress={onClosePress}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.12)',
    paddingBottom: 10,
    marginBottom: 10
  },
  title: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.4)',
    fontWeight: '700',
    marginBottom: 8,
    marginHorizontal: 16
  }
})
