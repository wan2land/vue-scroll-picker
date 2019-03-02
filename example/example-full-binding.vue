<template>
  <div>
    <h3>Full Binding</h3>

    <h4>start value is null</h4>
    <pre v-highlightjs><code class="html">{{ example1 }}</code></pre>
    <p>Current value is <strong>{{ dataBindingTest1 }}</strong></p>
    <scroll-picker :options="options" v-model="dataBindingTest1" />
    <div style="text-align: center;">
      <a
        class="btn btn-outline-primary btn-sm"
        v-for="(option, index) in options"
        :key="index"
        :class="{active: dataBindingTest1 == option.value}"
        @click="dataBindingTest1 = option.value"
      >{{ option.name }}</a>
    </div>

    <h4 class="mt-4">start value is 20</h4>
    <pre v-highlightjs><code class="html">{{ example2 }}</code></pre>
    <p>Current value is <strong>{{ dataBindingTest2 }}</strong></p>
    <scroll-picker :options="options" v-model="dataBindingTest2" />
    <div style="text-align: center;">
      <a
        class="btn btn-outline-primary btn-sm"
        v-for="(option, index) in options"
        :key="index"
        :class="{active: dataBindingTest2 == option.value}"
        @click="dataBindingTest2 = option.value"
      >{{ option.name }}</a>
    </div>

    <h4 class="mt-4">start value is null with placeholder</h4>
    <pre v-highlightjs><code class="html">{{ example3 }}</code></pre>
    <p>Current value is {{ dataBindingTest3 === null ? "null" : dataBindingTest3 }}</p>
    <scroll-picker :options="options" v-model="dataBindingTest3" placeholder="Select One" />
    <div style="text-align: center;">
      <a class="btn btn-outline-secondary btn-sm" :class="{active: dataBindingTest3 === null}" @click="dataBindingTest3 = null">NULL</a>
      <a
        class="btn btn-outline-primary btn-sm"
        v-for="(option, index) in options"
        :key="index"
        :class="{active: dataBindingTest3 == option.value}"
        @click="dataBindingTest3 = option.value"
      >{{ option.name }}</a>
    </div>

    <h4 class="mt-4">start value is 20 with placeholder</h4>
    <pre v-highlightjs><code class="html">{{ example4 }}</code></pre>
    <p>Current value is {{ dataBindingTest4 === null ? "null" : dataBindingTest4 }}</p>
    <scroll-picker :options="options" v-model="dataBindingTest4" placeholder="Select One" />
    <div style="text-align: center;">
      <a class="btn btn-outline-secondary btn-sm" :class="{active: dataBindingTest4 === null}" @click="dataBindingTest4 = null">NULL</a>
      <a
        class="btn btn-outline-primary btn-sm"
        v-for="(option, index) in options"
        :key="index"
        :class="{active: dataBindingTest4 == option.value}"
        @click="dataBindingTest4 = option.value"
      >{{ option.name }}</a>
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
    data: null,
    options: [{value: 0, name: "0KG"}, ... ],
  }
}
<` + `/script>`,
      example2: `<template>
  <scroll-picker :options="options" v-model="data" />
</template>
<script>
export default {
  data() {
    data: 20,
    options: [{value: 0, name: "0KG"}, ... ],
  }
}
<` + `/script>`,
      example3: `<template>
  <scroll-picker :options="options" v-model="data" placeholder="Select One" />
</template>
<script>
export default {
  data() {
    data: null,
    options: [{value: 0, name: "0KG"}, ... ],
  }
}
<` + `/script>`,
      example4: `<template>
  <scroll-picker :options="options" v-model="data" placeholder="Select One" />
</template>
<script>
export default {
  data() {
    data: 20,
    options: [{value: 0, name: "0KG"}, ... ],
  }
}
<` + `/script>`,
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
      dataBindingTest1: null,
      dataBindingTest2: 20,
      dataBindingTest3: null,
      dataBindingTest4: 20,
    }
  },
  methods: {
    change(value) {},
  },
}
</script>
