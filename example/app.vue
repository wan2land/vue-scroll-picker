<style lang="scss">
a.btn {
  margin: .25rem;
}
a.btn-outline-primary {
  color: #007bff !important;
}
a.btn-outline-primary.active,
a.btn-outline-primary:hover {
  color: #fff !important;
}
.vue-scroll-picker-item-placeholder.-selected {
  color: #17A2B8;
}
.vue-scroll-picker-item.-selected {
  color: #007BFF;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-3 py-md-3">
        <h5>Examples</h5>
        <nav class="list-group">
          <router-link class="list-group-item list-group-item-action p-2" to="/">Usage</router-link>
          <router-link class="list-group-item list-group-item-action p-2" to="/example-full-binding">Full Binding</router-link>
          <router-link class="list-group-item list-group-item-action p-2" to="/example-styling">Styling</router-link>
          <router-link class="list-group-item list-group-item-action p-2" to="/example-transition">Transition</router-link>
          <router-link class="list-group-item list-group-item-action p-2" to="/example-dynamic-options">Dynamic Options</router-link>
        </nav>
      </div>
      <div class="col-12 col-md-9 py-md-3 pl-md-5">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
