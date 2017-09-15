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
            <picker-group class="flex">
                <picker :options="options0" @input="change" />
                <picker :options="options0" @input="change" />
                <picker :options="options0" @input="change" />
            </picker-group>
        </div>
        <div style="font-size: 16px;">
            <Picker :options="options0" @input="change" placeholder="Select One" />
        </div>
        <div style="font-size: 12px;">
            <PickerGroup>
                <Picker class="picker-8" :options="options1" @input="change" />
                <Picker class="picker-4" :options="options1" @input="change" />
            </PickerGroup>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                options0: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.".split(' '),
                options1: [
                    {value: 10, name: "10KG"},
                    {value: 20, name: "20KG"},
                    {value: 30, name: "30KG"},
                    {value: 40, name: "40KG"},
                    {value: 50, name: "50KG"},
                ]
            };
        },
        methods: {
            change(value) {
                console.log(value);
            },
        },
    };
</script>