<template>
  <div>
    <p>currentValue = <strong>{{ currentValue === null ? '(null)' : currentValue }}</strong></p>
    <button type="button" class="button" @click="handleClick">Open Dialog</button>
    <dialog>
      <VueScrollPicker v-model="currentValue" :options="options" />
    </dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { VueScrollPickerOption } from 'vue-scroll-picker'


export default defineComponent({
  props: {
    options: {
      type: Array as PropType<VueScrollPickerOption[]>,
      default: () => [],
    },
  },
  data() {
    return {
      currentValue: null,
    }
  },
  methods: {
    handleClick() {
      const dialog = this.$el.querySelector('dialog')
      dialog.showModal()
    },
  },
})
</script>
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
