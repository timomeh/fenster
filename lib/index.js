Object.defineProperty(exports, '__esModule', {
  value: true
})

if (__DEV__) {
  exports.FensterRahmen = require('./FensterRahmen').default
  exports.FensterGroup = require('./FensterGroup').default
} else {
  const FensterReiniger = ({ children }) => children
  exports.FensterGroup = require('./FensterGroup').default
  exports.FensterRahmen = FensterReiniger
}
