const path = require('path')
const blacklist = require('metro/src/blacklist')
const glob = require('glob-to-regexp')
const libPackages = require('../package.json')

const dependencies = Object.keys(libPackages.dependencies)
const peerDependencies = Object.keys(libPackages.peerDependencies)

module.exports = {
  getProjectRoots() {
    return [__dirname, path.resolve(__dirname, '..')]
  },

  getProvidesModuleNodeModules() {
    return [...dependencies, ...peerDependencies]
  },

  getBlacklistRE() {
    return blacklist([glob(`${path.resolve(__dirname, '..')}/node_modules/*`)])
  }
}
