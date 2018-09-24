import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'

import FensterList from './FensterList'

export default class FensterNavigator extends React.PureComponent {
  static propTypes = {
    components: PropTypes.array.isRequired,
    activeFensterIndex: PropTypes.number.isRequired,
    onEnterFenster: PropTypes.func.isRequired,
    onExitFenster: PropTypes.func.isRequired
  }

  render() {
    const { activeFensterIndex, ...rest } = this.props

    if (activeFensterIndex === -1) return <FensterList {...rest} />

    const CurrentFenster = this.props.components[activeFensterIndex].component
    return <CurrentFenster />
  }
}
