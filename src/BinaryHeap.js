class BinaryHeap {
  constructor (scoreFn) {
    this.scoreFn = scoreFn
    this.content = []
  }

  bubbleUp (nodeIndex) {
    const heapSize = this.content.length

    const element = this.content[nodeIndex]
    const elementScore = this.scoreFn(element)

    const secondChildIndex = (nodeIndex + 1) << 1
    const firstChildIndex = secondChildIndex - 1

    let swap
    let firstChildScore

    if (firstChildIndex < heapSize) {
      const childElement = this.content[firstChildIndex]
      firstChildScore = this.scoreFn(childElement)
      if (firstChildScore < elementScore) {
        swap = firstChildIndex
      }
    }

    if (secondChildIndex < heapSize) {
      const childElement = this.content[secondChildIndex]
      if (this.scoreFn(childElement) < (swap ? firstChildScore : elementScore)) {
        swap = secondChildIndex
      }
    }

    if (!swap) return

    this.content[nodeIndex] = this.content[swap]
    this.content[swap] = element
    this.bubbleUp(swap)
  }

  pop () {
    const poppedElement = this.content[0]
    const lastElement = this.content.pop()

    if (this.content.length) {
      this.content[0] = lastElement
      this.bubbleUp(0)
    }

    return poppedElement
  }

  push (element) {
    this.content.push(element)
    this.sinkDown(this.content.length - 1)
  }

  remove (node) {
    const nodeIndex = this.content.indexOf(node)
    const lastElement = this.content.pop()

    if (nodeIndex === this.content.length - 1) return

    this.content[nodeIndex] = lastElement

    if (this.scoreFn(lastElement) < this.scoreFn(node)) {
      this.sinkDown(nodeIndex)
    } else {
      this.bubbleUp(nodeIndex)
    }
  }

  rescoreElement (node) {
    this.sinkDown(this.content.indexOf(node))
  }

  sinkDown (nodeIndex) {
    if (nodeIndex <= 0) return

    const element = this.content[nodeIndex]

    const parentIndex = ((nodeIndex + 1) >> 1) - 1
    const parentElement = this.content[parentIndex]

    if (this.scoreFn(element) < this.scoreFn(parentElement)) {
      this.content[parentIndex] = element
      this.content[nodeIndex] = parentElement
      this.sinkDown(parentIndex)
    }
  }

  size () {
    return this.content.length
  }
}

module.exports = BinaryHeap
