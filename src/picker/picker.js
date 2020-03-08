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
    empty: {
      type: String,
      default: 'No Items',
    },
    placeholder: {
      type: String,
      default: null,
    },
  },
  data() {
    const normalizedOptions = this.normalizeOptions(this.options)
    const defaultValue = normalizedOptions[0] && normalizedOptions[0].value
    let innerIndex = this.placeholder ? -1 : 0 // default
    let innerValue = this.placeholder ? null : (typeof defaultValue === 'undefined' ? null : defaultValue)
    if (this.value != null) {
      normalizedOptions.forEach((option, index) => {
        if (option.value == this.value) {
          innerIndex = index
          innerValue = option.value
          return false
        }
      })
    }
    return {
      normalizedOptions,
      innerIndex,
      innerValue,

      top: 0,
      pivots: null,
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
    if (this.innerValue !== this.value) {
      this.$emit('input', this.innerValue)
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
  watch: {
    value(value) {
      let foundIndex = this.placeholder ? -1 : 0
      this.normalizedOptions.forEach((option, index) => {
        if (option.value == value) {
          foundIndex = index
          return false
        }
      })
      if (this.innerIndex !== foundIndex) {
        this.correction(foundIndex)
      }
    },
    options(options) {
      this.normalizedOptions = this.normalizeOptions(options)

      const initIndex = this.innerIndex >= options.length ? options.length - 1 : 0
      const defaultValue = this.normalizedOptions[initIndex] && this.normalizedOptions[initIndex].value
      let foundIndex = this.placeholder ? -1 : initIndex // default
      let foundValue = this.placeholder ? null : (typeof defaultValue === 'undefined' ? null : defaultValue)
      this.normalizedOptions.forEach((option, index) => {
        if (option.value == this.innerValue) {
          foundIndex = index
          foundValue = option.value
          return false
        }
      })
      this.$nextTick(() => {
        this.calculatePivots()
        if (this.innerIndex !== foundIndex || this.innerValue !== foundValue) {
          this.top = foundIndex > -1 ? this.pivots[foundIndex] * (-1) : 0
          this.innerIndex = foundIndex
          this.innerValue = foundValue
          this.$emit('input', this.innerValue)
        }
      })
    }
  },
  methods: {
    normalizeOptions(options) {
      return options.map((option) => option.hasOwnProperty('value') && option.hasOwnProperty('name') ? option : { value: option, name: option })
    },
    calculatePivots(){
      const rect = this.$refs.selection.getBoundingClientRect()
      const med = (rect.top + rect.bottom) / 2

      this.pivots = (this.$refs.items || []).map((item) => {
        const { top, bottom } = item.getBoundingClientRect()
        return Math.round(((top + bottom) / 2 - med) * 10) / 10 - this.top
      }).sort((a, b) => a - b)

      this.scrollMax = this.pivots[this.pivots.length - 1] * (-1)
      if (this.innerIndex > -1) {
        this.top = this.pivots[this.innerIndex] * (-1)
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
        this.correction(this.innerIndex - Math.floor(Math.abs(e.deltaY) / 30 * this.scrollSensitivity + 1))
      } else if (e.deltaY > 0) {
        this.correction(this.innerIndex + Math.floor(Math.abs(e.deltaY) / 30 * this.scrollSensitivity + 1))
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
        this.correction(this.innerIndex - 1)
      } else if (bottomRect.left <= x && x <= bottomRect.right && bottomRect.top <= y && y <= bottomRect.bottom) {
        this.correction(this.innerIndex + 1)
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
      this.top = index > -1 ? this.pivots[index] * (-1) : 0

      this.transitioning = true
      if (this.transitionTO) {
        clearTimeout(this.transitionTO)
        this.transitionTO = null
      }
      if (this.innerIndex !== index) {
        this.innerIndex = index
      }

      this.transitionTO = setTimeout(() => {
        this.transitioning = false
        this.transitionTO = null
        this.innerValue = index > -1 ? this.normalizedOptions[index].value : null
        this.$emit('input', this.innerValue)
      }, 100)
    },
  },
  render(h) {
    let items = []
    if (this.normalizedOptions.length === 0 && this.placeholder === null) {
      items.push(h("div", {
        class: ["vue-scroll-picker-item", "-empty", "-selected"],
        ref: "empty",
        domProps: {
          innerHTML: this.empty,
        },
      }))
    }
    if (this.placeholder) {
      items.push(h("div", {
        class: {
          "vue-scroll-picker-item": true,
          "-placeholder": true,
          "-selected": this.innerIndex == -1,
        },
        ref: "placeholder",
        domProps: {
          innerHTML: this.placeholder,
        },
      }))
    }
    items = items.concat(this.normalizedOptions.map((option, index) => {
      return h("div", {
        class: {
          "vue-scroll-picker-item": true,
          "-selected": this.innerIndex == index,
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
