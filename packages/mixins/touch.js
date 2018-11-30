export default {
  methods: {
    touchStart (event) {
      this.startX = event.touches[0].clientX
      this.startY = event.touches[0].clientY
    },

    touchMove (event) {
      this.deltaX = event.touches[0].clientX - this.startX
      this.deltaY = event.touches[0].clientY - this.startY
      this.offsetX = Math.abs(this.deltaX)
      this.offsetY = Math.abs(this.deltaY)
      this.direction = this.offsetX > this.offsetY ? 'horizontal' : this.offsetX < this.offsetY ? 'vertical' : ''
    },

    resetTouchStatus () {
      this.deltaX = 0
      this.deltaY = 0
      this.offsetX = 0
      this.offsetY = 0
      this.direction = ''
    }
  }
}
