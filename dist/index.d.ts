import { ComponentOptions, PluginObject, VueConstructor, PluginFunction } from "vue"
import { Vue } from "vue/types/vue"

export const install: PluginFunction<{}>

declare const VueScrollPickerPlugin: VueScrollPickerPlugin
export default VueScrollPickerPlugin
export interface VueScrollPickerPlugin {
  install: PluginFunction<{}>
}

export declare const ScrollPicker: ComponentOptions<any, any, any, any>
export declare const ScrollPickerGroup: ComponentOptions<any, any, any, any>
