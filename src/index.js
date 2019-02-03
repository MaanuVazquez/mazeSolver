const { readFile, readDir, bufferToMaze, prepareMaze, outputPath } = require('./utils')
const AStartSearch = require('./AStarAlgorithm').getInstance()
const Graph = require('./Graph')

const MAZES_DIR = `${process.cwd()}/mazes`

function solveMaze (bufferMaze) {
  const { start, end, maze } = prepareMaze(bufferToMaze(bufferMaze))
  const [startRow, startColumn] = start
  const [endRow, endColumn] = end
  const graph = new Graph(maze)

  const startNode = graph.getNodeAt(startRow, startColumn)
  const endNode = graph.getNodeAt(endRow, endColumn)

  const pathToEnd = AStartSearch.search(graph, startNode, endNode)

  console.log(outputPath(maze, pathToEnd, start, end))
}

readDir(process.argv[2] || MAZES_DIR)
  .then(files => {
    files.forEach(async file => {
      let bufferMaze
      try {
        bufferMaze = await readFile(`${MAZES_DIR}/${file}`)
      } catch (error) {
        console.log(error.message)
        return
      }
      solveMaze(bufferMaze)
      console.log('------------------------------------------------------------------')
    })
  })
  .catch(error => {
    console.log(error.message)
  })
