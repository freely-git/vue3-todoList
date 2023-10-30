<template>
    <div>
        <h1>已完成</h1>
        <a-list tem-layout="horizontal" size="large"  :data-source="completed">
            <template  #renderItem="{ item }">
                <TodoItem :content="item.content" :id="item.id" :status="item.status" :key="item.id" />
            </template>
        </a-list>
    </div>
</template>

<script setup lang="ts">
    import TodoItem from "./TodoItem.vue";
    import { useCounterStore } from "@/stores/counter";
    import { storeToRefs } from "pinia";

    const store = useCounterStore();
    const { completed } = storeToRefs(store);
    const { getData } = store 
    getData();
</script>


<style scoped>
    
</style>