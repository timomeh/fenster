import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

import SectionTitle from './SectionTitle'
import FensterDrawerItem from './FensterDrawerItem'

// Shows the currently active fenster, or the last used fenster.
export default class FensterDrawerActive extends React.PureComponent {
  static propTypes = {
    isActive: PropTypes.bool,
    onPress: PropTypes.func.isRequired,
    onClosePress: PropTypes.func.isRequired,
    activeFensterName: PropTypes.string
  }

  render() {
    const {
      name,
      isActive,
      onPress,
      onClosePress,
      activeFensterName
    } = this.props

    if (!activeFensterName) return null

    return (
      <View style={styles.container}>
        <SectionTitle>{isActive ? 'Active' : 'Last'} fenster</SectionTitle>
        <FensterDrawerItem
          name={activeFensterName}
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
    marginBottom: 4
  }
})
