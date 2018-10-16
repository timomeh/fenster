import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import Touchable from 'react-native-platform-touchable'

// A button for one fenster.
export default class FensterDrawerItem extends React.PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    isActive: PropTypes.bool,
    onPress: PropTypes.func.isRequired,
    onClosePress: PropTypes.func
  }

  render() {
    const { name, isActive, onClosePress, onPress } = this.props

    return (
      <View style={styles.item}>
        <Touchable
          style={[styles.touchable, isActive && styles.touchableActive]}
          onPress={onPress}
        >
          <View style={styles.inner}>
            <Text
              style={[styles.name, isActive && styles.nameActive]}
              numberOfLines={1}
            >
              {name}
            </Text>
            {isActive &&
              onClosePress && (
                <View style={styles.close}>
                  <Touchable onPress={onClosePress} style={styles.closeInner}>
                    <Text style={styles.closeIcon}>×</Text>
                  </Touchable>
                </View>
              )}
          </View>
        </Touchable>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    height: 36,
    marginHorizontal: 8,
    marginVertical: 2,
    borderRadius: 5,
    overflow: 'hidden'
  },
  touchable: {
    flex: 1
  },
  touchableActive: {
    backgroundColor: 'rgba(102, 31, 255, 0.12)'
  },
  inner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  close: {
    width: 36,
    height: 36,
    borderRadius: 20,
    overflow: 'hidden',
    marginHorizontal: 4
  },
  closeInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  closeIcon: {
    fontSize: 26,
    fontWeight: '700',
    color: 'rgba(102, 31, 255, 1)',
    lineHeight: 30
  },
  name: {
    flex: 1,
    alignItems: 'center',
    fontSize: 14,
    color: 'black',
    fontWeight: '600',
    paddingHorizontal: 8,
    color: 'rgba(0, 0, 0, 1)'
  },
  nameActive: {
    color: 'rgba(102, 31, 255, 1)'
  }
})
