Object.defineProperty(exports, '__esModule', {
  value: true
})

if (__DEV__) {
  exports.FensterRahmen = require('./FensterRahmen').default
  exports.Fenster = require('./Fenster').default
} else {
  const FensterReiniger = ({ children }) => children
  exports.FensterRahmen = FensterReiniger
  exports.Fenster = FensterReiniger
}
