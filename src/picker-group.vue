<style lang="scss" scoped>
    .picker-group.flex {
        display: flex;
    }
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
