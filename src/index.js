
import Picker from "./picker.vue";
import PickerGroup from "./picker-group.vue";

function install(Vue) {
    Vue.component("Picker", Picker);
    Vue.component("PickerGroup", PickerGroup);
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    install,
};
