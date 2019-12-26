<template>
  <div>
    <h3>Usage</h3>

    <h4>HTML Support</h4>
    <pre v-highlightjs><code class="html">{{ example1 }}</code></pre>
    <p>Current value is <strong>{{ data1 }}</strong></p>
    <scroll-picker :options="options" v-model="data1" />
    <div style="text-align: center;">
      <a
        class="btn btn-outline-primary btn-sm"
        v-for="(option, index) in options"
        :key="index"
        :class="{active: data1 == option.value}"
        @click="data1 = option.value"
        v-html="option.name"
      ></a>
    </div>

    <h4 class="mt-4">Sensitivity</h4>
    <pre v-highlightjs><code class="html">{{ example2 }}</code></pre>
    <scroll-picker
      :drag-sensitivity="dragSensitivity"
      :touch-sensitivity="touchSensitivity"
      :scroll-sensitivity="scrollSensitivity"
      :options="options"
      v-model="data2"
    />
    <div class="form">
      <div class="form-group row">
        <label class="col-sm-4 col-form-label">Drag Sensitivity</label>
        <div class="col-sm-8">
          <input type="range" min="0.5" max="10" v-model.number="dragSensitivity" /> {{ dragSensitivity }} (default = 1.7)
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-4 col-form-label">Touch Sensitivity</label>
        <div class="col-sm-8">
          <input type="range" min="0.5" max="10" v-model.number="touchSensitivity" /> {{ touchSensitivity }} (default = 1.7)
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-4 col-form-label">Scroll Sensitivity</label>
        <div class="col-sm-8">
          <input type="range" min="0.5" max="10" v-model.number="scrollSensitivity" /> {{ scrollSensitivity }} (default = 1)
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      example1: `<template>
  <scroll-picker :options="options" v-model="data" />
</template>
<script>
export default {
  data() {
    return {
      data: null,
      options: [
        {value: "instagram", name: "<i class=\\"fab fa-instagram\\"></i> Instagram"},
        {value: "facebook", name: "<i class=\\"fab fa-facebook\\"></i> Facebook"},
        {value: "youtube", name: "<i class=\\"fab fa-youtube\\"></i> Youtube"},
        {value: "twitter", name: "<i class=\\"fab fa-twitter\\"></i> Twitter"},
        {value: "line", name: "<i class=\\"fab fa-line\\"></i> Line"},
      ],
    }
  }
}
<` + `/script>`,
      example2: `<template>
  <scroll-picker
    :drag-sensitivity="dragSensitivity"
    :touch-sensitivity="touchSensitivity"
    :scroll-sensitivity="scrollSensitivity"
    :options="options"
    v-model="data"
  />
</template>`,
      dragSensitivity: 1.7,
      touchSensitivity: 1.7,
      scrollSensitivity: 1,
      options: [
        {value: "instagram", name: "<i class=\"fab fa-instagram\"></i> Instagram"},
        {value: "facebook", name: "<i class=\"fab fa-facebook\"></i> Facebook"},
        {value: "youtube", name: "<i class=\"fab fa-youtube\"></i> Youtube"},
        {value: "twitter", name: "<i class=\"fab fa-twitter\"></i> Twitter"},
        {value: "line", name: "<i class=\"fab fa-line\"></i> Line"},
      ],
      data1: null,
      data2: 20,
    }
  },
  methods: {
    change(value) {},
  },
}
</script>
