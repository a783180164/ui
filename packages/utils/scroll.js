export default {
  getScrollEventTarget (element, rooParent = window) {
    let currentNode = element
    while (currentNode && currentNode.tagName !== 'HTML' && currentNode.tagName !== 'BODY' && currentNode.nodeType === 1 && currentNode !== rooParent) {
      const overflowY = this.getComputedStyle(currentNode).overflowY
      if (overflowY === 'scroll' || overflowY === 'auto') {
        return currentNode
      }
      currentNode = currentNode.parentNode
    }
    return rooParent
  },

  getScrollTop (element) {
    return 'scrollTop' in element ? element.scrollTop : element.pageYOffset
  },

  getElementTop (element) {
    return (element === window ? 0 : element.getBoundingClientRect().top) + this.getScrollTop(window)
  },

  getVisibleHeight (element) {
    return element === window ? element.innerHeight : element.getBoundingClientRect().height
  },

  getComputedStyle: document.defaultView.getComputedStyle.bind(document.defaultView)
}
