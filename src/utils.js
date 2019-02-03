const fs = require('fs')
const BinaryHeap = require('./BinaryHeap')

function bufferToMaze (buffer) {
  if (!buffer) throw new Error('No buffer entered')
  const stringBuffer = buffer.toString()

  return stringBuffer
    .replace(/_/g, 0)
    .replace(/ /g, 1)
    .split('\r\n')
    .map(row => row.split(''))
}

function getHeap () {
  return new BinaryHeap(node => node.f)
}

function manhattanHeuristic (firstPosition, secondPosition) {
  const firstDistance = Math.abs(secondPosition.x - firstPosition.y)
  const secondDistance = Math.abs(secondPosition.y - firstPosition.y)
  return firstDistance + secondDistance
}

function outputPath (maze, winningPath, [startRow, startColumn], [endRow, endColumn]) {
  const cloneMaze = maze.slice(0)

  winningPath.forEach(({ x, y }) => {
    cloneMaze[x][y] = '.'
  })

  cloneMaze[startRow][startColumn] = 'I'
  cloneMaze[endRow][endColumn] = 'E'

  return cloneMaze
    .map(row =>
      row
        .map(column => {
          if (column === '1') return ' '
          if (column === '0') return '_'
          return column
        })
        .join(' ')
    )
    .join('\r\n')
}

function pathTo (node, path = []) {
  if (!node.parent) {
    path.push(node)
    return path
  }
  path.unshift(node)
  return pathTo(node.parent, path)
}

function prepareMaze (maze) {
  let marks = {}
  const mazeWithoutMarks = maze.map((row, rowIndex) => {
    return row.map((column, columnIndex) => {
      if (column === 'I') {
        marks.start = [rowIndex, columnIndex]
        return '1'
      }

      if (column === 'E') {
        marks.end = [rowIndex, columnIndex]
        return '1'
      }
      return column
    })
  })

  return {
    ...marks,
    maze: mazeWithoutMarks
  }
}

function readDir (path) {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, data) => {
      if (err) return reject(err)
      resolve(data)
    })
  })
}

function readFile (path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) return reject(err)
      resolve(data)
    })
  })
}

module.exports = {
  bufferToMaze,
  getHeap,
  manhattanHeuristic,
  outputPath,
  pathTo,
  prepareMaze,
  readDir,
  readFile
}
