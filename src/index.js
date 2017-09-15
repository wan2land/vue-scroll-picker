
import Picker from "./picker.vue";

function install(Vue) {
    Vue.component(Picker.name, Picker);
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    install,
};
