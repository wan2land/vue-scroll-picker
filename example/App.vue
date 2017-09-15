<style>
    body {
        font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif;
        font-size: 16px;
        line-height: 1.5;
    }
</style>
<template>
    <div>
        <div style="font-size: 24px;">
            <Picker :options="options" @input="change" />
        </div>
        <div style="font-size: 16px;">
            <Picker :options="options" @input="change" placeholder="아마도" />
        </div>
        <div style="font-size: 12px;">
            <Picker :options="options" />
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                options: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
            };
        },
        methods: {
            change(value) {
                console.log(value);
            },
        },
    };
</script>