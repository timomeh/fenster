import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default class ExampleScreen2 extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>This is example screen 2.</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
