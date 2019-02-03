const { manhattanHeuristic: heuristic, pathTo, getHeap } = require('./utils')

let instance

class AStarAlgorithm {
  static getInstance () {
    if (instance) return instance
    instance = new AStarAlgorithm()
    return instance
  }

  search (graph, start, end) {
    graph.cleanDirty()
    const openHeap = getHeap()

    start.h = heuristic(start, end)
    graph.markDirty(start)

    openHeap.push(start)

    while (openHeap.size() > 0) {
      const currentNode = openHeap.pop()

      if (currentNode === end) {
        return pathTo(currentNode)
      }

      currentNode.closed = true

      const neighbours = graph.neighbours(currentNode)

      neighbours.forEach(neighbour => {
        if (neighbour.closed || neighbour.isObstacle()) return

        const gScore = currentNode.g + neighbour.getCost(currentNode)

        const isVisited = neighbour.visited

        if (isVisited && gScore >= neighbour.g) return

        neighbour.visited = true
        neighbour.parent = currentNode
        neighbour.h = neighbour.h || heuristic(neighbour, end)
        neighbour.g = gScore
        neighbour.f = neighbour.g + neighbour.h
        graph.markDirty(neighbour)

        if (!isVisited) {
          openHeap.push(neighbour)
        } else {
          openHeap.rescoreElement(neighbour)
        }
      })
    }

    return []
  }

  cleanNode (node) {
    node.f = 0
    node.g = 0
    node.h = 0
    node.visited = false
    node.closed = false
    node.parent = null
  }
}

module.exports = AStarAlgorithm
