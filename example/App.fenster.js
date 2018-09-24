import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { Fenster } from 'fenster'
import PropTypes from 'prop-types'

export default class AppFenster extends React.PureComponent {
  render() {
    return (
      <Fenster>
        <Text style={styles.text}>Hallo von der anderen Seite!</Text>
      </Fenster>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16
  }
})
