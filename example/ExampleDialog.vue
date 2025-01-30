<script setup lang="ts">
import { ref } from 'vue'
import {
  VueScrollPicker,
  VueScrollPickerOption,
  VueScrollPickerValue,
} from 'vue-scroll-picker'
import CurrentValue from './CurrentValue.vue'

defineProps<{
  options: VueScrollPickerOption[]
}>()

const currentValue = ref<VueScrollPickerValue>(null)

function handleClick() {
  const dialog = document.querySelector('dialog')
  dialog?.showModal()
}

function handleClose() {
  const dialog = document.querySelector('dialog')
  dialog?.close()
}
</script>
<template>
  <div>
    <div class="controller">
      <CurrentValue :value="currentValue" />
      <button type="button" class="button" @click="handleClick">
        Open Dialog
      </button>
    </div>
    <dialog>
      <VueScrollPicker v-model="currentValue" :options="options" />
      <button type="button" class="button" @click="handleClose">
        Close Dialog
      </button>
    </dialog>
  </div>
</template>
<style scoped>
dialog {
  width: 600px;
  transition: all 0.3s allow-discrete;
  border: 0;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  outline: none;
}

dialog::backdrop {
  transition: all 0.3s allow-discrete;
  background-color: rgba(0, 0, 0, 0.2);
  opacity: 0;
}

dialog[open],
dialog[open]::backdrop {
  opacity: 1;
}

@starting-style {
  dialog[open],
  dialog[open]::backdrop {
    opacity: 0;
  }
}

dialog:not([open]),
dialog:not([open])::backdrop {
  opacity: 0;
}
</style>
