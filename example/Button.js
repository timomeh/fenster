import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default class Button extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Test</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  }
})
