import '@vitest/browser/matchers.d.ts'

import { describe, expect, test } from 'vitest'
import { render } from 'vitest-browser-vue'
import VueScrollPicker from './VueScrollPicker.vue'

import '../style.css'

describe('Picker', () => {
  test('should be able to select option', async () => {
    const screen = render(VueScrollPicker, {
      props: {
        options: [1, 2, 3],
        modelValue: 1,
      },
    })

    await expect
      .element(screen.getByRole('option', { selected: true }))
      .toHaveTextContent('1')

    screen.rerender({
      modelValue: 2,
    })

    await expect
      .element(screen.getByRole('option', { selected: true }))
      .toHaveTextContent('2')
  })
})
