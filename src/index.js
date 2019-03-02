import ScrollPicker from "./picker/picker"
import ScrollPickerGroup from "./picker-group/picker-group"


export function install(Vue) {
  Vue.component("ScrollPicker", ScrollPicker)
  Vue.component("ScrollPickerGroup", ScrollPickerGroup)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export {
  ScrollPicker,
  ScrollPickerGroup,
}

export default {
  install,
}
