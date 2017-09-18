
import Picker from "./picker.vue";
import PickerGroup from "./picker-group.vue";
import "./picker.css";

export function install(Vue) {
    Vue.component("ScrollPicker", Picker);
    Vue.component("ScrollPickerGroup", PickerGroup);
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export {
    Picker,
    PickerGroup,
};

export default {
    install,
};
