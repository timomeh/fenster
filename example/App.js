import React from 'react'
import { FensterRahmen } from 'fenster'

import fenster from './fenster'
import ExampleScreen from './ExampleScreen'

export default class App extends React.Component {
  render() {
    return (
      <FensterRahmen components={fenster}>
        <ExampleScreen />
      </FensterRahmen>
    )
  }
}
