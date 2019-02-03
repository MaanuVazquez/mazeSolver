const Node = require('./Node')
const AStar = require('./AStarAlgorithm').getInstance()

class Graph {
  constructor (grid) {
    this.nodes = []
    this.dirtyNodes = []
    this.grid = grid.map((row, rowIndex) => {
      return row.map((column, columnIndex) => {
        const node = new Node(rowIndex, columnIndex, column)
        this.nodes.push(node)
        return node
      })
    })
    this.init()
  }

  cleanDirty () {
    this.dirtyNodes.forEach(node => AStar.cleanNode(node))
    this.dirtyNodes = []
  }

  getNodeAt (x, y) {
    return this.grid[x][y]
  }

  init () {
    this.nodes.forEach(node => AStar.cleanNode(node))
  }

  markDirty (node) {
    this.dirtyNodes.push(node)
  }

  neighbours (node) {
    const neighbours = []
    const { x, y } = node
    const grid = this.grid

    const NORTH = grid[x - 1] && grid[x - 1][y]
    const SOUTH = grid[x + 1] && grid[x + 1][y]
    const WEST = grid[x] && grid[x][y - 1]
    const EAST = grid[x] && grid[x][y + 1]

    if (NORTH) {
      neighbours.push(NORTH)
    }

    if (SOUTH) {
      neighbours.push(SOUTH)
    }

    if (WEST) {
      neighbours.push(WEST)
    }

    if (EAST) {
      neighbours.push(EAST)
    }

    return neighbours
  }
}

module.exports = Graph
