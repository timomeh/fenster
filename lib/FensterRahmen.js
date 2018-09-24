import React from 'react'
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  StatusBar
} from 'react-native'
import PropTypes from 'prop-types'

import Modal from './Modal'
import FensterNavigator from './FensterNavigator'
import { restoreState, storeState } from './storage'

export const FensterContext = React.createContext()
export const FensterConsumer = FensterContext.Consumer

export default class FensterRahmen extends React.PureComponent {
  static propTypes = {
    components: PropTypes.array,
    children: PropTypes.node
  }

  static defaultProps = {
    components: []
  }

  constructor(props) {
    super(props)

    this.state = {
      isInitializing: true,
      isActive: false,
      hasUi: true,
      isModalVisible: false,
      activeFensterIndex: -1
    }
  }

  componentDidMount() {
    restoreState().then(state => {
      this.setState({ isInitializing: false, ...state })
    })
  }

  setPersistedState = state => {
    storeState({ ...this.state, ...state }).then(() => this.setState(state))
  }

  handleButtonPress = () => {
    this.setState({ isModalVisible: true })
  }

  handleModalDismiss = () => {
    this.setState({ isModalVisible: false })
  }

  handleEnterRahmen = () => {
    this.setState({ isModalVisible: false })
    this.setPersistedState({ isActive: true })
  }

  handleExitRahmen = () => {
    this.setState({ isModalVisible: false })
    this.setPersistedState({ isActive: false })
  }

  handleHideUi = () => {
    this.setState({ isModalVisible: false })
    this.setPersistedState({ hasUi: false })
  }

  handleShowUi = () => {
    this.setState({ isModalVisible: false })
    this.setPersistedState({ hasUi: true })
  }

  handleEnterFenster = name => {
    this.setPersistedState({ activeFensterIndex: name })
  }

  handleExitFenster = name => {
    this.setPersistedState({ activeFensterIndex: -1 })
  }

  handleBackRahmen = () => {
    this.setState({ isModalVisible: false })
    this.setPersistedState({ activeFensterIndex: -1 })
  }

  renderActivateButton = () => (
    <TouchableWithoutFeedback
      onLongPress={this.handleButtonPress}
      delayLongPress={500}
    >
      <View style={styles.touchArea} />
    </TouchableWithoutFeedback>
  )

  render() {
    const {
      isActive,
      hasUi,
      isInitializing,
      isModalVisible,
      activeFensterIndex
    } = this.state
    const { children, components } = this.props

    if (isInitializing) return null

    return (
      <View style={styles.screen}>
        <FensterContext.Provider value={{ hasUi }}>
          {isActive ? (
            <FensterNavigator
              components={components}
              activeFensterIndex={activeFensterIndex}
              onEnterFenster={this.handleEnterFenster}
              onExitFenster={this.handleExitFenster}
            />
          ) : (
            children
          )}
        </FensterContext.Provider>
        {this.renderActivateButton()}
        {isModalVisible && (
          <Modal
            isFensterActive={isActive}
            isInsideFenster={activeFensterIndex > -1}
            isUiVisible={hasUi}
            onDismiss={this.handleModalDismiss}
            onEnter={this.handleEnterRahmen}
            onExit={this.handleExitRahmen}
            onBack={this.handleBackRahmen}
            onHideUi={this.handleHideUi}
            onShowUi={this.handleShowUi}
          />
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    position: 'relative'
  },
  touchArea: {
    position: 'absolute',
    width: 50,
    height: 50,
    right: 0,
    top: StatusBar.currentHeight
  }
})
