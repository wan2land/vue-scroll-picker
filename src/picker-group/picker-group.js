import "./picker-group.scss"


export default {
  render(h) {
    return h(
      "div",
      {
        class: ["vue-scroll-picker-group"],
      },
      [...this.$slots.default]
    )
  },
}
