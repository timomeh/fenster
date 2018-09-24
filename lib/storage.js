import { AsyncStorage } from 'react-native'

const STORE_KEY = '@Fenster:data'

export function restoreState() {
  return AsyncStorage.getItem(STORE_KEY)
    .then(result => JSON.parse(result) || {})
    .then(json => {
      return Object.keys(json).reduce((acc, key) => {
        if (json[key] !== null) acc[key] = json[key]
        return acc
      }, {})
    })
    .catch(() => ({}))
}

export function storeState(json) {
  const data = {
    isActive: json.isActive,
    hasUi: json.hasUi,
    activeFensterIndex: json.activeFensterIndex
  }

  return AsyncStorage.setItem(STORE_KEY, JSON.stringify(data))
}
