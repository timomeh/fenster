import React from 'react'
import { Text, StyleSheet } from 'react-native'

export default class SectionTitle extends React.PureComponent {
  render() {
    return <Text style={styles.title} {...this.props} />
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.4)',
    fontWeight: '700',
    marginVertical: 8,
    marginHorizontal: 16
  }
})
