<style lang="scss" scoped>
    .picker-group {
        &:after {
             clear: both;
             display: table;
             content: '';  
        }
        @for $i from 1 through 12 {
            > .picker-#{$i} {
                float: left;
                width: 100% / 12 * $i;
            }
        }
    }
</style>
<template>
    <div class="picker-group">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: "PickerGroup",
    };
</script>