import React from 'react'
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback
} from 'react-native'
import PropTypes from 'prop-types'

export default class Modal extends React.PureComponent {
  static propTypes = {
    onDismiss: PropTypes.func.isRequired,
    onExit: PropTypes.func.isRequired,
    onEnter: PropTypes.func.isRequired,
    onHideUi: PropTypes.func.isRequired,
    onShowUi: PropTypes.func.isRequired,
    isFensterActive: PropTypes.bool,
    isInsideFenster: PropTypes.bool,
    isUiVisible: PropTypes.bool
  }

  render() {
    const {
      onDismiss,
      onEnter,
      onExit,
      onBack,
      onShowUi,
      onHideUi,
      isFensterActive,
      isInsideFenster,
      isUiVisible
    } = this.props

    return (
      <View style={styles.window}>
        <TouchableWithoutFeedback onPress={onDismiss}>
          <View style={styles.closeArea} />
        </TouchableWithoutFeedback>

        {!isFensterActive && (
          <View style={styles.sheet}>
            <TouchableHighlight
              style={styles.button}
              underlayColor="rgba(0, 0, 0, 0.2)"
              onPress={onEnter}
            >
              <Text style={styles.buttonText}>Enter Fenster</Text>
            </TouchableHighlight>
          </View>
        )}

        {isFensterActive && (
          <View style={styles.sheet}>
            <TouchableHighlight
              style={styles.button}
              underlayColor="rgba(0, 0, 0, 0.2)"
              onPress={onExit}
            >
              <Text style={styles.buttonText}>Exit Fenster</Text>
            </TouchableHighlight>
          </View>
        )}

        {isUiVisible && (
          <View style={styles.sheet}>
            <TouchableHighlight
              style={styles.button}
              underlayColor="rgba(0, 0, 0, 0.2)"
              onPress={onHideUi}
            >
              <Text style={styles.buttonText}>Hide Fenster UI</Text>
            </TouchableHighlight>
          </View>
        )}

        {!isUiVisible && (
          <View style={styles.sheet}>
            <TouchableHighlight
              style={styles.button}
              underlayColor="rgba(0, 0, 0, 0.2)"
              onPress={onShowUi}
            >
              <Text style={styles.buttonText}>Show Fenster UI</Text>
            </TouchableHighlight>
          </View>
        )}

        {isFensterActive && isInsideFenster && (
          <View style={styles.sheet}>
            <TouchableHighlight
              style={styles.button}
              underlayColor="rgba(0, 0, 0, 0.2)"
              onPress={onBack}
            >
              <Text style={styles.buttonText}>Back to Fenster List</Text>
            </TouchableHighlight>
          </View>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  window: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    flex: 1
  },
  closeArea: {
    flex: 1
  },
  sheet: {
    flex: 0,
    backgroundColor: 'white'
  },
  buttonText: {
    fontSize: 16
  },
  button: {
    padding: 16
  }
})
