import React from 'react'

import PropTypes from 'prop-types'

import { FensterConsumer } from './FensterRahmen'

export default class Fenster extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node
  }

  render() {
    return <FensterConsumer>{({ hasUi }) => this.props.children}</FensterConsumer>
  }
}
