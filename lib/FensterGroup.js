export default class FensterGroup {
  constructor(groupName) {
    this.name = groupName
    this.components = []
  }

  add(name, component) {
    this.components.push({ name, component })
  }

  toArray() {
    return this.components.map(entry => ({ group: this.name, ...entry }))
  }
}
