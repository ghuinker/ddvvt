<template>
    <div>
        <button @click="greetings = true" class="text-red-500">Hello There</button>
        <div v-if="greetings" class="text-blue-500">
            General Kenobi
        </div>
    </div>
</template>

<script>
    export default {
        name: "HelloThere",
        data(){
            return {
                greetings: false
            }
        }
    }
</script>