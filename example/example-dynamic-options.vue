<template>
  <div>
    <h3>Dynamic Options</h3>

    <h4>Dynamic Options</h4>
    <div>
      <div style="text-align: center;">
        <a class="btn btn-outline-primary" @click="pushItem">Push Random Item</a>
        <a class="btn btn-outline-primary" @click="popItem">Pop Item</a>
        <a class="btn btn-outline-primary" @click="unshiftItem">Unshift Random Item</a>
        <a class="btn btn-outline-primary" @click="shiftItem">Shift Item</a>
        <a class="btn btn-outline-primary" @click="replaceItems">Replace 10 Items</a>
      </div>
      <scroll-picker :options="options" v-model="data"></scroll-picker>
      <div>selected item = <strong>{{ data === null ? 'null' : data }}</strong></div>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      data: null,
      options: [],
    }
  },
  methods: {
    pushItem() {
      this.options.push(~~(Math.random() * 100000))
    },
    popItem() {
      this.options.pop()
    },
    unshiftItem() {
      this.options.unshift(~~(Math.random() * 100000))
    },
    shiftItem() {
      this.options.shift()
    },
    replaceItems() {
      this.options = [...Array(10)].map(() => ~~(Math.random() * 100000))
    },
  },
}
</script>
