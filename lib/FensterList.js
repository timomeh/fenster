import React from 'react'
import {
  View,
  Text,
  TouchableHighlight,
  FlatList,
  StyleSheet
} from 'react-native'
import PropTypes from 'prop-types'

export default class FensterList extends React.PureComponent {
  static propTypes = {
    components: PropTypes.array.isRequired,
    onEnterFenster: PropTypes.func.isRequired,
    onExitFenster: PropTypes.func.isRequired
  }

  handleItemPress = index => () => {
    this.props.onEnterFenster(index)
  }

  getItemKey = item => item.name

  renderItem = ({ item, index, separators }) => {
    return (
      <TouchableHighlight
        onPress={this.handleItemPress(index)}
        onShowUnderlay={separators.highlight}
        onHideUnderlay={separators.unhighlight}
      >
        <View style={styles.listItem}>
          <Text>{item.name}</Text>
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    const { components } = this.props

    return (
      <View style={styles.screen}>
        <FlatList
          data={components}
          renderItem={this.renderItem}
          keyExtractor={this.getItemKey}
          ItemSeparatorComponent={ItemSeparator}
          ListHeaderComponent={ItemSeparator}
          ListFooterComponent={ItemSeparator}
          style={styles.list}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#EFEFEF',
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start'
  },
  list: {
    paddingVertical: 40
  },
  listItem: {
    flex: 0,
    padding: 16,
    backgroundColor: '#FFFFFF'
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#CDCDCD'
  }
})

const ItemSeparator = () => <View style={styles.separator} />
