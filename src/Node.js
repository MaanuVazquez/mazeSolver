class Node {
  constructor (x, y, weight) {
    this.x = x
    this.y = y
    this.weight = Number(weight)
  }

  getCost () {
    return this.weight
  }

  isObstacle () {
    return this.weight === 0
  }
}

module.exports = Node
