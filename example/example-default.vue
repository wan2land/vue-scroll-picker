<template>
  <div>
    <h2>Full Binding</h2>
    <div>
      <h4>start value is null (current value = {{ dataBindingTest1 }})</h4>
      <div>
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
      </div>

      <h4 class="mt-4">start value is 20 (current value = {{ dataBindingTest2 }})</h4>
      <div>
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
      </div>

      <h4 class="mt-4">start value is null with placeholder (current value = {{ dataBindingTest3 === null ? "null" : dataBindingTest3 }})</h4>
      <div>
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
      </div>

      <h4 class="mt-4">start value is 20 with placeholder (current value = {{ dataBindingTest4 === null ? "null" : dataBindingTest4 }})</h4>
      <div>
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
      stringOptions: unique("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.".split(" ")),
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
