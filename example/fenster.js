import ExampleScreen from './ExampleScreen'
import ExampleScreen2 from './ExampleScreen2'
import Button from './Button'

export default [
  { group: 'Screens', name: 'Home', component: ExampleScreen },
  { group: 'Screens', name: 'Settings', component: ExampleScreen2 },
  { name: 'FancyButton', component: Button }
]
