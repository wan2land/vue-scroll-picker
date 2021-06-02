import "./picker.scss"


function debounce(handle, delay) {
  let timeout = null
  return function () {
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }
    const self = this
    const args = arguments
    timeout = setTimeout(() => handle.apply(self, args), delay)
  }
}

function getClientCenterY(elem) {
  const { top, bottom } = elem.getBoundingClientRect()
  return (top + bottom) / 2
}

function normalizeOptions(options) {
  return options.map((option) => {
    switch (typeof option) {
      case 'string': {
        return { value: option, name: option }
      }
      case 'number':
      case 'boolean': {
        return { value: option, name: `${option}` }
      }
    }
    return option
  })
}

function isTouchEvent(event) {
  return event.changedTouches || event.touches
}

function getEventXY(event) {
  if (isTouchEvent(event)) {
    return event.changedTouches[0] || event.touches[0]
  }
  return event
}

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
    const normalizedOptions = normalizeOptions(this.options)

    let innerIndex = normalizedOptions.findIndex(option => option.value == this.value)
    if (innerIndex === -1 && !this.placeholder && this.options.length > 0) {
      innerIndex = 0
    }
    const innerValue = normalizedOptions[innerIndex] && normalizedOptions[innerIndex].value || null

    return {
      normalizedOptions,
      innerIndex,
      innerValue,

      top: null,

      pivots: [],
      pivotMin: 0,
      pivotMax: 0,

      transitioning: false,
      transitionTO: null,

      start: null,

      isMouseDown: false,
      isDragging: false,

      scrollOffsetTop: 0,
      scrollMin: 0,
      scrollMax: 0,
    }
  },
  mounted() {
    this.calculatePivots()
    this.top = this.findScrollByIndex(this.innerIndex)
    if (this.innerValue !== this.value) {
      this.$emit('input', this.innerValue)
    }

    this.$el.addEventListener('touchstart', this.onStart)
    this.$el.addEventListener('touchmove', this.onMove)
    this.$el.addEventListener('touchend', this.onEnd)
    this.$el.addEventListener('touchcancel', this.onCancel)

    this.$el.addEventListener('mousewheel', this.onScroll)
    this.$el.addEventListener('DOMMouseScroll', this.onScroll)
    this.$el.addEventListener('wheel', this.onScroll)
    this.$el.addEventListener('mousedown', this.onStart)
    this.$el.addEventListener('mousemove', this.onMove)
    this.$el.addEventListener('mouseup', this.onEnd)
    this.$el.addEventListener('mouseleave', this.onCancel)
  },
  destroyed() {
    this.$el.removeEventListener('touchstart', this.onStart)
    this.$el.removeEventListener('touchmove', this.onMove)
    this.$el.removeEventListener('touchend', this.onEnd)
    this.$el.removeEventListener('touchcancel', this.onCancel)

    this.$el.removeEventListener('mousewheel', this.onScroll)
    this.$el.removeEventListener('DOMMouseScroll', this.onScroll)
    this.$el.removeEventListener('wheel', this.onScroll)
    this.$el.removeEventListener('mousedown', this.onStart)
    this.$el.removeEventListener('mousemove', this.onMove)
    this.$el.removeEventListener('mouseup', this.onEnd)
    this.$el.removeEventListener('mouseleave', this.onCancel)
  },
  watch: {
    value(value) {
      if ((value === null || value === undefined) && this.placeholder) {
        this.correction(-1)
        return
      }

      const nextInnerIndex = this.normalizedOptions.findIndex((option) => option.value == value)
      if (nextInnerIndex === -1) {
        this.$emit('input', this.innerValue)
        return
      }

      if (this.innerIndex !== nextInnerIndex) {
        this.correction(nextInnerIndex)
      }
    },
    options(options) {
      const normalizedOptions = this.normalizedOptions = normalizeOptions(options)

      let internalIndex = normalizedOptions.findIndex(option => option.value == this.value)
      if (internalIndex === -1 && !this.placeholder && this.options.length > 0) {
        internalIndex = 0
      }
      const innerValue = normalizedOptions[internalIndex] && normalizedOptions[internalIndex].value || null

      this.$nextTick(() => {
        this.calculatePivots()
        this.top = this.findScrollByIndex(internalIndex)
        this.innerIndex = internalIndex
        if (this.innerValue !== innerValue) {
          this.$emit('input', this.innerValue = innerValue)
        }
      })
    }
  },
  methods: {
    resize() {
      this.$nextTick(() => {
        this.calculatePivots()
        this.top = this.findScrollByIndex(this.innerIndex)
      })
    },
    calculatePivots() {
      const rotatorTop = this.$refs.list.getBoundingClientRect().top
      this.pivots = (this.$refs.items || []).map((item) => getClientCenterY(item) - rotatorTop).sort((a, b) => a - b)
      this.pivotMin = Math.min(...this.pivots)
      this.pivotMax = Math.max(...this.pivots)

      this.scrollOffsetTop = this.$refs.selection.offsetTop + this.$refs.selection.offsetHeight / 2

      this.scrollMin = this.scrollOffsetTop - this.pivotMin
      this.scrollMax = this.scrollOffsetTop - this.pivotMax
    },
    sanitizeInternalIndex(index) {
      return Math.min(Math.max(index, this.placeholder ? -1 : 0), this.normalizedOptions.length - 1)
    },
    findIndexFromScroll(scroll) {
      let prevDiff = null
      let pivotIndex = 0
      this.pivots.forEach((pivot, i) => {
        const diff = pivot + scroll - this.scrollOffsetTop
        if (prevDiff === null || Math.abs(prevDiff) > Math.abs(diff)) {
          pivotIndex = i
          prevDiff = diff
        }
      })
      if (this.placeholder || this.options.length === 0) {
        return pivotIndex - 1
      }
      return pivotIndex
    },
    findScrollByIndex(index) {
      let pivotIndex = index
      if (this.placeholder || this.options.length === 0) {
        pivotIndex++
      }
      if (index > -1 && pivotIndex in this.pivots) {
        return this.scrollOffsetTop - this.pivots[pivotIndex]
      }
      if (index >= this.pivots.length) {
        return this.scrollOffsetTop - this.pivotMax
      }

      return this.scrollOffsetTop - this.pivotMin
    },
    onScroll(e) {
      if (this.top >= this.scrollMin && e.deltaY < 0) return
      if (this.top <= this.scrollMax && e.deltaY > 0) return
      if (this.pivots.length === 1) return

      e.preventDefault()

      const nextDirInnerIndex = this.sanitizeInternalIndex(this.innerIndex + (e.deltaY > 0 ? 1 : -1))
      const deltaMax = e.deltaY > 0
        ? this.findScrollByIndex(nextDirInnerIndex - 1) - this.findScrollByIndex(nextDirInnerIndex)
        : this.findScrollByIndex(nextDirInnerIndex) - this.findScrollByIndex(nextDirInnerIndex + 1)

      const deltaY = Math.max(Math.min(e.deltaY, deltaMax), deltaMax * -1)

      this.top = Math.min(Math.max(this.top - deltaY * this.scrollSensitivity, this.scrollMax), this.scrollMin)

      const nextInnerIndex = this.sanitizeInternalIndex(this.findIndexFromScroll(this.top))
      const nextInnerValue = this.normalizedOptions[nextInnerIndex] && this.normalizedOptions[nextInnerIndex].value || null

      this.innerIndex = nextInnerIndex
      if (this.innerValue !== nextInnerValue) {
        this.$emit('input', this.innerValue = nextInnerValue)
      }

      this.onAfterWheel()
    },
    onAfterWheel: debounce(function () {
      this.correction(this.findIndexFromScroll(this.top))
    }, 200),
    onStart(event) {
      if (event.cancelable) {
        event.preventDefault()
      }

      const { clientY } = getEventXY(event)
      this.start = [this.top, clientY]
      if (!isTouchEvent(event)) {
        this.isMouseDown = true
      }
      this.isDragging = false
    },
    onMove(e) {
      if (e.cancelable) {
        e.preventDefault()
      }
      if (!this.start) {
        return
      }
      const { clientY } = getEventXY(e)
      const diff = clientY - this.start[1]
      if (Math.abs(diff) > 1.5) {
        this.isDragging = true
      }
      this.top = this.start[0] + diff * (isTouchEvent(e) ? this.touchSensitivity : this.dragSensitivity)
    },
    onEnd(e) {
      if (e.cancelable) {
        e.preventDefault()
      }
      if (this.isDragging) {
        this.correction(this.findIndexFromScroll(this.top))
      } else {
        this.handleClick(e)
      }
      this.start = null
      this.isDragging = false
      this.isMouseDown = false
    },
    onCancel(e) {
      if (e.cancelable) {
        e.preventDefault()
      }
      this.correction(this.findIndexFromScroll(this.top))
      this.start = null
      this.isMouseDown = false
      this.isDragging = false
    },
    handleClick(e) {
      const touchInfo = getEventXY(e)
      const x = touchInfo.clientX
      const y = touchInfo.clientY
      const topRect = this.$refs.top.getBoundingClientRect()
      const bottomRect = this.$refs.bottom.getBoundingClientRect()
      if (topRect.left <= x && x <= topRect.right && topRect.top <= y && y <= topRect.bottom) {
        this.correction(this.innerIndex - 1)
      } else if (bottomRect.left <= x && x <= bottomRect.right && bottomRect.top <= y && y <= bottomRect.bottom) {
        this.correction(this.innerIndex + 1)
      }
    },
    correction(index) {
      const nextInnerIndex = this.sanitizeInternalIndex(index)
      const nextInnerValue = this.normalizedOptions[nextInnerIndex] && this.normalizedOptions[nextInnerIndex].value || null
      this.top = this.findScrollByIndex(nextInnerIndex)

      this.transitioning = true
      if (this.transitionTO) {
        clearTimeout(this.transitionTO)
        this.transitionTO = null
      }

      this.transitionTO = setTimeout(() => {
        this.transitioning = false
        this.transitionTO = null

        this.innerIndex = nextInnerIndex
        if (this.innerValue !== nextInnerValue) {
          this.innerValue = nextInnerValue
          this.$emit('input', this.innerValue)
        }
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
          "-selected": this.innerIndex == -1,
        },
        ref: "items",
        refInFor: true,
        domProps: {
          innerHTML: this.placeholder,
        },
      }))
    } else if (this.normalizedOptions.length === 0 && this.placeholder === null) {
      items.push(h("div", {
        class: ["vue-scroll-picker-item", "-empty", "-selected"],
        ref: "items",
        refInFor: true,
        domProps: {
          innerHTML: this.empty,
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
          ref: 'list',
          class: {
            "vue-scroll-picker-list-rotator": true,
            "-transition": this.transitioning,
          },
          style: this.top !== null ? { top: `${this.top}px` } : {},
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
