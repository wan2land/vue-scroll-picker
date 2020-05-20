<style lang="scss" scoped>
.example1 {
  .vue-scroll-picker {
    height: 6em;
  }
}
</style>
<template>
  <div>
    <h3>Styling</h3>
    <h4>Height</h4>
    <p>You can adjust the height of the vue-scroll-picker through CSS.</p>
    <pre v-highlightjs><code class="html">{{ exampleHeight }}</code></pre>
    <div class="example1">
      <scroll-picker :options="options" />
    </div>

    <h4>Inherit font-size</h4>
    <p>The size of the vue-scroll-picker inherits the font-size of the parent node.</p>
    <h5>Size 24px + Group with Flex</h5>
    <pre v-highlightjs><code class="html">{{ example1 }}</code></pre>
    <div style="font-size: 24px;">
      <scroll-picker-group class="flex">
        <scroll-picker :options="options" />
        <scroll-picker :options="options" />
        <scroll-picker :options="options" />
      </scroll-picker-group>
    </div>

    <h5>Font Size 12px + Group with Grid</h5>
    <pre v-highlightjs><code class="html">{{ example2 }}</code></pre>
    <div style="font-size: 12px;">
      <scroll-picker-group>
        <scroll-picker class="vue-scroll-picker-8" :options="options"></scroll-picker>
        <scroll-picker class="vue-scroll-picker-4" :options="options"></scroll-picker>
      </scroll-picker-group>
    </div>
  </div>
</template>
<script>
function unique(items) {
  return [...new Set(items)]
}
export default {
  data() {
    return {
      exampleHeight: `<style>
.example .vue-scroll-picker {
  height: 6em; /* default 10em */
}
</style>
<div class="example">
  <scroll-picker :options="options" />
</div>`,
      example1: `<div style="font-size: 24px;">
  <scroll-picker-group class="flex">
    <scroll-picker :options="options"></scroll-picker>
    <scroll-picker :options="options"></scroll-picker>
    <scroll-picker :options="options"></scroll-picker>
  </scroll-picker-group>
</div>`,
      example2: `<div style="font-size: 12px;">
  <scroll-picker-group>
    <scroll-picker class="vue-scroll-picker-8" :options="options"></scroll-picker>
    <scroll-picker class="vue-scroll-picker-4" :options="options"></scroll-picker>
  </scroll-picker-group>
</div>`,
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
