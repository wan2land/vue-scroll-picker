import "./picker.scss"


const isTouchable = typeof window !== "undefined" && "ontouchstart" in window

export default {
  props: {
    value: null,
    options: {
      type: Array,
      default: () => [],
    },
    dragSensitivity: {
      type: Number,
      default: 1.7,
    },
    touchSensitivity: {
      type: Number,
      default: 1.7,
    },
    scrollSensitivity: {
      type: Number,
      default: 1,
    },
    placeholder: String,
  },
  data() {
    let lastIndex = this.placeholder ? -1 : 0
    if (this.value) {
      this.options.forEach((option, index) => {
        if (option == this.value || option.value == this.value) {
          lastIndex = index
        }
      })
    }
    return {
      top: 0,
      pivots: null,
      lastIndex: lastIndex,
      transitioning: false,
      transitionTO: null,
      startTop: null,
      isMouseDown: false,
      isDragging: false,
      isScrolling: false,
      startY: null,
      scrollMax: null,
    }
  },
  mounted() {
    if (isTouchable) {
      this.$el.addEventListener("touchstart", this.onStart)
      this.$el.addEventListener("touchmove", this.onTouchMove)
      this.$el.addEventListener("touchend", this.onEnd)
      this.$el.addEventListener("touchcancel", this.onCancel)
    } else {
      this.$el.addEventListener("mousewheel", this.onScroll)
      this.$el.addEventListener("wheel", this.onScroll) // for IE
      this.$el.addEventListener("mousedown", this.onStart)
      this.$el.addEventListener("mousemove", this.onMouseMove)
      this.$el.addEventListener("mouseup", this.onEnd)
      this.$el.addEventListener("mouseleave", this.onCancel)
    }
    this.calculatePivots()
    if (!this.value && this.sanitizedOptions[this.lastIndex]) {
      this.$emit('input', this.sanitizedOptions[this.lastIndex].value)
    }
  },
  destroyed() {
    if (isTouchable) {
      this.$el.removeEventListener("touchstart", this.onStart)
      this.$el.removeEventListener("touchmove", this.onTouchMove)
      this.$el.removeEventListener("touchend", this.onEnd)
      this.$el.removeEventListener("touchcancel", this.onCancel)
    } else {
      this.$el.removeEventListener("mousewheel", this.onScroll)
      this.$el.removeEventListener("wheel", this.onScroll) // for IE
      this.$el.removeEventListener("mousedown", this.onStart)
      this.$el.removeEventListener("mousemove", this.onMouseMove)
      this.$el.removeEventListener("mouseup", this.onEnd)
      this.$el.removeEventListener("mouseleave", this.onCancel)
    }
  },
  computed: {
    sanitizedOptions() {
      return this.options.map((option) => {
        if (option.hasOwnProperty('value') && option.hasOwnProperty('name')) {
          return option
        }
        return {
          value: option,
          name: option,
        }
      })
    },
  },
  watch: {
    value(newValue, oldValue) {
      let foundIndex = -1
      this.sanitizedOptions.forEach((option, index) => {
        if (option.value == newValue) foundIndex = index
      })
      if (this.lastIndex !== foundIndex) {
        this.correction(foundIndex)
      }
    },
    options() {
      this.$nextTick(() => {
        this.calculatePivots()
      })
    }
  },
  methods: {
    calculatePivots(){
      const rect = this.$refs.selection.getBoundingClientRect()
      const med = (rect.top + rect.bottom) / 2

      this.pivots = this.$refs.items.map((item) => {
        const itemRect = item.getBoundingClientRect()
        return Math.round(((itemRect.top + itemRect.bottom) / 2 - med) * 10) / 10 - this.top
      })

      this.scrollMax = this.pivots[this.pivots.length - 1] * (-1)
      if (this.lastIndex > 0) {
        this.top = this.pivots[this.lastIndex] * (-1)
      }
    },
    onScroll(e) {
      if (this.top >= 0 && e.deltaY < 0) return
      if (this.top <= this.scrollMax && e.deltaY > 0) return

      e.preventDefault()
      e.stopPropagation()

      if (this.isScrolling) return
      this.isScrolling = true

      if (e.deltaY < 0) {
        this.correction(this.lastIndex - Math.floor(Math.abs(e.deltaY) / 30 * this.scrollSensitivity + 1))
      } else if (e.deltaY > 0) {
        this.correction(this.lastIndex + Math.floor(Math.abs(e.deltaY) / 30 * this.scrollSensitivity + 1))
      }
      setTimeout(() => {
        this.isScrolling = false
      }, 80)
    },
    getTouchInfo (e) {
      return isTouchable ? e.changedTouches[0] || e.touches[0] : e
    },
    onStart (e) {
      if (e.cancelable) {
        e.preventDefault()
        e.stopPropagation()
      }
      const touchInfo = this.getTouchInfo(e)
      this.startTop = this.top
      this.startY = touchInfo.pageY
      if (!isTouchable) {
        this.isMouseDown = true
      }
      this.isDragging = false
    },
    onTouchMove(e) {
      e.preventDefault()
      e.stopPropagation()
      if (isTouchable || this.isMouseDown) {
        const touchInfo = this.getTouchInfo(e)
        const diff = touchInfo.pageY - this.startY
        if (Math.abs(diff) > 1.5) {
          this.isDragging = true
        }
        this.top = this.startTop + diff * this.touchSensitivity
      }
    },
    onMouseMove(e) {
      e.preventDefault()
      e.stopPropagation()
      if (isTouchable || this.isMouseDown) {
        const touchInfo = this.getTouchInfo(e)
        const diff = touchInfo.pageY - this.startY
        if (Math.abs(diff) > 1.5) {
          this.isDragging = true
        }
        this.top = this.startTop + diff * this.dragSensitivity
      }
    },
    onEnd(e) {
      e.preventDefault()
      e.stopPropagation()
      if (!this.isDragging) {
        this.isDragging = false
        this.isMouseDown = false
        this.handleClick(e)
        return
      }
      this.isDragging = false
      this.isMouseDown = false
      this.correctionAfterDragging()
    },
    onCancel(e) {
      e.preventDefault()
      e.stopPropagation()
      if (isTouchable || this.isMouseDown) {
        this.correctionAfterDragging()
        this.isMouseDown = false
        this.isDragging = false
      }
    },
    handleClick(e) {
      const touchInfo = this.getTouchInfo(e)
      const x = touchInfo.clientX // not pageX (pageX = clientX + scrollLeft)
      const y = touchInfo.clientY // not pageY (pageY = clientY + scrollTop)
      const topRect = this.$refs.top.getBoundingClientRect()
      const bottomRect = this.$refs.bottom.getBoundingClientRect()
      if (topRect.left <= x && x <= topRect.right && topRect.top <= y && y <= topRect.bottom) {
        this.correction(this.lastIndex - 1)
      } else if (bottomRect.left <= x && x <= bottomRect.right && bottomRect.top <= y && y <= bottomRect.bottom) {
        this.correction(this.lastIndex + 1)
      }
    },
    correctionAfterDragging () {
      let index = null
      let diff = null
      const top = this.top
      if (this.placeholder) {
        index = -1
        diff = 0 + top
      }
      this.pivots.forEach((pivot, i) => {
        const _diff = pivot + top
        if (diff === null || Math.abs(diff) > Math.abs(_diff)) {
          index = i
          diff = _diff
        }
      })
      this.correction(index)
    },
    correction(index) {
      index = Math.min(Math.max(index, this.placeholder ? -1 : 0), this.pivots.length - 1)
      if (this.lastIndex !== index) {
        this.lastIndex = index
        this.$emit('input', index > -1 ? this.sanitizedOptions[index].value : null)
      }

      this.top = index > -1 ? this.pivots[index] * (-1) : 0
      this.transitioning = true
      if (this.transitionTO) {
        clearTimeout(this.transitionTO)
        this.transitionTO = null
      }
      this.transitionTO = setTimeout(() => {
        this.transitioning = false
        this.transitionTO = null
      }, 100)
    },
  },
  render(h) {
    let items = []
    if (this.placeholder) {
      items.push(h("div", {
        class: {
          "vue-scroll-picker-item": true,
          "-placeholder": true,
          "-selected": this.lastIndex == -1,
        },
        ref: "placeholder",
        domProps: {
          innerHTML: this.placeholder,
        },
      }))
    }
    items = items.concat(this.sanitizedOptions.map((option, index) => {
      return h("div", {
        class: {
          "vue-scroll-picker-item": true,
          "-selected": this.lastIndex == index,
        },
        key: option.value,
        ref: "items",
        refInFor: true,
        domProps: {
          innerHTML: option.name,
        },
      })
    }))
    return h("div", {class: ["vue-scroll-picker"]}, [
      h("div", {class: ["vue-scroll-picker-list"]}, [
        h("div", {
          class: {
            "vue-scroll-picker-list-rotator": true,
            "-transition": this.transitioning,
          },
          style: {
            top: `${this.top}px`,
          }
        }, items)
      ]),
      h("div", {class: ["vue-scroll-picker-layer"]}, [
        h("div", {class: ["top"], ref: "top"}),
        h("div", {class: ["middle"], ref: "selection"}),
        h("div", {class: ["bottom"], ref: "bottom"}),
      ]),
    ])
  }
}
