<script
  setup
  lang="ts"
  generic="T extends ScrollPickerOption = ScrollPickerOption"
>
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  shallowRef,
  VNode,
  watch,
} from 'vue'

export type ScrollPickerValue = string | number | boolean | null
export interface ScrollPickerOption {
  name: string
  value: ScrollPickerValue
  disabled?: boolean
}

export type ScrollPickerOptionable<T> = ScrollPickerValue | T

type GestureState = [scrollY: number, clientY: number, isDragging: boolean]

const EVENT_OPTIONS: AddEventListenerOptions = { passive: false }

const emit = defineEmits<{
  (event: 'update:modelValue', value: ScrollPickerValue | undefined): void
  (event: 'start'): void
  (event: 'move', value: ScrollPickerValue | undefined): void
  (event: 'end', value: ScrollPickerValue | undefined): void
  (event: 'cancel'): void
  (event: 'wheel', value: ScrollPickerValue | undefined): void
  (event: 'click', value: ScrollPickerValue | undefined): void
}>()

const props = withDefaults(
  defineProps<{
    modelValue: ScrollPickerValue | undefined
    options?: ScrollPickerOptionable<T>[]
    dragSensitivity?: number
    touchSensitivity?: number
    wheelSensitivity?: number
    emptyText?: string
  }>(),
  {
    options: () => [],
    dragSensitivity: 1.7,
    touchSensitivity: 1.7,
    wheelSensitivity: 1,
    emptyText: 'No Options Available',
  },
)

defineSlots<{
  default: (props: { option: T }) => VNode
  empty: (props: { text: string }) => VNode
}>()

const internalOptions = computed<T[]>(() => {
  return props.options.map((option) => {
    if (option === null) {
      return { value: null, name: '' } as T
    }
    switch (typeof option) {
      case 'string': {
        return { value: option, name: option } as T
      }
      case 'number':
      case 'boolean': {
        return { value: option, name: `${option}` } as T
      }
    }
    return option
  })
})

const transitionTimeout = ref<ReturnType<typeof setTimeout> | null>(null)

const internalIndex = ref(
  Math.max(
    internalOptions.value.findIndex(
      (option) => option.value == props.modelValue,
    ),
    0,
  ),
)

let itemOffsets: number[] = []

let scrollOffset = 0
let scrollY = 0
let scrollYMax = 0

let gestureState: GestureState | null = null

const el = shallowRef<HTMLDivElement>()

const rotatorRef = shallowRef<HTMLDivElement>()
const layerTopRef = shallowRef<HTMLDivElement>()
const layerSelectionRef = shallowRef<HTMLDivElement>()
const layerBottomRef = shallowRef<HTMLDivElement>()

let resizeObserver: globalThis.ResizeObserver | null = null

watch(
  () => props.modelValue,
  (value) => {
    const nextIndex = internalOptions.value.findIndex(
      (option) => option.value == value,
    )
    if (internalIndex.value !== nextIndex) {
      internalIndex.value = Math.max(nextIndex, 0)
      scrollTo(findScrollByIndex(nextIndex))
    }
  },
)

watch(internalOptions, (options) => {
  internalIndex.value = Math.max(
    options.findIndex((option) => option.value == props.modelValue),
    0,
  )
  nextTick(() => {
    updateItemOffsets()
    setScroll(findScrollByIndex(internalIndex.value))
  })
})

onMounted(() => {
  if (!el.value) {
    return
  }

  el.value.addEventListener('wheel', handleWheel, EVENT_OPTIONS)
  el.value.addEventListener('touchstart', handleTouchStart, EVENT_OPTIONS)
  el.value.addEventListener('mousedown', handleMouseDown, EVENT_OPTIONS)

  if (typeof window.ResizeObserver !== 'undefined') {
    let raf = null as ReturnType<typeof requestAnimationFrame> | null
    resizeObserver = new window.ResizeObserver(() => {
      if (raf) {
        cancelAnimationFrame(raf)
      }
      raf = requestAnimationFrame(() => {
        updateItemOffsets()
        raf = null
      })
    })
    resizeObserver.observe(el.value)
  } else {
    updateItemOffsets()
  }
})

onBeforeUnmount(() => {
  el.value?.removeEventListener('wheel', handleWheel)
  el.value?.removeEventListener('touchstart', handleTouchStart)
  el.value?.removeEventListener('mousedown', handleMouseDown)

  resizeObserver?.disconnect()
})

function updateItemOffsets() {
  const rotatorEl = rotatorRef.value
  const layerSelectionEl = layerSelectionRef.value
  if (!rotatorEl || !layerSelectionEl) {
    return
  }

  // set scrollOffset
  {
    const { top, bottom } = layerSelectionEl.getBoundingClientRect()
    const elTop = el.value?.getBoundingClientRect().top ?? 0
    scrollOffset = (top + bottom) / 2 - elTop
  }

  // set itemOffsets
  let firstItemOffset = 0
  itemOffsets = Array.from(rotatorEl.children).map((itemRef, index) => {
    const { top, bottom } = itemRef.getBoundingClientRect()
    const itemOffset = (top + bottom) / 2
    if (index === 0) {
      scrollOffset -= itemOffset - top
      firstItemOffset = itemOffset
    }
    return itemOffset - firstItemOffset
  })

  scrollYMax = Math.max(...itemOffsets)
  setScroll(findScrollByIndex(internalIndex.value))
}

function findIndexFromScroll(scroll: number, ignoreDisabled: boolean): number {
  let minDiff = Infinity
  let foundBoundIndex = 0
  for (const [boundIndex, bound] of itemOffsets.entries()) {
    if (!ignoreDisabled && internalOptions.value[boundIndex]?.disabled) {
      continue
    }
    if (Math.abs(bound - scroll) < minDiff) {
      minDiff = Math.abs(bound - scroll)
      foundBoundIndex = boundIndex
    }
  }
  return foundBoundIndex
}

function findScrollByIndex(index: number): number {
  return itemOffsets[Math.min(Math.max(index, 0), itemOffsets.length - 1)]
}

function scrollTo(scroll: number) {
  setScroll(scroll)
  if (transitionTimeout.value) {
    clearTimeout(transitionTimeout.value)
  }
  transitionTimeout.value = setTimeout(() => {
    transitionTimeout.value = null
  }, 150)
}

let scrollRaf = null as ReturnType<typeof requestAnimationFrame> | null
function setScroll(scroll: number) {
  scrollY = scroll
  if (scrollRaf) {
    cancelAnimationFrame(scrollRaf)
  }
  scrollRaf = requestAnimationFrame(() => {
    rotatorRef.value!.style.top = `${scrollOffset - scroll}px`
    scrollRaf = null
  })
  return scroll
}

function bounceEffect(value: number, min: number, max: number, tension = 0.2) {
  if (value < min) {
    return min + (value - min) * tension
  }
  if (value > max) {
    return max + (value - max) * tension
  }
  return value
}

let wheelTimeout: ReturnType<typeof setTimeout> | null = null
function handleWheel(e: WheelEvent) {
  if (!wheelTimeout && scrollY <= 0 && e.deltaY < 0) {
    return
  }
  if (!wheelTimeout && scrollY >= scrollYMax && e.deltaY > 0) {
    return
  }

  if (itemOffsets.length === 1) {
    return
  }
  e.preventDefault()
  const scrollYValue = setScroll(
    bounceEffect(scrollY + e.deltaY * props.wheelSensitivity, 0, scrollYMax),
  )

  const nextIndex = findIndexFromScroll(scrollYValue, true)
  const nextOption: ScrollPickerOption | undefined =
    internalOptions.value[nextIndex]
  const nextValue = nextOption?.value
  emit('wheel', nextValue)
  if (nextOption && !nextOption.disabled) {
    internalIndex.value = nextIndex
    emitUpdateModelValue(nextValue)
  }

  if (wheelTimeout) {
    clearTimeout(wheelTimeout)
  }
  wheelTimeout = setTimeout(() => {
    scrollTo(findScrollByIndex(findIndexFromScroll(scrollYValue, false)))
    wheelTimeout = null
  }, 100)
}

function handleTouchStart(e: TouchEvent) {
  if (gestureState) {
    return
  }
  if (e.cancelable) {
    e.preventDefault()
  }

  // TODO multitouch
  gestureState = [scrollY, e.touches[0].clientY, false]
  emit('start')

  document.addEventListener('touchmove', handleTouchMove, EVENT_OPTIONS)
  document.addEventListener('touchend', handleTouchEnd, EVENT_OPTIONS)
  document.addEventListener('touchcancel', handleTouchCancel)
}

function handleMouseDown(e: MouseEvent) {
  if (gestureState) {
    return
  }
  if (e.cancelable) {
    e.preventDefault()
  }

  gestureState = [scrollY, e.clientY, false]
  emit('start')

  document.addEventListener('mousemove', handleMouseMove, EVENT_OPTIONS)
  document.addEventListener('mouseup', handleMouseUp, EVENT_OPTIONS)
  document.addEventListener('mouseout', handleMouseOut)
}

function handleTouchMove(e: TouchEvent) {
  if (!gestureState) {
    return
  }
  if (e.cancelable) {
    e.preventDefault()
  }
  const diff = gestureState[1] - e.touches[0].clientY // TODO multitouch
  if (Math.abs(diff) > 1.5) {
    const nextGestureState = gestureState.slice() as GestureState
    nextGestureState[2] = true
    gestureState = nextGestureState
  }
  emitMove(
    setScroll(
      bounceEffect(
        gestureState[0] + diff * props.touchSensitivity,
        0,
        scrollYMax,
      ),
    ),
  )
}

function handleMouseMove(e: MouseEvent) {
  if (!gestureState) {
    return
  }
  if (e.cancelable) {
    e.preventDefault()
  }
  const diff = gestureState[1] - e.clientY
  if (Math.abs(diff) > 1.5) {
    const nextGestureState = gestureState.slice() as GestureState
    nextGestureState[2] = true
    gestureState = nextGestureState
  }
  emitMove(
    setScroll(
      bounceEffect(
        gestureState[0] + diff * props.dragSensitivity,
        0,
        scrollYMax,
      ),
    ),
  )
}

function emitMove(scrollY: number) {
  emit(
    'move',
    internalOptions.value[findIndexFromScroll(scrollY, true)]?.value ??
      undefined,
  )
}

function handleMouseUp(e: MouseEvent) {
  if (!gestureState) {
    return
  }
  if (e.cancelable) {
    e.preventDefault()
  }

  endGesture(gestureState[2], e.clientX, e.clientY)
  gestureState = null

  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
  document.removeEventListener('mouseout', handleMouseOut)
}

function handleTouchEnd(e: TouchEvent) {
  if (!gestureState) {
    return
  }
  if (e.cancelable) {
    e.preventDefault()
  }
  endGesture(
    gestureState[2],
    e.changedTouches[0].clientX,
    e.changedTouches[0].clientY,
  )
  gestureState = null

  document.removeEventListener('touchmove', handleTouchMove)
  document.removeEventListener('touchend', handleTouchEnd)
  document.removeEventListener('touchcancel', handleTouchCancel)
}

function endGesture(isDragging: boolean, x: number, y: number) {
  if (isDragging) {
    const nextIndex = findIndexFromScroll(scrollY, false)
    const nextValue = internalOptions.value[nextIndex]?.value ?? null
    scrollTo(findScrollByIndex(nextIndex))
    internalIndex.value = nextIndex
    emit('end', nextValue)
    emitUpdateModelValue(nextValue)
  } else {
    triggerClick(x, y)
  }
}

function triggerClick(x: number, y: number) {
  if (!layerTopRef.value || !layerBottomRef.value) {
    return
  }
  const topRect = layerTopRef.value.getBoundingClientRect()
  const bottomRect = layerBottomRef.value.getBoundingClientRect()
  let nextIndex = internalIndex.value
  if (
    topRect.left <= x &&
    x <= topRect.right &&
    topRect.top <= y &&
    y <= topRect.bottom
  ) {
    if (internalIndex.value === 0) {
      return // top
    }
    nextIndex--
    while (
      internalOptions.value[nextIndex] &&
      internalOptions.value[nextIndex].disabled
    ) {
      nextIndex--
    }
  } else if (
    bottomRect.left <= x &&
    x <= bottomRect.right &&
    bottomRect.top <= y &&
    y <= bottomRect.bottom
  ) {
    if (internalIndex.value === internalOptions.value.length - 1) {
      return // bottom
    }
    nextIndex++
    while (
      internalOptions.value[nextIndex] &&
      internalOptions.value[nextIndex].disabled
    ) {
      nextIndex++
    }
  }
  if (internalIndex.value !== nextIndex && internalOptions.value[nextIndex]) {
    internalIndex.value = nextIndex
    const nextValue = internalOptions.value[nextIndex].value
    emit('end', nextValue)
    emit('click', nextValue)
    emitUpdateModelValue(nextValue)
    scrollTo(findScrollByIndex(nextIndex))
  }
}

function emitUpdateModelValue(value: ScrollPickerValue) {
  if (props.modelValue !== value) {
    emit('update:modelValue', value)
  }
}

// <Cancel>
function handleMouseOut(e: MouseEvent) {
  if (e.relatedTarget === null) {
    cancelGesture()
  }
}

function handleTouchCancel() {
  cancelGesture()
}

function cancelGesture() {
  scrollTo(findScrollByIndex(internalIndex.value))
  gestureState = null
  emit('cancel')
}
// </Cancel>
</script>
<template>
  <div ref="el" class="vue-scroll-picker">
    <div
      ref="rotatorRef"
      role="listbox"
      :class="[
        'vue-scroll-picker-rotator',
        {
          'vue-scroll-picker-rotator-transition': transitionTimeout,
        },
      ]"
    >
      <template v-if="internalOptions.length === 0">
        <div
          key="empty"
          role="option"
          class="vue-scroll-picker-item"
          aria-disabled="true"
          aria-selected="false"
        >
          <slot name="empty" :text="emptyText">
            {{ emptyText }}
          </slot>
        </div>
      </template>
      <template v-else>
        <template
          v-for="(option, optionIndex) in internalOptions"
          :key="optionIndex"
        >
          <div
            role="option"
            class="vue-scroll-picker-item"
            :aria-disabled="option.disabled"
            :aria-selected="internalIndex === optionIndex"
            :data-value="option.value ?? ''"
          >
            <slot :option="option">{{ option.name }}</slot>
          </div>
        </template>
      </template>
    </div>
    <div class="vue-scroll-picker-layer">
      <div ref="layerTopRef" class="vue-scroll-picker-layer-top"></div>
      <div
        ref="layerSelectionRef"
        class="vue-scroll-picker-layer-selection"
      ></div>
      <div ref="layerBottomRef" class="vue-scroll-picker-layer-bottom"></div>
    </div>
  </div>
</template>
