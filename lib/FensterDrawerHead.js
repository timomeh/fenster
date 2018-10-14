import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

export default class FensterDrawerHead extends React.PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>fenster</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    paddingHorizontal: 16,
    paddingVertical: 10,
    justifyContent: 'flex-end',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.12)',
    marginBottom: 10
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black'
  }
})
