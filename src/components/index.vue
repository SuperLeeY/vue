<template>
    <h2 @click="press">{{ title}}</h2>
</template>

<script>
export default {
    data() {
        return {
            title: 'Hello Vue!!!'
        }
    },
    mounted() {
        console.log('---hello vue---');   
    },
    methods: {
        press() {
            alert('hello vue!');
        }
    }
}
</script>
