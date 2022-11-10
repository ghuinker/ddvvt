<template>
    <div>
        <button @click="greetings = true" class="text-red-500">Hello There</button>
        <div v-if="greetings" class="text-blue-500">
            General Kenobi
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const greetings = ref(false)
</script>
