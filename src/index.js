
import ScrollPicker from "./picker.vue";
import ScrollPickerGroup from "./picker-group.vue";

export function install(Vue) {
    Vue.component("ScrollPicker", ScrollPicker);
    Vue.component("ScrollPickerGroup", ScrollPickerGroup);
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export {
    ScrollPicker,
    ScrollPickerGroup,
};

export default {
    install,
};
