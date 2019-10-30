<template>
    <div>
        <v-alert
            @input="onClose"
            border="left"
            close-text="Close Alert"
            dismissible
            :type="type"
            :value="true"
        >{{ text }} </v-alert>
    </div>
</template>

<script>
export default {
    data() {
        return {
            alert: true,
            type: "error",
            message: ""
        };
    },
    props: ['text'],
    methods: {
        onClose() {
            this.$emit("dismissed");
        }
    }
};
</script>
