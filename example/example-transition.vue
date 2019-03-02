<template>
  <div>
    <h3>Transition</h3>

    <h4>Transition Picker</h4>
    <pre v-highlightjs><code class="html">{{ example1 }}</code></pre>
    <div>
      <div style="text-align: center;">
        <a class="btn btn-outline-primary" @click="visible1 = !visible1">Show</a>
      </div>
      <transition name="fade">
        <scroll-picker :options="options" v-model="data1" v-if="visible1"></scroll-picker>
      </transition>
    </div>

    <h4 class="mt-4">Transition Picker Group</h4>
    <pre v-highlightjs><code class="html">{{ example2 }}</code></pre>
    <div>
      <div style="text-align: center;">
        <a class="btn btn-outline-primary" @click="visible2 = !visible2">Show</a>
      </div>
      <transition name="fade">
        <scroll-picker-group class="flex" v-if="visible2">
          <scroll-picker :options="options" v-model="data2_1"></scroll-picker>
          <scroll-picker :options="options" v-model="data2_2"></scroll-picker>
          <scroll-picker :options="options" v-model="data2_3"></scroll-picker>
        </scroll-picker-group>
      </transition>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      example1: `<transition name="fade">
  <scroll-picker :options="options" v-model="data" v-if="isVisible"></scroll-picker>
</transition>`,
      example2: `<transition name="fade">
  <scroll-picker-group class="flex" v-if="isVisible">
    <scroll-picker :options="options" v-model="data1"></scroll-picker>
    <scroll-picker :options="options" v-model="data2"></scroll-picker>
    <scroll-picker :options="options" v-model="data3"></scroll-picker>
  </scroll-picker-group>
</transition>`,
      visible1: false,
      visible2: false,
      data1: 0,
      data2_1: 0,
      data2_2: 0,
      data2_3: 0,
      options: [
        {value: 0, name: "0KG"},
        {value: 10, name: "10KG"},
        {value: 20, name: "20KG"},
        {value: 30, name: "30KG"},
        {value: 40, name: "40KG"},
        {value: 50, name: "50KG"},
        {value: 60, name: "60KG"},
        {value: 70, name: "70KG"},
        {value: 80, name: "80KG"},
        {value: 90, name: "90KG"},
        {value: 100, name: "100KG"},
      ],
    }
  },
}
</script>
