# fenster

fenster for React Native is a simple way to view and develop your components in
isolation. Compared to [storybook](https://storybook.js.org), fenster doesn't
use a second bundler and also doesn't expose another App. Instead fenster is
a part of your app and simply uses the metro bundler, which already bundles your
app. No worries, fenster won't be included in production builds.

fenster stores which component you're currently viewing, so even if you reload
the app to see changes, it won't lose its state.

## Table of Contents

- [Install](#install)
- [Setup](#setup)
- [Usage](#usage)
- [License](#license)

## Install

```sh
npm install fenster
```

## Setup

Wrap your whole app inside `FensterRahmen` and pass an array of components,
which fenster should display.


```js
// App.js

import React from 'react'
import { FensterRahmen } from 'fenster'

import HomeScreen from './HomeScreen'
import fenster from './fenster'

export default class App extends React.Component {
  render() {
    return (
      <FensterRahmen components={fenster}>
        <HomeScreen />
      </FensterRahmen>
    )
  }
}
```

```js
// fenster.js

import HomeScreen from './HomeScreen'
import FancyButton from './FancyButton'

export default [
  { name: 'Example Screen', component: ExampleScreen },
  { name: 'Button', component: Button }
]
```

## Usage

Open the fenster UI by swiping from right to left at the bottom of the
screen.

Close the active fenster by pressing the X next to the active component name.

![](.github/screenshot-closed.jpg) ![](.github/screenshot-open.jpg)

## License

MIT © Timo Mämecke
